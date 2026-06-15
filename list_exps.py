import re

with open(r"c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\course-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Find the c-programming block
start = content.find('"c-programming":')
end = content.find('"dbms":', start) # just a guess for next course, or we can just search for "c-w"
if end == -1: end = len(content)

c_content = content[start:end]

# Find all experiments in c_content
exp_pattern = re.compile(r'id:\s*"c-w(\d+)-(\d+)",\s*title:\s*"(.*?)"', re.DOTALL)
experiments = exp_pattern.findall(c_content)

total = 0
for week, exp_num, title in experiments:
    total += 1
    # Check if this experiment has kid-friendly emojis like 🚂 🏠 📬 🎉 🏆 etc in its theory.
    # To be precise, let's just print the list of all experiments.
    print(f"Exp {total}: Week {week} - {title}")
