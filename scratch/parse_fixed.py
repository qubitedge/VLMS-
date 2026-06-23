import re
import json

headers_to_remove = [
    "PART 1: Building a Chatbot (1–50)",
    "PART 2: AI-Based Text Summarization (56–100)",
    "PART 3: Document Question Answering (101–150)",
    "PART 2: Semantic Search (51–100)",
    "Part 1: Creating Embeddings (1–50)",
    "Set 1: Core Architecture & Components",
    "Set 2: Intent, Triggers, & Integrations",
    "Set 3: Practical Mechanics & Multi-Turn Conversations",
    "Set 1: Summarization Approaches & Paradigms",
    "Set 2: Prompts, Constraints, & Workflows",
    "Set 1: High-Level Concepts & Tools",
    "Set 2: Practical Implementation",
    "Set 3: Design Patterns & Metrics",
    "Set 4: Text Processing Boundaries",
    "Set 5: Model Capabilities",
    "Set 6: Evaluations & Implementations",
    "Set 7: Real-world Trade-offs",
    "Set 1: Core Concepts & Comparisons",
    "Set 2: Indices & Algorithms",
    "Set 3: Practical Performance & Scaling",
    "Set 4: Use Cases & Frameworks",
    "Set 5: Troubleshooting & Real-World Friction",
    "Set 6: System Integration Queries",
    "Set 1: Data Processing, Reading Orders, & Parsers"
]

def clean_text_headers(text):
    for h in headers_to_remove:
        text = text.replace(h, "")
    return text.strip()

def parse_raw_file(file_path, ans_keys):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()
    
    text = clean_text_headers(text)
    
    # Split by 'a)'
    parts = re.split(r'(a\))', text)
    
    parsed = []
    current_text = parts[0]
    for i in range(1, len(parts), 2):
        rest = parts[i+1]
        
        b_split = re.split(r'(b\))', rest, maxsplit=1)
        opt_a = b_split[0]
        rest = b_split[2] if len(b_split) > 2 else ""
        
        c_split = re.split(r'(c\))', rest, maxsplit=1)
        if len(c_split) > 2:
            opt_b = c_split[0]
            rest = c_split[2]
            
            d_split = re.split(r'(d\))', rest, maxsplit=1)
            if len(d_split) > 2:
                opt_c = d_split[0]
                rest = d_split[2]
                
                # Now 'rest' contains option d and the next question
                match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
                if match:
                    idx = match.start() + 1
                    opt_d = rest[:idx]
                    next_q = rest[idx:]
                else:
                    opt_d = rest
                    next_q = ""
                options = [opt_a, opt_b, opt_c, opt_d]
            else:
                opt_c = ""
                match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
                if match:
                    idx = match.start() + 1
                    opt_c = rest[:idx]
                    next_q = rest[idx:]
                else:
                    opt_c = rest
                    next_q = ""
                options = [opt_a, opt_b, opt_c]
        else:
            opt_b_full = rest
            match = re.search(r'([a-z\)\.0-9])([A-Z])', rest)
            if match:
                idx = match.start() + 1
                opt_b = rest[:idx]
                next_q = rest[idx:]
            else:
                opt_b = rest
                next_q = ""
            options = [opt_a, opt_b]
            
        parsed.append({
            "question": clean_text_headers(current_text),
            "options": [clean_text_headers(o) for o in options if o.strip()]
        })
        current_text = next_q

    # Parse answer key
    mapping = {'a': 0, 'b': 1, 'c': 2, 'd': 3}
    answers = {}
    for key_str in ans_keys:
        pairs = key_str.replace('.', '').split(',')
        for p in pairs:
            p = p.strip()
            if not p: continue
            num, letter = p.split(':')
            answers[int(num)] = mapping[letter.strip().lower()]
            
    for i, q in enumerate(parsed):
        q['answerIndex'] = answers.get(i + 1, 0)
        
    return parsed

# Parse Mod 3
ans_key3_1 = "1:b, 2:b, 3:b, 4:b, 5:b, 6:b, 7:b, 8:b, 9:b, 10:a, 11:b, 12:a, 13:b, 14:b, 15:b, 16:a, 17:b, 18:b, 19:b, 20:b, 21:b, 22:b, 23:b, 24:b, 25:b."
ans_key3_2 = "26:a, 27:b, 28:b, 29:b, 30:b, 31:a, 32:b, 33:b, 34:c, 35:b, 36:a, 37:b, 38:b, 39:b, 40:b."
ans_key3_3 = "41:b, 42:b, 43:b, 44:b, 45:b, 46:a, 47:b, 48:b, 49:b, 50:b."
mod3_parsed = parse_raw_file("scratch/mod3_raw.txt", [ans_key3_1, ans_key3_2, ans_key3_3])

print(f"Mod 3 parsed total: {len(mod3_parsed)}")
with open("scratch/mod3_parsed.json", "w", encoding="utf-8") as f:
    json.dump(mod3_parsed, f, indent=2)

# Parse Mod 4
ans_key4_1 = "1:b, 2:a, 3:b, 4:b, 5:b, 6:a, 7:b, 8:b, 9:a, 10:b, 11:b, 12:b, 13:b, 14:a, 15:b, 16:b, 17:b, 18:b, 19:b, 20:b, 21:b, 22:c, 23:a, 24:b, 25:b, 26:b, 27:b, 28:a, 29:b, 30:b, 31:b, 32:b, 33:a, 34:b, 35:b, 36:b, 37:b, 38:b, 39:b, 40:a, 41:b, 42:a, 43:b, 44:b, 45:b, 46:b, 47:a, 48:a, 49:b, 50:b."
ans_key4_2 = "51:b, 52:b, 53:b, 54:a, 55:b, 56:b, 57:b, 58:b, 59:b, 60:b, 61:b, 62:b, 63:a, 64:a, 65:b, 66:b, 67:b, 68:b, 69:a, 70:b, 71:b, 72:a, 73:b, 74:b, 75:b, 76:b, 77:b, 78:a, 79:b, 80:b, 81:b, 82:b, 83:b, 84:b, 85:b, 86:b, 87:a, 88:b, 89:a, 90:b, 91:b, 92:b, 93:b, 94:b, 95:b, 96:b, 97:b, 98:b, 99:b, 100:b."
mod4_parsed = parse_raw_file("scratch/mod4_raw.txt", [ans_key4_1, ans_key4_2])

print(f"Mod 4 parsed total: {len(mod4_parsed)}")
with open("scratch/mod4_parsed.json", "w", encoding="utf-8") as f:
    json.dump(mod4_parsed, f, indent=2)
