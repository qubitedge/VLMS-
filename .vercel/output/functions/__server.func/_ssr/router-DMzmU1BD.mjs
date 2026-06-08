import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Lottie } from "../_libs/lottie-react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { B as Beaker, L as LayoutDashboard, D as Database, F as FlaskConical, a as BookOpen } from "../_libs/lucide-react.mjs";
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
function Loader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[50vh] w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loader", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__bar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__bar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__bar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__bar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__bar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loader__ball" })
  ] }) });
}
function ErrorGraphic() {
  const [animationData, setAnimationData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetch("/No%20Internet/a9ceef08-9965-11ee-b026-63df4a08c9ac.json").then((res) => res.json()).then(setAnimationData).catch(console.error);
  }, []);
  if (!animationData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-72 h-72 mb-2 animate-pulse bg-secondary/50 rounded-full" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Lottie,
    {
      animationData,
      loop: true,
      className: "w-72 h-auto mb-2 opacity-90"
    }
  );
}
const appCss = "/assets/styles-IsPP1QeS.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorGraphic, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display mt-4", children: "Route Not Found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "The requested experiment or page could not be found in the registry. Check your connection or return to the main dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-cyan-foreground hover:bg-cyan/90 transition-all shadow-lg hover:scale-105", children: "Return to Dashboard" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorGraphic, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground font-display mt-4", children: "Runtime Fault" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "The sandbox encountered an unexpected exception. Our systems have logged this issue." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      router2.invalidate();
      reset();
    }, className: "mt-8 inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2.5 text-sm font-semibold hover:bg-red-500/20 transition-all shadow-lg hover:scale-105", children: "Re-initialize System" })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VLMS — Virtual Lab Management System" },
      { name: "description", content: "Isolated, authoritative laboratory framework for computer science curricula." },
      { property: "og:title", content: "VLMS — Virtual Lab Management System" },
      { name: "twitter:title", content: "VLMS — Virtual Lab Management System" },
      { property: "og:description", content: "Isolated, authoritative laboratory framework for computer science curricula." },
      { name: "twitter:description", content: "Isolated, authoritative laboratory framework for computer science curricula." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1c5de5e9-659c-44d2-bc64-d262ce156f24" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1c5de5e9-659c-44d2-bc64-d262ce156f24" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: Loader
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Courses", icon: Database },
  { to: "/workspace", label: "Workspace", icon: FlaskConical },
  { to: "/resources", label: "Resources", icon: BookOpen }
];
function DynamicIsland() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(960px,calc(100vw-1.5rem))]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur-xl px-2 py-2 shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--foreground)_35%,transparent)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center size-7 rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "size-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-[13px] tracking-tight", children: "VLMS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5", children: "Virtual Lab" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block h-6 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-1 flex-1 justify-center", children: navItems.map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        activeOptions: { exact: to === "/" },
        className: "group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors",
        activeProps: { className: "bg-secondary text-foreground shadow-sm" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: label })
        ]
      },
      to
    )) })
  ] }) });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIsland, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$4 = () => import("./workspace-BTe8HpiL.mjs");
const Route$4 = createFileRoute("/workspace")({
  validateSearch: (search) => {
    return {
      exp: search.exp
    };
  },
  head: () => ({
    meta: [{
      title: "Workspace — VLMS"
    }, {
      name: "description",
      content: "Isolated runtime workspace for student experiments."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./resources-SA56lLnz.mjs");
const Route$3 = createFileRoute("/resources")({
  head: () => ({
    meta: [{
      title: "Resources — VLMS"
    }, {
      name: "description",
      content: "Reference materials, manuals, and reading lists for every lab track."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./courses-CCmejs-N.mjs");
const Route$2 = createFileRoute("/courses")({
  head: () => ({
    meta: [{
      title: "Courses — VLMS"
    }, {
      name: "description",
      content: "Technical courses for the curriculum."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DbYaGV2e.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — VLMS Virtual Lab"
    }, {
      name: "description",
      content: "Production-grade academic sandbox for computer science curricula."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./course._courseId-0nyVj3tg.mjs");
const Route = createFileRoute("/course/$courseId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WorkspaceRoute = Route$4.update({
  id: "/workspace",
  path: "/workspace",
  getParentRoute: () => Route$5
});
const ResourcesRoute = Route$3.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$5
});
const CoursesRoute = Route$2.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const CourseCourseIdRoute = Route.update({
  id: "/course/$courseId",
  path: "/course/$courseId",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  CoursesRoute,
  ResourcesRoute,
  WorkspaceRoute,
  CourseCourseIdRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ErrorGraphic as E,
  Route$4 as R,
  Route as a,
  router as r
};
