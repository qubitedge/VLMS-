import re
import json

with open("scratch/mod4_p3p4_raw.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Remove headers from the blocks
text = re.sub(r'Set \d+: [^\n]+\n', '', text)
text = text.replace("PART 3: Building a Simple RAG Pipeline (101–150)\n", "")
text = text.replace("PART 4: Fine-Tuning vs Prompt Engineering (151–200)\n", "")

blocks = text.split('\n\n')

parsed = []
for block in blocks:
    block = block.strip()
    if not block:
        continue
    lines = block.split('\n')
    question = lines[0].strip()
    options = []
    for line in lines[1:]:
        line = line.strip()
        if line.startswith(('a)', 'b)', 'c)', 'd)')):
            options.append(line[2:].strip())
    
    parsed.append({
        "question": question,
        "options": options
    })

print(f"Total questions parsed: {len(parsed)}")

ans_key3 = "101:b, 102:b, 103:a, 104:b, 105:b, 106:b, 107:b, 108:a, 109:a, 110:b, 111:b, 112:b, 113:a, 114:b, 115:a, 116:b, 117:b, 118:b, 119:b, 120:a, 121:b, 122:a, 123:b, 124:b, 125:b, 126:b, 127:b, 128:b, 129:b, 130:b, 131:a, 132:b, 133:b, 134:a, 135:b, 136:b, 137:b, 138:b, 139:b, 140:b, 141:a, 142:b, 143:b, 144:b, 145:b, 146:b, 147:b, 148:b, 149:b, 150:a."
ans_key4 = "151:b, 152:b, 153:b, 154:b, 155:b, 156:a, 157:b, 158:b, 159:b, 160:a, 161:b, 162:b, 163:b, 164:a, 165:b, 166:b, 167:b, 168:b, 169:a, 170:b, 171:b, 172:b, 173:b, 174:b, 175:b, 176:b, 177:b, 178:b, 179:b, 180:b."

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

answers = parse_keys(ans_key3)
answers.update(parse_keys(ans_key4))

for i, q in enumerate(parsed):
    q['answerIndex'] = answers[i + 101]

with open("scratch/mod4_p3p4_parsed.json", "w", encoding="utf-8") as f:
    json.dump(parsed, f, indent=2)
