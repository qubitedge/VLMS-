import re

filepath = r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'c-w2-2': 'https://media.whas11.com/assets/WHAS/images/59bf16b5-29d2-49f8-90ce-c7dad13475d5/59bf16b5-29d2-49f8-90ce-c7dad13475d5_1140x641.png',
    'c-w2-3': 'https://tse4.mm.bing.net/th/id/OIP.z19VFAmAL1ioO2-V-UUmIgHaDL?pid=Api&P=0&h=180',
    'c-w3-1': 'https://media.geeksforgeeks.org/wp-content/uploads/20231231153207/Square-Root-Symbol.png',
    'c-w3-2': 'https://sqy7rm.media.zestyio.com/Compound-Interest-Formula-Desktop.png',
    'c-w3-3': 'https://androidcure.com/wp-content/uploads/2021/06/Heron-Formula.jpg',
    'c-w3-4': 'https://forums.flightsimulator.com/uploads/default/original/4X/b/6/3/b63f37de919e547414b9a4bc348618c5730d2b8e.jpeg'
}

for exp_id, new_img in replacements.items():
    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"Could not find {exp_id}")
        continue
        
    # Find the first theory section after this experiment
    theory_idx = content.find('theory: [', idx)
    
    if theory_idx != -1 and theory_idx < content.find('id: "c-w', idx + 10):
        # We found the theory block for this experiment. 
        # Now find the first unsplash image or any image tag `![...](...)`
        # Let's use regex to find `![...](...)` inside this specific block
        block_end = content.find('pretest:', theory_idx)
        block = content[theory_idx:block_end]
        
        # Replace the first markdown image url
        new_block = re.sub(r'!\[([^\]]+)\]\([^)]+\)', f'![\\1]({new_img})', block, count=1)
        
        content = content[:theory_idx] + new_block + content[block_end:]
        print(f"Replaced image for {exp_id}")
    else:
        print(f"Could not find theory block for {exp_id}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
