# quantumShim.py — injected into Pyodide before every quantum experiment run
# Emulates: qiskit.QuantumCircuit, qiskit_aer.Aer, qiskit.quantum_info.Statevector
# Does NOT require qiskit installed — runs entirely in pure Python + numpy

import numpy as np
import random
import json

# ── Statevector ──────────────────────────────────────────────────────────────
class Statevector:
    def __init__(self, data):
        self.data = np.array(data, dtype=complex)

    def __repr__(self):
        return f"Statevector({np.round(self.data, 3)})"

    @staticmethod
    def from_instruction(qc):
        return qc._simulate_statevector()

# ── Gates as 2×2 unitary matrices ───────────────────────────────────────────
_H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
_X = np.array([[0, 1], [1, 0]], dtype=complex)
_Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
_Z = np.array([[1, 0], [0, -1]], dtype=complex)
_I = np.eye(2, dtype=complex)

def _tensor_gate(gate, target, n):
    """Expand a single-qubit gate to n-qubit space via tensor product."""
    ops = [_I] * n
    ops[target] = gate
    result = ops[0]
    for op in ops[1:]:
        result = np.kron(result, op)
    return result

def _cnot_matrix(control, target, n):
    """
    Build a CNOT unitary for an n-qubit system.
    Qiskit convention: qubit 0 is the LEAST significant bit.
    """
    dim = 2 ** n
    mat = np.zeros((dim, dim), dtype=complex)
    for i in range(dim):
        # bits[0] = most significant, bits[n-1] = least significant (qubit 0)
        bits = list(format(i, f'0{n}b'))
        control_bit = bits[n - 1 - control]
        if control_bit == '1':
            # Flip the target bit
            bits[n - 1 - target] = '1' if bits[n - 1 - target] == '0' else '0'
            j = int(''.join(bits), 2)
            mat[j, i] = 1
        else:
            mat[i, i] = 1
    return mat

def _cz_matrix(control, target, n):
    """Build a CZ unitary for an n-qubit system."""
    dim = 2 ** n
    mat = np.eye(dim, dtype=complex)
    for i in range(dim):
        bits = format(i, f'0{n}b')
        if bits[n - 1 - control] == '1' and bits[n - 1 - target] == '1':
            mat[i, i] = -1
    return mat

# ── QuantumCircuit ───────────────────────────────────────────────────────────
class QuantumCircuit:
    def __init__(self, num_qubits, num_classical=None):
        self.num_qubits = num_qubits
        self.num_classical = num_classical if num_classical is not None else num_qubits
        self._ops = []           # list of unitary matrices
        self._measurements = {}  # qubit_idx -> classical_bit_idx
        self._initial_state = None

    @property
    def qubits(self):
        return list(range(self.num_qubits))

    def _add_single(self, gate, qubit):
        self._ops.append(_tensor_gate(gate, qubit, self.num_qubits))

    def h(self, qubit):  self._add_single(_H, qubit)
    def x(self, qubit):  self._add_single(_X, qubit)
    def y(self, qubit):  self._add_single(_Y, qubit)
    def z(self, qubit):  self._add_single(_Z, qubit)
    def barrier(self, *args): pass  # no-op

    def cx(self, control, target):
        self._ops.append(_cnot_matrix(control, target, self.num_qubits))

    def cz(self, control, target):
        self._ops.append(_cz_matrix(control, target, self.num_qubits))

    def measure(self, qubits, cbits):
        if isinstance(qubits, int):
            qubits = [qubits]
        if isinstance(cbits, int):
            cbits = [cbits]
        for q, c in zip(qubits, cbits):
            self._measurements[q] = c

    def initialize(self, state_str, qubits):
        """Initialize qubits from a bitstring like '101' (Qiskit ordering)."""
        if isinstance(state_str, str):
            dim = 2 ** self.num_qubits
            sv = np.zeros(dim, dtype=complex)
            # Qiskit: rightmost character = qubit 0 = least significant bit
            idx = int(state_str[::-1], 2)
            sv[idx] = 1.0
            self._initial_state = sv

    def draw(self, output='text'):
        """Return a plain-text summary of the circuit."""
        lines = [f"QuantumCircuit({self.num_qubits}q, {self.num_classical}c)"]
        lines.append(f"  Operations : {len(self._ops)}")
        lines.append(f"  Measurements: {len(self._measurements)}")
        return "\n".join(lines)

    def _get_initial_sv(self):
        if self._initial_state is not None:
            return self._initial_state.copy()
        sv = np.zeros(2 ** self.num_qubits, dtype=complex)
        sv[0] = 1.0
        return sv

    def _simulate_statevector(self):
        sv = self._get_initial_sv()
        for op in self._ops:
            sv = op @ sv
        return Statevector(sv)

    def _simulate_shots(self, shots):
        sv = self._get_initial_sv()
        for op in self._ops:
            sv = op @ sv

        probs = np.abs(sv) ** 2
        probs = np.real(probs)
        probs = np.clip(probs, 0, None)
        total = probs.sum()
        if total > 0:
            probs /= total  # renormalize to correct floating-point drift

        n = self.num_qubits
        outcomes = np.random.choice(len(probs), size=shots, p=probs)
        counts = {}
        for outcome in outcomes:
            # bits[0] = MSB, bits[n-1] = qubit 0 (LSB in Qiskit convention)
            bits = format(outcome, f'0{n}b')
            if self._measurements:
                cbits = ['0'] * self.num_classical
                for q, c in self._measurements.items():
                    # Classical register: index 0 = leftmost displayed bit
                    cbits[self.num_classical - 1 - c] = bits[n - 1 - q]
                key = ''.join(cbits)
            else:
                key = bits
            counts[key] = counts.get(key, 0) + 1
        return counts

