import re

def verify_patterns():
    with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    ids = [
        'llms-w2-1', 'llms-w2-2', 'llms-w2-3', 'llms-w2-4',
        'llms-w3-1', 'llms-w3-2', 'llms-w3-3',
        'llms-w4-1', 'llms-w4-2', 'llms-w4-3', 'llms-w4-4'
    ]
    
    for exp_id in ids:
        block_pattern = rf'(id:\s*"{exp_id}".*?pretest:\s*)\[.*?\](.*?posttest:\s*)\[.*?\]'
        match = re.search(block_pattern, content, flags=re.DOTALL)
        if match:
            print(f"Match success for {exp_id}!")
        else:
            print(f"Match FAILED for {exp_id}!")

if __name__ == '__main__':
    verify_patterns()
