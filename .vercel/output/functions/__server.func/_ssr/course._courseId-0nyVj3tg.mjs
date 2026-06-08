import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as courses } from "./course-data-BYldHNCF.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Route, E as ErrorGraphic } from "./router-DMzmU1BD.mjs";
import { I as Info, n as Target, q as List, r as LayoutTemplate, B as Beaker, s as MessageSquare, A as ArrowLeft, e as Book, j as Code, t as Star } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/lottie-react.mjs";
import "../_libs/lottie-web.mjs";
function CoursePage() {
  const {
    courseId
  } = Route.useParams();
  const course = courses[courseId];
  if (!course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[50vh] flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorGraphic, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mt-4", children: "Course Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-md", children: "The course you are looking for does not exist in the registry." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-cyan-foreground hover:bg-cyan/90 transition-all shadow-lg hover:scale-105", children: "Back to Courses" })
    ] });
  }
  const tabs = reactExports.useMemo(() => {
    const t = [];
    if (course.introduction) t.push({
      id: "Introduction",
      icon: Info
    });
    t.push({
      id: "Objective",
      icon: Target
    });
    if (course.targetAudience) t.push({
      id: "Target Audience",
      icon: List
    });
    if (course.alignment) t.push({
      id: "Course Alignment",
      icon: LayoutTemplate
    });
    t.push({
      id: "List of Experiments",
      icon: Beaker
    });
    t.push({
      id: "Feedback",
      icon: MessageSquare
    });
    return t;
  }, [course]);
  const [activeTab, setActiveTab] = reactExports.useState(tabs[0]?.id);
  const [rating, setRating] = reactExports.useState(0);
  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentTab = tabs[currentTabIndex] ? activeTab : tabs[0].id;
  const prevTab = currentTabIndex > 0 ? tabs[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < tabs.length - 1 ? tabs[currentTabIndex + 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 lg:px-10 py-12 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        " Back to Courses"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-xs font-medium text-muted-foreground mb-4 block w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "size-3.5" }),
        " Syllabus Overview"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl lg:text-5xl font-bold tracking-tight mb-12", children: course.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[250px_1fr] gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-24 flex flex-col gap-1 border-r border-border/50 pr-4 h-fit", children: tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all text-left ${isActive ? "bg-secondary text-cyan shadow-sm translate-x-1" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-4 ${isActive ? "text-cyan" : ""}` }),
          tab.id
        ] }, tab.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[500px] flex flex-col justify-between pb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards", children: [
          currentTab === "Introduction" && course.introduction && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Introduction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: course.introduction.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p }, i)) })
          ] }),
          currentTab === "Objective" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Objective" }),
            course.id === "ai-tools" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/ai-labs-flowchart.jpg", alt: "Top 5 AI Labs Hands-on Learning Journey", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            course.id === "ml" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-2xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/ml-flowchart.jpg", alt: "Machine Learning Journey", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            course.id === "c-programming" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/c-flowchart.jpg", alt: "C Programming Curriculum Flowchart", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            course.id === "dbms" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/dbms-flowchart.jpg", alt: "DBMS Syllabus Journey", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            course.id === "data-structures-using-c-programming" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/ds-flowchart.png", alt: "Data Structures Curriculum Flowchart", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            course.id === "python" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 max-w-4xl mx-auto overflow-hidden rounded-xl border border-border/50 bg-secondary/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/python-flowchart.png", alt: "Python Programming Curriculum Flowchart", className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" }) }),
            Array.isArray(course.objectives) ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-2 text-muted-foreground leading-relaxed", children: course.objectives.map((obj, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: obj }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: course.objectives })
          ] }),
          currentTab === "Target Audience" && course.targetAudience && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Target Audience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Primary Audience" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: course.targetAudience.primary })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Pre-requisites" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-1.5", children: course.targetAudience.prerequisites.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: p }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Also Useful For" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-1.5", children: course.targetAudience.usefulFor.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: p }, i)) })
              ] })
            ] })
          ] }),
          currentTab === "Course Alignment" && course.alignment && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Course Alignment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-left text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground w-48 bg-secondary/20", children: "University" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.university })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Department" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.department })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.course })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Credits" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.credits })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Year / Semester" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.yearSem })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Applicable Branches" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.branches })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Total Experiments" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.totalExperiments })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold text-foreground bg-secondary/20", children: "Compiler Used" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: course.alignment.compiler })
              ] })
            ] }) }) }),
            course.alignment.units && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Unit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Topics Covered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Weeks" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/50", children: course.alignment.units.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: u.unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: u.topics }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: u.weeks })
              ] }, i)) })
            ] }) })
          ] }),
          currentTab === "List of Experiments" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "List of Experiments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: course.weeks.map((week, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border bg-secondary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 grid place-items-center size-10 rounded-lg bg-primary/10 text-primary font-bold font-mono", children: [
                  "W",
                  index + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: week.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: week.objective })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-1 text-foreground/80", children: week.tutorial }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: week.labTitle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono uppercase tracking-wider text-cyan mb-3", children: "Experiments" }),
                  week.experiments.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50 hover:border-border transition-colors", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                        i + 1,
                        "."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: exp.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/workspace", search: {
                      exp: exp.id
                    }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "size-3.5" }),
                      " Solve"
                    ] })
                  ] }, exp.id))
                ] })
              ] })
            ] }, index)) })
          ] }),
          currentTab === "Feedback" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Feedback" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-8 max-w-3xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "We value your feedback. Please take a few minutes to share your experience using this virtual laboratory. Your responses will help us improve the quality, usability, and content of the experiments." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
                e.preventDefault();
                toast.success("Feedback submitted successfully!", {
                  description: "Thank you for helping us improve."
                });
                e.target.reset();
                setRating(0);
              }, className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Name (Optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors", placeholder: "Your name" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Institute / College Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors", placeholder: "Your institute" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Course / Program *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, defaultValue: course.title, className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Year of Study *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Year" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "1st Year" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "2nd Year" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "3rd Year" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "4th Year" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Rating of the Lab *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRating(star), className: "focus:outline-none hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `size-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}` }) }, star)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-4 border-t border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Was the experiment easy to understand?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: ["Yes", "No", "Partially"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "easy", value: opt, required: true, className: "accent-cyan" }),
                      " ",
                      opt
                    ] }, `easy-${opt}`)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Were the instructions clear and well-structured?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: ["Yes", "No", "Partially"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "clear", value: opt, required: true, className: "accent-cyan" }),
                      " ",
                      opt
                    ] }, `clear-${opt}`)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Did the virtual lab help you understand the concept better?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: ["Yes", "No", "Partially"].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground cursor-pointer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: "helpful", value: opt, required: true, className: "accent-cyan" }),
                      " ",
                      opt
                    ] }, `helpful-${opt}`)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 pt-4 border-t border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Which experiment did you find most useful? *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Experiment" }),
                      course.weeks.flatMap((w) => w.experiments).map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: exp.id, children: exp.title }, `useful-${exp.id}`))
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Which experiment needs improvement? *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, className: "w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan transition-colors text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Experiment" }),
                      course.weeks.flatMap((w) => w.experiments).map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: exp.id, children: exp.title }, `improve-${exp.id}`))
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Suggestions or Comments" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan transition-colors resize-none", placeholder: "Share your thoughts..." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-6 py-2.5 rounded-lg bg-cyan text-cyan-foreground font-medium text-sm hover:bg-cyan/90 transition-colors shadow-sm hover:shadow active:scale-[0.98]", children: "Submit Feedback" }) })
              ] })
            ] })
          ] })
        ] }, currentTab),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-border/50 flex items-center justify-between", children: [
          prevTab ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setActiveTab(prevTab.id);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors", children: [
            "← ",
            prevTab.id
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          nextTab && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setActiveTab(nextTab.id);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors shadow-sm", children: [
            nextTab.id,
            " →"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  CoursePage as component
};
