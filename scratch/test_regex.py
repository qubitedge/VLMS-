import re
import json

single_line_re = re.compile(
    r'^(.+?)\s*A\)\s*(.+?)\s*B\)\s*(.+?)\s*C\)\s*(.+?)\s*D\)\s*(.+?)\s*Answer:\s*([A-D])',
    re.IGNORECASE
)

def parse_docx_extracted(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Let's insert newlines before PRETEST and POSTTEST to make sure they are on their own lines
    text = re.sub(r'(PRETEST \(\d+ Questions – Basic\))', r'\n\1\n', text)
    text = re.sub(r'(POSTTEST \(\d+ Questions – Medium\))', r'\n\1\n', text)
    
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    modules = {}
    current_mod = None
    current_exp = None
    current_test = None
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for MODULE header
        mod_match = re.match(r'MODULE\s*(\d+):', line, re.IGNORECASE)
        if mod_match:
            current_mod = int(mod_match.group(1))
            if current_mod not in modules:
                modules[current_mod] = {}
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
                if current_exp not in modules[current_mod]:
                    modules[current_mod][current_exp] = {'pretest': [], 'posttest': []}
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
            # Let's try to parse as single line question first
            match = single_line_re.match(line)
            if match:
                question = match.group(1).strip()
                opt_a = match.group(2).strip()
                opt_b = match.group(3).strip()
                opt_c = match.group(4).strip()
                opt_d = match.group(5).strip()
                ans_letter = match.group(6).strip().upper()
                
                answer_index = ord(ans_letter) - ord('A')
                modules[current_mod][current_exp][current_test].append({
                    'question': question,
                    'options': [opt_a, opt_b, opt_c, opt_d],
                    'answerIndex': answer_index
                })
                i += 1
                continue
                
            # If not single line, maybe it's a multi-line question (like in Module 2)
            # A multi-line question starts with question text and then options on subsequent lines.
            # But wait! We must make sure it's not a header or metadata line.
            if not line.startswith(('A)', 'B)', 'C)', 'D)', 'Answer:', 'MODULE', 'Experiment', 'PRETEST', 'POSTTEST', 'Got it', 'Why might prompt engineering be a better starting point')):
                # It's a multi-line question.
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
                        # BPE and similar might split options across line or inline
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
                    modules[current_mod][current_exp][current_test].append({
                        'question': question,
                        'options': options,
                        'answerIndex': answer_index
                    })
                    continue
                else:
                    # If we failed to parse as multi-line, print it
                    print(f"Skipping/Failed line at index {i}: {repr(line)}")
        
        i += 1
        
    return modules

if __name__ == '__main__':
    modules = parse_docx_extracted('scratch/docx_extracted.txt')
    for mod_num, exps in sorted(modules.items()):
        print(f"\nMODULE {mod_num}:")
        for exp_num, tests in sorted(exps.items()):
            print(f"  Experiment {exp_num}: {len(tests['pretest'])} pretest, {len(tests['posttest'])} posttest")
