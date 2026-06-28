import re
import json

def check_integrity():
    with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    ids = ['llms-w1-2', 'llms-w1-3', 'llms-w1-4', 'llms-w1-5']
    
    # We can write a custom regex parser or evaluate the typescript code
    # Since we just want to count, let's write a simple python parser for each experiment block
    for exp_id in ids:
        print(f"\n--- Checking {exp_id} ---")
        pos = content.find(f'id: "{exp_id}"')
        if pos == -1:
            print("Not found!")
            continue
            
        # Find the content block
        end_pos = content.find('id: "llms-w', pos + 20)
        if end_pos == -1:
            end_pos = len(content)
        block = content[pos:end_pos]
        
        # Let's count occurrences of `{ question:` in pretest and posttest
        # We can find pretest: and posttest: sections
        pretest_match = re.search(r'pretest:\s*\[(.*?)\]', block, re.DOTALL)
        posttest_match = re.search(r'posttest:\s*\[(.*?)\]', block, re.DOTALL)
        
        if pretest_match:
            pre_str = pretest_match.group(1)
            pre_count = len(re.findall(r'question:', pre_str))
            print(f"Pretest count: {pre_count}")
        else:
            print("Pretest block not matched or missing!")
            
        if posttest_match:
            post_str = posttest_match.group(1)
            post_count = len(re.findall(r'question:', post_str))
            print(f"Posttest count: {post_count}")
        else:
            print("Posttest block not matched or missing!")

if __name__ == '__main__':
    check_integrity()
