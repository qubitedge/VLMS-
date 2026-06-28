import sys
import io
import builtins
import traceback
import json

def _run_wrapper():
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = stdout_capture
    sys.stderr = stderr_capture
    
    sys.stdin = io.StringIO("")
    
    def custom_input(prompt=""):
        if prompt:
            sys.stdout.write(prompt)
        line = sys.stdin.readline()
        if not line:
            raise EOFError("EOF when reading a line")
        return line.rstrip('\r\n')
    
    builtins.input = custom_input
    
    try:
        user_code = "print('Hello World')\nprint('Testing')"
        globals_dict = {"__builtins__": builtins}
        exec(user_code, globals_dict)
    except BaseException as e:
        traceback.print_exc(file=stderr_capture)
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        
    return json.dumps({
        "stdout": stdout_capture.getvalue(),
        "stderr": stderr_capture.getvalue()
    })

print(_run_wrapper())
