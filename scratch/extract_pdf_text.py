import pypdf

reader = pypdf.PdfReader('src/llm_vlab_syllabus.pdf')
print("Total pages:", len(reader.pages))

text = ""
for idx, page in enumerate(reader.pages):
    text += f"=== PAGE {idx + 1} ===\n"
    text += page.extract_text() or ""
    text += "\n\n"

with open('scratch/pdf_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print("Text extracted to scratch/pdf_text.txt")
