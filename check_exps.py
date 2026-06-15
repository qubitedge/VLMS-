import re

with open(r"c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

start = content.find('"c-programming":')
end = content.find('"dbms":', start)
if end == -1: end = len(content)
c_content = content[start:end]

exp_pattern = re.compile(r'id:\s*"c-w(\d+)-(\d+)",\s*title:\s*"(.*?)".*?theory:\s*\[(.*?)\]', re.DOTALL)
experiments = exp_pattern.findall(c_content)

total = 0
for week, exp_num, title, theory in experiments:
    total += 1
    # Check for emojis or specific kid-friendly strings
    if re.search(r'[🎉🚂🏠📬💡🔺🧅👶📏💭🔢🎲🧠]', theory):
        print(f"Exp {total}: Week {week} - {title} -> HAS KID FRIENDLY")
    else:
        print(f"Exp {total}: Week {week} - {title} -> MISSING")
