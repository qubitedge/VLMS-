// src/routes/profile.tsx

import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  User, Mail, GraduationCap, Star, LogOut, ArrowLeft,
  Pencil, X, Check, KeyRound, Loader2, Trophy,
  Sparkles, Award, Calendar, Building2, Shield, Zap,
  BookOpen, Brain, Code2, Database, Globe, Server,
  Palette, TrendingUp, Flame
} from "lucide-react";
import {
  supabase, getProfile, updateProfile, getUserBadges,
  type Profile, type UserBadge
} from "@/lib/supabase";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — VLMS" }] }),
  component: ProfilePage,
});

const INTEREST_OPTIONS = [
  "AI", "Web Development", "Data Structures",
  "DBMS", "Machine Learning", "System Design"
];
const SKILL_OPTIONS = [
  "JavaScript", "Python", "Java", "C++", "React",
  "Node.js", "SQL", "Git", "Data Analysis", "Cloud Computing"
];
const DEGREE_OPTIONS = ["B.Tech", "B.E", "B.Sc", "M.Tech", "MCA", "BCA", "Other"];

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated"];

const COMPLETION_FIELDS: (keyof Profile)[] = [
  'name', 'college', 'degree', 'branch',
  'year_of_study', 'graduation_year', 'bio',
];

function calculateCompletion(profile: Profile): number {
  let filled = 0;
  let total = COMPLETION_FIELDS.length + 2; // +2 for interests & skills arrays

  COMPLETION_FIELDS.forEach(key => {
    const val = profile[key];
    if (val !== null && val !== undefined && val !== '') filled++;
  });

  if (profile.interests?.length > 0) filled++;
  if ((profile.skills?.length ?? 0) > 0) filled++;

  return Math.round((filled / total) * 100);
}

// Interest icon mapping
const getInterestIcon = (interest: string) => {
  const map: Record<string, React.ReactNode> = {
    "AI": <Brain className="size-3" />,
    "Web Development": <Globe className="size-3" />,
    "Data Structures": <Database className="size-3" />,
    "DBMS": <Server className="size-3" />,
    "Machine Learning": <Brain className="size-3" />,
    "System Design": <Code2 className="size-3" />
  };
  return map[interest] || <Star className="size-3" />;
};

// ── Main component ──────────────────────────────────────────────────────────

function ProfilePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit-profile state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editInterests, setEditInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSkills, setEditSkills] = useState<string[]>([]);
  const [editDegree, setEditDegree] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editYearOfStudy, setEditYearOfStudy] = useState('');
  const [editGradYear, setEditGradYear] = useState('');
  const [editBio, setEditBio] = useState('');

  // Password-reset state
  const [showPwReset, setShowPwReset] = useState(false);
  const [pwResetSent, setPwResetSent] = useState(false);
  const [pwResetLoading, setPwResetLoading] = useState(false);

  // ── Load user + profile + badges on mount + focus ──────────────────────────────
  useEffect(() => {
    let isComponentMounted = true;

    const loadProfileMetrics = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { navigate({ to: "/" }); return; }

      setUserId(data.user.id);
      setEmail(data.user.email ?? '');

      const [profileData, badgeData] = await Promise.all([
        getProfile(),
        getUserBadges(data.user.id),
      ]);

      if (!isComponentMounted) return;
      if (!profileData) { navigate({ to: "/" }); return; }

      setProfile(profileData);
      setBadges(badgeData);
      setLoading(false);
    };

    loadProfileMetrics();

    window.addEventListener("focus", loadProfileMetrics);
    return () => {
      isComponentMounted = false;
      window.removeEventListener("focus", loadProfileMetrics);
    };
  }, [navigate]);

  // ── Edit handlers ───────────────────────────────────────────────────────
  const startEditing = () => {
    if (!profile) return;
    setEditName(profile.name);
    setEditCollege(profile.college);
    setEditInterests([...(profile.interests ?? [])]);
    setEditSkills([...(profile.skills ?? [])]);
    setEditDegree(profile.degree ?? '');
    setEditBranch(profile.branch ?? '');
    setEditYearOfStudy(profile.year_of_study ?? '');
    setEditGradYear(profile.graduation_year?.toString() ?? '');
    setEditBio(profile.bio ?? '');
    setEditError('');
    setEditing(true);
  };

  const cancelEditing = () => setEditing(false);

  const saveEdits = async () => {
    if (!editName.trim()) { setEditError('Name cannot be empty.'); return; }
    if (!editCollege.trim()) { setEditError('College cannot be empty.'); return; }
    setSaving(true);
    setEditError('');
    const updated = await updateProfile(userId, {
      name: editName.trim(),
      college: editCollege.trim(),
      interests: editInterests,
      skills: editSkills,
      degree: editDegree || null,
      branch: editBranch.trim() || null,
      year_of_study: editYearOfStudy || null,
      graduation_year: editGradYear ? parseInt(editGradYear, 10) : null,
      bio: editBio.trim() || null,
    });
    setSaving(false);
    if (!updated) { setEditError('Save failed. Please try again.'); return; }
    setProfile(updated);
    setEditing(false);
  };
  
  const toggleEditSkill = (s: string) =>
    setEditSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleEditInterest = (i: string) =>
    setEditInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  // ── Password reset ──────────────────────────────────────────────────────
  const sendPasswordReset = async () => {
    setPwResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setPwResetLoading(false);
    if (!error) setPwResetSent(true);
  };

  // ── Logout ──────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // ── Loading state ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="size-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-3 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="profile-page">
      {/* Enhanced Light Theme Styles */}
      <style>{`
        .profile-page {
          --bg-light: #F8FAFE;
          --bg-card: rgba(255, 255, 255, 0.85);
          --border-glow: rgba(0, 163, 186, 0.2);
          --cyan-main: #00A3BA;
          --cyan-dark: #00607A;
          --cyan-soft: rgba(0, 163, 186, 0.08);
          --purple-accent: #8B5CF6;
          --text-primary: #1E293B;
          --text-secondary: #64748B;
          --text-muted: #94A3B8;
          --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.04);
          --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 20px 40px -12px rgba(0, 0, 0, 0.08);
          --gradient-cyan: linear-gradient(135deg, #00A3BA 0%, #00607A 100%);
          --gradient-light: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%);
          
          background: linear-gradient(145deg, #F0F4F8 0%, #F8FAFE 100%);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        /* Subtle animated background orbs */
        .profile-page::before {
          content: '';
          position: fixed;
          top: -15%;
          left: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(0, 163, 186, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: floatOrb 20s ease-in-out infinite;
        }
        
        .profile-page::after {
          content: '';
          position: fixed;
          bottom: -10%;
          right: -5%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: floatOrb 18s ease-in-out infinite reverse;
        }
        
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          33% { transform: translate(20px, -20px) scale(1.1); opacity: 0.8; }
          66% { transform: translate(-15px, 15px) scale(0.9); opacity: 0.4; }
        }
        
        /* Grid background - light theme version */
        .profile-grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: 
            linear-gradient(to right, rgba(0, 163, 186, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 163, 186, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }
        
        /* Main content container */
        .profile-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        
        /* Back button */
        .profile-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 163, 186, 0.15);
          border-radius: 40px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        
        .profile-back-btn:hover {
          background: white;
          border-color: rgba(0, 163, 186, 0.3);
          color: var(--cyan-main);
          transform: translateX(-4px);
          box-shadow: var(--shadow-md);
        }
        
        /* Main profile card - Glassmorphism */
        .profile-card {
          background: var(--bg-card);
          backdrop-filter: blur(16px);
          border-radius: 32px;
          border: 1px solid rgba(0, 163, 186, 0.15);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        /* Avatar section */
        .profile-avatar {
          width: 96px;
          height: 96px;
          border-radius: 32px;
          background: linear-gradient(145deg, rgba(0, 163, 186, 0.1), rgba(0, 163, 186, 0.05));
          border: 2px solid rgba(0, 163, 186, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 20px -8px rgba(0, 163, 186, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .profile-avatar:hover {
          transform: scale(1.05) rotate(-3deg);
          box-shadow: 0 12px 28px -8px rgba(0, 163, 186, 0.25);
        }
        
        .profile-avatar span {
          font-size: 2.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00A3BA, #00607A);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .profile-avatar-glow {
          position: absolute;
          inset: -3px;
          border-radius: 35px;
          background: linear-gradient(135deg, rgba(0, 163, 186, 0.2), rgba(96, 165, 250, 0.1));
          filter: blur(6px);
          z-index: -1;
          animation: avatarPulse 3s ease-in-out infinite;
        }
        
        @keyframes avatarPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        /* Edit button */
        .profile-edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          background: white;
          border: 1px solid rgba(0, 163, 186, 0.2);
          border-radius: 40px;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }
        
        .profile-edit-btn:hover {
          background: var(--cyan-soft);
          border-color: var(--cyan-main);
          color: var(--cyan-main);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        /* Info cards */
        .profile-info-card {
          background: white;
          border: 1px solid rgba(0, 163, 186, 0.1);
          border-radius: 20px;
          padding: 1rem 1.25rem;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }
        
        .profile-info-card:hover {
          border-color: rgba(0, 163, 186, 0.25);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .profile-info-card-heading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 0.6rem;
          transition: color 0.2s ease;
        }
        
        .profile-info-card:hover .profile-info-card-heading {
          color: var(--cyan-main);
        }
        
        .profile-info-card .flex.items-center.gap-2 svg {
          transition: transform 0.25s ease;
        }
        
        .profile-info-card:hover .flex.items-center.gap-2 svg {
          transform: scale(1.2) rotate(-6deg);
        }
        
        /* Interest chip */
        .profile-interest-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.9rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.03));
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #6D28D9;
          transition: all 0.2s ease;
        }
        
        .profile-interest-chip:hover {
          background: rgba(139, 92, 246, 0.12);
          transform: scale(1.06) translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.18);
        }
        
        /* Skill chip — distinct emerald theme */
        .profile-skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.9rem;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.03));
          border: 1px solid rgba(16, 185, 129, 0.18);
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #059669;
          transition: all 0.2s ease;
        }
        
        .profile-skill-chip:hover {
          background: rgba(16, 185, 129, 0.14);
          border-color: rgba(16, 185, 129, 0.35);
          transform: scale(1.06) translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.18);
        }
        
        /* Make icons inside chips wiggle on hover */
        .profile-interest-chip svg,
        .profile-skill-chip svg {
          transition: transform 0.25s ease;
        }
        
        .profile-interest-chip:hover svg,
        .profile-skill-chip:hover svg {
          transform: rotate(15deg) scale(1.2);
        }
        
        /* Animated progress bar */
        .profile-progress-track {
          position: relative;
          width: 100%;
          height: 10px;
          border-radius: 40px;
          background: rgba(0, 163, 186, 0.08);
          overflow: hidden;
        }
        
        .profile-progress-fill {
          height: 100%;
          border-radius: 40px;
          background: var(--gradient-cyan);
          position: relative;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        
        .profile-progress-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          animation: progressShine 2.2s ease-in-out infinite;
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Completion badge pop when 100% */
        @keyframes completePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        .profile-completion-done {
          animation: completePulse 1.5s ease-in-out infinite;
        }
        
        /* Action buttons */
        .profile-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 40px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
        }
        
        .profile-action-btn:hover {
          background: var(--cyan-soft);
          border-color: var(--cyan-main);
          color: var(--cyan-main);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .profile-action-btn-danger:hover {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.3);
          color: #DC2626;
        }
        
        /* Edit form */
        .profile-edit-form {
          background: white;
          border: 1px solid rgba(0, 163, 186, 0.2);
          border-radius: 24px;
          padding: 1.5rem;
          margin-top: 1rem;
          box-shadow: var(--shadow-md);
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .profile-edit-input {
          width: 100%;
          padding: 0.7rem 1rem;
          background: var(--bg-light);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .profile-edit-input:focus {
          outline: none;
          border-color: var(--cyan-main);
          box-shadow: 0 0 0 3px rgba(0, 163, 186, 0.1);
          background: white;
        }
        
        .profile-edit-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
          display: block;
        }
        
        /* Save button */
        .profile-save-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: var(--gradient-cyan);
          border: none;
          border-radius: 40px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 163, 186, 0.25);
        }
        
        .profile-save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 163, 186, 0.35);
        }
        
        .profile-save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .profile-cancel-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 40px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .profile-cancel-btn:hover {
          background: var(--bg-light);
          color: var(--text-primary);
          transform: translateY(-1px);
        }
        
        /* Password reset panel */
        .profile-pwreset-panel {
          background: linear-gradient(135deg, rgba(0, 163, 186, 0.04), rgba(0, 163, 186, 0.02));
          border: 1px solid rgba(0, 163, 186, 0.15);
          border-radius: 20px;
          padding: 1rem 1.25rem;
          margin-top: 1rem;
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Badges section - Glassmorphism */
        .badges-section {
          background: var(--bg-card);
          backdrop-filter: blur(16px);
          border-radius: 32px;
          border: 1px solid rgba(0, 163, 186, 0.15);
          padding: 1.5rem;
          margin-top: 1.5rem;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s ease;
        }
        
        .badges-section:hover {
          box-shadow: var(--shadow-lg), 0 0 0 1px rgba(0, 163, 186, 0.1);
        }
        
        .badge-card {
          padding: 1rem;
          border-radius: 20px;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          text-align: center;
          transition: all 0.2s ease;
          cursor: default;
        }
        
        .badge-card-earned {
          background: linear-gradient(145deg, white, rgba(0, 163, 186, 0.02));
          border-color: rgba(0, 163, 186, 0.2);
          box-shadow: 0 4px 15px rgba(0, 163, 186, 0.08);
        }
        
        .badge-card-earned:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 163, 186, 0.12);
        }
        
        .badge-card-locked {
          opacity: 0.5;
          filter: grayscale(0.2);
        }
        
        .badge-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          animation: badgePop 0.4s ease-out;
        }
        
        @keyframes badgePop {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .badge-earned-tag {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.2rem 0.6rem;
          background: rgba(0, 163, 186, 0.1);
          border-radius: 40px;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--cyan-main);
        }
        
        /* Typography */
        .profile-name {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1E293B, #334155);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .profile-container {
            padding: 1rem;
          }
          .profile-avatar {
            width: 72px;
            height: 72px;
          }
          .profile-avatar span {
            font-size: 2rem;
          }
          .profile-name {
            font-size: 1.4rem;
          }
        }
      `}</style>
      
      <div className="profile-grid-bg" />
      
      <div className="profile-container">
        <Link to="/" className="profile-back-btn">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="p-6 md:p-8">
            <ProfileCompletionBar profile={profile} />
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="profile-avatar">
                  <div className="profile-avatar-glow" />
                  <span>{profile.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              {/* Main info */}
              <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h1 className="profile-name">
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <Mail className="size-4" />
                      <span>{email}</span>
                    </div>
                  </div>
                  <button onClick={startEditing} className="profile-edit-btn">
                    <Pencil className="size-3.5" /> Edit Profile
                  </button>
                </div>

                {/* Edit Form */}
                {editing && (
                  <div className="profile-edit-form">
                    <h3 className="text-sm font-semibold text-cyan-600 mb-3 flex items-center gap-2">
                      <Sparkles className="size-3.5" /> Edit Profile
                    </h3>
                    {editError && (
                      <div className="mb-3 p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                        {editError}
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="profile-edit-label">Full Name</label>
                        <input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="profile-edit-input"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="profile-edit-label">College</label>
                        <input
                          value={editCollege}
                          onChange={e => setEditCollege(e.target.value)}
                          className="profile-edit-input"
                          placeholder="Your institution"
                        />
                      </div>
                      <div>
                        <label className="profile-edit-label">Degree</label>
                        <select value={editDegree} onChange={e => setEditDegree(e.target.value)} className="profile-edit-input">
                          <option value="">Select degree</option>
                          {DEGREE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="profile-edit-label">Branch / Major</label>
                        <input value={editBranch} onChange={e => setEditBranch(e.target.value)} className="profile-edit-input" placeholder="e.g. Computer Science" />
                      </div>
                      <div>
                        <label className="profile-edit-label">Year of Study</label>
                        <select value={editYearOfStudy} onChange={e => setEditYearOfStudy(e.target.value)} className="profile-edit-input">
                          <option value="">Select year</option>
                          {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="profile-edit-label">Graduation Year</label>
                        <input type="number" value={editGradYear} onChange={e => setEditGradYear(e.target.value)} className="profile-edit-input" placeholder="e.g. 2027" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="profile-edit-label">Bio</label>
                      <textarea
                        value={editBio}
                        onChange={e => setEditBio(e.target.value)}
                        className="profile-edit-input"
                        rows={3}
                        placeholder="A short bio about yourself"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="profile-edit-label mb-2">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {SKILL_OPTIONS.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleEditSkill(s)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              editSkills.includes(s)
                                ? 'bg-emerald-100 border border-emerald-300 text-emerald-700 shadow-sm'
                                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="profile-edit-label mb-2">Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map(i => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => toggleEditInterest(i)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              editInterests.includes(i)
                                ? 'bg-cyan-100 border border-cyan-300 text-cyan-700 shadow-sm'
                                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {i}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-5">
                      <button onClick={saveEdits} disabled={saving} className="profile-save-btn">
                        {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button onClick={cancelEditing} className="profile-cancel-btn">
                        <X className="size-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Info Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="profile-info-card">
                    <div className="profile-info-card-heading">
                      <Building2 className="size-3.5 text-cyan-500" /> College
                    </div>
                    <div className="font-medium text-sm text-slate-700">
                      {profile.college || 'Not specified'}
                    </div>
                  </div>

                  <div className="profile-info-card">
                    <div className="profile-info-card-heading">
                      <Star className="size-3.5 text-purple-500" /> Interests
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests?.length > 0 ? (
                        profile.interests.map(i => (
                          <span key={i} className="profile-interest-chip">
                            {getInterestIcon(i)} {i}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">None selected</span>
                      )}
                    </div>
                  </div>

                  <div className="profile-info-card">
                    <div className="profile-info-card-heading">
                      <Code2 className="size-3.5 text-emerald-500" /> Skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(profile.skills?.length ?? 0) > 0 ? (
                        profile.skills!.map(s => (
                          <span key={s} className="profile-skill-chip">{s}</span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">None added</span>
                      )}
                    </div>
                  </div>

                  <div className="profile-info-card">
                    <div className="profile-info-card-heading">
                      <GraduationCap className="size-3.5 text-cyan-500" /> Education
                    </div>
                    <div className="font-medium text-sm text-slate-700">
                      {profile.degree ?? '—'} {profile.branch ? `· ${profile.branch}` : ''}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {profile.year_of_study ?? 'Year not set'}
                      {profile.graduation_year ? ` · Class of ${profile.graduation_year}` : ''}
                    </div>
                  </div>
                </div>

                {/* Member since */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="size-3.5" />
                  Member since {new Date(profile.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => { setShowPwReset(v => !v); setPwResetSent(false); }}
                    className="profile-action-btn"
                  >
                    <KeyRound className="size-4" /> Reset Password
                  </button>
                  <button onClick={handleLogout} className="profile-action-btn profile-action-btn-danger">
                    <LogOut className="size-4" /> Sign Out
                  </button>
                </div>

                {/* Password Reset Panel */}
                {showPwReset && (
                  <div className="profile-pwreset-panel">
                    {pwResetSent ? (
                      <p className="text-sm text-emerald-600 flex items-center gap-2">
                        <Check className="size-4" />
                        Reset link sent to <strong className="text-slate-800">{email}</strong>. Check your inbox.
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-slate-500 mb-3">
                          We'll send a password reset link to <strong className="text-cyan-600">{email}</strong>.
                        </p>
                        <button
                          onClick={sendPasswordReset}
                          disabled={pwResetLoading}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-cyan-700 text-white hover:from-cyan-600 hover:to-cyan-800 transition-all disabled:opacity-60 shadow-md"
                        >
                          {pwResetLoading ? <Loader2 className="size-4 animate-spin" /> : <KeyRound className="size-4" />}
                          {pwResetLoading ? 'Sending...' : 'Send Reset Email'}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <BadgesSection badges={badges} />
      </div>
    </div>
  );
}

// ── Profile Completion Bar Component ────────────────────────────────────────

function ProfileCompletionBar({ profile }: { profile: Profile }) {
  const completion = calculateCompletion(profile);
  const isComplete = completion >= 100;

  return (
    <div className="profile-info-card mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="profile-info-card-heading mb-0">
          <Zap className="size-3.5 text-cyan-500" /> Profile Completion
        </span>
        <span className={`text-xs font-bold ${isComplete ? 'text-emerald-500 profile-completion-done' : 'text-cyan-600'}`}>
          {completion}%
        </span>
      </div>
      <div className="profile-progress-track">
        <div className="profile-progress-fill" style={{ width: `${completion}%` }} />
      </div>
      {isComplete ? (
        <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
          <Check className="size-3" /> Your profile is complete!
        </p>
      ) : (
        <p className="text-xs text-slate-400 mt-2">
          Complete your profile to unlock the full experience.
        </p>
      )}
    </div>
  );
}

// ── Badges sub-component ────────────────────────────────────────────────────

function BadgesSection({ badges }: { badges: UserBadge[] }) {
  const ALL_BADGES = [
    { id: 'first_solve',   label: 'First Solve',           description: 'Completed your first lab experiment',     icon: '🧪' },
    { id: 'speed_coder',   label: 'Speed Coder',            description: 'Solved an experiment in under 2 minutes', icon: '⚡' },
    { id: 'all_courses',   label: 'All Courses Completed',  description: 'Finished every available course',         icon: '🏆' },
    { id: 'perfect_score', label: 'Perfect Score',          description: 'Got 100% on a posttest',                  icon: '💯' },
    { id: 'curious_mind',  label: 'Curious Mind',           description: 'Explored 3 different subjects',           icon: '🔍' },
    { id: 'early_adopter', label: 'Early Adopter',          description: 'Joined during the beta phase',            icon: '🚀' },
  ];

  const earnedIds = new Set(badges.map(b => b.badge_id));

  return (
    <div className="badges-section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-50">
            <Trophy className="size-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Achievements</h2>
        </div>
        <span className="text-xs text-slate-500 bg-white/80 px-3 py-1 rounded-full shadow-sm">
          {earnedIds.size} / {ALL_BADGES.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {ALL_BADGES.map((badge, idx) => {
          const earned = earnedIds.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`badge-card ${earned ? 'badge-card-earned' : 'badge-card-locked'}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="badge-icon">{badge.icon}</div>
              <div className={`text-xs font-semibold mb-1 ${earned ? 'text-cyan-600' : 'text-slate-400'}`}>
                {badge.label}
              </div>
              <div className="text-xs text-slate-400 leading-tight">{badge.description}</div>
              {earned && (
                <div className="badge-earned-tag">
                  Earned ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}