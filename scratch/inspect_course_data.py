with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

import re
matches = re.findall(r'id:\s*"(llms-w\d+-\d+)"', content)
print("Found LLM experiment IDs:")
print(matches)
