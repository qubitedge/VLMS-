import re
import json

with open("scratch/mod3_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Remove headers
text = re.sub(r'Set \d+: [a-zA-Z &,-]+', '', text)
text = text.replace("PART 1: Building a Chatbot (1–50)", "")
text = text.replace("PART 2: AI-Based Text Summarization (56–100)", "")
text = text.replace("PART 3: Document Question Answering (101–150)", "")

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

# Answers
ans_key1 = "1:b, 2:b, 3:b, 4:b, 5:b, 6:b, 7:b, 8:b, 9:b, 10:a, 11:b, 12:a, 13:b, 14:b, 15:b, 16:a, 17:b, 18:b, 19:b, 20:b, 21:b, 22:b, 23:b, 24:b, 25:b."
ans_key2 = "26:a, 27:b, 28:b, 29:b, 30:b, 31:a, 32:b, 33:b, 34:c, 35:b, 36:a, 37:b, 38:b, 39:b, 40:b."
ans_key3 = "41:b, 42:b, 43:b, 44:b, 45:b, 46:a, 47:b, 48:b, 49:b, 50:b."

def parse_keys(key_str):
    mapping = {'a': 0, 'b': 1, 'c': 2, 'd': 3}
    pairs = key_str.replace('.', '').split(',')
    res = {}
    for p in pairs:
        p = p.strip()
        if not p: continue
        num, letter = p.split(':')
        res[int(num)] = mapping[letter]
    return res

answers = parse_keys(ans_key1)
answers.update(parse_keys(ans_key2))
answers.update(parse_keys(ans_key3))

for i, q in enumerate(parsed):
    if (i + 1) in answers:
        q['answerIndex'] = answers[i + 1]
    else:
        q['answerIndex'] = 0 # Fallback just in case

print(f"Total parsed: {len(parsed)}")
with open("scratch/mod3_parsed.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, indent=2)
