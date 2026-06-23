with open('src/lib/course-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id in ['llms-w1-2', 'llms-w1-3', 'llms-w1-4', 'llms-w1-5']:
    print(f"\n--- Checking {exp_id} ---")
    pos = content.find(exp_id)
    if pos != -1:
        # Search in the next 15000 characters
        search_area = content[pos:pos+15000]
        # Find next occurrence of "pretest:" and "posttest:"
        pretest_idx = search_area.find("pretest:")
        posttest_idx = search_area.find("posttest:")
        print("Pretest found index in search area:", pretest_idx)
        print("Posttest found index in search area:", posttest_idx)
        if pretest_idx != -1:
            print("Pretest snippet:", search_area[pretest_idx:pretest_idx+200])
        if posttest_idx != -1:
            print("Posttest snippet:", search_area[posttest_idx:posttest_idx+200])
