import re

filepath = r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'c-w4-1': 'https://image2.slideserve.com/4538776/expression-evaluation-l.jpg',
    'c-w4-3': 'https://tse2.mm.bing.net/th/id/OIP.oUvt9av481F2_trZMqqfcAAAAA?pid=Api&P=0&h=180',
    'c-w5-2': 'https://staticimg.amarujala.com/assets/images/2024/04/15/electric-bill-electricity-bill-new_2a609bc128bc3196169a37a0f9399406.jpeg',
    'c-w5-4': 'https://wikihow.com/images/1/10/Find-the-Minimum-and-Maximum-Points-Using-a-Graphing-Calculator-Step-7.jpg',
    'c-w5-5': 'https://dims.apnews.com/dims4/default/11ffb44/2147483647/strip/true/crop/4511x2537+0+235/resize/1440x810!/quality/90/?url=https:%2F%2Fassets.apnews.com%2Fd2%2F45%2F92bbfa6f4b44bee259b33411a5cb%2Ff7c5e5ee51eb4bffbf2ef57badc3f179'
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
