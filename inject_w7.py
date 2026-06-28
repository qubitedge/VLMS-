import re

filepath = r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the theory: [ tag and insert the new markdown.

insertions = {
    'c-w7-1': """### 📏 The Tallest Student in Line!
Imagine a gym teacher trying to find the tallest student in a lineup. The teacher starts by pointing at the very first student and saying, "You are the tallest so far!" Then, the teacher walks down the line, comparing everyone to that student. Anytime the teacher finds someone even taller, they point to the new student instead. By the end of the line, the person being pointed to is guaranteed to be the tallest in the class (the Maximum)!

![Line of students](https://labviewwiki.org/w/images/2/28/Array_Max_and_Min_-_Terminals.png)

""",
    'c-w7-2': """### 🔑 The Lost Locker Key!
Oh no, you dropped your house key inside one of the school lockers, but you don't remember which one! Since you don't know where it is, you have to open Locker 1 and check. Not there? Open Locker 2 and check. Not there? Open Locker 3... You keep doing this one-by-one until you either find the key, or run out of lockers! This step-by-step checking is called a "Linear Search".

![Row of lockers](https://dsavisualizer.in/og/searching/linearSearch.png)

""",
    'c-w7-3': """### 🥞 Flipping the Pancake Stack!
Reversing an array is like flipping a whole stack of pancakes upside down! The pancake at the very top swaps places with the pancake at the very bottom. Then, the second pancake from the top swaps with the second from the bottom. You keep swapping the opposite ends until you meet right in the middle!

![Pancakes flipping](https://www.tutorialspoint.com/python/images/reverse_array_operation_python.jpg)

""",
    'c-w7-4': """### 🃏 Sorting a Trading Card Collection!
Imagine you buy a pack of Pokémon cards and get three Pikachus. When you put them in your special display binder, you only want to show *one* Pikachu card to keep your collection unique. You keep the first one, and throw the duplicates away! In an array, removing duplicates means shifting all the unique items to the front, and ignoring the repeats.

![Trading cards](https://www.devscall.com/_next/image?url=https:%2F%2Fcdn.sanity.io%2Fimages%2Fq5upm53j%2Fproduction%2F22798cd73f702208d7e73fe633f246852bcdbc9b-1381x407.png%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=75)

"""
}

for exp_id, new_md in insertions.items():
    # Only insert if not already present
    if "Tallest Student in Line" in content and exp_id == 'c-w7-1':
        print(f"Already injected {exp_id}")
        continue
    if "Lost Locker Key" in content and exp_id == 'c-w7-2':
        print(f"Already injected {exp_id}")
        continue
    if "Flipping the Pancake Stack" in content and exp_id == 'c-w7-3':
        print(f"Already injected {exp_id}")
        continue
    if "Sorting a Trading Card" in content and exp_id == 'c-w7-4':
        print(f"Already injected {exp_id}")
        continue

    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"Could not find {exp_id}")
        continue
        
    theory_idx = content.find('theory: [', idx)
    if theory_idx != -1:
        insert_pos = content.find('`', theory_idx) + 1
        content = content[:insert_pos] + "\n" + new_md + content[insert_pos:]
        print(f"Injected {exp_id}")
    else:
        print(f"Could not find theory array for {exp_id}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
