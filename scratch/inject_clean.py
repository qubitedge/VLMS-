import json
import re
import os

filepath = 'src/lib/course-data.ts'

# Read parsed questions
with open('scratch/mod3_parsed.json', 'r', encoding='utf-8') as f:
    mod3_questions = json.load(f)
with open('scratch/mod4_parsed.json', 'r', encoding='utf-8') as f:
    mod4_questions = json.load(f)

# Define experiment updates
experiments = {
    "llms-w3-1": {
        "image": "![Stateful Memory Illustration](/llms_w3_1_stateful_memory.png)",
        "pretest": mod3_questions[0:13],
        "posttest": mod3_questions[13:25]
    },
    "llms-w3-2": {
        "image": "![Text Summarization Workflow](/llms_w3_2_summarization.png)",
        "pretest": mod3_questions[25:33],
        "posttest": mod3_questions[33:40]
    },
    "llms-w3-3": {
        "image": "![Document QA Extraction Loop](/llms_w3_3_document_qa.png)",
        "pretest": mod3_questions[40:45],
        "posttest": mod3_questions[45:50]
    },
    "llms-w4-1": {
        "image": "![Creating Embeddings Pipeline](/chunking_embedding_illustration.webp)",
        "pretest": mod4_questions[0:25],
        "posttest": mod4_questions[25:50]
    },
    "llms-w4-2": {
        "image": "![Semantic Search Architecture](/semantic_search_illustration.webp)",
        "pretest": mod4_questions[50:75],
        "posttest": mod4_questions[75:100]
    },
    # Image only updates
    "llms-w2-1": {
        "image": "![Zero-Shot Prompting](/zero_shot_illustration.webp)"
    },
    "llms-w2-2": {
        "image": "![Few-Shot Prompting](/few_shot_illustration.webp)"
    },
    "llms-w2-3": {
        "image": "![Chain-of-Thought Prompting](/cot_illustration.webp)"
    },
    "llms-w2-4": {
        "image": "![Structured Output Generation](/structured_output_illustration.webp)"
    },
    "llms-w4-3": {
        "image": "![Retrieval-Augmented Generation Loop](/rag_pipeline_illustration.webp)"
    },
    "llms-w4-4": {
        "image": "![Prompt Engineering vs Fine-Tuning](/rag_vs_finetuning_illustration.webp)"
    }
}

def find_matching_bracket(text, start_idx, open_char='[', close_char=']'):
    open_idx = text.find(open_char, start_idx)
    if open_idx == -1:
        return -1, -1
    
    count = 1
    i = open_idx + 1
    while i < len(text) and count > 0:
        if text[i] == open_char:
            count += 1
        elif text[i] == close_char:
            count -= 1
        i += 1
    return open_idx, i

def format_question_list(q_list):
    lines = []
    for q in q_list:
        q_str = json.dumps(q['question'])
        opts_str = json.dumps(q['options'])
        ans_idx = q['answerIndex']
        lines.append(f'                            {{ question: {q_str}, options: {opts_str}, answerIndex: {ans_idx} }}')
    return '[\n' + ',\n'.join(lines) + '\n                          ]'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id, data in experiments.items():
    print(f"\nProcessing {exp_id}...")
    
    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"  ERROR: Could not find {exp_id}")
        continue
        
    # 1. Update Theory Image
    if "image" in data:
        img_tag = data["image"]
        # Find theory block
        theory_lbl_idx = content.find('theory: [', idx)
        if theory_lbl_idx != -1:
            open_idx, close_idx = find_matching_bracket(content, theory_lbl_idx, '[', ']')
            if open_idx != -1:
                theory_block = content[open_idx:close_idx]
                
                # Check if this image is already in the theory block
                if img_tag in theory_block:
                    print("  Theory image already exists, skipping image injection.")
                else:
                    # Find body: [ inside the first theory item
                    body_lbl_idx = theory_block.find('body: [')
                    if body_lbl_idx != -1:
                        b_open_idx, b_close_idx = find_matching_bracket(theory_block, body_lbl_idx, '[', ']')
                        if b_open_idx != -1:
                            body_arr_str = theory_block[b_open_idx:b_close_idx]
                            # Clean the body block from comments or trailing commas
                            # We can simply insert the new image tag at the end of the array
                            # Replace the closing bracket ']' with the image string and ']'
                            img_str = f',\n                      "{img_tag}"\n                    ]'
                            new_body_arr_str = body_arr_str[:-1].rstrip() + img_str
                            
                            new_theory_block = theory_block[:b_open_idx] + new_body_arr_str + theory_block[b_close_idx:]
                            content = content[:open_idx] + new_theory_block + content[close_idx:]
                            print("  [OK] Theory image injected.")
                            # Re-find the exp index since length changed
                            idx = content.find(f'id: "{exp_id}"')
                            
    # 2. Update Questions (if specified)
    if "pretest" in data and "posttest" in data:
        # Pretest
        pretest_lbl_idx = content.find('pretest:', idx)
        if pretest_lbl_idx != -1:
            open_idx, close_idx = find_matching_bracket(content, pretest_lbl_idx, '[', ']')
            if open_idx != -1:
                formatted_pre = format_question_list(data["pretest"])
                content = content[:open_idx] + formatted_pre + content[close_idx:]
                print("  [OK] Pretest questions injected.")
                # Re-find the exp index
                idx = content.find(f'id: "{exp_id}"')
                
        # Posttest
        posttest_lbl_idx = content.find('posttest:', idx)
        if posttest_lbl_idx != -1:
            open_idx, close_idx = find_matching_bracket(content, posttest_lbl_idx, '[', ']')
            if open_idx != -1:
                formatted_post = format_question_list(data["posttest"])
                content = content[:open_idx] + formatted_post + content[close_idx:]
                print("  [OK] Posttest questions injected.")
                # Re-find the exp index
                idx = content.find(f'id: "{exp_id}"')

# Also append another dummy edit to force HMR if needed
content = content.replace("// Trigger HMR", "") + "\n// Trigger HMR"

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone injecting clean data to course-data.ts!")
