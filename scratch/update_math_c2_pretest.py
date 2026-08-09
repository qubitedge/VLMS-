import re
import sys

raw_data = """EXPERIMENT 1: Electric and Magnetic Fields — The Basics
The SI unit of electric field is:
A) Volt B) Volt/meter C) Ampere D) Tesla
Ans: B
Coulomb's Law describes the force between:
A) Two magnets B) Two point charges C) Two currents D) Two conductors
Ans: B
The SI unit of magnetic field is:
A) Volt B) Weber C) Tesla D) Henry
Ans: C
Electric field lines around a positive charge point:
A) Inward B) Outward C) Circularly D) Nowhere
Ans: B
Electric field is defined as force per unit:
A) Mass B) Charge C) Area D) Volume
Ans: B
Magnetic field lines around a straight current-carrying wire form:
A) Straight lines B) Concentric circles C) Parallel lines D) Random patterns
Ans: B
The force on a moving charge in a magnetic field is called:
A) Coulomb force B) Lorentz force C) Gravitational force D) Normal force
Ans: B
The Lorentz force equation is:
A) F = qE B) F = q(E + v×B) C) F = ma D) F = qB only
Ans: B
Electric flux is a measure of:
A) Electric field lines passing through a surface B) Magnetic field strength C) Current flow D) Charge density only
Ans: A
Gauss's Law relates electric flux to:
A) Magnetic field B) Enclosed electric charge C) Current D) Resistance
Ans: B
The direction of the magnetic field around a wire is found using:
A) Left-hand rule B) Right-hand rule C) Ohm's rule D) Faraday's rule
Ans: B
A dipole consists of:
A) Two like charges B) Two equal and opposite charges separated by a distance C) A single charge D) A magnet only
Ans: B
Electric potential is measured in:
A) Amperes B) Volts C) Ohms D) Tesla
Ans: B
The relationship between electric field E and potential V is:
A) E = V × d B) E = −dV/dx C) E = V + d D) E = V/d²
Ans: B
Magnetic monopoles (isolated N or S poles):
A) Are common B) Have never been observed C) Exist in all magnets D) Are found in wires
Ans: B
Current is defined as the rate of flow of:
A) Voltage B) Charge C) Resistance D) Magnetic flux
Ans: B
The permittivity of free space is denoted by:
A) μ₀ B) ε₀ C) σ D) ρ
Ans: B
The permeability of free space is denoted by:
A) μ₀ B) ε₀ C) σ D) ρ
Ans: A
A charged particle moving parallel to a magnetic field experiences:
A) Maximum force B) Zero force C) Force perpendicular to motion D) Force in a random direction
Ans: B
Electric field due to a point charge decreases with distance as:
A) 1/r B) 1/r² C) 1/r³ D) r²
Ans: B
A conductor placed in an external electric field has, at equilibrium, an internal field that is:
A) Maximum B) Zero C) Doubled D) Random
Ans: B
The work done moving a charge along an equipotential surface is:
A) Maximum B) Zero C) Negative D) Infinite
Ans: B
Magnetic field inside a long solenoid is:
A) Zero B) Uniform and strong C) Random D) Only at the ends
Ans: B
The SI unit of electric charge is:
A) Ampere B) Coulomb C) Volt D) Farad
Ans: B
Which of these materials is a good conductor?
A) Rubber B) Glass C) Copper D) Wood
Ans: C
EXPERIMENT 2: Maxwell's Equations in Free Space
How many equations make up Maxwell's Equations?
A) 2 B) 3 C) 4 D) 5
Ans: C
Gauss's Law for electricity relates electric field to:
A) Current density B) Charge density C) Magnetic flux D) Resistance
Ans: B
Gauss's Law for magnetism states that magnetic field lines:
A) Have starting and ending points B) Form closed loops (no monopoles) C) Are always straight D) Don't exist
Ans: B
Faraday's Law of Induction states that a changing magnetic field induces:
A) A current only B) An electric field/EMF C) A gravitational field D) A charge
Ans: B
The Ampère-Maxwell Law relates magnetic field to:
A) Electric charge only B) Current and changing electric field (displacement current) C) Gravitational force D) Magnetic monopoles
Ans: B
Maxwell added which term to Ampère's original law?
A) Conduction current B) Displacement current C) Magnetic charge D) Gravitational term
Ans: B
In free space (vacuum), Maxwell's equations simplify because:
A) There is no charge or current density B) Mass is infinite C) Fields are always zero D) Time doesn't exist
Ans: A
Maxwell's equations predict that light is a form of:
A) Sound wave B) Electromagnetic wave C) Gravitational wave D) Mechanical wave
Ans: B
The speed of light in vacuum is derived from:
A) √(μ₀ε₀) B) 1/√(μ₀ε₀) C) μ₀ + ε₀ D) μ₀ × ε₀
Ans: B
In an EM wave, electric and magnetic fields oscillate:
A) Parallel to each other B) Perpendicular to each other and to propagation direction C) Randomly D) In the same direction as propagation
Ans: B
Maxwell's equations in differential form use which mathematical operators?
A) Only addition B) Divergence and curl C) Only multiplication D) Factorials
Ans: B
∇·E = ρ/ε₀ is the differential form of:
A) Faraday's Law B) Gauss's Law for electricity C) Gauss's Law for magnetism D) Ampère's Law
Ans: B
∇·B = 0 represents:
A) No electric charges exist B) No magnetic monopoles exist C) No current flows D) No waves exist
Ans: B
∇×E = −∂B/∂t is the differential form of:
A) Gauss's Law B) Faraday's Law C) Ampère's Law D) Coulomb's Law
Ans: B
∇×B = μ₀J + μ₀ε₀(∂E/∂t) is the differential form of:
A) Faraday's Law B) Ampère-Maxwell Law C) Gauss's Law D) Lorentz Law
Ans: B
EM waves in free space travel at:
A) Any arbitrary speed B) The speed of light, c C) Zero speed D) Infinite speed
Ans: B
Displacement current arises due to:
A) Steady current flow B) A time-varying electric field C) A stationary charge D) Zero field
Ans: B
Maxwell's equations unify which two phenomena?
A) Gravity and electricity B) Electricity and magnetism C) Sound and light D) Heat and motion
Ans: B
In free space, EM waves are:
A) Longitudinal B) Transverse C) Stationary D) Circular only
Ans: B
The energy carried by an EM wave is described by the:
A) Poynting vector B) Lorentz force C) Coulomb constant D) Faraday constant
Ans: A
Maxwell's equations show that a changing electric field produces a:
A) Static charge B) Magnetic field C) Gravitational field D) Nothing
Ans: B
Which scientist unified electricity, magnetism, and optics into one theory?
A) Newton B) Faraday C) Maxwell D) Einstein
Ans: C
The wave equation derived from Maxwell's equations in free space applies to:
A) Only electric fields B) Both electric and magnetic field components C) Only magnetic monopoles D) Only static charges
Ans: B
In vacuum, the ratio of the electric field magnitude to magnetic field magnitude in an EM wave equals:
A) μ₀ B) ε₀ C) The speed of light, c D) Zero
Ans: C
Maxwell's equations form the theoretical foundation for:
A) Classical mechanics only B) Electromagnetism, optics, and EM wave propagation C) Thermodynamics only D) Quantum spin
Ans: B
EXPERIMENT 3: Maxwell's Equations in Conducting Media
In a conducting medium, an important additional term in Maxwell's equations accounts for:
A) Gravitational force B) Conduction current (via Ohm's Law, J = σE) C) Magnetic monopoles D) Zero field
Ans: B
The conductivity of a material is denoted by:
A) ε B) μ C) σ D) ρ
Ans: C
Ohm's Law in point form is:
A) J = σE B) E = σJ C) J = μE D) B = σE
Ans: A
In a good conductor, EM waves are:
A) Not attenuated B) Rapidly attenuated (absorbed) C) Unaffected D) Amplified
Ans: B
The "skin depth" refers to:
A) The thickness of a conductor's insulation B) The depth at which EM wave amplitude falls to 1/e of its surface value C) The total conductor length D) The wire's diameter
Ans: B
Skin depth decreases with:
A) Decreasing frequency B) Increasing frequency and conductivity C) Zero conductivity D) Increasing wavelength only
Ans: B
In a conductor, electric and magnetic fields in an EM wave become:
A) In phase B) Out of phase C) Always zero D) Infinite
Ans: B
The "skin effect" causes high-frequency current to flow mainly:
A) Through the center of a conductor B) Near the surface of a conductor C) Uniformly throughout D) Nowhere
Ans: B
A perfect conductor has conductivity σ approaching:
A) Zero B) Infinity C) A constant finite value D) Negative values
Ans: B
In conducting media, the wave equation includes a damping term due to:
A) Displacement current only B) Conduction current losses C) Magnetic monopoles D) Zero resistance
Ans: B
Good conductors are characterized by which condition relating conduction current to displacement current?
A) Conduction current negligible B) Conduction current much greater than displacement current C) Both are zero D) Only displacement current exists
Ans: B
The complex propagation constant in a conducting medium has:
A) Only a real part B) Only an imaginary part C) Both real (attenuation) and imaginary (phase) parts D) No meaningful parts
Ans: C
As frequency increases in a conductor, skin depth:
A) Increases B) Decreases C) Stays the same D) Becomes infinite
Ans: B
Eddy currents are induced currents that arise due to:
A) Static electric fields B) Time-varying magnetic fields in conductors C) Zero current D) Gravitational effects
Ans: B
In a lossy (conducting) medium, wave attenuation is characterized by the:
A) Attenuation constant α B) Refractive index only C) Permittivity only D) Charge density
Ans: A
The intrinsic impedance of a good conductor is:
A) Purely real B) Complex, with equal magnitude real and imaginary parts C) Zero D) Infinite
Ans: B
Applications relying on the skin effect include:
A) DC power transmission only B) High-frequency conductor/cable design and shielding C) Gravitational wave detection D) Static charge storage
Ans: B
A material is classified as a "good conductor" versus "good dielectric" based on comparing:
A) Mass and volume B) The loss tangent (σ/ωε) C) Color D) Temperature only
Ans: B
Electromagnetic shielding works because conductors:
A) Amplify external fields B) Attenuate/block EM waves via induced currents C) Are transparent to all fields D) Have zero conductivity
Ans: B
In seawater (a conducting medium), radio wave penetration is:
A) Excellent at all frequencies B) Limited, especially at high frequencies C) Infinite D) Unaffected by conductivity
Ans: B
The phase velocity of an EM wave in a conducting medium is generally:
A) Equal to c always B) Less than in free space and frequency-dependent C) Greater than c D) Undefined
Ans: B
Induction heating and metal detectors rely on:
A) Static electric fields B) Eddy currents induced in conductors C) Gravitational sensing D) Nuclear reactions
Ans: B
In a semiconductor, conductivity lies between:
A) Insulators and conductors B) Zero and negative values C) Only very high values D) Only magnetic materials
Ans: A
The loss tangent is used to distinguish:
A) Conductors from dielectrics based on frequency behavior B) Colors of materials C) Mass differences D) Gravitational effects
Ans: A
As conductivity σ approaches zero, the conducting medium equations reduce to those of:
A) A perfect conductor B) Free space (lossless dielectric) C) A magnet D) A vacuum tube
Ans: B
EXPERIMENT 4: Optical Fibers — Guided EM Waves
Optical fibers guide light waves using the principle of:
A) Reflection only B) Total internal reflection C) Refraction only D) Diffraction only
Ans: B
An optical fiber consists mainly of:
A) A single conducting wire B) A core and cladding with different refractive indices C) A hollow tube D) A magnetic coil
Ans: B
For total internal reflection to occur, light must travel from a medium of:
A) Lower to higher refractive index B) Higher to lower refractive index C) Equal refractive index D) Zero refractive index
Ans: B
The refractive index of the core is _____ than that of the cladding.
A) Lower B) Higher C) Equal D) Unrelated
Ans: B
The angle beyond which total internal reflection occurs is called the:
A) Angle of incidence B) Critical angle C) Refraction angle D) Brewster angle
Ans: B
Numerical aperture (NA) of an optical fiber measures:
A) Its physical length B) Its light-gathering ability C) Its electrical resistance D) Its magnetic field strength
Ans: B
Single-mode fibers have a _____ core compared to multi-mode fibers.
A) Larger B) Smaller C) Equal D) Hollow
Ans: B
Multi-mode fibers allow multiple light paths, leading to:
A) No signal loss B) Modal dispersion C) Increased bandwidth only D) Zero attenuation
Ans: B
Attenuation in optical fibers refers to:
A) Signal amplification B) Loss of signal strength over distance C) Increase in bandwidth D) Change in color
Ans: B
The main causes of attenuation in optical fibers include:
A) Only reflection B) Absorption and scattering C) Only magnetic effects D) Gravitational pull
Ans: B
Dispersion in optical fibers causes:
A) Signal amplification B) Pulse broadening, limiting bandwidth C) Zero data loss D) Increased speed
Ans: B
Which type of fiber minimizes modal dispersion the most?
A) Multi-mode step-index B) Single-mode fiber C) Hollow-core only D) Copper wire
Ans: B
Optical fibers are primarily made of:
A) Copper B) Silica glass or plastic C) Iron D) Aluminum
Ans: B
The main advantage of optical fibers over copper cables is:
A) Lower bandwidth B) Higher bandwidth and immunity to electromagnetic interference C) Heavier weight D) Higher signal loss
Ans: B
Graded-index fibers reduce modal dispersion by:
A) Using a uniform refractive index B) Gradually varying the refractive index across the core C) Removing the cladding D) Using a hollow core
Ans: B
In optical fiber communication, light sources commonly used include:
A) Incandescent bulbs B) LEDs and laser diodes C) Fluorescent tubes D) Neon lights
Ans: B
Optical fibers are widely used in which field?
A) Structural engineering B) Telecommunications and internet data transmission C) Nuclear physics only D) Mechanical engineering only
Ans: B
The "V-number" (normalized frequency) of a fiber determines:
A) Its color B) Whether it supports single or multiple modes C) Its length D) Its resistance
Ans: B
Bending an optical fiber too sharply can cause:
A) Increased signal strength B) Signal loss due to light escaping the core (bend loss) C) No effect D) Amplification
Ans: B
Optical fiber cladding serves to:
A) Increase attenuation B) Confine light within the core via total internal reflection C) Conduct electricity D) Absorb all light
Ans: B
Compared to copper cables, optical fibers are:
A) Susceptible to electromagnetic interference B) Immune to electromagnetic interference C) Heavier D) Lower bandwidth
Ans: B
Optical fiber connectors and splices must be precisely aligned to minimize:
A) Bandwidth B) Insertion/coupling loss C) Weight D) Color change
Ans: B
Chromatic dispersion occurs because:
A) All wavelengths travel at exactly the same speed B) Different wavelengths of light travel at slightly different speeds in the fiber C) The fiber has no core D) Light doesn't refract
Ans: B
Erbium-doped fiber amplifiers (EDFAs) are used to:
A) Reduce signal strength B) Amplify optical signals directly without electrical conversion C) Convert light to heat D) Increase attenuation intentionally
Ans: B
Wavelength Division Multiplexing (WDM) in optical fibers allows:
A) Only one signal at a time B) Multiple signals at different wavelengths to be sent simultaneously C) No data transmission D) Only electrical signals
Ans: B"""

