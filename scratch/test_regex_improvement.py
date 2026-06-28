import re

single_line_re = re.compile(
    r'^(.+?)\s+A\)\s+(.+?)\s+B\)\s+(.+?)\s+C\)\s+(.+?)\s+D\)\s+(.+?)\s+Answer:\s*([A-D])',
    re.IGNORECASE
)

test_str = 'What is "document question answering" (Document QA)? A) Using a model to answer questions based on the content of a given document B) Translating a document into another language C) Deleting irrelevant parts of a document D) Converting a document into an image Answer: A'

match = single_line_re.match(test_str)
if match:
    print("Match found!")
    print("Q:", match.group(1))
    print("A:", match.group(2))
    print("B:", match.group(3))
    print("C:", match.group(4))
    print("D:", match.group(5))
    print("Ans:", match.group(6))
else:
    print("No match!")
