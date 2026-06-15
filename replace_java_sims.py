import re

def update_simulations():
    with open(r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\java-data.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    ids_to_replace = ["java-e5-1", "java-e5-2", "java-e5-3", "java-e6-1", "java-e6-2", "java-e6-3", "java-e6-4"]
    
    for exp_id in ids_to_replace:
        idx = content.find(f'id: "{exp_id}"')
        if idx == -1:
            print(f"Could not find {exp_id}")
            continue
            
        sim_start = content.find('simulation: {', idx)
        if sim_start == -1:
            sim_str_start = content.find('simulation: "', idx)
            if sim_str_start != -1 and sim_str_start < content.find('posttest:', idx):
                continue
            else:
                print(f"Could not find simulation block for {exp_id}")
                continue
                
        brace_count = 0
        in_string = False
        escape = False
        sim_end = -1
        
        start_brace = content.find('{', sim_start)
        
        for i in range(start_brace, len(content)):
            char = content[i]
            
            if in_string:
                if escape:
                    escape = False
                elif char == '\\':
                    escape = True
                elif char == '"':
                    in_string = False
            else:
                if char == '"':
                    in_string = True
                elif char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        sim_end = i + 1
                        break
        
        if sim_end != -1:
            replacement = f'simulation: "{exp_id}"'
            content = content[:sim_start] + replacement + content[sim_end:]
            print(f"Replaced simulation for {exp_id}")

    with open(r'c:\Users\Likhith Kumar\Downloads\virtuallab2332\src\lib\java-data.ts', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_simulations()
