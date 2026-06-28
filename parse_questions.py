import json
import re

file_path = "python_questions.txt"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

exercises = {}
current_exercise = 0

i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1
        continue
        
    ex_match = re.search(r"Exercise (\d+)", line, re.IGNORECASE)
    if ex_match:
        current_exercise = int(ex_match.group(1))
        exercises[current_exercise] = []
        i += 1
        continue
        
    q_match = re.match(r"^(?:Q)?(\d+)[\.\)]\s*(.*)", line)
    if q_match and current_exercise > 0:
        q_text = q_match.group(2)
        options = []
        answer_idx = -1
        
        i += 1
        while i < len(lines):
            opt_line = lines[i].strip()
            if not opt_line:
                i += 1
                continue
                
            opt_match = re.match(r"^([A-D])[\.\)]\s*(.*)", opt_line, re.IGNORECASE)
            ans_match = re.search(r"(?:Correct\s*)?Answer:\s*([A-D])", opt_line, re.IGNORECASE)
            
            if opt_match:
                options.append(opt_match.group(2))
                i += 1
            elif ans_match:
                ans_char = ans_match.group(1).upper()
                answer_idx = ord(ans_char) - ord('A')
                i += 1
                break
            else:
                if re.match(r"^(?:Q)?\d+[\.\)]\s*", opt_line) or re.search(r"Exercise \d+", opt_line, re.IGNORECASE):
                    break
                else:
                    # just part of the question or ignore
                    i += 1
                    
        if len(options) >= 2 and answer_idx != -1:
            exercises[current_exercise].append({
                "question": q_text,
                "options": options,
                "answerIndex": answer_idx
            })
    else:
        i += 1

with open("python_all_questions.json", "w", encoding="utf-8") as f:
    json.dump(exercises, f, indent=2)

print("Parsed exercises:")
for k, v in exercises.items():
    print(f"Exercise {k}: {len(v)} questions")
