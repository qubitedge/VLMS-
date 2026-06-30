# quantumShim.py — injected into Pyodide before every quantum experiment run
# Emulates: qiskit.QuantumCircuit, qiskit_aer.Aer, qiskit.quantum_info.Statevector
# Does NOT require qiskit installed — runs entirely in pure Python + numpy
import numpy as np
import json
import sys
import types

# ── Statevector ──────────────────────────────────────────────────────────────
class Statevector:
    def __init__(self, data):
        self.data = np.array(data, dtype=complex)

    def __repr__(self):
        return f"Statevector({np.round(self.data, 3)})"

    def probabilities_dict(self):
        n = int(np.log2(len(self.data)))
        probs = np.abs(self.data) ** 2
        out = {}
        for i, p in enumerate(probs):
            if p > 1e-10:
                out[format(i, f'0{n}b')] = float(np.real(p))
        return out

    @staticmethod
    def from_instruction(qc):
        return qc._simulate_statevector()

# ── Gate matrices ─────────────────────────────────────────────────────────────
_H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
_X = np.array([[0, 1], [1, 0]], dtype=complex)
_Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
_Z = np.array([[1, 0], [0, -1]], dtype=complex)
_I = np.eye(2, dtype=complex)
_S = np.array([[1, 0], [0, 1j]], dtype=complex)
_T = np.array([[1, 0], [0, np.exp(1j * np.pi / 4)]], dtype=complex)

def _ry_matrix(theta):
    c, s = np.cos(theta / 2), np.sin(theta / 2)
    return np.array([[c, -s], [s, c]], dtype=complex)

def _u_matrix(theta, phi, lam):
    c, s = np.cos(theta / 2), np.sin(theta / 2)
    return np.array([
        [c, -np.exp(1j * lam) * s],
        [np.exp(1j * phi) * s, np.exp(1j * (phi + lam)) * c]
    ], dtype=complex)

def _tensor_gate(gate, target, n):
    ops = [_I] * n
    ops[target] = gate
    result = ops[0]
    for op in ops[1:]:
        result = np.kron(result, op)
    return result

def _permutation_matrix_for_order(order, n):
    """
    Build a permutation matrix P (dim_n x dim_n).

    `order` is a list of length n: order[k] = which qubit occupies kron
    position k. This matches the SAME convention _tensor_gate already uses
    elsewhere in this shim (ops[target] = gate, then kron(ops[0], ops[1], ...)
    — i.e. qubit index == position in the kron chain, directly).

    P maps a basis state expressed in this custom `order` arrangement back
    into the standard qubit-ordered basis (qubit 0 first, qubit 1 next, ...).
    """
    dim = 2 ** n
    P = np.zeros((dim, dim), dtype=complex)
    for new_index in range(dim):
        bits = format(new_index, f'0{n}b')  # bits[k] = value of qubit order[k]
        orig_bits = [''] * n
        for k, orig_qubit in enumerate(order):
            orig_bits[orig_qubit] = bits[k]
        orig_index = int(''.join(orig_bits), 2)
        P[orig_index, new_index] = 1
    return P


def _embed_operator(op, other_n, self_n, qubit_map):
    """
    Correctly embed an `other_n`-qubit operator `op` into a `self_n`-qubit
    space, placing other's local qubit i onto self's global qubit
    qubit_map[i]. Handles ANY qubit count, ANY subset, ANY order —
    not just same-width or leading-block cases.
    """
    if other_n > self_n:
        raise ValueError("Cannot embed an operator with more qubits than the target circuit")
    if len(qubit_map) != other_n:
        raise ValueError(
            f"qubit_map length ({len(qubit_map)}) must match other circuit's qubit count ({other_n})"
        )
    if len(set(qubit_map)) != len(qubit_map):
        raise ValueError("qubit_map contains duplicate target qubits")
    if any(q < 0 or q >= self_n for q in qubit_map):
        raise ValueError("qubit_map contains an out-of-range qubit index")

    if other_n == self_n:
        if list(qubit_map) == list(range(self_n)):
            return op  # identity mapping — no permutation needed
        P = _permutation_matrix_for_order(list(qubit_map), self_n)
        return P @ op @ P.conj().T

    remaining = [q for q in range(self_n) if q not in qubit_map]
    order = list(qubit_map) + remaining
    extra = self_n - other_n
    full_op = np.kron(op, np.eye(2 ** extra, dtype=complex))
    P = _permutation_matrix_for_order(order, self_n)
    return P @ full_op @ P.conj().T
    """Embed an operator from a small_n-qubit space into a big_n-qubit space
    by tensoring with identity on the untouched qubits, respecting qubit_map."""
    dim_big = 2 ** big_n
    result = np.eye(dim_big, dtype=complex)
    # Simple correct case: qubit_map covers the first len(qubit_map) qubits in order
    full_op = op
    if small_n < big_n:
        pad = np.eye(2 ** (big_n - small_n), dtype=complex)
        full_op = np.kron(pad, op)
    result = full_op
    return result

