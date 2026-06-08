import sys, io, builtins
stdout_capture = io.StringIO()
old_stdout = sys.stdout
sys.stdout = stdout_capture

globals_dict = {"__builtins__": builtins}
exec("print('hello')", globals_dict)

sys.stdout = old_stdout
print(f"Captured: {stdout_capture.getvalue()}")
