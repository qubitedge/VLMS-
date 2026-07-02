import re
import sys

file_path = 'src/lib/math-c3-data.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

image_map = {
    'binary_switch.webp': 'math_number_systems.webp',
    'von_neumann_architecture.webp': 'von_neumann_architecture.webp',
    'cpu_structure.webp': 'cpu_internal_architecture.webp',
    'memory_hierarchy.webp': 'memory_hierarchy_pyramid.webp',
    'instruction_cycle.webp': 'math_instruction_cycle.webp',
    'microprocessor_architecture.webp': 'cpu_internal_architecture.webp',
    'memory_hierarchy_layers.webp': 'memory_hierarchy_pyramid.webp',
    'logic_gates.webp': 'logic_gates_symbols.webp',
    'karnaugh_map.webp': 'karnaugh_map_example.webp',
    'adder_circuit.webp': 'math_full_adder.webp'
}

lines = content.split('\n')
new_lines = []
for i, line in enumerate(lines):
    match = re.search(r'"!\[(.*?)\]\((.*?)\)"', line)
    if match:
        filename = match.group(2).split('/')[-1]
        if filename in image_map:
            new_url = '/' + image_map[filename]
            new_line = line.replace(match.group(2), new_url)
            new_lines.append(new_line)
        else:
            # Skip this line entirely since it's just a missing image
            # Wait, if we just drop this line, it might leave a syntax error if the PREVIOUS line had no comma, but it's an array so previous line usually has a comma.
            # But what if the NEXT line has no comma? Wait, in JS/TS trailing commas are fine.
            # Let's check if there's a comma at the end of the line we're deleting. If so, we can just delete it.
            # But what if it's the LAST element? Then the previous element has a comma, which is fine in TS.
            pass
    else:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print('Done!')
