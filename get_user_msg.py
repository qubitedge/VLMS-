import json
path = r"C:\Users\Likhith Kumar\.gemini\antigravity-ide\brain\571dd11e-3d5c-4f97-9324-e98a40d5918b\.system_generated\logs\transcript.jsonl"
msgs = []
with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        if '"type":"USER_INPUT"' in line:
            msgs.append(json.loads(line))

last_msg = msgs[-1]['content']
with open('temp_user_msg.txt', 'w', encoding='utf-8') as f:
    f.write(last_msg)
