def search_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"\n=== Searching {path} ===")
    matches = 0
    for idx, line in enumerate(lines):
        if 'pretest' in line.lower() or 'posttest' in line.lower():
            matches += 1
            if matches <= 50:
                print(f"Line {idx+1}: {line.strip()}")
    print(f"Total matches in {path}: {matches}")

search_file('src/routes/workspace.tsx')
search_file('src/routes/course.$courseId.tsx')
