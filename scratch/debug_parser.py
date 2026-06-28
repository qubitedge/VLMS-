import re

with open("scratch/mod4_p3p4_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(r'Set \d+: [^\n]+', '', text)
text = text.replace("PART 3: Building a Simple RAG Pipeline (101–150)", "")
text = text.replace("PART 4: Fine-Tuning vs Prompt Engineering (151–200)", "")

parts = re.split(r'(a\))', text)

parsed = []
current_text = parts[0]
for i in range(1, len(parts), 2):
    rest = parts[i+1]
    
    b_split = re.split(r'(b\))', rest, maxsplit=1)
    opt_a = b_split[0]
    rest = b_split[2] if len(b_split) > 2 else ""
    
    c_split = re.split(r'(c\))', rest, maxsplit=1)
    if len(c_split) > 2:
        opt_b = c_split[0]
        rest = c_split[2]
        
        d_split = re.split(r'(d\))', rest, maxsplit=1)
        if len(d_split) > 2:
            opt_c = d_split[0]
            rest = d_split[2]
            
            match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
            if match:
                idx = match.start() + 1
                opt_d = rest[:idx]
                next_q = rest[idx:]
            else:
                opt_d = rest
                next_q = ""
            options = [opt_a, opt_b, opt_c, opt_d]
        else:
            opt_c = ""
            match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
            if match:
                idx = match.start() + 1
                opt_c = rest[:idx]
                next_q = rest[idx:]
            else:
                opt_c = rest
                next_q = ""
            options = [opt_a, opt_b, opt_c]
    else:
        opt_b_full = rest
        match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
        if match:
            idx = match.start() + 1
            opt_b = rest[:idx]
            next_q = rest[idx:]
        else:
            opt_b = rest
            next_q = ""
        options = [opt_a, opt_b]
        
    parsed.append({
        "question": current_text.strip(),
        "options": [o.strip() for o in options if o.strip()]
    })
    current_text = next_q

for q in parsed:
    q['question'] = re.sub(r'^Set \d+: [^\n]+', '', q['question'])
    q['question'] = q['question'].strip()

print(f"Total parsed questions: {len(parsed)}")
for q in parsed[-3:]:
    print(f"Q: {q['question']}")
    print(f"O: {q['options']}")
