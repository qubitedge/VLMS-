import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  Book, 
  ExternalLink 
} from "lucide-react";
import { toast } from "sonner";

// Import all 11 short notes
import { cShortNotes } from "@/lib/c-short-notes";
import { pythonShortNotes } from "@/lib/python-short-notes";
import { javaShortNotes } from "@/lib/java-short-notes";
import { dsCourse } from "@/lib/ds-data";
import { dbmsShortNotes } from "@/lib/dbms-short-notes";
import { mlShortNotes } from "@/lib/ml-short-notes";
import { aiToolsShortNotes } from "@/lib/ai-tools-short-notes";
import { llmsShortNotes } from "@/lib/llms-short-notes";
import { adsShortNotes } from "@/lib/ads-short-notes";
import { iotShortNotes } from "@/lib/iot-short-notes";
import { quantumShortNotes } from "@/lib/quantum-short-notes";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — VLMS" },
      { name: "description", content: "Reference materials, manuals, and reading lists for every lab track." },
    ],
  }),
  component: ResourcesPage,
});

type Resource = {
  id: string;
  name: string;
  title: string;
  notes: string;
  size: string;
};

// Helper to determine unit-specific images to inject into short notes
function getUnitImage(resourceId: string, text: string) {
  const cleanText = text.trim();
  
  if (resourceId === 'data-structures-using-c-programming') {
    if (cleanText.includes('INTRODUCTION TO DATA STRUCTURES')) {
      return { src: '/ds_types_of_data_structures.webp', alt: 'Types of Data Structures' };
    }
    if (cleanText.startsWith('UNIT II')) {
      return { src: '/ds_unit2_linked_lists.webp', alt: 'Linked Lists' };
    }
    if (cleanText.startsWith('UNIT III')) {
      return { src: '/ds_unit3_stacks.webp', alt: 'Stacks' };
    }
  }
  
  if (resourceId === 'c-programming') {
    if (cleanText.startsWith('UNIT I')) {
      return { src: '/c_unit1.webp', alt: 'Computer Problem Solving' };
    }
    if (cleanText.startsWith('UNIT II')) {
      return { src: '/c_unit2.webp', alt: 'Intro to C' };
    }
    if (cleanText.startsWith('UNIT III')) {
      return { src: '/c_unit3.webp', alt: 'Arrays and Pointers' };
    }
  }
  
  if (resourceId === 'machine-learning') {
    if (cleanText.startsWith('UNIT I')) {
      return { src: '/ml-unit1.webp', alt: 'Introduction to ML' };
    }
    if (cleanText.startsWith('UNIT II')) {
      return { src: '/ml-unit2.webp', alt: 'Tree Based and Ensemble Learning' };
    }
    if (cleanText.startsWith('UNIT III')) {
      return { src: '/ml-unit3.webp', alt: 'Linear Models and Probabilistic Learning' };
    }
  }
  
  if (resourceId === 'python') {
    if (cleanText.startsWith('UNIT I')) {
      return { src: '/python_unit1.webp', alt: 'Intro to Python' };
    }
    if (cleanText.startsWith('UNIT II')) {
      return { src: '/python_unit2.webp', alt: 'Functions, Strings, and Lists' };
    }
    if (cleanText.startsWith('UNIT III')) {
      return { src: '/python_unit3.webp', alt: 'Dictionaries, Tuples, and Sets' };
    }
  }

  return null;
}

