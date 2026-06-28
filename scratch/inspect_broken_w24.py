with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
for idx, line in enumerate(lines):
    if 'id: "llms-w2-4"' in line:
        print(f"\n--- Around llms-w2-4 (Line {idx+1}) ---")
        for j in range(idx - 5, idx + 45):
            if j < len(lines):
                print(f"Line {j+1}: {lines[j]}")
        break