def _cnot_matrix(control, target, n):
    dim = 2 ** n
    mat = np.zeros((dim, dim), dtype=complex)
    for i in range(dim):
        bits = list(format(i, f'0{n}b'))
        if bits[n - 1 - control] == '1':
            bits[n - 1 - target] = '1' if bits[n - 1 - target] == '0' else '0'
            j = int(''.join(bits), 2)
            mat[j, i] = 1
        else:
            mat[i, i] = 1
    return mat

def _cz_matrix(control, target, n):
    dim = 2 ** n
    mat = np.eye(dim, dtype=complex)
    for i in range(dim):
        bits = format(i, f'0{n}b')
        if bits[n - 1 - control] == '1' and bits[n - 1 - target] == '1':
            mat[i, i] = -1
    return mat

# ── Registers (Qiskit-style: QuantumRegister/ClassicalRegister + bit objects) ─
class Qubit:
    def __init__(self, register, index):
        self.register = register
        self.index = index

class Clbit:
    def __init__(self, register, index):
        self.register = register
        self.index = index

class QuantumRegister:
    def __init__(self, size, name='q'):
        self.size = size
        self.name = name
        self._bits = [Qubit(self, i) for i in range(size)]

    def __getitem__(self, i): return self._bits[i]
    def __iter__(self): return iter(self._bits)
    def __len__(self): return self.size

class ClassicalRegister:
    def __init__(self, size, name='c'):
        self.size = size
        self.name = name
        self._bits = [Clbit(self, i) for i in range(size)]

    def __getitem__(self, i): return self._bits[i]
    def __iter__(self): return iter(self._bits)
    def __len__(self): return self.size

# ── A handle returned by gate calls so `.c_if()` chaining doesn't crash ──────
class _InstructionHandle:
    """
    NOTE: classical-feedback (c_if) is NOT physically simulated by this shim.
    It is a no-op so circuits that use it (e.g. teleportation) don't crash
    when built/drawn. Statevector simulation only ever applies unconditioned
    unitary gates.
    """
    def c_if(self, classical, val):
        return self

