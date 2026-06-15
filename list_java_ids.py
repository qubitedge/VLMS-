import json

with open(r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\java-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

import re
matches = re.findall(r'id:\s*"java-e([5-9]-\d+)"', content)
print(matches)
