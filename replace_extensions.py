import os

# Set of extensions to replace
TARGET_EXTS = {".png", ".jpg", ".jpeg"}

# Folders and files to scan
TARGET_DIRS = ["src"]
TARGET_FILES = [f for f in os.listdir(".") if f.endswith(".cjs") or f.endswith(".ts") or f.endswith(".json")]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for ext in TARGET_EXTS:
            new_content = new_content.replace(ext, ".webp")
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Failed to process {filepath}: {e}")

def main():
    for f in TARGET_FILES:
        if os.path.isfile(f):
            replace_in_file(f)
            
    for d in TARGET_DIRS:
        if os.path.isdir(d):
            for root, _, files in os.walk(d):
                for file in files:
                    # we want to modify .ts, .tsx, .json, .css, .md, .cjs, .js etc.
                    # actually just scan everything that looks like text
                    if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.cjs', '.css', '.html', '.md', '.json')):
                        replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
