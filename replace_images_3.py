import re

filepath = r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'c-w6-1': 'https://d14qv6cm1t62pm.cloudfront.net/ccbp-website/Blogs/home/factorial-program-in-c-image-2.png',
    'c-w6-2': 'https://i.ytimg.com/vi/_kh9uX5MCOo/maxresdefault.jpg',
    'c-w6-4': 'https://ica.edu.np/uploads/blog_image/original/78811.png',
    'c-w6-5': 'https://static.scientificamerican.com/dam/m/5a010cba8055f33f/original/oddPyramid_graphic_d1_TEXT.png?m=1721669879.477&w=900',
    'c-w7-1': 'https://labviewwiki.org/w/images/2/28/Array_Max_and_Min_-_Terminals.png',
    'c-w7-2': 'https://dsavisualizer.in/og/searching/linearSearch.png',
    'c-w7-3': 'https://www.tutorialspoint.com/python/images/reverse_array_operation_python.jpg',
    'c-w7-4': 'https://www.devscall.com/_next/image?url=https:%2F%2Fcdn.sanity.io%2Fimages%2Fq5upm53j%2Fproduction%2F22798cd73f702208d7e73fe633f246852bcdbc9b-1381x407.png%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=75'
}

for exp_id, new_img in replacements.items():
    idx = content.find(f'id: "{exp_id}"')
    if idx == -1:
        print(f"Could not find {exp_id}")
        continue
        
    theory_idx = content.find('theory: [', idx)
    
    if theory_idx != -1 and theory_idx < content.find('id: "c-w', idx + 10):
        block_end = content.find('pretest:', theory_idx)
        block = content[theory_idx:block_end]
        
        # Replace the first markdown image url
        new_block = re.sub(r'!\[([^\]]+)\]\([^)]+\)', f'![\\1]({new_img})', block, count=1)
        
        if new_block != block:
            content = content[:theory_idx] + new_block + content[block_end:]
            print(f"Replaced image for {exp_id}")
        else:
            print(f"Could not find image to replace in {exp_id}")
    else:
        print(f"Could not find theory block for {exp_id}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
