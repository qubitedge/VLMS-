with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
for idx, line in enumerate(lines):
    if 'id: "llms-w2-1"' in line:
        print(f"\n--- Around llms-w2-1 (Line {idx+1}) ---")
        for j in range(idx - 10, idx + 40):
            if j < len(lines):
                print(f"Line {j+1}: {lines[j]}")
        break
