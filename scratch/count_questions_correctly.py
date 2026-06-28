def extract_bracket_content(text, start_pos):
    idx = text.find('[', start_pos)
    if idx == -1: return None, -1
    
    bracket_count = 1
    i = idx + 1
    while i < len(text):
        if text[i] == '[':
            bracket_count += 1
        elif text[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                return text[idx:i+1], i+1
        i += 1
    return None, -1

def count_questions():
    with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    ids = ['llms-w1-2', 'llms-w1-3', 'llms-w1-4', 'llms-w1-5', 
           'llms-w2-1', 'llms-w2-2', 'llms-w2-3', 'llms-w2-4',
           'llms-w3-1', 'llms-w3-2', 'llms-w3-3',
           'llms-w4-1', 'llms-w4-2', 'llms-w4-3', 'llms-w4-4']
    
    for exp_id in ids:
        print(f"\n--- {exp_id} ---")
        pos = content.find(f'id: "{exp_id}"')
        if pos == -1:
            print("Not found!")
            continue
            
        pre_pos = content.find('pretest:', pos)
        if pre_pos != -1:
            pre_arr, next_pos = extract_bracket_content(content, pre_pos)
            if pre_arr:
                pre_count = pre_arr.count('question:')
                print(f"Pretest count: {pre_count}")
            else:
                print("Pretest array not closed or invalid!")
        else:
            print("Pretest key not found!")
            
        post_pos = content.find('posttest:', pos)
        if post_pos != -1:
            post_arr, next_pos = extract_bracket_content(content, post_pos)
            if post_arr:
                post_count = post_arr.count('question:')
                print(f"Posttest count: {post_count}")
            else:
                print("Posttest array not closed or invalid!")
        else:
            print("Posttest key not found!")

if __name__ == '__main__':
    count_questions()
