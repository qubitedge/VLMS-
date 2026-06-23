import pypdf

reader = pypdf.PdfReader('src/ai_tools_lab_syllabus.pdf')
print("Total pages:", len(reader.pages))

text = ""
for idx, page in enumerate(reader.pages):
    text += f"=== PAGE {idx + 1} ===\n"
    text += page.extract_text() or ""
    text += "\n\n"

with open('scratch/ai_tools_pdf_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)

print("Text extracted to scratch/ai_tools_pdf_text.txt")
