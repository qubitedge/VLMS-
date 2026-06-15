import re

filepath = r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

insertions = {
    'c-w8-3': """### 🫧 Bubbles Rising in a Soda!
When you pour a glass of soda, the biggest, heaviest bubbles always float to the top first. That's exactly how Bubble Sort works! We compare two numbers side-by-side. If the left one is heavier (larger), they swap places. The heavy numbers slowly \\"bubble\\" their way to the far right end of the array, one by one, until everyone is standing in the perfect order!

![Bubble sort visualization](https://favtutor.com/resources/images/uploads/mceu_61632030011682402256084.png)""",

    'c-w8-4': """### 🚂 Connecting the Train Cars!
In C, a word (String) is just a train made out of individual letter boxcars. The very last car is always a special marker called the Null Terminator (`\\0`). When we \\"concatenate\\" two strings, it's like unhooking the caboose of the first train, and hooking the entire second train onto the back to create one giant mega-train!

![String concatenation](https://media.geeksforgeeks.org/wp-content/uploads/20230915112055/StringConcatenation-(1)-(1).png)""",

    'c-w8-5': """### 🪟 Reading Backwards through Glass!
Reversing a string is exactly like reversing an array of numbers. You swap the first letter with the very last letter, the second letter with the second-to-last, and keep squeezing inwards until you meet in the middle. The only trick? You have to make sure you don't accidentally move the `\\0` end-of-train marker, otherwise the computer won't know where the word stops!

![Reverse string](https://storage.googleapis.com/algodailyrandomassets/curriculum/easy-strings/reverse-a-string.jpg)"""
}

for exp_id, md in insertions.items():
    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"Could not find {exp_id}")
        continue
        
    theory_idx = content.find('theory: [', idx)
    if theory_idx != -1:
        insert_pos = theory_idx + len('theory: [')
        
        md_safe = md.replace('`', "'")
        
        inject_str = f"""
                {{
                  title: "Kid-Friendly Addition",
                  body: [`{md_safe}`]
                }},"""
                
        content = content[:insert_pos] + inject_str + content[insert_pos:]
        print(f"Injected {exp_id}")
    else:
        print(f"Could not find theory array for {exp_id}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
