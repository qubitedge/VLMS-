with open('scratch/docx_extracted.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    line_stripped = line.strip()
    if 'MODULE' in line_stripped.upper() or 'EXPERIMENT' in line_stripped.upper():
        print(f"Line {idx+1}: {line_stripped}")
