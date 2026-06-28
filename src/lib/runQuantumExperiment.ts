// runQuantumExperiment.ts
// Executes a quantum experiment code block inside Pyodide with the shim pre-injected.

export interface QuantumRunResult {
    stdout: string;
    plots: string[];
    error?: string;
  }
  
  /** Strip leading spaces/tabs that template-literal indentation adds to every line. */
  function dedent(src: string): string {
    const lines = src.split('\n');
    const minIndent = lines
      .filter(l => l.trim().length > 0)
      .reduce((min, l) => {
        const indent = l.match(/^(\s*)/)?.[1].length ?? 0;
        return Math.min(min, indent);
      }, Infinity);
  
    if (minIndent === 0 || minIndent === Infinity) return src;
    return lines.map(l => l.slice(minIndent)).join('\n');
  }
  
  export async function runQuantumExperiment(
    pyodide: any,
    shimSource: string,
    userCode: string
  ): Promise<QuantumRunResult> {
    let stdoutBuffer = '';
    let stderrBuffer = '';
  
    pyodide.setStdout({ batched: (s: string) => { stdoutBuffer += s + '\n'; } });
    pyodide.setStderr({ batched: (s: string) => { stderrBuffer += s + '\n'; } });
  
    // Ensure neither shimSource nor userCode carries accidental indentation
    const cleanShim = dedent(shimSource).trim();
    const cleanUser = dedent(userCode).trim();
  
    // Block 1: quantum shim (registers fake qiskit modules)
    const block1 = cleanShim;
  
    // Block 2: matplotlib patch — all lines at column 0
    const block2 = [
      'import matplotlib',
      "matplotlib.use('Agg')",
      'import matplotlib.pyplot as _plt',
      'import io, base64, json as _json, builtins, traceback',
      '_captured_figs = []',
      '',
      'def _patched_show(*args, **kwargs):',
      '    buf = io.BytesIO()',
      "    _plt.savefig(buf, format='png', bbox_inches='tight', dpi=130)",
      '    buf.seek(0)',
      "    _captured_figs.append(base64.b64encode(buf.read()).decode('utf-8'))",
      '    _plt.clf()',
      "    _plt.close('all')",
      '',
      '_plt.show = _patched_show',
      'import matplotlib.pyplot as plt',
      'plt.show = _patched_show',
    ].join('\n');
  
    // Block 3: run user code via exec (keeps user indentation self-contained)
    const userCodeJson = JSON.stringify(cleanUser);
    const block3 = [
      '_user_globals = {"__builtins__": builtins, "__name__": "__main__", "plt": _plt}',
      'try:',
      `    exec(${userCodeJson}, _user_globals)`,
      'except SystemExit:',
      '    pass',
      'except BaseException:',
      '    traceback.print_exc()',
      '',
      'print("__PLOTS__:" + _json.dumps(_captured_figs))',
    ].join('\n');
  
    // Join three blocks — all top-level, no wrapping indentation
    const runWrapper = [block1, block2, block3].join('\n\n');
  
    try {
      await pyodide.runPythonAsync(runWrapper);
    } catch (err: any) {
      return { stdout: '', plots: [], error: err.message ?? 'Unknown execution error' };
    }
  
    // Parse stdout — extract __PLOTS__ sentinel from real output
    const lines = stdoutBuffer.split('\n');
    const plotLine = lines.find(l => l.startsWith('__PLOTS__:'));
    const cleanLines = lines.filter(
      l =>
        !l.startsWith('__PLOTS__:') &&
        l.trim() !== '[Quantum shim loaded — Qiskit API emulated natively]'
    );
  
    const plots: string[] = [];
    if (plotLine) {
      try {
        const parsed = JSON.parse(plotLine.replace('__PLOTS__:', ''));
        if (Array.isArray(parsed)) plots.push(...parsed);
      } catch {
        // malformed sentinel — ignore
      }
    }
  
    const cleanStdout = cleanLines.join('\n').trim();
  
    if (stderrBuffer.trim()) {
      return { stdout: cleanStdout, plots, error: stderrBuffer.trim() };
    }
  
    return { stdout: cleanStdout, plots };
  }