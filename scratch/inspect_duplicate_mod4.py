with open('scratch/docx_extracted.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

mod4_first = lines[1933:2114] # 1934 is 1933 in 0-indexed list
mod4_second = lines[2116:]

print(f"First occurrence lines count: {len(mod4_first)}")
print(f"Second occurrence lines count: {len(mod4_second)}")

# Let's see if their content is identical
first_text = "".join(mod4_first).strip()
second_text = "".join(mod4_second).strip()

if first_text == second_text:
    print("The two sections of Module 4 are exactly identical!")
else:
    print("The two sections of Module 4 are DIFFERENT!")
    # Let's print the first few lines of each to see the difference
    print("\nFirst occurrence start:")
    for line in mod4_first[:5]:
        print(f"  {repr(line)}")
    print("\nSecond occurrence start:")
    for line in mod4_second[:5]:
        print(f"  {repr(line)}")
