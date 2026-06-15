import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Quote } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 animate-fade-in-up">
      <div className="mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground text-lg">Meet the team behind the Virtual Lab Management System.</p>
      </div>

      {/* First Row: Guide */}
      <div className="bg-secondary/30 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 mb-16 flex flex-col lg:flex-row gap-10 items-center">
        <div className="shrink-0 relative group">
          <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-cyan/20 group-hover:border-cyan/50 transition-colors shadow-2xl">
            <img 
              src="https://media.licdn.com/dms/image/v2/C5603AQFapjZf1XxnrA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1599037715438?e=1782950400&v=beta&t=fwVY0dubCZDjq9NgoGcxbrLwMq-4Yjb1VmvT4dLkiR0" 
              alt="Dr. G. Jayasuma"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">Dr. G. Jayasuma</h2>
            <p className="text-cyan font-semibold tracking-wide text-sm uppercase mt-1">Project Guide & Visionary</p>
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-3 -left-4 size-8 text-cyan/20 rotate-180" />
            <p className="text-muted-foreground leading-relaxed text-lg italic pl-6 border-l-2 border-cyan/30">
              "The idea for the Virtual Lab Management System was born out of a profound need to democratize computer science education. We envisioned an authoritative, zero-friction sandbox where students could instantly test their ideas without the massive overhead of configuring local environments. By removing the barriers of setup, we empower students to focus purely on logic, innovation, and mastery."
            </p>
          </div>

          <a 
            href="https://www.linkedin.com/in/dr-g-jaya-suma" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0a66c2] text-white hover:bg-[#004182] transition-colors shadow-lg shadow-blue-500/20 font-medium"
          >
            <Linkedin className="size-4" />
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Second Row: Team Members */}
      <div>
        <h3 className="text-2xl font-display font-bold mb-8">The Development Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMember 
            name="Ch. Sai Rupini" 
            role="Developer" 
            linkedin="https://www.linkedin.com/in/sairupini-chitikesi" 
            image="/Rupa.jpg"
          />
          <TeamMember 
            name="Sk. Asma" 
            role="Developer" 
            linkedin="https://www.linkedin.com/in/shaik-asma-216564330" 
            image="/Asma.jpeg"
          />
          <TeamMember 
            name="K. Pravallika" 
            role="Developer" 
            linkedin="https://www.linkedin.com/in/kundum-pravallika-4a1249296" 
            image="/Pravallika.jpeg"
          />
          <TeamMember 
            name="M. Likhith Kumar" 
            role="Developer" 
            linkedin="https://www.linkedin.com/in/likhithmankala/" 
            image="/Likhith.jpeg"
          />
        </div>
      </div>
    </div>
  );
}

function TeamMember({ name, role, linkedin, image }: { name: string, role: string, linkedin: string, image: string }) {
  return (
    <div className="bg-secondary/10 backdrop-blur-sm border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:bg-secondary/30 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-border group-hover:border-cyan/50 transition-colors bg-secondary">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-semibold text-foreground text-lg">{name}</h4>
      <p className="text-muted-foreground text-sm mb-4">{role}</p>
      <a 
        href={linkedin} 
        target="_blank" 
        rel="noreferrer"
        className="p-2.5 rounded-full bg-secondary text-muted-foreground hover:bg-[#0a66c2] hover:text-white transition-colors"
      >
        <Linkedin className="size-5" />
      </a>
    </div>
  );
}
