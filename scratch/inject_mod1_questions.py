import re
import json

def parse_questions(text):
    experiments = {}
    current_exp = None
    current_test = None
    
    # Pre-process text to insert newlines before PRETEST and POSTTEST if they are attached to previous lines
    text = re.sub(r'(PRETEST \(\d+ Questions – Basic\))', r'\n\1\n', text)
    text = re.sub(r'(POSTTEST \(\d+ Questions – Medium\))', r'\n\1\n', text)
    
    # Split text into lines
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for experiment header
        exp_match = re.match(r'Experiment (\d+):', line)
        if exp_match:
            exp_num = int(exp_match.group(1))
            current_exp = exp_num
            experiments[current_exp] = {'pretest': [], 'posttest': []}
            i += 1
            continue
            
        # Check for PRETEST or POSTTEST header
        if 'PRETEST' in line:
            current_test = 'pretest'
            i += 1
            continue
        elif 'POSTTEST' in line:
            current_test = 'posttest'
            i += 1
            continue
            
        # Check for Question
        if current_exp and current_test and line and not line.startswith(('A)', 'B)', 'C)', 'D)', 'Answer:')):
            question = line
            options = []
            answer_index = 0
            
            i += 1
            # Gather options and answer
            while i < len(lines):
                next_line = lines[i]
                if next_line.startswith('Answer:'):
                    ans_letter = next_line.split(':')[1].strip()
                    answer_index = ord(ans_letter) - ord('A')
                    i += 1
                    break
                elif next_line.startswith('A)'):
                    parts = re.split(r'\s+([A-D]\))\s+', ' ' + next_line)
                    j = 1
                    while j < len(parts):
                        if parts[j] in ('A)', 'B)', 'C)', 'D)'):
                            options.append(parts[j+1].strip())
                        j += 2
                    i += 1
                elif next_line.startswith(('B)', 'C)', 'D)')):
                    options.append(next_line[2:].strip())
                    i += 1
                else:
                    break
            
            if options and len(options) >= 2:
                experiments[current_exp][current_test].append({
                    'question': question,
                    'options': options,
                    'answerIndex': answer_index
                })
            continue
            
        i += 1
        
    return experiments

def generate_ts(questions):
    lines = ["[\n"]
    for q in questions:
        question_str = json.dumps(q['question'])
        options_str = json.dumps(q['options'])
        answer_index = q['answerIndex']
        lines.append(f"                            {{ question: {question_str}, options: {options_str}, answerIndex: {answer_index} }},\n")
    lines.append("                          ]")
    return "".join(lines)

def update_course_data(experiments):
    with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    mapping = {
        1: 'llms-w1-2',
        2: 'llms-w1-3',
        3: 'llms-w1-4',
        4: 'llms-w1-5'
    }
    
    for exp_num, tests in experiments.items():
        exp_id = mapping.get(exp_num)
        if not exp_id: continue
        
        block_pattern = rf'(id:\s*"{exp_id}".*?pretest:\s*)\[.*?\](.*?posttest:\s*)\[.*?\]'
        
        pretest_ts = generate_ts(tests['pretest'])
        posttest_ts = generate_ts(tests['posttest'])
        
        def replacer(match):
            return match.group(1) + pretest_ts + match.group(2) + posttest_ts
            
        new_content = re.sub(block_pattern, replacer, content, count=1, flags=re.DOTALL)
        if new_content == content:
            print(f"Failed to update {exp_id}")
        content = new_content
        
    with open('src/lib/course-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done updating course-data.ts")

if __name__ == '__main__':
    with open('scratch/mod1_questions_raw.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    experiments = parse_questions(text)
    for exp, tests in experiments.items():
        print(f"Experiment {exp}: {len(tests['pretest'])} pre, {len(tests['posttest'])} post")
    update_course_data(experiments)
