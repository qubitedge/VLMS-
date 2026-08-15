export interface PolicySection {
  id: string;
  number: string;
  title: string;
  category: "privacy" | "terms" | "copyright" | "acceptable-use" | "licenses" | "contact";
  summary: string;
  content: string[];
  subsections?: {
    subtitle: string;
    details: string[];
    items?: { label: string; desc: string; tag?: string }[];
    badge?: string;
  }[];
  callout?: {
    type: "info" | "warning" | "security" | "ai";
    title: string;
    message: string;
  };
}

export interface ThirdPartyLicense {
  name: string;
  version?: string;
  purpose: string;
  license: "MIT" | "Apache-2.0" | "BSD-3-Clause" | "ISC";
  copyright: string;
  url: string;
}

export const LEGAL_METADATA = {
  platformName: "Virtual Lab Management System (VLMS)",
  shortName: "VLMS",
  lastUpdated: "August 15, 2026",
  effectiveDate: "August 15, 2026",
  partner: "qubitedge",
  guide: "Dr. G. Jayasuma",
  developerTeam: "Team SAPL (Sai Rupini • Sk. Asma • K. Pravallika • M. Likhith Kumar)",
  contactEmail: "support@vlms.edu.in",
  grievanceEmail: "grievance@vlms.edu.in",
  securityEmail: "security@vlms.edu.in",
  jurisdiction: "Visakhapatnam, Andhra Pradesh, India",
  applicableLaws: "Information Technology Act, 2000; Digital Personal Data Protection Act (DPDPA), 2023; Copyright Act, 1957 of India; Global Educational Privacy Norms",
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    number: "01",
    category: "privacy",
    title: "Introduction & Platform Governance",
    summary: "Who operates the Virtual Lab Management System and the scope of these governance policies.",
    content: [
      "Virtual Lab Management System (VLMS) is an authoritative, interactive educational platform designed to provide students, educators, and institutions with zero-friction access to virtual laboratories, cloud simulations, curated learning materials, automated assessments, and intelligent tutoring systems.",
      "This document outlines how VLMS collects, uses, protects, and handles user information, as well as the rules and intellectual property safeguards governing all interactions within the platform.",
      "By accessing, registering for, or using the VLMS platform and its associated laboratories, compilers, and educational toolsets, you agree to the terms and privacy practices described herein."
    ],
    subsections: [
      {
        subtitle: "Platform Ownership & Institutional Affiliation",
        details: [
          "VLMS is developed and maintained by Team SAPL in collaboration with strategic technology partner qubitedge and under institutional guidance.",
          "Our primary mission is democratizing technical education by delivering isolated runtime sandboxes for programming, database systems, artificial intelligence, quantum computing, and computer science curricula."
        ],
        items: [
          { label: "Platform Entity", desc: "Virtual Lab Management System (VLMS)" },
          { label: "Partner Organization", desc: "qubitedge — Technology & Sandbox Architecture" },
          { label: "Primary Operating Region", desc: "Visakhapatnam, Andhra Pradesh, India" },
          { label: "Official Contact", desc: "support@vlms.edu.in" }
        ]
      }
    ]
  },
  {
    id: "information-collected",
    number: "02",
    category: "privacy",
    title: "Information We Collect",
    summary: "Detailed breakdown of account data, usage telemetries, and technical logs captured by VLMS.",
    content: [
      "In accordance with modern data minimization principles, VLMS only collects information that is strictly necessary to deliver high-performance lab sandboxes, assess course competencies, issue verified certificates, and safeguard platform security.",
      "We strictly categorize all collected data to maintain total transparency with learners and educators."
    ],
    subsections: [
      {
        subtitle: "1. Information You Provide Directly",
        details: [
          "Data provided during account creation, profile setup, and classroom participation:"
        ],
        items: [
          { label: "Identity & Profile", desc: "Full name, institutional email address, profile avatar, and student/roll number (if applicable)." },
          { label: "Academic Affiliation", desc: "College/university name, department/branch (CSE, IT, AI&ML), and academic semester." },
          { label: "Authentication Credentials", desc: "Securely salted and hashed passwords via industry-standard cryptosystems. VLMS never stores plaintext passwords." },
          { label: "User Submissions", desc: "Code submissions, experiment execution queries, lab pretest/posttest answers, and discussion feedback." }
        ],
        badge: "Direct Input"
      },
      {
        subtitle: "2. Usage & Educational Telemetry",
        details: [
          "Telemetry gathered automatically as you learn and experiment on the platform:"
        ],
        items: [
          { label: "Lab Interaction Records", desc: "Virtual labs accessed, experiments initiated, simulation state changes, and completion timestamps." },
          { label: "Assessment Performance", desc: "Pretest/posttest scores, diagnostic quiz results, hint lookups, and accuracy rates." },
          { label: "Code Execution Stats", desc: "Sandbox execution time, memory utilization, compilation faults, and test case pass rates." },
          { label: "Milestones & Certificates", desc: "Course completion progress, earned badges, and cryptographically verifiable digital certificates." }
        ],
        badge: "Telemetry"
      },
      {
        subtitle: "3. Technical & System Logs",
        details: [
          "Technical diagnostic metadata captured to preserve server reliability and guard against abuse:"
        ],
        items: [
          { label: "Network Identifiers", desc: "IP address and approximate geolocation (city/country level only for load distribution)." },
          { label: "Device & Browser Context", desc: "Browser engine, operating system, screen dimensions, and hardware acceleration capabilities for WebGL simulations." },
          { label: "Security & Diagnostic Logs", desc: "Failed authentication alerts, sandbox runtime exceptions, and security violation audit trails." }
        ],
        badge: "Technical"
      }
    ],
    callout: {
      type: "info",
      title: "Data Minimization Commitment",
      message: "VLMS does not collect financial details, payment card information, or biometric markers. We do not track users across external third-party websites."
    }
  },
  {
    id: "purpose-of-processing",
    number: "03",
    category: "privacy",
    title: "Why We Collect Data & Legal Bases",
    summary: "The precise purposes for which your data is processed and our legal bases under data protection laws.",
    content: [
      "We process your data exclusively for legitimate educational, operational, and security objectives.",
      "Under the Digital Personal Data Protection Act (DPDPA), 2023 and global standards, data is collected with explicit user consent and necessary contractual performance for providing educational services."
    ],
    subsections: [
      {
        subtitle: "Core Purposes of Processing",
        details: [],
        items: [
          { label: "Lab Sandbox Provisioning", desc: "Spawning isolated in-browser compilers, SQL query engines, and simulation environments tailored to your track." },
          { label: "Academic Progress Tracking", desc: "Recording course completion, evaluating quiz performance, and generating automated performance analytics." },
          { label: "Platform Security & Anti-Abuse", desc: "Detecting malicious compiler exploits, brute-force login attempts, and denial-of-service activities." },
          { label: "Credential Verification", desc: "Enabling universities and employers to independently verify student certificate authenticity." },
          { label: "Service Communication", desc: "Sending critical password resets, curriculum updates, and system maintenance advisories." }
        ]
      }
    ]
  },
  {
    id: "ai-features",
    number: "04",
    category: "privacy",
    title: "AI-Powered Features & LLM Data Handling",
    summary: "Transparent disclosures regarding AI Tutors, prompt processing, and code analysis models.",
    content: [
      "VLMS incorporates intelligent AI features, including the Interactive Lab Assistant, AI Code Explainer, and Automated Experiment Feedback.",
      "Because AI models process natural language and source code, we provide complete transparency regarding how your queries are handled."
    ],
    subsections: [
      {
        subtitle: "AI Processing Architecture & Policies",
        details: [
          "Our AI infrastructure is engineered with strict privacy guardrails:"
        ],
        items: [
          { label: "Ephemeral Request Processing", desc: "Prompts sent to our AI tutor (e.g. debugging requests, conceptual queries) are processed ephemerally to produce immediate responses." },
          { label: "No Model Training on Student Prompts", desc: "Your personal details, submitted homework solutions, and private queries are NEVER used to train or fine-tune public foundation models." },
          { label: "Local & Cloud Model Hybrid", desc: "Where feasible, client-side algorithms and isolated serverless inference endpoints are utilized to minimize external data transit." },
          { label: "Prompt Data Sanitization", desc: "Student identification numbers and email addresses are automatically stripped before sending programming context to inference engines." }
        ]
      }
    ],
    callout: {
      type: "ai",
      title: "Best Practice for AI Interactions",
      message: "Students are advised never to enter passwords, personal identification documents, private keys, or confidential institutional data into the AI Chatbot prompts."
    }
  },
  {
    id: "data-sharing",
    number: "05",
    category: "privacy",
    title: "Data Sharing & Service Providers",
    summary: "Categories of infrastructure and cloud providers that support VLMS operations under strict confidentiality.",
    content: [
      "VLMS will NEVER sell, rent, or trade your personal data to commercial advertisers or data brokers. Data is shared solely with trusted service providers essential for platform functionality under binding Data Processing Agreements (DPAs)."
    ],
    subsections: [
      {
        subtitle: "Approved Infrastructure Partners",
        details: [
          "The following service provider categories assist in operating the VLMS ecosystem:"
        ],
        items: [
          { label: "Cloud Hosting & CDN", desc: "Vercel / Cloudflare for global content delivery, DDoS mitigation, and low-latency asset hosting." },
          { label: "Database & Authentication", desc: "Supabase (PostgreSQL) for secure encrypted user storage, Row Level Security (RLS), and authentication token handling." },
          { label: "AI Model Inference", desc: "Enterprise AI APIs (Google Cloud Gemini / Groq Cloud) for rapid educational assistant reasoning under non-training terms." },
          { label: "Collaborating Institutions", desc: "Your affiliated university or department faculty may receive academic progress reports and lab completion metrics." }
        ]
      }
    ]
  },
  {
    id: "data-security",
    number: "06",
    category: "privacy",
    title: "Data Security & Cryptographic Standards",
    summary: "Technical, physical, and administrative safeguards implemented to protect platform integrity.",
    content: [
      "We implement defense-in-depth security measures to protect user data against unauthorized access, alteration, disclosure, or destruction."
    ],
    subsections: [
      {
        subtitle: "Key Technical Safeguards",
        details: [],
        items: [
          { label: "End-to-End Encryption in Transit", desc: "All communication between your browser and VLMS servers is enforced over TLS 1.3 (HTTPS) with HSTS headers." },
          { label: "Cryptographic Password Hashing", desc: "User passwords undergo robust salt-and-hash computation with modern key derivation algorithms (Bcrypt/Argon2)." },
          { label: "Row Level Security (RLS)", desc: "Database-enforced isolation guarantees that students can only query and mutate their own lab records." },
          { label: "Sandboxed Web Workers", desc: "Compiler simulations and client-side code run within sandboxed Web Workers and isolated WebAssembly (Wasm) containers to prevent client cross-site contamination." },
          { label: "Continuous Session Protection", desc: "JWT tokens and session tokens are strictly scoped with automated expiry and revocation controls." }
        ]
      }
    ],
    callout: {
      type: "security",
      title: "Responsible Vulnerability Reporting",
      message: "If you discover a potential security flaw or sandbox escape vulnerability, please report it immediately to security@vlms.edu.in before public disclosure."
    }
  },
  {
    id: "data-retention",
    number: "07",
    category: "privacy",
    title: "Data Retention & Account Deletion",
    summary: "Clear rules regarding how long your records are kept and how to purge your personal data.",
    content: [
      "VLMS retains personal information only for the duration necessary to deliver the educational services, fulfill institutional accreditation requirements, and resolve technical disputes."
    ],
    subsections: [
      {
        subtitle: "Retention Lifecycle by Category",
        details: [],
        items: [
          { label: "Active Student Accounts", desc: "Retained for the duration of the student's active enrollment and academic semester cycles." },
          { label: "Verified Certificates", desc: "Retained perpetually on immutable verification registries so credentials can be validated by universities indefinitely." },
          { label: "Security & Sandbox Logs", desc: "Purged automatically on a rolling 90-day cycle unless required for active security investigations." },
          { label: "Deleted Accounts", desc: "Upon account deletion request, personal identifying fields are permanently scrubbed within 30 days." }
        ]
      }
    ]
  },
  {
    id: "cookies-and-storage",
    number: "08",
    category: "privacy",
    title: "Cookies & Local Storage Policy",
    summary: "How VLMS uses essential browser storage, tokens, and preference flags.",
    content: [
      "VLMS maintains a minimal cookie footprint. We do not employ third-party advertising cookies or cross-site tracking beacons."
    ],
    subsections: [
      {
        subtitle: "Storage Technologies Used",
        details: [],
        items: [
          { label: "Authentication Tokens (Essential)", desc: "Secure HTTP-only session cookies and tokens used to maintain your signed-in state across lab navigations." },
          { label: "Local Storage — Editor Preferences", desc: "Saves your Monaco editor theme (Dark/Light), font size, keyboard layout, and scratchpad code." },
          { label: "Session Storage — Simulation State", desc: "Maintains temporary experiment variables and pretest answers during active browser sessions." }
        ]
      }
    ]
  },
  {
    id: "user-rights",
    number: "09",
    category: "privacy",
    title: "User Rights & Grievance Redressal",
    summary: "Your rights under Indian DPDP Act 2023, IT Act, and global data privacy standards.",
    content: [
      "Every VLMS user possesses comprehensive rights concerning their personal information under applicable laws."
    ],
    subsections: [
      {
        subtitle: "Your Statutory Rights",
        details: [],
        items: [
          { label: "Right to Access & Summary", desc: "You have the right to request a complete export of your profile information, course grades, and lab completion histories." },
          { label: "Right to Correction", desc: "You can update inaccurate name, email, or institutional information directly from your profile settings or by contacting support." },
          { label: "Right to Erasure", desc: "You may request the permanent deletion of your account and associated personal data, subject to institutional record obligations." },
          { label: "Right to Grievance Redressal", desc: "You can lodge privacy complaints with our designated Grievance Officer, who will acknowledge within 24 hours and resolve within 15 business days." }
        ]
      },
      {
        subtitle: "Designated Grievance Officer",
        details: [
          "In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and the DPDP Act, 2023, the Grievance Officer details are:"
        ],
        items: [
          { label: "Designation", desc: "Platform Grievance & Privacy Officer, VLMS" },
          { label: "Email", desc: "grievance@vlms.edu.in" },
          { label: "Address", desc: "Department of Computer Science & Engineering, JNTUGV Campus, Vizianagaram / Visakhapatnam, AP, India" },
          { label: "Response Timeframe", desc: "Initial acknowledgment within 24 hours; resolution within 15 business days." }
        ]
      }
    ]
  },
  {
    id: "children-privacy",
    number: "10",
    category: "privacy",
    title: "Children's & Student Privacy Notice",
    summary: "Guidance on minor access, educational consent, and institutional oversight.",
    content: [
      "VLMS is primarily designed for higher education students enrolled in polytechnic, undergraduate, and postgraduate engineering curricula (ages 17+).",
      "For school-level introductory programs or students under the age of 18, access is provided through authorized institutional partnerships where schools act as data fiduciaries with appropriate parental or educator consent.",
      "We do not knowingly collect personal information directly from children under 13 without verified institutional oversight."
    ]
  },
  {
    id: "terms-of-service",
    number: "11",
    category: "terms",
    title: "Terms of Service",
    summary: "Binding terms governing account creation, sandbox usage, academic integrity, and liability limits.",
    content: [
      "These Terms of Service ('Terms') constitute a legally binding agreement between you ('User', 'Student', 'Educator') and VLMS. By accessing the platform, you agree to comply with all applicable guidelines."
    ],
    subsections: [
      {
        subtitle: "1. Account Eligibility & Responsibilities",
        details: [
          "Users must provide accurate, current registration data and safeguard account credentials.",
          "You are strictly responsible for all activities occurring under your account. Account sharing or distributing login credentials across multiple individuals is prohibited."
        ]
      },
      {
        subtitle: "2. Virtual Sandbox & Compiler Provisioning",
        details: [
          "VLMS grants users a revocable, non-exclusive, non-transferable license to access lab simulations and execute educational programs.",
          "Sandboxes are intended exclusively for authorized academic exercises, problem solving, and curriculum validation."
        ]
      },
      {
        subtitle: "3. Academic Integrity",
        details: [
          "Students must submit original work during assessments, quizzes, and lab evaluations.",
          "Automated exploitation of quiz answer keys, spoofing test submission scores, or reverse engineering evaluation logic violates academic honor codes."
        ]
      },
      {
        subtitle: "4. Service Availability & Disclaimers",
        details: [
          "While we strive for 99.9% platform availability, VLMS is provided on an 'AS IS' and 'AS AVAILABLE' basis.",
          "VLMS and qubitedge disclaim all warranties, express or implied, regarding uninterrupted service, loss of uncommitted editor buffers, or simulation precision beyond academic demonstration purposes."
        ]
      }
    ]
  },
  {
    id: "acceptable-use",
    number: "12",
    category: "acceptable-use",
    title: "Acceptable Use Policy (AUP)",
    summary: "Strictly prohibited actions, laboratory infrastructure protection, and anti-abuse mandates.",
    content: [
      "To preserve the performance, safety, and reliability of the VLMS sandbox infrastructure for all learners, strict acceptable use guidelines apply."
    ],
    subsections: [
      {
        subtitle: "Prohibited Infrastructure Activities",
        details: [
          "Users MUST NOT engage in any of the following prohibited behaviors:"
        ],
        items: [
          { label: "Sandbox Escape & Exploitation", desc: "Attempting to break out of in-browser Web Workers, Pyodide WASM environments, or container boundaries to access host filesystems or network sockets." },
          { label: "Denial of Service & Infinite Loops", desc: "Intentionally launching fork-bombs, memory exhaustion attacks, cryptocurrency miners, or infinite processes designed to degrade platform servers." },
          { label: "Malware & Harmful Payloads", desc: "Uploading, compiling, or executing ransomware, worms, keyloggers, botnets, or exploits targeting third parties." },
          { label: "Automated Scraping", desc: "Using scrapers, crawlers, or headless bots to extract question banks, proprietary lab manuals, solutions, or user profiles at scale." },
          { label: "Authentication Bypass", desc: "Circumventing Row Level Security (RLS), impersonating other students, or modifying database session tokens." },
          { label: "Abusive AI Interactions", desc: "Attempting prompt injection, jailbreaking LLM safety filters, or submitting harassing/unlawful queries to the AI Tutor." }
        ]
      }
    ],
    callout: {
      type: "warning",
      title: "Zero Tolerance Enforcement",
      message: "Violations of the Acceptable Use Policy may result in immediate suspension of lab access, cancellation of digital certificates, and formal reporting to the user's institution."
    }
  },
  {
    id: "copyright-and-ip",
    number: "13",
    category: "copyright",
    title: "Copyright & Intellectual Property ©",
    summary: "Ownership rights over platform source code, simulations, educational content, and student UGC.",
    content: [
      "The Virtual Lab Management System, including its software architecture, user interface, visual animations, lab instructions, diagrams, and branding, is protected under the Copyright Act, 1957 of India and international IP treaties.",
      "© 2026 VLMS. All Rights Reserved."
    ],
    subsections: [
      {
        subtitle: "Proprietary Platform Assets",
        details: [
          "Unless explicitly attributed to open-source licenses, all proprietary platform components are the intellectual property of VLMS, Team SAPL, and qubitedge:"
        ],
        items: [
          { label: "Software & UI Design", desc: "Full frontend React application, custom CSS styles, dynamic island components, and interactive visual widgets." },
          { label: "Lab Simulations & Diagrams", desc: "Interactive Three.js / Canvas physics simulations, data structure visualizers, quantum circuit renders, and custom ER diagrams." },
          { label: "Curriculum & Question Banks", desc: "Short notes, comprehensive manuals, pretest/posttest diagnostic questions, and guided experiment workflows." },
          { label: "Branding & Trademarks", desc: "VLMS name, logo graphics, qubitedge badges, and associated typography." }
        ]
      },
      {
        subtitle: "User-Generated Content (UGC) Ownership",
        details: [
          "Students and educators retain full intellectual property ownership of the original code, lab reports, and projects they independently create and submit on VLMS.",
          "By submitting code into the platform for evaluation, users grant VLMS a limited, non-exclusive, royalty-free license strictly to compile, execute, test, and render that content back to the user for academic evaluation."
        ]
      }
    ]
  },
  {
    id: "third-party-licenses",
    number: "14",
    category: "licenses",
    title: "Third-Party Licenses & Open Source Attributions",
    summary: "Full attribution for open-source frameworks, fonts, and libraries powering VLMS.",
    content: [
      "VLMS is proudly built upon exceptional open-source software and open educational standards. We acknowledge and respect the copyright of all upstream developers whose libraries empower our sandbox."
    ]
  },
  {
    id: "contact-and-reporting",
    number: "15",
    category: "contact",
    title: "Contact, Grievances & Issue Reporting",
    summary: "How to connect with our administrative team, report bugs, or submit institutional inquiries.",
    content: [
      "We are committed to continuous platform improvement and transparent communication with students, educators, and academic administrators."
    ],
    subsections: [
      {
        subtitle: "Communication Channels",
        details: [],
        items: [
          { label: "General Support & Lab Inquiries", desc: "support@vlms.edu.in — For classroom onboarding, lab access help, and curriculum queries." },
          { label: "Privacy & Data Grievance Officer", desc: "grievance@vlms.edu.in — For data access requests, deletion notices, or statutory privacy filings." },
          { label: "Security & Vulnerability Team", desc: "security@vlms.edu.in — For responsible vulnerability disclosure and infrastructure reports." },
          { label: "Institutional Partnerships", desc: "partners@qubitedge.com — For university integrations, custom sandbox deployments, and syllabus sync." }
        ]
      }
    ]
  }
];