// Parse notes into React element hierarchy
function parseNotes(notesText: string, resourceId: string) {
  const lines = notesText.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line.trim();
    if (!text) continue;

    if (text === '[START_SQL_CODE]' || text === '[START_CODE_SNIPPET]') {
      inCodeBlock = true;
      codeLines = [];
      continue;
    }

    if (text === '[END_SQL_CODE]') {
      inCodeBlock = false;
      const currentCode = codeLines.join('\n');
      elements.push(
        <div key={`code-${i}`} className="my-6 rounded-xl border border-slate-200 bg-slate-950 font-mono text-sm shadow-md overflow-hidden text-left text-emerald-400">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-300 font-semibold text-xs tracking-wider uppercase">
            SQL Code Snippet
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed m-0">
            <code>{currentCode}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (text === '[END_CODE_SNIPPET]') {
      inCodeBlock = false;
      const currentCode = codeLines.join('\n');
      elements.push(
        <div key={`code-${i}`} className="my-6 rounded-xl border border-slate-200 bg-slate-950 font-mono text-sm shadow-md overflow-hidden text-left text-emerald-400">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-300 font-semibold text-xs tracking-wider uppercase">
            Code Snippet
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed m-0">
            <code>{currentCode}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (text.startsWith('UNIT ')) {
      elements.push(
        <h3 key={`unit-${i}`} className="text-2xl md:text-3xl font-black text-cyan-600 mt-12 mb-6 pb-2 border-b-2 border-cyan-100 flex items-center gap-2">
          <Book className="size-6 text-cyan-600 shrink-0" /> {text}
        </h3>
      );
    } else if (text === text.toUpperCase() && text.length > 5 && !text.includes('—')) {
      elements.push(
        <div key={`header-${i}`} className="bg-cyan-50 border border-cyan-100 shadow-sm text-cyan-800 px-5 py-2 rounded-xl font-bold text-lg mt-10 mb-4 inline-block tracking-tight">
          {text}
        </div>
      );
    } else if (text.endsWith(':')) {
      elements.push(
        <h5 key={`heading-${i}`} className="text-base font-bold text-orange-600 mt-8 mb-4 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded bg-orange-500 shrink-0"></div> {text}
        </h5>
      );
    } else if (text.match(/^[A-Z][a-zA-Z\s/]+$/) && text.length < 40 && !text.includes('—')) {
      elements.push(
        <h6 key={`subheading-${i}`} className="text-base font-bold text-slate-800 mt-6 mb-3 bg-slate-50 px-4 py-1.5 rounded-md border-l-4 border-cyan-500 inline-block shadow-sm">
          {text}
        </h6>
      );
    } else if (text.includes('—') && text.split('—')[0].length < 30) {
      const parts = text.split('—');
      elements.push(
        <div key={`divider-${i}`} className="pl-4 border-l-4 border-orange-300 my-3 py-2 bg-orange-50/50 rounded-r-lg shadow-sm text-sm">
          <span className="font-bold text-slate-800">{parts[0]}</span> 
          <span className="text-slate-400 mx-2">—</span> 
          <span className="text-slate-600">{parts.slice(1).join('—')}</span>
        </div>
      );
    } else if (text.startsWith('![') && text.includes('](') && text.endsWith(')')) {
      const altMatch = text.match(/!\[(.*?)\]/);
      const srcMatch = text.match(/\((.*?)\)/);
      if (altMatch && srcMatch) {
        const alt = altMatch[1];
        const src = srcMatch[1];
        elements.push(
          <div key={`img-${i}`} className="my-8 p-4 bg-slate-50 rounded-2xl border-4 border-dashed border-slate-200 flex justify-center group relative overflow-hidden max-w-4xl mx-auto">
            <img src={src} alt={alt} className="w-full h-auto object-contain max-w-full rounded-xl shadow-sm relative z-10" />
          </div>
        );
      }
    } else if (text.startsWith('[TABLE]:')) {
      const tableHtml = text.replace('[TABLE]:', '');
      elements.push(
        <div 
          key={`table-${i}`}
          className="my-6 overflow-x-auto rounded-xl border border-slate-200 p-2 bg-slate-50 text-sm" 
          dangerouslySetInnerHTML={{ __html: tableHtml }} 
        />
      );
    } else if (text.startsWith('[ER_DIAGRAM_EXAMPLE]')) {
      elements.push(
        <div key={`er-${i}`} className="my-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-md text-sm">
          <h4 className="text-xl font-bold text-cyan-700 mb-4">
            Comprehensive ER Diagram Scenario: University Database System
          </h4>
          
          <p className="text-slate-600 leading-relaxed mb-6">
            This scenario maps a University management system containing standard entities, complex tracking variables, a multi-tier staffing hierarchy, and dependent child units.
          </p>
    
          <div className="space-y-6">
            <div className="bg-slate-100/50 border-l-4 border-cyan-500 p-4 rounded-r-xl">
              <span className="font-bold text-cyan-700 text-base block mb-1">1. Strong Entities & Complex Attributes</span>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">Student (Strong Entity):</strong> Identified uniquely by <span className="underline">RollNo</span> (Key Attribute). Features a composite <span className="italic">Name (FirstName + LastName)</span>, a multi-valued <span className="italic">Phone_No</span> (double oval), and a derived <span className="italic">Age</span> calculated straight from their stored <span className="italic">DOB</span> field (dashed oval).
              </p>
            </div>
    
            <div className="bg-slate-100/50 border-l-4 border-orange-400 p-4 rounded-r-xl">
              <span className="font-bold text-orange-600 text-base block mb-1">2. Relationships & Cardinality Constraints</span>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">Enrolls_In (M:N Relationship):</strong> Connects <span className="italic">Student</span> and <span className="italic">Course</span>. Multiple students enroll in multiple courses simultaneously.
                <br />
                <strong className="text-slate-800 font-semibold">Manages (1:1 Relationship):</strong> Connects <span className="italic">Faculty</span> to <span className="italic">Department</span>. One professor manages at most one department, displaying <span className="font-semibold text-cyan-600">Total Participation</span> (double line) from the Department side—every department must have a manager.
              </p>
            </div>
    
            <div className="bg-slate-100/50 border-l-4 border-purple-400 p-4 rounded-r-xl">
              <span className="font-bold text-purple-600 text-base block mb-1">3. Enhanced ER (EER) Hierarchy</span>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">Person (Superclass):</strong> Contains general elements like ID, Email, and Location. Through <span className="font-semibold text-cyan-600">Specialization</span>, it breaks down into specialized <strong className="text-slate-800 font-semibold">Student</strong> and <strong className="text-slate-800 font-semibold">Faculty</strong> subclasses, inheriting all primary roots.
              </p>
            </div>
    
            <div className="bg-slate-100/50 border-l-4 border-rose-400 p-4 rounded-r-xl">
              <span className="font-bold text-rose-500 text-base block mb-1">4. Weak Entity Architecture</span>
              <p className="text-slate-600 leading-relaxed">
                <strong className="text-slate-800 font-semibold">Dependent (Weak Entity):</strong> Tracks faculty family members for health insurance benefits. It has no independent primary identifier; it utilizes a partial key field <span className="border-b border-dashed border-slate-700">Dep_Name</span> alongside a double-diamond <span className="font-semibold text-cyan-600">Identifying Relationship</span> linked back to its strong parent entity (<span className="italic">Faculty</span>).
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 flex justify-center">
            <img 
              src="/dbms_university_er_example.webp" 
              alt="Complete University Database System ER Diagram Model" 
              className="max-h-80 object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>
      );
    } else {
      if (text.includes('Types of Data Structures:')) {
        elements.push(<div key={`text-${i}`}>{line}</div>);
        continue;
      }
      
      const unitImage = getUnitImage(resourceId, text);

      elements.push(
        <div key={`text-${i}`} className="my-2">
          <div className="flex gap-3 items-start ml-2 md:ml-6 group text-sm md:text-base">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan/50 shrink-0"></div>
            <p className="text-slate-700 leading-relaxed">{text}</p>
          </div>
          {unitImage && (
            <div className="my-8 p-4 bg-slate-50 rounded-2xl border-4 border-dashed border-slate-200 flex justify-center max-w-3xl mx-auto">
              <img src={unitImage.src} alt={unitImage.alt} className="w-full h-auto object-contain max-w-full rounded-xl shadow-sm relative z-10 animate-fade-in" />
            </div>
          )}
        </div>
      );
    }
  }

  return elements;
}

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  const resourcesList = useMemo<Resource[]>(() => {
    return [
      { id: "c-programming", name: "c_programming_short_notes.pdf", title: "C Programming", notes: cShortNotes, size: "26 KB" },
      { id: "data-structures-using-c-programming", name: "data_structures_short_notes.pdf", title: "Data Structures using C Programming", notes: dsCourse.shortNotes || "", size: "18 KB" },
      { id: "python", name: "python_short_notes.pdf", title: "Python Programming", notes: pythonShortNotes, size: "6 KB" },
      { id: "java", name: "java_short_notes.pdf", title: "Java Programming", notes: javaShortNotes, size: "34 KB" },
      { id: "dbms", name: "dbms_short_notes.pdf", title: "Database Management Systems (DBMS)", notes: dbmsShortNotes, size: "40 KB" },
      { id: "machine-learning", name: "machine_learning_short_notes.pdf", title: "Machine Learning", notes: mlShortNotes, size: "32 KB" },
      { id: "ai-tools", name: "ai_tools_short_notes.pdf", title: "AI Tools", notes: aiToolsShortNotes, size: "9 KB" },
      { id: "llms", name: "llms_short_notes.pdf", title: "Large Language Models (LLMs)", notes: llmsShortNotes, size: "12 KB" },
      { id: "advanced-data-structures", name: "advanced_data_structures_short_notes.pdf", title: "Advanced Data Structures", notes: adsShortNotes, size: "88 KB" },
      { id: "iot", name: "iot_short_notes.pdf", title: "Internet of Things (IoT)", notes: iotShortNotes, size: "27 KB" },
      { id: "quantum-computing", name: "quantum_computing_short_notes.pdf", title: "Quantum Computing", notes: quantumShortNotes, size: "36 KB" }
    ];
  }, []);

  const filteredResources = useMemo(() => {
    return resourcesList.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resourcesList, searchTerm]);

  return (
    <div className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan">Knowledge Base</div>
      <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold tracking-tight">Short Notes</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Access official curriculum short notes, reference manuals, and cheatsheets for all 11 core computer science labs.
      </p>

      {/* Search Bar */}
      <div className="mt-8 relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search short notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-secondary/30 backdrop-blur-sm border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan/50 transition-colors"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")} 
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Grid of PDF cards */}
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredResources.map((r) => (
          <div
            key={r.id}
            className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-cyan/40 hover:shadow-lg transition-all duration-300"
          >
            {/* PDF Style Preview Card Top Header */}
            <div className="relative aspect-[4/3] w-full bg-secondary/40 border-b border-border flex items-center justify-center overflow-hidden group-hover:bg-secondary/60 transition-colors">
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-red-500 text-[10px] font-bold text-white uppercase shadow-sm">
                PDF
              </div>
              <div className="flex flex-col items-center gap-2">
                <FileText className="size-12 text-red-500/80 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[11px] text-muted-foreground font-mono font-medium">{r.size}</span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 p-1.5 rounded-full border border-border hover:bg-background">
                <ExternalLink className="size-3.5 text-foreground" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 
                  className="font-display font-semibold text-foreground line-clamp-1 group-hover:text-cyan transition-colors" 
                  title={r.name}
                >
                  {r.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{r.title}</p>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedResource(r);
                    setZoomLevel(100);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan text-cyan-foreground text-xs font-semibold py-2.5 hover:bg-cyan/90 transition-all shadow-sm active:scale-95"
                >
                  Open Notes
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([r.notes], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = r.name.replace('.pdf', '_notes.txt');
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    toast.success("Download started!");
                  }}
                  className="px-3 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all border border-border"
                  title="Download TXT version"
                >
                  <Download className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="mt-12 text-center py-12 border border-dashed border-border rounded-3xl">
          <FileText className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-semibold text-lg text-foreground">No short notes found</h3>
          <p className="text-muted-foreground text-sm mt-1">Try refining your search terms.</p>
        </div>
      )}

      {/* Fullscreen PDF Viewer Modal Overlay */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-7xl h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Toolbar */}
            <div className="flex items-center gap-3 px-4 md:px-6 py-3 bg-slate-950 border-b border-slate-800 text-white justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="px-2 py-0.5 rounded bg-red-500 text-[10px] font-bold text-white uppercase shrink-0">
                  PDF
                </div>
                <span className="font-semibold truncate text-sm md:text-base font-mono">{selectedResource.name}</span>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {/* Zoom out */}
                <button
                  onClick={() => setZoomLevel(z => Math.max(z - 10, 70))}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="size-4" />
                </button>
                <span className="text-xs font-mono text-slate-400 w-10 text-center">{zoomLevel}%</span>
                {/* Zoom in */}
                <button
                  onClick={() => setZoomLevel(z => Math.min(z + 10, 150))}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="size-4" />
                </button>
                
                <div className="w-px h-4 bg-slate-800 mx-1" />
                
                {/* Print */}
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>${selectedResource.title} - Short Notes</title>
                            <style>
                              body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; line-height: 1.6; color: #1e293b; }
                              pre { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; overflow-x: auto; white-space: pre-wrap; }
                              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                              th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
                              th { background: #f1f5f9; font-weight: bold; }
                              h1 { border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                              h3 { color: #0284c7; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                              h4 { background: #f1f5f9; padding: 8px 12px; border-radius: 6px; display: inline-block; margin-top: 20px; }
                              h5 { color: #ea580c; margin-top: 25px; }
                              h6 { background: #f8fafc; padding: 4px 8px; border-left: 4px solid #0ea5e9; display: inline-block; margin-top: 15px; }
                              .bullet-point { display: flex; gap: 10px; margin-bottom: 8px; }
                              .bullet-dot { font-size: 1.2em; color: #0ea5e9; }
                            </style>
                          </head>
                          <body>
                            <h1>${selectedResource.title} — Short Notes</h1>
                            ${selectedResource.notes.split(/\r?\n/).map(line => {
                              const text = line.trim();
                              if (!text) return '';
                              if (text === '[START_SQL_CODE]' || text === '[START_CODE_SNIPPET]') return '<pre><code>';
                              if (text === '[END_SQL_CODE]' || text === '[END_CODE_SNIPPET]') return '</code></pre>';
                              if (text.startsWith('UNIT ')) return `<h3>${text}</h3>`;
                              if (text === text.toUpperCase() && text.length > 5 && !text.includes('—')) return `<h4>${text}</h4>`;
                              if (text.endsWith(':')) return `<h5>${text}</h5>`;
                              if (text.match(/^[A-Z][a-zA-Z\\s/]+$/) && text.length < 40 && !text.includes('—')) return `<h6>${text}</h6>`;
                              if (text.includes('—') && text.split('—')[0].length < 30) {
                                const parts = text.split('—');
                                return `<div style="border-left: 3px solid #fdba74; padding-left: 10px; margin: 10px 0;"><strong>${parts[0]}</strong> — ${parts.slice(1).join('—')}</div>`;
                              }
                              if (text.startsWith('[TABLE]:')) return text.replace('[TABLE]:', '');
                              if (text.startsWith('![') && text.includes('](')) return '';
                              return `<div class="bullet-point"><span class="bullet-dot">&bull;</span><div>${text}</div></div>`;
                            }).join('\n')}
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                      printWindow.print();
                    }
                  }}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white hidden sm:block"
                  title="Print Document"
                >
                  <Printer className="size-4" />
                </button>
                
                {/* Download */}
                <button
                  onClick={() => {
                    const blob = new Blob([selectedResource.notes], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedResource.name.replace('.pdf', '_notes.txt');
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    toast.success("Download started!");
                  }}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                  title="Download TXT version"
                >
                  <Download className="size-4" />
                </button>
                
                <div className="w-px h-4 bg-slate-800 mx-1" />
                
                {/* Close */}
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors text-slate-400"
                  title="Close Viewer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Document Sheet Area */}
            <div className="flex-1 bg-slate-800 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-start custom-scrollbar">
              <div
                className="w-full max-w-6xl bg-white text-slate-900 shadow-2xl rounded-lg p-6 md:p-12 min-h-full border border-slate-200 select-text text-left shrink-0"
                style={{ fontSize: `${(zoomLevel / 100) * 16}px`, lineHeight: 1.6 }}
              >
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold font-sans text-slate-900">
                    {selectedResource.title}
                  </h1>
                  <span className="text-xs font-mono font-normal text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                    PDF PREVIEW
                  </span>
                </div>

                <div className="space-y-4">
                  {parseNotes(selectedResource.notes, selectedResource.id)}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
