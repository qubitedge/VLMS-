import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as branches } from "./lab-data-YZIPiE89.mjs";
import { a as BookOpen, j as Code, G as GitBranch, M as Monitor, D as Database, k as Brain, S as Sparkles, l as Bot, W as Workflow } from "../_libs/lucide-react.mjs";
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
function getTopicIcon(topic) {
  if (topic === "C Programming") return /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "size-5 shrink-0" });
  if (topic === "Python") return /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-python text-[1.25rem] shrink-0" });
  if (topic === "Java") return /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "fab fa-java text-[1.25rem] shrink-0" });
  if (topic.includes("Data Structures")) return /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "size-5 shrink-0" });
  if (topic === "OS" || topic === "Operating Systems") return /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "DBMS") return /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "Machine Learning") return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "AI Tools") return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "LLMs") return /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-5 shrink-0 text-cyan" });
  if (topic === "Algorithms") return /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "size-5 shrink-0 text-cyan" });
  return null;
}
function CoursesPage() {
  const itBranch = branches.find((b) => b.code === "IT");
  const courses = itBranch?.topics || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 lg:px-10 py-12 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-cyan", children: "Curriculum" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight", children: "Courses" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-2xl mb-10", children: "Explore the complete syllabus and experiment workspace for your courses." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-3.5" }),
      " Department Subjects"
    ] }),
    courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground p-10 border border-dashed border-border rounded-xl text-center", children: "No subjects configured yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: courses.map((t) => {
      const slug = t.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/course/${slug}`, className: "group flex flex-col justify-between p-6 rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-sm transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-semibold group-hover:text-cyan transition-colors flex items-center gap-2.5", children: [
            getTopicIcon(t),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "View complete syllabus and experiment workspace for this course." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-foreground", children: "Explore Course →" })
      ] }, t);
    }) })
  ] });
}
export {
  CoursesPage as component
};
