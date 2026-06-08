import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Lottie } from "../_libs/lottie-react.mjs";
import { b as branches } from "./lab-data-YZIPiE89.mjs";
import { S as Sparkles, m as ArrowUpRight, a as BookOpen, n as Target, o as ListChecks, P as Play, p as CodeXml, C as CircleCheck, j as Code, G as GitBranch, M as Monitor, D as Database, k as Brain, W as Workflow } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/lottie-web.mjs";
const steps = [
  { n: 1, title: "Theory", desc: "Learn fundamental concepts and theoretical foundations", icon: BookOpen },
  { n: 2, title: "Objective", desc: "Understand the goals and expected outcomes", icon: Target },
  { n: 3, title: "Procedure", desc: "Follow step-by-step experimental procedures", icon: ListChecks },
  { n: 4, title: "Simulation", desc: "Interact with visual simulations and models", icon: Play },
  { n: 5, title: "Code Execution", desc: "Write and execute code in real-time environment", icon: CodeXml },
  { n: 6, title: "Assessment", desc: "Validate learning through comprehensive evaluation", icon: CircleCheck }
];
function LearningJourney() {
  const [active, setActive] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, []);
  const progress = (active + 1) / steps.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 lg:px-10 py-16 border-b border-border bg-secondary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-cyan", children: "Methodology" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl lg:text-5xl font-bold tracking-tight", children: "Your Learning Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Experience a structured pathway from theory to mastery." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-[112px] h-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-0 top-[112px] h-px bg-gradient-to-r from-cyan via-mint to-primary transition-[width] duration-700 ease-out",
          style: { width: `${progress}%` }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3", children: steps.map((s, i) => {
        const Icon = s.icon;
        const isActive = i === active;
        const isPast = i < active;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onMouseEnter: () => setActive(i),
            onFocus: () => setActive(i),
            className: `group relative text-left rounded-xl border bg-card p-5 transition-all duration-500 ${isActive ? "border-cyan/60 shadow-[0_12px_40px_-12px_color-mix(in_oklab,var(--cyan)_60%,transparent)] -translate-y-1" : "border-border hover:border-foreground/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-3 right-3 grid place-items-center size-6 rounded-full border text-[11px] font-mono font-semibold transition-colors ${isActive ? "border-cyan bg-cyan text-primary-foreground" : isPast ? "border-mint/60 bg-mint/15 text-foreground" : "border-border bg-background text-muted-foreground"}`,
                  children: s.n
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `grid place-items-center size-12 rounded-lg transition-all duration-500 ${isActive ? "bg-gradient-to-br from-cyan to-primary text-primary-foreground scale-110" : isPast ? "bg-mint/20 text-foreground" : "bg-secondary text-foreground/70"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `hidden lg:block absolute left-1/2 -translate-x-1/2 top-[88px] size-2.5 rounded-full border-2 border-background transition-all ${isActive ? "bg-cyan shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan)_25%,transparent)]" : isPast ? "bg-mint" : "bg-border"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-12 font-display font-semibold text-base", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children: s.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-3 h-0.5 w-0 bg-gradient-to-r from-cyan to-primary transition-all duration-500 ${isActive ? "w-full" : "group-hover:w-1/2"}` })
            ]
          },
          s.n
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto", children: "Each experiment follows this proven methodology to ensure comprehensive understanding and practical skill development." })
  ] });
}
function HeroAnimation() {
  const [animationData, setAnimationData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetch("/abce4030-1164-11ee-81b5-f75eb99f4f55.json").then((res) => res.json()).then(setAnimationData).catch(console.error);
  }, []);
  if (!animationData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 h-64 bg-cyan/10 rounded-full animate-pulse blur-3xl" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square max-w-[500px] mx-auto perspective-1000", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Lottie,
    {
      animationData,
      loop: true,
      className: "w-full h-full object-contain drop-shadow-[0_0_40px_rgba(0,255,255,0.2)] hover:scale-105 transition-transform duration-700"
    }
  ) });
}
function getTopicIcon(topic) {
  if (topic === "C Programming") return /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "Python") return /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-python text-[1.25rem] shrink-0 text-cyan" });
  if (topic === "Java") return /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-java text-[1.25rem] shrink-0 text-cyan" });
  if (topic.includes("Data Structures")) return /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "OS" || topic === "Operating Systems") return /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "DBMS") return /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "Machine Learning") return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "AI Tools") return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "Algorithms") return /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "size-5 shrink-0 text-cyan" });
  return null;
}
function Dashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-secondary/50 px-6 py-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs group cursor-default transition-colors hover:bg-secondary/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 font-semibold text-foreground relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-cyan animate-pulse group-hover:animate-spin", style: {
          animationDuration: "3s"
        } }),
        "Zero-Friction Access Model",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground transition-colors group-hover:text-foreground", children: "No Registration or Login Required for Student Investigators · Drafts persist via Local Storage hooks" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg hero-fade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 left-10 lg:top-1/4 lg:left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-cyan/20 rounded-full mix-blend-screen filter blur-[80px] lg:blur-[100px] opacity-50 animate-pulse", style: {
        animationDuration: "5s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-10 lg:top-1/3 lg:right-1/4 w-80 h-80 lg:w-[30rem] lg:h-[30rem] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] lg:blur-[120px] opacity-50 animate-pulse", style: {
        animationDuration: "8s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px] gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight opacity-0 animate-fade-in-up", children: [
            "Virtual Lab ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Management ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary", children: "System" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base lg:text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-in-up delay-100", children: "An isolated, authoritative laboratory framework for computer science curricula. Instant runtimes, automated evaluation, and zero-friction student access — no registration required." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up delay-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/workspace", className: "inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/20 group", children: [
              "Launch Workspace ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan/30 hover:text-cyan", children: "Browse Courses" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block relative opacity-0 animate-fade-in-up delay-300 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroAnimation, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LearningJourney, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 lg:px-10 py-14 opacity-0 animate-fade-in-up delay-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Curriculum Tracks", title: "Courses", caption: "Technical courses aligned to the undergraduate computer science syllabus." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "inline-flex items-center gap-1 text-sm font-medium group transition-all text-cyan hover:text-cyan/80", children: [
          "View matrix ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4", children: branches.find((b) => b.code === "IT")?.topics.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/course/${t.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`, className: `block group opacity-0 animate-fade-in-up`, style: {
        animationDelay: `${400 + idx * 100}ms`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan/5 hover:border-cyan/30 relative overflow-hidden h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-lg relative z-10 flex items-center gap-2.5", children: [
          getTopicIcon(t),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-cyan mt-3 inline-flex items-center gap-1 relative z-10", children: [
          "Explore Course ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
        ] })
      ] }) }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono uppercase tracking-[0.18em]", children: "VLMS · JNTU" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono", children: "© 2026 · Sandbox v2.6.014" })
    ] })
  ] });
}
function SectionHeader({
  eyebrow,
  title,
  caption
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-cyan", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl lg:text-4xl font-bold tracking-tight", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: caption })
  ] });
}
export {
  Dashboard as component
};