import re

experiments = re.split(r'EXPERIMENT \d+:.*?\n', raw_data)[1:]
exp_ids = ['cm-m3-1', 'cm-m3-2', 'cm-m4-1', 'cm-m4-2']

with open(r'c:\Users\Likhith Kumar\Downloads\VLMS-\src\lib\math-c2-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for exp_id, exp_text in zip(exp_ids, experiments):
    blocks = exp_text.strip().split('\nAns: ')
    questions_ts = []
    
    for i in range(len(blocks) - 1):
        question_part = blocks[i].strip()
        if i == 0:
            q_lines = question_part.split('\n')
        else:
            q_lines = question_part.split('\n')[1:]
            
        q_lines = [l.strip() for l in q_lines if l.strip()]
        
        options_line = q_lines[-1]
        question = ' '.join(q_lines[:-1]).replace('"', '\\"')
        
        opts = []
        for match in re.finditer(r'[A-D]\)\s+(.*?)(?=(?:[A-D]\)\s+)|$)', options_line):
            opts.append(match.group(1).strip().replace('"', '\\"'))
            
        ans = blocks[i+1].strip().split('\n')[0].strip()
        ans_idx = ord(ans) - ord('A')
        
        questions_ts.append(f'            {{ question: "{question}", options: ["{opts[0]}", "{opts[1]}", "{opts[2]}", "{opts[3]}"], answerIndex: {ans_idx} }}')

    pretest_str = '            pretest: [\n' + ',\n'.join(questions_ts) + '\n            ],'
    
    pattern = r'(id:\s*"' + exp_id + r'".*?)pretest:\s*\[\s*\],'
    content = re.sub(pattern, r'\1' + pretest_str.replace('\\', '\\\\'), content, flags=re.DOTALL | re.MULTILINE)

with open(r'c:\Users\Likhith Kumar\Downloads\VLMS-\src\lib\math-c2-data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
