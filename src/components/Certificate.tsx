import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, X } from 'lucide-react';


export function CertificateModal({ isOpen, onClose, courseId, userName: initialName }: { isOpen: boolean, onClose: () => void, courseId: string, userName?: string }) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [userName, setUserName] = useState(initialName || '');

  // Fetch course name
  const [courseName, setCourseName] = useState('Course Completion');
  
  useEffect(() => {
    if (initialName) setUserName(initialName);
  }, [initialName, isOpen]);

  useEffect(() => {
    // A simplistic way to find course name, in a real app we'd fetch from course-data
    if (courseId) {
      if (courseId.includes('ai')) setCourseName('AI Tools Lab');
      else if (courseId.includes('ds') || courseId.includes('data-structures')) setCourseName('Data Structures using C Programming');
      else if (courseId.includes('llms')) setCourseName('Large Language Models');
      else setCourseName(courseId.replace(/-/g, ' ').toUpperCase());
    }
  }, [courseId]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!certificateRef.current || !userName) {
      alert("Please enter your name to download the certificate.");
      return;
    }
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${userName.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("Failed to download PDF", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-background w-full max-w-4xl rounded-2xl border border-border shadow-2xl p-6 relative flex flex-col items-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground bg-secondary/50 p-2 rounded-full z-10">
          <X className="size-5" />
        </button>
        
        <div className="mb-6 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold font-display text-center">Your Certificate is Ready!</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Print Name on Certificate:</label>
            <input 
              type="text" 
              value={userName} 
              onChange={e => setUserName(e.target.value)} 
              className="w-full p-3 rounded-lg bg-secondary/50 border border-border" 
              placeholder="Enter your full name" 
            />
          </div>
        </div>

        {/* Certificate Container - Landscape Aspect Ratio */}
        <div className="w-full overflow-x-auto pb-4 flex justify-center">
          <div 
            ref={certificateRef}
            className="w-[800px] h-[565px] bg-white text-slate-900 relative p-12 shrink-0 border border-slate-200 shadow-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Minimalist Border */}
            <div className="absolute inset-4 border-2 border-slate-800 pointer-events-none" />
            <div className="absolute inset-5 border border-slate-300 pointer-events-none" />
            
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 relative z-10">
              
              <div className="flex flex-col items-center gap-4 mb-2">
                {/* JNTU GV Logo Placeholder or image */}
                <img 
                  src="/jntugvcev.b33bb43b07b2037ab043.svg" 
                  alt="JNTU GV Logo" 
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    // Fallback if logo doesn't exist yet
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML += '<div class="w-24 h-24 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold">JNTU-GV</div>';
                  }}
                />
                <h1 className="text-2xl font-bold tracking-wider uppercase text-slate-800">
                  Jawaharlal Nehru Technological University<br/>Gurajada, Vizianagaram
                </h1>
              </div>

              <div className="w-16 h-[2px] bg-cyan/50" />

              <h2 className="text-4xl font-serif text-slate-900 tracking-widest uppercase mt-4 mb-2">
                Certificate of Completion
              </h2>

              <p className="text-slate-600 text-lg uppercase tracking-widest mt-4">
                This is to certify that
              </p>

              <div className="mt-2 mb-4 w-full max-w-lg border-b border-slate-400 pb-2">
                <span className="text-4xl font-serif font-semibold text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
                  {userName || "[ Your Name Here ]"}
                </span>
              </div>

              <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                has successfully completed the Virtual Lab requirements for<br/>
                <span className="font-bold text-slate-800">{courseName}</span>
              </p>

              <div className="mt-12 flex items-end justify-between w-full px-16">
                <div className="flex flex-col items-center">
                  <div className="w-40 border-b border-slate-400 mb-2"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Date</span>
                  <span className="text-sm font-medium mt-1">{new Date().toLocaleDateString()}</span>
                </div>
                
                {/* Optional signature or seal area */}
                <div className="flex flex-col items-center">
                  <div className="w-40 border-b border-slate-400 mb-2"></div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Course Instructor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          disabled={isDownloading || !userName}
          className="mt-8 flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan text-cyan-foreground font-semibold hover:bg-cyan/90 transition-colors disabled:opacity-50"
        >
          <Download className="size-5" />
          {isDownloading ? 'Generating PDF...' : 'Download Certificate'}
        </button>
      </div>
    </div>
  );
}
