with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx in range(599, 669):
    if idx < len(lines):
        print(f"Line {idx+1}: {lines[idx]}", end="")
