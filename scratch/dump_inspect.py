with open('scratch/docx_extracted.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 1797 is index 1796
with open('scratch/temp_exp_inspect.txt', 'w', encoding='utf-8') as out:
    for idx in range(1796, 1842):
        if idx < len(lines):
            out.write(f"Line {idx+1}: {lines[idx]}")
