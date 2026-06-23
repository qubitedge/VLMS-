def search_file(path, start_line, end_line):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for idx in range(start_line - 1, min(end_line, len(lines))):
        print(f"Line {idx+1}: {lines[idx]}", end="")

search_file('src/routes/workspace.tsx', 2600, 2730)