# ── QuantumCircuit ───────────────────────────────────────────────────────────
class QuantumCircuit:
    def __init__(self, *args):
        self._qreg_map = {}   # id(Qubit) -> global index
        self._creg_map = {}   # id(Clbit) -> global index
        self._ops = []
        self._measurements = {}
        self._initial_state = None

        if len(args) == 0:
            args = (0,)

        if all(isinstance(a, int) for a in args):
            # Old-style: QuantumCircuit(num_qubits, num_classical=None)
            num_qubits = args[0]
            num_classical = args[1] if len(args) > 1 else num_qubits
            self.num_qubits = num_qubits
            self.num_classical = num_classical
        else:
            # Register-style: QuantumCircuit(qreg1, qreg2, ..., creg)
            qcount, ccount = 0, 0
            for a in args:
                if isinstance(a, QuantumRegister):
                    for q in a:
                        self._qreg_map[id(q)] = qcount
                        qcount += 1
                elif isinstance(a, ClassicalRegister):
                    for c in a:
                        self._creg_map[id(c)] = ccount
                        ccount += 1
            self.num_qubits = qcount
            self.num_classical = ccount

    @property
    def qubits(self):
        return list(range(self.num_qubits))

    # ── index resolution: accepts plain ints OR Qubit/Clbit objects ─────────
    def _q(self, qubit):
        if isinstance(qubit, Qubit):
            return self._qreg_map[id(qubit)]
        return qubit

    def _c(self, clbit):
        if isinstance(clbit, Clbit):
            return self._creg_map[id(clbit)]
        return clbit

    def _add_single(self, gate, qubit):
        self._ops.append(_tensor_gate(gate, self._q(qubit), self.num_qubits))
        return _InstructionHandle()

    def h(self, qubit):   return self._add_single(_H, qubit)
    def x(self, qubit):   return self._add_single(_X, qubit)
    def y(self, qubit):   return self._add_single(_Y, qubit)
    def z(self, qubit):   return self._add_single(_Z, qubit)
    def s(self, qubit):   return self._add_single(_S, qubit)
    def t(self, qubit):   return self._add_single(_T, qubit)
    def sdg(self, qubit): return self._add_single(_S.conj().T, qubit)
    def tdg(self, qubit): return self._add_single(_T.conj().T, qubit)

    def ry(self, theta, qubit):
        return self._add_single(_ry_matrix(theta), qubit)

    def u(self, theta, phi, lam, qubit):
        return self._add_single(_u_matrix(theta, phi, lam), qubit)

    def barrier(self, *args):
        return _InstructionHandle()

    def cx(self, control, target):
        self._ops.append(_cnot_matrix(self._q(control), self._q(target), self.num_qubits))
        return _InstructionHandle()

    def cz(self, control, target):
        self._ops.append(_cz_matrix(self._q(control), self._q(target), self.num_qubits))
        return _InstructionHandle()

    def measure(self, qubits, cbits):
        if isinstance(qubits, (int, Qubit)):
            qubits = [qubits]
        if isinstance(cbits, (int, Clbit)):
            cbits = [cbits]
        for q, c in zip(qubits, cbits):
            self._measurements[self._q(q)] = self._c(c)
        return _InstructionHandle()

    def initialize(self, state_str, qubits):
        if isinstance(state_str, str):
            dim = 2 ** self.num_qubits
            sv = np.zeros(dim, dtype=complex)
            idx = int(state_str[::-1], 2)
            sv[idx] = 1.0
            self._initial_state = sv
        return _InstructionHandle()

    def draw(self, output='text'):
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

        probs = np.real(np.abs(sv) ** 2)
        probs = np.clip(probs, 0, None)
        total = probs.sum()
        if total > 0:
            probs /= total

        n = self.num_qubits
        outcomes = np.random.choice(len(probs), size=shots, p=probs)
        counts = {}
        for outcome in outcomes:
            bits = format(outcome, f'0{n}b')
            if self._measurements:
                cbits = ['0'] * self.num_classical
                for q, c in self._measurements.items():
                    cbits[self.num_classical - 1 - c] = bits[n - 1 - q]
                key = ''.join(cbits)
            else:
                key = bits
            counts[key] = counts.get(key, 0) + 1
        return counts

    def compose(self, other, qubits=None):
        """
        Returns a NEW circuit with `other`'s operations appended after self's.
        Mirrors qiskit.QuantumCircuit.compose (non-mutating, returns new circuit).
        """
        if other.num_qubits > self.num_qubits:
            raise ValueError("compose: other circuit has more qubits than self")

        new_qc = QuantumCircuit(self.num_qubits, self.num_classical)
        new_qc._ops = list(self._ops)
        new_qc._initial_state = self._initial_state
        new_qc._measurements = dict(self._measurements)
        new_qc._qreg_map = dict(self._qreg_map)
        new_qc._creg_map = dict(self._creg_map)

        if qubits is None:
            qubit_map = list(range(other.num_qubits))
        else:
            qubit_map = [self._q(q) for q in qubits]

        for op in other._ops:
            if other.num_qubits == self.num_qubits:
                new_qc._ops.append(op)
            else:
                embedded = _embed_operator(op, other.num_qubits, self.num_qubits, qubit_map)
                new_qc._ops.append(embedded)

        return new_qc

