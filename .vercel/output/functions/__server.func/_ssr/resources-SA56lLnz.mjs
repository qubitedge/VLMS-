import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as branches } from "./lab-data-YZIPiE89.mjs";
import { B as BookOpen, y as FileText, z as Video, G as Download } from "../_libs/lucide-react.mjs";
const TYPES = [{
  type: "Manual",
  icon: BookOpen,
  accent: "text-primary"
}, {
  type: "Cheatsheet",
  icon: FileText,
  accent: "text-cyan"
}, {
  type: "Walkthrough",
  icon: Video,
  accent: "text-mint"
}];
function ResourcesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 lg:px-10 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono uppercase tracking-[0.2em] text-cyan", children: "Knowledge Base" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight", children: "Resources" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-2xl", children: "Curated manuals, cheatsheets, and walkthroughs to accompany every lab." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4", children: branches.flatMap((d) => TYPES.map(({
      type,
      icon: Icon,
      accent
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-5 hover:border-foreground/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid place-items-center size-10 rounded-xl bg-secondary ${accent}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: d.code })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-4 font-display text-lg font-semibold leading-tight", children: [
        d.title,
        " — ",
        type
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: d.subtitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
        "Open resource"
      ] })
    ] }, `${d.code}-${type}`))) })
  ] });
}
export {
  ResourcesPage as component
};
