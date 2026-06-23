with open('scratch/docx_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

print("Is 'MODULE 1' in the extracted text?", 'MODULE 1' in text)
print("Is 'Tokenization' in the extracted text?", 'Tokenization' in text)
print("Is 'BPE' in the extracted text?", 'BPE' in text)
