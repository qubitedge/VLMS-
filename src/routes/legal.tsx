import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ShieldCheck,
  Lock,
  FileText,
  Copyright,
  ShieldAlert,
  Terminal,
  Sparkles,
  ExternalLink,
  Search,
  X,
  Copy,
  Check,
  Printer,
  ChevronRight,
  Mail,
  Send,
  Building,
  Server,
  Database,
  Cpu,
  AlertCircle,
  HelpCircle,
  Layers,
  BookOpen,
  ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";
import {
  POLICY_SECTIONS,
  THIRD_PARTY_LICENSES,
  LEGAL_METADATA,
  type PolicySection
} from "@/lib/legal-data";

interface LegalSearch {
  tab?: string;
  section?: string;
  q?: string;
}

export const Route = createFileRoute("/legal")({
  validateSearch: (search: Record<string, unknown>): LegalSearch => {
    return {
      tab: typeof search.tab === "string" ? search.tab : undefined,
      section: typeof search.section === "string" ? search.section : undefined,
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Privacy & Policies — VLMS Legal Hub" },
      {
        name: "description",
        content: "Authoritative platform policies, Privacy Policy, Terms of Service, Copyright & IP, Acceptable Use, and Open Source Licenses for Virtual Lab Management System.",
      },
    ],
  }),
  component: LegalPage,
});