# ── Result / Job wrappers ────────────────────────────────────────────────────
class _Result:
    def __init__(self, counts=None, sv=None):
        self._counts = counts
        self._sv = sv
    def get_counts(self, circuit=None): return self._counts
    def get_statevector(self, circuit=None): return self._sv

class _Job:
    def __init__(self, result): self._result = result
    def result(self): return self._result

class _QasmBackend:
    def run(self, circuit, shots=1024):
        return _Job(_Result(counts=circuit._simulate_shots(shots)))

class _StatevectorBackend:
    def run(self, circuit):
        return _Job(_Result(sv=circuit._simulate_statevector()))

class Aer:
    @staticmethod
    def get_backend(name):
        if 'statevector' in name:
            return _StatevectorBackend()
        return _QasmBackend()

def transpile(circuit, backend):
    return circuit

# ── Bloch Sphere renderer ────────────────────────────────────────────────────
def _draw_bloch_sphere(vec, title=''):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

    fig = plt.figure(figsize=(5, 5))
    ax = fig.add_subplot(111, projection='3d')

    u = np.linspace(0, 2 * np.pi, 40)
    v = np.linspace(0, np.pi, 40)
    xs = np.outer(np.cos(u), np.sin(v))
    ys = np.outer(np.sin(u), np.sin(v))
    zs = np.outer(np.ones_like(u), np.cos(v))
    ax.plot_wireframe(xs, ys, zs, color='lightgray', alpha=0.25, linewidth=0.4)

    theta = np.linspace(0, 2 * np.pi, 100)
    ax.plot(np.cos(theta), np.sin(theta), 0, color='gray', alpha=0.3, linewidth=0.6)
    ax.plot(np.cos(theta), np.zeros_like(theta), np.sin(theta), color='gray', alpha=0.3, linewidth=0.6)

    for direction, label, pos in [
        ([1.4, 0, 0], 'X', (1.5, 0, 0)),
        ([0, 1.4, 0], 'Y', (0, 1.5, 0)),
        ([0, 0, 1.4], '|0⟩', (0, 0, 1.6)),
        ([0, 0, -1.4], '|1⟩', (0, 0, -1.7)),
    ]:
        ax.quiver(0, 0, 0, *direction, color='gray', arrow_length_ratio=0.1, linewidth=0.8, alpha=0.6)
        ax.text(*pos, label, fontsize=10, ha='center', va='center', color='#444')

    x, y, z = float(vec[0]), float(vec[1]), float(vec[2])
    ax.quiver(0, 0, 0, x, y, z, color='#06B6D4', linewidth=2.5, arrow_length_ratio=0.12)
    ax.scatter([x], [y], [z], color='#06B6D4', s=55, zorder=10)

    ax.set_title(title or 'Bloch Sphere', fontsize=12, pad=12)
    ax.set_box_aspect([1, 1, 1])
    ax.set_xlim([-1.5, 1.5]); ax.set_ylim([-1.5, 1.5]); ax.set_zlim([-1.5, 1.5])
    ax.axis('off')
    plt.tight_layout()
    plt.show()

# ── Install shim modules ──────────────────────────────────────────────────────
_qiskit_mod = types.ModuleType('qiskit')
_qiskit_mod.QuantumCircuit = QuantumCircuit
_qiskit_mod.QuantumRegister = QuantumRegister
_qiskit_mod.ClassicalRegister = ClassicalRegister
_qiskit_mod.transpile = transpile
sys.modules['qiskit'] = _qiskit_mod

_aer_mod = types.ModuleType('qiskit_aer')
_aer_mod.Aer = Aer
sys.modules['qiskit_aer'] = _aer_mod

_qi_mod = types.ModuleType('qiskit.quantum_info')
_qi_mod.Statevector = Statevector
sys.modules['qiskit.quantum_info'] = _qi_mod

_vis_mod = types.ModuleType('qiskit.visualization')
_vis_mod.plot_bloch_vector = _draw_bloch_sphere
_vis_mod.plot_histogram = lambda counts, **kw: None
sys.modules['qiskit.visualization'] = _vis_mod

print("[Quantum shim loaded — Qiskit API emulated natively]")