# ── Result / Job wrappers ────────────────────────────────────────────────────
class _Result:
    def __init__(self, counts=None, sv=None):
        self._counts = counts
        self._sv = sv

    def get_counts(self, circuit=None):
        return self._counts

    def get_statevector(self, circuit=None):
        return self._sv

class _Job:
    def __init__(self, result):
        self._result = result

    def result(self):
        return self._result

# ── Backends ─────────────────────────────────────────────────────────────────
class _QasmBackend:
    def run(self, circuit, shots=1024):
        counts = circuit._simulate_shots(shots)
        return _Job(_Result(counts=counts))

class _StatevectorBackend:
    def run(self, circuit):
        sv = circuit._simulate_statevector()
        return _Job(_Result(sv=sv))

class Aer:
    @staticmethod
    def get_backend(name):
        if 'statevector' in name:
            return _StatevectorBackend()
        return _QasmBackend()

# ── transpile (no-op passthrough) ────────────────────────────────────────────
def transpile(circuit, backend):
    return circuit

# ── Bloch Sphere renderer ────────────────────────────────────────────────────
def _draw_bloch_sphere(vec, title=''):
    """
    Render a Bloch sphere using matplotlib (Agg backend).
    vec: [x, y, z] coordinates on the unit sphere.
    The figure is captured by the patched plt.show() in runQuantumExperiment.
    """
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 — registers 3D projection

    fig = plt.figure(figsize=(5, 5))
    ax = fig.add_subplot(111, projection='3d')

    # Wireframe sphere
    u = np.linspace(0, 2 * np.pi, 40)
    v = np.linspace(0, np.pi, 40)
    xs = np.outer(np.cos(u), np.sin(v))
    ys = np.outer(np.sin(u), np.sin(v))
    zs = np.outer(np.ones_like(u), np.cos(v))
    ax.plot_wireframe(xs, ys, zs, color='lightgray', alpha=0.25, linewidth=0.4)

    # Equator and meridian circles
    theta = np.linspace(0, 2 * np.pi, 100)
    ax.plot(np.cos(theta), np.sin(theta), 0, color='gray', alpha=0.3, linewidth=0.6)
    ax.plot(np.cos(theta), np.zeros_like(theta), np.sin(theta), color='gray', alpha=0.3, linewidth=0.6)

    # Axis arrows
    for direction, label, pos in [
        ([1.4, 0, 0], 'X', (1.5, 0, 0)),
        ([0, 1.4, 0], 'Y', (0, 1.5, 0)),
        ([0, 0, 1.4], '|0⟩', (0, 0, 1.6)),
        ([0, 0, -1.4], '|1⟩', (0, 0, -1.7)),
    ]:
        ax.quiver(0, 0, 0, *direction, color='gray', arrow_length_ratio=0.1, linewidth=0.8, alpha=0.6)
        ax.text(*pos, label, fontsize=10, ha='center', va='center', color='#444')

    # State vector arrow (cyan)
    x, y, z = float(vec[0]), float(vec[1]), float(vec[2])
    ax.quiver(0, 0, 0, x, y, z, color='#06B6D4', linewidth=2.5,
              arrow_length_ratio=0.12)
    ax.scatter([x], [y], [z], color='#06B6D4', s=55, zorder=10)

    ax.set_title(title or 'Bloch Sphere', fontsize=12, pad=12)
    ax.set_box_aspect([1, 1, 1])
    ax.set_xlim([-1.5, 1.5])
    ax.set_ylim([-1.5, 1.5])
    ax.set_zlim([-1.5, 1.5])
    ax.axis('off')
    plt.tight_layout()
    plt.show()  # captured by the patched show() in runQuantumExperiment.ts

# ── Install shim modules into sys.modules ────────────────────────────────────
import sys
import types

# qiskit top-level
_qiskit_mod = types.ModuleType('qiskit')
_qiskit_mod.QuantumCircuit = QuantumCircuit
_qiskit_mod.transpile = transpile
sys.modules['qiskit'] = _qiskit_mod

# qiskit_aer
_aer_mod = types.ModuleType('qiskit_aer')
_aer_mod.Aer = Aer
sys.modules['qiskit_aer'] = _aer_mod

# qiskit.quantum_info
_qi_mod = types.ModuleType('qiskit.quantum_info')
_qi_mod.Statevector = Statevector
sys.modules['qiskit.quantum_info'] = _qi_mod

# qiskit.visualization — plot_bloch_vector now renders a real figure
_vis_mod = types.ModuleType('qiskit.visualization')
_vis_mod.plot_bloch_vector = _draw_bloch_sphere
_vis_mod.plot_histogram = lambda counts, **kw: None  # histogram drawn separately
sys.modules['qiskit.visualization'] = _vis_mod

print("[Quantum shim loaded — Qiskit API emulated natively]")