export function LegalPage() {
  const searchParams = useSearch({ from: "/legal" });
  
  const [activeTab, setActiveTab] = useState<string>(searchParams.tab || "all");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q || "");
  const [activeSectionId, setActiveSectionId] = useState<string>(searchParams.section || "introduction");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Contact & Report Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    severity: "normal",
    subject: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync tab with URL search parameter if changed
  useEffect(() => {
    if (searchParams.tab) {
      setActiveTab(searchParams.tab);
    }
  }, [searchParams.tab]);

  // Sync direct section scroll on mount or URL param change
  useEffect(() => {
    if (searchParams.section) {
      setActiveSectionId(searchParams.section);
      const element = document.getElementById(searchParams.section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchParams.section]);

  // Scrollspy observer to highlight active section in TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = POLICY_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSectionId(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter sections based on active category tab & search query
  const filteredSections = useMemo(() => {
    return POLICY_SECTIONS.filter((section) => {
      // Tab category filter
      if (activeTab !== "all" && section.category !== activeTab) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      
      const inTitle = section.title.toLowerCase().includes(q);
      const inSummary = section.summary.toLowerCase().includes(q);
      const inContent = section.content.some((c) => c.toLowerCase().includes(q));
      const inSubsections = section.subsections?.some((sub) =>
        sub.subtitle.toLowerCase().includes(q) ||
        sub.details.some((d) => d.toLowerCase().includes(q)) ||
        sub.items?.some((item) => item.label.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q))
      );

      return inTitle || inSummary || inContent || inSubsections;
    });
  }, [activeTab, searchQuery]);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/legal?section=${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Clause link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || !formData.consent) {
      toast.error("Please fill all required fields and accept the acknowledgement.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      toast.success("Your ticket has been logged successfully! Ticket ID: #VLMS-" + Math.floor(100000 + Math.random() * 900000));
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-24 text-foreground selection:bg-cyan/30 selection:text-foreground">
      
      {/* Hero Header Section */}
      <div className="relative border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-cyan/5 via-transparent to-transparent pt-12 pb-14 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono font-semibold uppercase tracking-wider mb-5 animate-fade-in">
            <ShieldCheck className="size-3.5" />
            Legal & Governance Architecture
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground">
            Privacy & Policies
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed">
            Your data, your learning, your trust. Authoritative guidelines governing the Virtual Lab Management System.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="px-3 py-1 rounded-md bg-secondary border border-border">
              Effective: {LEGAL_METADATA.effectiveDate}
            </span>
            <span className="px-3 py-1 rounded-md bg-secondary border border-border">
              Last Updated: {LEGAL_METADATA.lastUpdated}
            </span>
            <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Jurisdiction: India & Global EdTech
            </span>
          </div>

          {/* Quick Search and Action Toolbar */}
          <div className="mt-8 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search across all policies, AI rules, clauses, or licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/60 backdrop-blur-md border border-border rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20 transition-all placeholder:text-muted-foreground/70 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                  title="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-sm font-semibold text-foreground transition-all shadow-sm shrink-0"
              title="Print policy document"
            >
              <Printer className="size-4 text-muted-foreground" />
              Print Policy
            </button>
          </div>

          {/* Policy Quick Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-4xl">
            {[
              { id: "all", label: "All Policies", icon: Layers },
              { id: "privacy", label: "Privacy Policy", icon: Lock },
              { id: "terms", label: "Terms of Service", icon: FileText },
              { id: "copyright", label: "Copyright & IP", icon: Copyright },
              { id: "acceptable-use", label: "Acceptable Use", icon: ShieldAlert },
              { id: "licenses", label: "Third-Party Licenses", icon: Terminal },
              { id: "contact", label: "Contact & Report", icon: Mail },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  if (id !== "all") {
                    const firstMatch = POLICY_SECTIONS.find((s) => s.category === id);
                    if (firstMatch) scrollToSection(firstMatch.id);
                  }
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 ${
                  activeTab === id
                    ? "bg-cyan text-cyan-foreground shadow-md shadow-cyan/20 scale-105"
                    : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/70"
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Content Layout with Sticky Left TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Sticky Table of Contents (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-lg shadow-black/5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan">
                  <BookOpen className="size-3.5" />
                  Table of Contents
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {POLICY_SECTIONS.length} Clauses
                </span>
              </div>

              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {POLICY_SECTIONS.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  const isVisible = activeTab === "all" || sec.category === activeTab;

                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-start gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-cyan/15 text-foreground font-semibold border-l-3 border-cyan shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      } ${!isVisible ? "opacity-40" : ""}`}
                    >
                      <span className={`font-mono text-[11px] shrink-0 mt-0.5 ${isActive ? "text-cyan font-bold" : "text-muted-foreground/60"}`}>
                        {sec.number}
                      </span>
                      <span className="truncate flex-1 leading-snug">{sec.title}</span>
                      {isActive && <ChevronRight className="size-3.5 text-cyan shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>VLMS Governance Portal</span>
                <span className="text-cyan font-semibold">v2.4 (2026)</span>
              </div>
            </div>

            {/* Support Callout Box in Left Sidebar */}
            <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm flex items-start gap-3 text-xs">
              <ShieldAlert className="size-5 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Need Institutional Verification?</p>
                <p className="text-muted-foreground mt-0.5 leading-relaxed text-[11.5px]">
                  Universities requiring official data processing agreements (DPA) can contact our compliance team.
                </p>
                <a
                  href="mailto:grievance@vlms.edu.in"
                  className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold mt-2 hover:underline"
                >
                  grievance@vlms.edu.in <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Main Policy Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {filteredSections.length === 0 ? (
              <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-border bg-secondary/20">
                <AlertCircle className="size-10 text-muted-foreground mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-semibold text-foreground">No matching policy clauses found</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                  No policy sections matched "{searchQuery}". Try broadening your search or reset the filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan text-cyan-foreground text-xs font-semibold hover:bg-cyan/90 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredSections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 p-6 sm:p-8 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md shadow-md transition-all duration-300 hover:border-cyan/40"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <span className="size-8 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan font-mono text-xs font-bold flex items-center justify-center">
                        {sec.number}
                      </span>
                      <div>
                        <h2 className="text-2xl font-display font-bold tracking-tight text-foreground">
                          {sec.title}
                        </h2>
                        <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
                          Category: {sec.category.replace("-", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleCopyLink(sec.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium border border-border transition-colors"
                        title="Copy direct link to this clause"
                      >
                        {copiedId === sec.id ? (
                          <>
                            <Check className="size-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Section Summary */}
                  {sec.summary && (
                    <div className="mt-4 p-3.5 rounded-xl bg-secondary/40 border border-border/50 text-sm text-foreground/90 font-medium">
                      💡 {sec.summary}
                    </div>
                  )}

                  {/* Body Paragraphs */}
                  <div className="mt-5 space-y-3.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {sec.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Subsections & Categorized Cards */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {sec.subsections.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl bg-secondary/30 border border-border/60"
                        >
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">
                              {sub.subtitle}
                            </h3>
                            {sub.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-mono font-medium">
                                {sub.badge}
                              </span>
                            )}
                          </div>

                          {sub.details && sub.details.length > 0 && (
                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                              {sub.details.map((d, dIdx) => (
                                <p key={dIdx}>{d}</p>
                              ))}
                            </div>
                          )}

                          {/* Grid of structured item cards */}
                          {sub.items && sub.items.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                              {sub.items.map((item, iIdx) => (
                                <div
                                  key={iIdx}
                                  className="p-3.5 rounded-xl bg-card border border-border/70 hover:border-cyan/40 transition-colors flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="font-semibold text-foreground text-xs sm:text-sm">
                                        {item.label}
                                      </span>
                                      {item.tag && (
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                          {item.tag}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                      {item.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Special Callouts (AI, Security, Warning, Info) */}
                  {sec.callout && (
                    <div
                      className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 text-sm ${
                        sec.callout.type === "ai"
                          ? "bg-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-200"
                          : sec.callout.type === "security"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-200"
                          : sec.callout.type === "warning"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200"
                          : "bg-cyan/10 border-cyan/20 text-cyan-950 dark:text-cyan-200"
                      }`}
                    >
                      {sec.callout.type === "ai" && <Sparkles className="size-5 text-purple-600 shrink-0 mt-0.5" />}
                      {sec.callout.type === "security" && <Lock className="size-5 text-emerald-600 shrink-0 mt-0.5" />}
                      {sec.callout.type === "warning" && <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />}
                      {sec.callout.type === "info" && <HelpCircle className="size-5 text-cyan shrink-0 mt-0.5" />}
                      
                      <div>
                        <strong className="block font-bold mb-0.5">{sec.callout.title}</strong>
                        <span className="opacity-90 leading-relaxed text-xs sm:text-sm">{sec.callout.message}</span>
                      </div>
                    </div>
                  )}

                  {/* Embedded Third-Party License Table for Section 14 */}
                  {sec.id === "third-party-licenses" && (
                    <div className="mt-8">
                      <div className="overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-sm">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-secondary/70 border-b border-border text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                            <tr>
                              <th className="px-4 py-3.5">Package / Dependency</th>
                              <th className="px-4 py-3.5">Purpose in VLMS</th>
                              <th className="px-4 py-3.5">License</th>
                              <th className="px-4 py-3.5 text-right">Source</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 text-foreground">
                            {THIRD_PARTY_LICENSES.map((pkg, pIdx) => (
                              <tr key={pIdx} className="hover:bg-secondary/30 transition-colors">
                                <td className="px-4 py-3 font-semibold font-mono text-xs">
                                  {pkg.name}
                                  {pkg.version && (
                                    <span className="block font-normal text-[11px] text-muted-foreground">
                                      v{pkg.version}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground text-xs leading-relaxed">
                                  {pkg.purpose}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10.5px] font-bold border border-emerald-500/20">
                                    {pkg.license}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <a
                                    href={pkg.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-cyan hover:underline text-xs font-medium"
                                  >
                                    Project <ExternalLink className="size-3" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        All referenced software is distributed under their respective open-source licenses. Full MIT/ISC license texts are retained in downstream distributions.
                      </p>
                    </div>
                  )}

                  {/* Interactive Contact & Report Form inside Section 15 */}
                  {sec.id === "contact-and-reporting" && (
                    <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-secondary/40 border border-border/80">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="size-5 text-cyan" />
                        <h3 className="font-display font-bold text-lg text-foreground">
                          Direct Report / Grievance Submission
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                        Submit security vulnerability reports, privacy inquiries, copyright notices, or platform bugs directly to our administrative desk.
                      </p>

                      {formSubmitted ? (
                        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-fade-in">
                          <Check className="size-8 text-emerald-500 mx-auto" />
                          <h4 className="font-bold text-foreground text-base">Inquiry Submitted Successfully</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                            Thank you. Our Grievance and Support Officer has logged your inquiry. You will receive an official confirmation at <strong className="text-foreground">{formData.email}</strong> within 24 hours.
                          </p>
                          <button
                            onClick={() => {
                              setFormSubmitted(false);
                              setFormData({
                                name: "",
                                email: "",
                                category: "general",
                                severity: "normal",
                                subject: "",
                                message: "",
                                consent: false,
                              });
                            }}
                            className="mt-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-xs font-semibold border border-border text-foreground transition-all"
                          >
                            Submit Another Report
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitReport} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-foreground mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Student / Faculty Name"
                                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-foreground mb-1.5">
                                Institutional / Academic Email <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="student@college.edu.in"
                                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-foreground mb-1.5">
                                Inquiry Category
                              </label>
                              <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                              >
                                <option value="general">General Support / Lab Question</option>
                                <option value="privacy">Privacy & Data Subject Request</option>
                                <option value="security">Security Vulnerability / Bug</option>
                                <option value="copyright">Copyright / IP Notice</option>
                                <option value="institutional">Institutional Partnership (qubitedge)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-foreground mb-1.5">
                                Severity Level
                              </label>
                              <select
                                value={formData.severity}
                                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                              >
                                <option value="normal">Normal / Standard Query</option>
                                <option value="academic">Academic Disruption (Exam / Assessment)</option>
                                <option value="critical">Critical (Data Incident / Security)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Subject <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              placeholder="Brief summary of the issue or inquiry"
                              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1.5">
                              Detailed Description & Steps to Reproduce <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={4}
                              required
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Provide relevant lab name, course code, screenshots URL, or specific clauses..."
                              className="w-full bg-background border border-border rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyan transition-colors"
                            />
                          </div>

                          <div className="flex items-start gap-2.5 pt-2">
                            <input
                              type="checkbox"
                              id="consent-check"
                              required
                              checked={formData.consent}
                              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                              className="mt-1 rounded border-border text-cyan focus:ring-cyan"
                            />
                            <label htmlFor="consent-check" className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none">
                              I confirm that the information submitted is accurate and understand that my communication will be processed according to the <strong className="text-foreground">VLMS Privacy Policy</strong>.
                            </label>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan text-cyan-foreground font-semibold text-xs sm:text-sm hover:bg-cyan/90 transition-all shadow-md shadow-cyan/20 active:scale-95 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>Logging Ticket...</>
                            ) : (
                              <>
                                <Send className="size-4" />
                                Submit Official Report
                              </>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </section>
              ))
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
