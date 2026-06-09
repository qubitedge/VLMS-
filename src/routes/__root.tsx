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
import { Loader } from "@/components/Loader";
import { ErrorGraphic } from "@/components/ErrorGraphic";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center flex flex-col items-center">
        <ErrorGraphic />
        <h1 className="text-3xl font-bold text-foreground font-display mt-4">Route Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The requested experiment or page could not be found in the registry. Check your connection or return to the main dashboard.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-cyan-foreground hover:bg-cyan/90 transition-all shadow-lg hover:scale-105">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center flex flex-col items-center">
        <ErrorGraphic />
        <h1 className="text-3xl font-bold text-foreground font-display mt-4">Runtime Fault</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          The sandbox encountered an unexpected exception. Our systems have logged this issue.
        </p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2.5 text-sm font-semibold hover:bg-red-500/20 transition-all shadow-lg hover:scale-105">
          Re-initialize System
        </button>
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
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: Loader,
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
  { to: "/courses", label: "Courses", icon: Database },
  { to: "/workspace", label: "Workspace", icon: FlaskConical },
  { to: "/resources", label: "Resources", icon: BookOpen },
] as const;

import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";
import { User } from "lucide-react";

function ProfileNav() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const profileStr = localStorage.getItem('currentUserProfile');
    if (profileStr) {
      try {
        const profile = JSON.parse(profileStr);
        if (profile.name) {
          setIsLoggedIn(true);
          setName(profile.name);
        }
      } catch (e) {}
    }
  }, [showAuth]);

  return (
    <>
      {isLoggedIn ? (
        <Link to="/profile" className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-secondary transition-colors group">
          <span className="hidden sm:block text-xs font-medium text-foreground">{name.split(' ')[0]}</span>
          <div className="grid place-items-center size-7 rounded-full bg-cyan/20 text-cyan group-hover:bg-cyan/30 transition-colors">
            <User className="size-3.5" />
          </div>
        </Link>
      ) : (
        <button onClick={() => setShowAuth(true)} className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-secondary transition-colors group text-muted-foreground hover:text-foreground">
          <span className="hidden sm:block text-xs font-medium">Sign In</span>
          <div className="grid place-items-center size-7 rounded-full bg-secondary text-foreground group-hover:bg-secondary/80 transition-colors">
            <User className="size-3.5" />
          </div>
        </button>
      )}

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onAuthenticated={() => {
          setShowAuth(false);
          setIsLoggedIn(true);
        }} 
        courseId="" 
      />
    </>
  );
}

function DynamicIsland() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[min(960px,calc(100vw-1.5rem))]">
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/70 backdrop-blur-xl px-2 py-2 shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--foreground)_35%,transparent)]">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full">
          <div className="grid place-items-center size-8 rounded-full bg-white overflow-hidden shadow-sm">
            <img src="/jntugvcev.b33bb43b07b2037ab043.svg" alt="JNTU GV" className="w-full h-full object-contain p-[2px]" />
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

        <span className="h-6 w-px bg-border" />

        {/* Profile Nav */}
        <ProfileNav />
      </div>
    </div>
  );
}

import { Chatbot } from "@/components/Chatbot";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen relative">
        <DynamicIsland />
        <main className="pt-24">
          <Outlet />
        </main>
        <Chatbot />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
