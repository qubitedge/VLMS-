with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
for idx, line in enumerate(lines):
    if 'llms-w2-' in line:
        print(f"Line {idx+1}: {line.strip()}")
