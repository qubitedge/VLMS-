with open('scratch/docx_extracted.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print("--- Module 3 Start and Surrounding Lines ---")
for i in range(1790, 1950):
    if i < len(lines):
        print(f"Line {i+1}: {repr(lines[i])}")
