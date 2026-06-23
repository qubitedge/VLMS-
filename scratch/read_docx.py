import zipfile
import xml.etree.ElementTree as ET

def extract_docx_text(docx_path):
    # XML namespace mapping
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    paragraphs = []
    with zipfile.ZipFile(docx_path) as docx:
        # Read the main document XML
        xml_content = docx.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        # Find all paragraph elements
        for p in root.findall('.//w:p', namespaces):
            # For each paragraph, extract text from all run text elements
            p_text = []
            for t in p.findall('.//w:t', namespaces):
                if t.text:
                    p_text.append(t.text)
            paragraphs.append("".join(p_text))
            
    return "\n".join(paragraphs)

if __name__ == '__main__':
    text = extract_docx_text('src/Untitled document.docx')
    with open('scratch/docx_extracted.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"Extracted docx text: {len(text)} characters.")
