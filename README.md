# VLMS — Virtual Lab Management System

An isolated, authoritative laboratory framework and production-grade academic sandbox designed for computer science curricula. VLMS provides instant runtimes, automated evaluation, and zero-friction student access directly in the browser—no registration or local environment configuration required.

---

## 🚀 Key Features

- **Zero-Setup Environments:** Students can write, run, and test code immediately without installing compilers or local dependencies.
- **Multi-Language Support:** Instant code runtimes for:
  - **C Programming** (gcc)
  - **Python** (py)
  - **Java** (jvm)
  - **SQL & DBMS** (psql, sql.js)
  - **JavaScript/Node.js** (node)
- **Comprehensive Course Paths:** Guided modules covering:
  - Data Structures & Algorithms
  - Operating Systems
  - Machine Learning & AI Tools
  - IoT (Internet of Things)
  - Quantum Computing
- **Automated Evaluation:** Instant validation of pretest/posttest questions and active workspace exercises.
- **Rich Visualizations:** Interactive simulation workspaces for complex structures like B-Trees and algorithm paths.
- **Immersive Feedback:** Standardized 10-point structured feedback reports for evaluation.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React with [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) & [TanStack Router](https://tanstack.com/router/latest)
- **Bundler & Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS (v4)](https://tailwindcss.com/)
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (via `@monaco-editor/react`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Lottie](https://github.com/airbnb/lottie-web)
- **Database & Authentication:** [Supabase](https://supabase.com/)
- **Data Visualizations:** [Recharts](https://recharts.org/)
- **Database Engine:** [SQL.js](https://sql.js.org/) for local relational database simulation

---

## 💻 Getting Started

### Prerequisites

Make sure you have Node.js and `npm` (or `bun`/`pnpm`) installed.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/qubitedge/VLMS-.git
   cd VLMS-
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👥 Project Contributors & Team

### 🌟 Project Guide & Visionary
* **Professor Dr. G. Jayasuma** - CSE Department

### 💻 Development Team
* **M. Likhith Kumar** (Lead Developer)
* **Ch. Sai Rupini** (Developer)
* **Sk. Asma** (Developer)
* **K. Pravallika** (Developer)

---

## 📄 License

This project is private and proprietary. All rights reserved.
