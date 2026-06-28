import re
import json

def parse_file(file_path, modules_dict):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Pre-process text to insert newlines before PRETEST/POSTTEST
    text = re.sub(r'(PRETEST \(\d+ Questions – Basic\))', r'\n\1\n', text)
    text = re.sub(r'(POSTTEST \(\d+ Questions – Medium\))', r'\n\1\n', text)
    
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    current_mod = None
    current_exp = None
    current_test = None
    
    single_line_re = re.compile(
        r'^(.+?)\s+A\)\s+(.+?)\s+B\)\s+(.+?)\s+C\)\s+(.+?)\s+D\)\s+(.+?)\s+Answer:\s*([A-D])',
        re.IGNORECASE
    )
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for MODULE header
        mod_match = re.match(r'MODULE\s*(\d+):', line, re.IGNORECASE)
        if mod_match:
            current_mod = int(mod_match.group(1))
            if current_mod not in modules_dict:
                modules_dict[current_mod] = {}
            current_exp = None
            current_test = None
            i += 1
            continue
            
        # Check for Experiment header
        exp_match = re.match(r'Experiment\s*(\d+):', line, re.IGNORECASE)
        if exp_match:
            exp_num = int(exp_match.group(1))
            current_exp = exp_num
            if current_mod:
                if current_exp not in modules_dict[current_mod]:
                    modules_dict[current_mod][current_exp] = {'pretest': [], 'posttest': []}
            i += 1
            continue
            
        # Check for PRETEST or POSTTEST header
        if 'PRETEST' in line.upper():
            current_test = 'pretest'
            i += 1
            continue
        elif 'POSTTEST' in line.upper():
            current_test = 'posttest'
            i += 1
            continue
            
        if current_mod and current_exp and current_test:
            # Check if we already have 20 questions for this test to avoid duplicates in duplicate blocks
            if len(modules_dict[current_mod][current_exp][current_test]) >= 20:
                i += 1
                continue
                
            # Try parsing as single line question first
            match = single_line_re.match(line)
            if match:
                question = match.group(1).strip()
                opt_a = match.group(2).strip()
                opt_b = match.group(3).strip()
                opt_c = match.group(4).strip()
                opt_d = match.group(5).strip()
                ans_letter = match.group(6).strip().upper()
                
                answer_index = ord(ans_letter) - ord('A')
                modules_dict[current_mod][current_exp][current_test].append({
                    'question': question,
                    'options': [opt_a, opt_b, opt_c, opt_d],
                    'answerIndex': answer_index
                })
                i += 1
                continue
                
            # Fall back to multi-line parsing
            if not line.startswith(('A)', 'B)', 'C)', 'D)', 'Answer:', 'MODULE', 'Experiment', 'PRETEST', 'POSTTEST', 'Got it', 'Why might prompt engineering be a better starting point')):
                question = line
                options = []
                answer_index = 0
                
                i += 1
                parsed_ans = False
                while i < len(lines):
                    next_line = lines[i]
                    if next_line.startswith('Answer:'):
                        ans_letter = next_line.split(':')[1].strip()
                        answer_index = ord(ans_letter) - ord('A')
                        parsed_ans = True
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
                
                if parsed_ans and options and len(options) >= 2:
                    modules_dict[current_mod][current_exp][current_test].append({
                        'question': question,
                        'options': options,
                        'answerIndex': answer_index
                    })
                    continue
        
        i += 1

def generate_ts(questions):
    lines = ["[\n"]
    for q in questions:
        question_str = json.dumps(q['question'])
        options_str = json.dumps(q['options'])
        answer_index = q['answerIndex']
        lines.append(f"                            {{ question: {question_str}, options: {options_str}, answerIndex: {answer_index} }},\n")
    lines.append("                          ]")
    return "".join(lines)

def find_balanced_closing_bracket(text, start_bracket_pos):
    bracket_count = 0
    in_string = False
    string_char = None
    escaped = False
    
    i = start_bracket_pos
    while i < len(text):
        char = text[i]
        
        if escaped:
            escaped = False
            i += 1
            continue
            
        if char == '\\':
            escaped = True
            i += 1
            continue
            
        # Handle string literals
        if in_string:
            if char == string_char:
                in_string = False
                string_char = None
            i += 1
            continue
        else:
            if char in ('"', "'", '`'):
                in_string = True
                string_char = char
                i += 1
                continue
                
        # Handle brackets
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
            if bracket_count == 0:
                return i
                
        i += 1
        
    return -1