export const THIRD_PARTY_LICENSES: ThirdPartyLicense[] = [
  {
    name: "React & React DOM",
    version: "19.2.0",
    purpose: "Core UI Component Library",
    license: "MIT",
    copyright: "Meta Platforms, Inc. and affiliates.",
    url: "https://react.dev"
  },
  {
    name: "TanStack Router & Query",
    version: "1.168.x / 5.83.x",
    purpose: "Type-Safe Client-Side Routing and Asynchronous Data Synchronization",
    license: "MIT",
    copyright: "Tanner Linsley and TanStack Contributors",
    url: "https://tanstack.com"
  },
  {
    name: "Vite",
    version: "7.3.x",
    purpose: "Next Generation Frontend Tooling & Fast HMR Dev Server",
    license: "MIT",
    copyright: "Yuxi (Evan) You and Vite Contributors",
    url: "https://vitejs.dev"
  },
  {
    name: "Tailwind CSS",
    version: "4.2.x",
    purpose: "Utility-First CSS Engine and Design Tokens",
    license: "MIT",
    copyright: "Tailwind Labs, Inc.",
    url: "https://tailwindcss.com"
  },
  {
    name: "Monaco Editor",
    version: "0.52.x / @monaco-editor/react",
    purpose: "In-Browser Code Editor & IDE Sandbox (powers VS Code)",
    license: "MIT",
    copyright: "Microsoft Corporation",
    url: "https://github.com/microsoft/monaco-editor"
  },
  {
    name: "Lucide React",
    version: "0.575.x",
    purpose: "Clean, consistent icon system for UI controls",
    license: "ISC",
    copyright: "Lucide Contributors & Cole Bemis (Feather Icons)",
    url: "https://lucide.dev"
  },
  {
    name: "Radix UI Primitives",
    version: "1.x / 2.x",
    purpose: "Accessible, unstyled UI components (Dialog, Accordion, Tooltips, Menus)",
    license: "MIT",
    copyright: "WorkOS, Inc.",
    url: "https://www.radix-ui.com"
  },
  {
    name: "Supabase JS",
    version: "2.107.x",
    purpose: "Isomorphic PostgreSQL client & Row Level Security Authentication",
    license: "MIT",
    copyright: "Supabase, Inc.",
    url: "https://supabase.com"
  },
  {
    name: "SQL.js",
    version: "1.14.x",
    purpose: "In-Browser SQLite Database Engine compiled to WebAssembly (Wasm)",
    license: "MIT",
    copyright: "Alon Zakai, SQL.js Contributors",
    url: "https://github.com/sql-js/sql.js"
  },
  {
    name: "Recharts",
    version: "2.15.x",
    purpose: "Composable Data Visualization Charts & Telemetry Visuals",
    license: "MIT",
    copyright: "Recharts Group",
    url: "https://recharts.org"
  },
  {
    name: "Framer Motion",
    version: "12.40.x",
    purpose: "Production-ready motion and gesture animation system for React",
    license: "MIT",
    copyright: "Framer B.V.",
    url: "https://framer.com/motion"
  },
  {
    name: "Sonner",
    version: "2.0.x",
    purpose: "Toast notification manager for real-time user action confirmations",
    license: "MIT",
    copyright: "Emil Kowalski",
    url: "https://sonner.emilkowal.ski"
  }
];
