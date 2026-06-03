import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { LayoutDashboard, Database, FlaskConical, BookOpen, Beaker } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Route not found in sandbox registry.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Return to Dashboard</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Runtime fault</h1>
        <p className="mt-2 text-sm text-muted-foreground">The sandbox encountered an unexpected exception.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Re-initialize</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/domains", label: "Domains", icon: Database },
  { to: "/workspace", label: "Workspace", icon: FlaskConical },
  { to: "/resources", label: "Resources", icon: BookOpen },
] as const;

function DynamicIsland() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(960px,calc(100vw-1.5rem))]">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur-xl px-2 py-2 shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--foreground)_35%,transparent)]">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full">
          <div className="grid place-items-center size-7 rounded-full bg-primary text-primary-foreground">
            <Beaker className="size-3.5" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-bold text-[13px] tracking-tight">VLMS</span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">Virtual Lab</span>
          </div>
        </Link>

        <span className="hidden md:block h-6 w-px bg-border" />

        {/* Nav */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "bg-secondary text-foreground shadow-sm" }}
            >
              <Icon className="size-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <DynamicIsland />
        <main className="pt-24">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
