import json
import re
import os

with open('python_all_questions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def format_questions(qs):
    if not qs:
        return '[]'
    lines = ['[']
    for q in qs:
        q_text = json.dumps(q["question"])
        opts = json.dumps(q["options"])
        ans_idx = q["answerIndex"]
        lines.append(f'            {{ question: {q_text}, options: {opts}, answerIndex: {ans_idx} }},')
    lines.append('          ]')
    return '\n'.join(lines)

def replace_block(content, key, replacement):
    # Find key: [ ... ]
    # We use a simple counting of brackets
    start_idx = content.find(key + ':')
    if start_idx == -1:
        return content
    
    bracket_start = content.find('[', start_idx)
    if bracket_start == -1:
        return content
        
    bracket_count = 0
    in_string = False
    string_char = ''
    bracket_end = -1
    
    for i in range(bracket_start, len(content)):
        char = content[i]
        
        if not in_string:
            if char in '"\'`':
                in_string = True
                string_char = char
            elif char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    bracket_end = i
                    break
        else:
            if char == '\\':
                i += 1  # skip escaped char
            elif char == string_char:
                in_string = False
                
    if bracket_end != -1:
        return content[:bracket_start] + replacement + content[bracket_end+1:]
    return content

for i in range(1, 16):
    qs = data.get(str(i), [])
    if not qs:
        continue
        
    mid = (len(qs) + 1) // 2
    pretest = qs[:mid]
    posttest = qs[mid:]
    
    filepath = f"src/lib/python-e{i}.ts"
    if not os.path.exists(filepath):
        print(f"File {filepath} not found.")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = replace_block(content, 'pretest', format_questions(pretest))
    content = replace_block(content, 'posttest', format_questions(posttest))
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Injected Exercise {i} ({len(pretest)} pretest, {len(posttest)} posttest) into {filepath}")
