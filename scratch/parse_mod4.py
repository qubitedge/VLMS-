import re
import json

with open("scratch/mod4_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Step 1: Remove "Set X: ..." headers 
# They are like "Set 1: High-Level Concepts & Tools"
# They appear before a question.
text = re.sub(r'Set \d+: [a-zA-Z &-]+', '', text)
text = text.replace("PART 2: Semantic Search (51–100)", "")
text = text.replace(" Part 1: Creating Embeddings (1–50)", "")

# Wait, some text might remain. Let's just do it manually.
# Let's split by 'a)', 'b)', 'c)', 'd)'
# Actually, the options always appear sequentially.
# A question is followed by a), then b), then maybe c) and d).

# Let's use regex to find all matches of a question and its options.
# A question is any text. Then a) something b) something...
# We can find all instances of a).
parts = re.split(r'(a\))', text)
# parts[0] is the first question
# parts[1] is 'a)'
# parts[2] starts with option A and goes until 'b)'

parsed = []
current_text = parts[0]
for i in range(1, len(parts), 2):
    # This is 'a)'
    a_opt_marker = parts[i]
    rest = parts[i+1]
    
    # We need to split 'rest' into b), c), d) and the next question.
    # Because 'rest' contains " Option A text b) Option B text c) Option C text d) Option D textNext Question"
    
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
            
            # Now 'rest' contains option d and the next question
            # Option D ends when a lowercase letter is followed by an uppercase letter
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
            # No d), so rest is opt_c and next question
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
        # No c)
        opt_b_full = rest
        # rest contains opt_b and next question
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

# Clean questions
for q in parsed:
    # remove any remaining "Set X: Title" from the start of the question
    q['question'] = re.sub(r'^Set \d+: [a-zA-Z &-]+', '', q['question'])
    q['question'] = q['question'].strip()

# Now the answers key
ans_key1 = "1:b, 2:a, 3:b, 4:b, 5:b, 6:a, 7:b, 8:b, 9:a, 10:b, 11:b, 12:b, 13:b, 14:a, 15:b, 16:b, 17:b, 18:b, 19:b, 20:b, 21:b, 22:c, 23:a, 24:b, 25:b, 26:b, 27:b, 28:a, 29:b, 30:b, 31:b, 32:b, 33:a, 34:b, 35:b, 36:b, 37:b, 38:b, 39:b, 40:a, 41:b, 42:a, 43:b, 44:b, 45:b, 46:b, 47:a, 48:a, 49:b, 50:b."
ans_key2 = "51:b, 52:b, 53:b, 54:a, 55:b, 56:b, 57:b, 58:b, 59:b, 60:b, 61:b, 62:b, 63:a, 64:a, 65:b, 66:b, 67:b, 68:b, 69:a, 70:b, 71:b, 72:a, 73:b, 74:b, 75:b, 76:b, 77:b, 78:a, 79:b, 80:b, 81:b, 82:b, 83:b, 84:b, 85:b, 86:b, 87:a, 88:b, 89:a, 90:b, 91:b, 92:b, 93:b, 94:b, 95:b, 96:b, 97:b, 98:b, 99:b, 100:b."

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

for i, q in enumerate(parsed):
    q['answerIndex'] = answers[i + 1]

print(f"Total parsed: {len(parsed)}")
with open("scratch/mod4_parsed.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, indent=2)