def inject_questions_for_exp(content, exp_id, pretest_qs, posttest_qs):
    pos = content.find(f'id: "{exp_id}"')
    if pos == -1:
        print(f"Could not find experiment ID {exp_id} in course-data.ts!")
        return content
        
    # Find pretest:
    pretest_key_pos = content.find('pretest:', pos)
    if pretest_key_pos == -1:
        print(f"Could not find 'pretest:' for {exp_id}!")
        return content
        
    pretest_start_bracket = content.find('[', pretest_key_pos)
    if pretest_start_bracket == -1:
        print(f"Could not find start bracket '[' of pretest for {exp_id}!")
        return content
        
    pretest_end_bracket = find_balanced_closing_bracket(content, pretest_start_bracket)
    if pretest_end_bracket == -1:
        print(f"Could not find balanced closing bracket ']' for pretest of {exp_id}!")
        return content
        
    pretest_ts = generate_ts(pretest_qs)
    content = content[:pretest_start_bracket] + pretest_ts + content[pretest_end_bracket+1:]
    
    # Refresh pos after modification
    pos = content.find(f'id: "{exp_id}"')
    
    # Find posttest:
    posttest_key_pos = content.find('posttest:', pos)
    if posttest_key_pos == -1:
        print(f"Could not find 'posttest:' for {exp_id}!")
        return content
        
    posttest_start_bracket = content.find('[', posttest_key_pos)
    if posttest_start_bracket == -1:
        print(f"Could not find start bracket '[' of posttest for {exp_id}!")
        return content
        
    posttest_end_bracket = find_balanced_closing_bracket(content, posttest_start_bracket)
    if posttest_end_bracket == -1:
        print(f"Could not find balanced closing bracket ']' for posttest of {exp_id}!")
        return content
        
    posttest_ts = generate_ts(posttest_qs)
    content = content[:posttest_start_bracket] + posttest_ts + content[posttest_end_bracket+1:]
    
    return content

def main():
    modules = {}
    
    # Parse Module 1 questions
    print("Parsing Module 1 questions...")
    parse_file('scratch/mod1_questions_raw.txt', modules)
    
    # Parse Modules 2, 3, and 4 questions
    print("Parsing Modules 2-4 questions...")
    parse_file('scratch/docx_extracted.txt', modules)
    
    # Check parsed statistics
    print("\nParsed statistics:")
    for mod, exps in sorted(modules.items()):
        print(f"Module {mod}:")
        for exp, tests in sorted(exps.items()):
            print(f"  Experiment {exp}: {len(tests['pretest'])} pre, {len(tests['posttest'])} post")
            
    # Load course-data.ts
    with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Map from parsed modules to experiment IDs
    mapping = {
        1: {
            1: 'llms-w1-2',
            2: 'llms-w1-3',
            3: 'llms-w1-4',
            4: 'llms-w1-5'
        },
        2: {
            1: 'llms-w2-1',
            2: 'llms-w2-2',
            3: 'llms-w2-3',
            4: 'llms-w2-4'
        },
        3: {
            1: 'llms-w3-1',
            2: 'llms-w3-2',
            3: 'llms-w3-3'
        },
        4: {
            1: 'llms-w4-1',
            2: 'llms-w4-2',
            3: 'llms-w4-3',
            4: 'llms-w4-4'
        }
    }
    
    print("\nInjecting questions into course-data.ts...")
    for mod_num, exps in mapping.items():
        if mod_num not in modules:
            print(f"Warning: Module {mod_num} not found in parsed questions!")
            continue
        for exp_num, exp_id in exps.items():
            if exp_num not in modules[mod_num]:
                print(f"Warning: Module {mod_num} Experiment {exp_num} not found in parsed questions!")
                continue
            
            pretest_qs = modules[mod_num][exp_num]['pretest']
            posttest_qs = modules[mod_num][exp_num]['posttest']
            
            print(f"Injecting {exp_id} ({len(pretest_qs)} pre, {len(posttest_qs)} post)...")
            content = inject_questions_for_exp(content, exp_id, pretest_qs, posttest_qs)
            
    # Write back to course-data.ts
    with open('src/lib/course-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("\nDone injecting questions!")

if __name__ == '__main__':
    main()
