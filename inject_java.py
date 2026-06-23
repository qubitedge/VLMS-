import json
import re
import os

# Parse java_questions.txt
with open('java_questions.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Map: experiment label -> list of questions
experiments = {}
current_key = None

i = 0
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1
        continue

    # Match "Exercise X – Experiment Y: Title"
    ex_match = re.match(r"Exercise\s+(\d+)\s*[-–—]+\s*Experiment\s+(\d+)", line, re.IGNORECASE)
    if ex_match:
        ex_num = int(ex_match.group(1))
        exp_num = int(ex_match.group(2))
        current_key = f"java-e{ex_num}-{exp_num}"
        experiments[current_key] = []
        i += 1
        continue

    # Match question: "Q1. ..." or "1. ..."
    q_match = re.match(r"^(?:Q)?(\d+)[\.\)]\s*(.*)", line)
    if q_match and current_key:
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
                # Could be a new question, new experiment header, or continuation text
                if re.match(r"^(?:Q)?\d+[\.\)]\s*", opt_line) or re.match(r"Exercise\s+\d+", opt_line, re.IGNORECASE):
                    break
                else:
                    # Part of the question text (multi-line question)
                    i += 1

        if len(options) >= 2 and answer_idx != -1:
            experiments[current_key].append({
                "question": q_text,
                "options": options,
                "answerIndex": answer_idx
            })
    else:
        i += 1

# Save parsed data
with open("java_all_questions.json", "w", encoding="utf-8") as f:
    json.dump(experiments, f, indent=2)

print("Parsed Java experiments:")
for k, v in experiments.items():
    print(f"  {k}: {len(v)} questions")


# Now inject into java-data.ts
def format_questions_ts(qs):
    if not qs:
        return '[]'
    lines_out = ['[']
    for q in qs:
        q_text = json.dumps(q["question"])
        opts = json.dumps(q["options"])
        ans_idx = q["answerIndex"]
        lines_out.append(f'            {{ question: {q_text}, options: {opts}, answerIndex: {ans_idx} }},')
    lines_out.append('          ]')
    return '\n'.join(lines_out)


def replace_block(content, experiment_id, key, replacement):
    """Find the experiment by id, then find the key (pretest/posttest) block and replace it."""
    # Find the experiment id string
    id_pattern = f'id: "{experiment_id}"'
    id_idx = content.find(id_pattern)
    if id_idx == -1:
        print(f"  Could not find experiment {experiment_id}")
        return content

    # From this position, find 'pretest: [' or 'posttest: ['
    search_start = id_idx
    key_pattern = f'{key}: ['
    key_idx = content.find(key_pattern, search_start)
    if key_idx == -1:
        print(f"  Could not find {key} for {experiment_id}")
        return content

    # Find the matching closing bracket
    bracket_start = content.find('[', key_idx)
    bracket_count = 0
    in_string = False
    escape_next = False
    bracket_end = -1

    for ci in range(bracket_start, len(content)):
        char = content[ci]

        if escape_next:
            escape_next = False
            continue

        if char == '\\':
            escape_next = True
            continue

        if not in_string:
            if char == '"' or char == "'":
                in_string = True
                string_char = char
            elif char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    bracket_end = ci
                    break
        else:
            if char == string_char:
                in_string = False

    if bracket_end != -1:
        return content[:bracket_start] + replacement + content[bracket_end + 1:]

    print(f"  Could not find closing bracket for {key} in {experiment_id}")
    return content


filepath = "src/lib/java-data.ts"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id, qs in experiments.items():
    if not qs:
        continue

    mid = (len(qs) + 1) // 2
    pretest = qs[:mid]
    posttest = qs[mid:]

    content = replace_block(content, exp_id, 'pretest', format_questions_ts(pretest))
    content = replace_block(content, exp_id, 'posttest', format_questions_ts(posttest))

    print(f"Injected {exp_id}: {len(pretest)} pretest, {len(posttest)} posttest")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! java-data.ts updated.")
