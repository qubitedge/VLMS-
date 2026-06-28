"""
Batch WebP Converter
--------------------
Scans C:\\Users\\Likhith Kumar\\Downloads\\virtuallab2332\\public
Converts only JPG and PNG files (skips folders, SVG, JSON, etc.)
Saves WebP files into a new folder: public\\webp_out

Usage:
  pip install Pillow
  python convert_to_webp.py
"""

from PIL import Image
import os

# ── SETTINGS ──────────────────────────────────────────────
INPUT_FOLDER  = r"C:\Users\Likhith Kumar\Downloads\virtuallab2332\public"
OUTPUT_FOLDER = r"C:\Users\Likhith Kumar\Downloads\virtuallab2332\public\webp_out"
QUALITY       = 85    # 1–100
SCALE         = 100   # 100 = original size
ALLOWED_EXTS  = {".jpg", ".jpeg", ".png"}
# ──────────────────────────────────────────────────────────

def convert():
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    # Only pick files (not folders) with allowed extensions directly in INPUT_FOLDER
    all_entries = os.listdir(INPUT_FOLDER)
    files = [
        f for f in all_entries
        if os.path.isfile(os.path.join(INPUT_FOLDER, f))
        and os.path.splitext(f)[1].lower() in ALLOWED_EXTS
    ]

    skipped = [
        f for f in all_entries
        if os.path.isfile(os.path.join(INPUT_FOLDER, f))
        and os.path.splitext(f)[1].lower() not in ALLOWED_EXTS
    ]
    folders = [
        f for f in all_entries
        if os.path.isdir(os.path.join(INPUT_FOLDER, f))
    ]

    print(f"📁 Scanning: {INPUT_FOLDER}")
    print(f"   → {len(files)} JPG/PNG to convert")
    print(f"   → {len(skipped)} other files skipped (SVG, JSON, etc.)")
    print(f"   → {len(folders)} folder(s) skipped")
    print()

    done, failed = 0, 0
    total_orig, total_new = 0, 0

    for fname in sorted(files):
        src = os.path.join(INPUT_FOLDER, fname)
        out_name = os.path.splitext(fname)[0] + ".webp"
        dst = os.path.join(OUTPUT_FOLDER, out_name)

        try:
            orig_size = os.path.getsize(src)
            with Image.open(src) as img:
                mode = "RGBA" if img.mode in ("RGBA", "P", "LA") else "RGB"
                img = img.convert(mode)
                if SCALE != 100:
                    w = int(img.width * SCALE / 100)
                    h = int(img.height * SCALE / 100)
                    img = img.resize((w, h), Image.LANCZOS)
                img.save(dst, "WEBP", quality=QUALITY, method=6)

            new_size = os.path.getsize(dst)
            saved = round((1 - new_size / orig_size) * 100)
            total_orig += orig_size
            total_new  += new_size
            done += 1
            print(f"  ✓  {fname}  →  {out_name}   (-{saved}%)")

        except Exception as e:
            failed += 1
            print(f"  ✗  {fname}  →  ERROR: {e}")

    print()
    print("─" * 55)
    print(f"  Converted : {done}")
    print(f"  Failed    : {failed}")
    print(f"  Skipped   : {len(skipped)} files + {len(folders)} folder(s)")
    if done > 0:
        avg = round((1 - total_new / total_orig) * 100)
        before = round(total_orig / 1024 / 1024, 1)
        after  = round(total_new  / 1024 / 1024, 1)
        print(f"  Size      : {before} MB  →  {after} MB  (avg -{avg}%)")
    print(f"\n  ✅ WebP files saved to:\n     {OUTPUT_FOLDER}")

if __name__ == "__main__":
    convert()