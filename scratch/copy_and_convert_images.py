import os
import glob
import shutil

artifact_dir = r"C:\Users\gjsjn\.gemini\antigravity-ide\brain\4cfc53ac-ec49-4a5c-9a78-a3cdcaa2287f"
public_dir = r"c:\Users\gjsjn\Downloads\virtuallab2332\public"
fallback_src = os.path.join(public_dir, "in ai tools.webp")

print("Checking for generated images in:", artifact_dir)

# We will look for aitools_exp1 through aitools_exp20
for i in range(1, 21):
    dest_path = os.path.join(public_dir, f"aitools_exp{i}.webp")
    
    if i > 17:
        # Fallback for the remaining 3 due to quota limits
        print(f"Using fallback for aitools_exp{i} -> {dest_path}")
        shutil.copy2(fallback_src, dest_path)
        continue
        
    pattern = os.path.join(artifact_dir, f"aitools_exp{i}_*.png")
    matches = glob.glob(pattern)
    
    if matches:
        # Find the latest generated file
        latest_file = max(matches, key=os.path.getmtime)
        print(f"Copying {latest_file} -> {dest_path}")
        
        # We try to use PIL to convert if available, otherwise simple copy
        try:
            from PIL import Image
            with Image.open(latest_file) as img:
                img.save(dest_path, "WEBP")
            print(f"  Successfully converted to WEBP via PIL!")
        except Exception as e:
            print(f"  PIL conversion failed or not installed ({e}). Doing direct file copy...")
            shutil.copy2(latest_file, dest_path)
    else:
        print(f"WARNING: No generated image found for aitools_exp{i}! Using fallback...")
        shutil.copy2(fallback_src, dest_path)

print("Image processing complete!")
