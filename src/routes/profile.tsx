// src/routes/profile.tsx
import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  User, Mail, GraduationCap, Star, LogOut, ArrowLeft,
  Pencil, X, Check, KeyRound, Loader2, Trophy
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

// ── Main component ──────────────────────────────────────────────────────────

function ProfilePage() {
  const navigate = useNavigate();
  const [userId, setUserId]   = useState('');
  const [email, setEmail]     = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [badges, setBadges]   = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit-profile state
  const [editing, setEditing]       = useState(false);
  const [editName, setEditName]     = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editInterests, setEditInterests] = useState<string[]>([]);
  const [saving, setSaving]         = useState(false);
  const [editError, setEditError]   = useState('');

  // Password-reset state
  const [showPwReset, setShowPwReset]     = useState(false);
  const [pwResetSent, setPwResetSent]     = useState(false);
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

  // Re-sync data when the window gains focus
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
    setEditError('');
    setEditing(true);
  };

  const cancelEditing = () => setEditing(false);

  const saveEdits = async () => {
    if (!editName.trim())    { setEditError('Name cannot be empty.'); return; }
    if (!editCollege.trim()) { setEditError('College cannot be empty.'); return; }
    setSaving(true);
    setEditError('');
    const updated = await updateProfile(userId, {
      name: editName.trim(),
      college: editCollege.trim(),
      interests: editInterests,
    });
    setSaving(false);
    if (!updated) { setEditError('Save failed. Please try again.'); return; }
    setProfile(updated);
    setEditing(false);
  };

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
        <Loader2 className="size-8 animate-spin text-cyan" />
      </div>
    );
  }

  if (!profile) return null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="px-6 lg:px-10 py-12 max-w-3xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-4" /> Back to Dashboard
      </Link>

      {/* ── Profile Card ─────────────────────────────────────────────────── */}
      <div className="p-8 rounded-2xl border border-border bg-card shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="size-24 rounded-full bg-cyan/20 border-2 border-cyan text-cyan flex items-center justify-center shrink-0">
            <span className="text-4xl font-display font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 space-y-6 w-full">
            {/* Name + email row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-1">{profile.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="size-4" /><span>{email}</span>
                </div>
              </div>
              <button
                onClick={startEditing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                           border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Pencil className="size-3.5" /> Edit Profile
              </button>
            </div>

            {/* Edit form (shown inline when editing) */}
            {editing && (
              <div className="p-4 rounded-xl border border-cyan/30 bg-cyan/5 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Edit Profile</h3>
                {editError && <p className="text-xs text-destructive">{editError}</p>}

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">Full Name</label>
                    <input
                      value={editName} onChange={e => setEditName(e.target.value)}
                      className="w-full p-2 rounded-lg bg-secondary/50 border border-border text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">College</label>
                    <input
                      value={editCollege} onChange={e => setEditCollege(e.target.value)}
                      className="w-full p-2 rounded-lg bg-secondary/50 border border-border text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground font-medium">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map(i => (
                      <button
                        key={i} type="button" onClick={() => toggleEditInterest(i)}
                        className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                          editInterests.includes(i)
                            ? 'bg-cyan/20 border-cyan text-cyan'
                            : 'bg-secondary border-border text-muted-foreground'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveEdits} disabled={saving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                               bg-cyan text-cyan-foreground hover:bg-cyan/90 transition-colors disabled:opacity-60"
                  >
                    {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                               border border-border text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="size-3.5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  <GraduationCap className="size-4" /> College
                </div>
                <div className="font-medium text-sm">{profile.college || 'Not specified'}</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  <Star className="size-4 text-purple-400" /> Interests
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests?.length > 0 ? (
                    profile.interests.map(i => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                        {i}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">None selected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Member since */}
            <p className="text-xs text-muted-foreground">
              Member since {new Date(profile.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Bottom actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50">
              <button
                onClick={() => { setShowPwReset(v => !v); setPwResetSent(false); }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                           border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <KeyRound className="size-4" /> Reset Password
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                           text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </div>

            {/* Password reset panel */}
            {showPwReset && (
              <div className="p-4 rounded-xl border border-border/50 bg-secondary/30 space-y-3">
                {pwResetSent ? (
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <Check className="size-4" />
                    Reset link sent to <strong>{email}</strong>. Check your inbox.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      We'll send a password reset link to <strong className="text-foreground">{email}</strong>.
                    </p>
                    <button
                      onClick={sendPasswordReset} disabled={pwResetLoading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                                 bg-cyan text-cyan-foreground hover:bg-cyan/90 transition-colors disabled:opacity-60"
                    >
                      {pwResetLoading ? <Loader2 className="size-4 animate-spin" /> : <KeyRound className="size-4" />}
                      {pwResetLoading ? 'Sending…' : 'Send Reset Email'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Badges Card ──────────────────────────────────────────────────── */}
      <BadgesSection badges={badges} />
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
    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="size-5 text-yellow-400" />
        <h2 className="text-lg font-display font-bold text-foreground">Achievements</h2>
        <span className="ml-auto text-xs text-muted-foreground">
          {earnedIds.size} / {ALL_BADGES.length} earned
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ALL_BADGES.map(badge => {
          const earned = earnedIds.has(badge.id);
          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border text-center transition-all ${
                earned
                  ? 'border-yellow-500/30 bg-yellow-500/10'
                  : 'border-border/50 bg-secondary/30 opacity-40 grayscale'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className={`text-xs font-semibold mb-1 ${earned ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                {badge.label}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">{badge.description}</div>
              {earned && (
                <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
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