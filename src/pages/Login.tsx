import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mail, Lock, LogIn, User, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import AuthLeftPanel from "../components/AuthLeftPanel";
import ThemeToggle from "../components/ThemeToggle";

type Role = "candidate" | "issuer" | "verifier";

interface OneTapRole {
  role: Role;
  label: string;
  email: string;
  icon: React.ReactNode;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  route: string;
}

const ONE_TAP: OneTapRole[] = [
  {
    role: "candidate",
    label: "Candidate Vault",
    email: "emeka@demo.io",
    icon: <User className="w-4 h-4" strokeWidth={1.75} />,
    accentText: "text-role-candidate",
    accentBg: "hover:bg-role-candidate-soft",
    accentBorder: "hover:border-role-candidate",
    route: "/dashboard",
  },
  {
    role: "issuer",
    label: "Institution Desk",
    email: "registrar@futo.ng",
    icon: <GraduationCap className="w-4 h-4" strokeWidth={1.75} />,
    accentText: "text-role-issuer",
    accentBg: "hover:bg-role-issuer-soft",
    accentBorder: "hover:border-role-issuer",
    route: "/issuer",
  },
  {
    role: "verifier",
    label: "Employer Desk",
    email: "audit@acme.com",
    icon: <Briefcase className="w-4 h-4" strokeWidth={1.75} />,
    accentText: "text-role-verifier",
    accentBg: "hover:bg-role-verifier-soft",
    accentBorder: "hover:border-role-verifier",
    route: "/verifier",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = (searchParams.get("role") || "candidate") as Role;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const lower = email.toLowerCase();
    let role: Role = "candidate";
    let route = "/dashboard";
    if (lower.includes("registrar") || lower.includes("issuer") || lower.includes("futo")) {
      role = "issuer";
      route = "/issuer";
    } else if (
      lower.includes("recruiter") ||
      lower.includes("verifier") ||
      lower.includes("employer") ||
      lower.includes("acme")
    ) {
      role = "verifier";
      route = "/verifier";
    }
    localStorage.setItem("credchain_role", role);
    localStorage.setItem("cc_user", JSON.stringify({ email, role, fullName: email.split("@")[0] }));
    navigate(route);
  };

  const handleOneTapAuth = (route: string, role: Role) => {
    localStorage.setItem("credchain_role", role);
    const mockUsers: Record<Role, any> = {
      candidate: { fullName: "Emeka Obi", email: "emeka@demo.io", role: "candidate", skills: ["React", "Solidity", "Rust"] },
      issuer: { instName: "Federal University of Technology Owerri", email: "registrar@futo.ng", role: "issuer", verified: true },
      verifier: { fullName: "Audit Desk", companyName: "Acme Corp", workEmail: "audit@acme.com", role: "verifier" },
    };
    localStorage.setItem("cc_user", JSON.stringify(mockUsers[role]));
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-bg-base text-txt-primary flex flex-col p-4 sm:p-6 lg:p-8 relative select-none">
      {/* Mobile top header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between min-[900px]:hidden">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo wordmarkSize="md" />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center my-6 w-full">
        {/* DESKTOP — two-panel split */}
        <div className="hidden min-[900px]:flex w-[88vw] max-w-[1400px] h-[86vh] max-h-[840px] min-h-[600px] bg-bg-surface border border-border-main rounded-lg overflow-hidden">
          <AuthLeftPanel role={roleParam} />

          <div className="w-[55%] bg-bg-base p-8 lg:p-10 xl:p-12 flex flex-col justify-between text-left relative overflow-y-auto h-full">
            <div className="absolute top-6 right-6">
              <ThemeToggle />
            </div>

            <div className="pr-6">
              <div className="mb-5 space-y-2">
                <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase">
                  SIGN IN
                </div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-txt-primary">
                  Welcome back.
                </h1>
                <p className="text-sm text-txt-secondary font-sans">
                  Access your CredChain identity or portal desk.
                </p>
              </div>

              {/* One-tap demo block */}
              <div className="bg-bg-surface border border-border-main rounded-lg p-4 mb-4 space-y-2.5">
                <div className="text-[11px] font-mono font-semibold text-txt-muted tracking-wider uppercase mb-1">
                  // ONE-TAP DEMO AUTH
                </div>
                <div className="space-y-1.5">
                  {ONE_TAP.map((t) => (
                    <button
                      key={t.role}
                      type="button"
                      onClick={() => handleOneTapAuth(t.route, t.role)}
                      className={`w-full flex items-center justify-between p-2.5 bg-bg-sunken border border-border-main ${t.accentBorder} ${t.accentBg} rounded-md cursor-pointer transition-colors group`}
                    >
                      <div className="flex items-center gap-3 text-sm font-semibold text-txt-primary">
                        <span className={`w-7 h-7 rounded-sm border border-border-main bg-bg-surface flex items-center justify-center ${t.accentText}`}>
                          {t.icon}
                        </span>
                        <span>{t.label}</span>
                      </div>
                      <span className={`font-mono text-xs text-txt-muted group-hover:${t.accentText} flex items-center gap-1.5 transition-colors`}>
                        {t.email}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-border-subtle" />
                <span className="text-[11px] font-mono font-semibold text-txt-muted tracking-wider uppercase">
                  OR MANUAL LOGIN
                </span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>

              <form onSubmit={handleSignIn} className="space-y-3">
                <LabeledInput
                  label="EMAIL ADDRESS"
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  placeholder="name@example.com"
                />
                <LabeledInput
                  label="PASSWORD"
                  icon={<Lock className="w-4 h-4" />}
                  type="password"
                  required
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-brand-purple hover:bg-brand-purple-dim text-white font-semibold text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2 mt-1"
                >
                  <LogIn className="w-4 h-4" strokeWidth={2} />
                  <span>Sign in</span>
                </button>
              </form>
            </div>

            <div className="pt-4 text-center text-sm text-txt-secondary mt-6 border-t border-border-subtle font-sans">
              Don't have an account?{" "}
              <Link
                to={roleParam ? `/signup/${roleParam}` : "/role"}
                className="text-brand-purple font-semibold hover:text-txt-primary"
              >
                Create one here
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE — single column */}
        <div className="block min-[900px]:hidden w-full max-w-md bg-bg-surface border border-border-main rounded-lg p-6 sm:p-8 space-y-6">
          <div className="text-left space-y-2">
            <div className="border-l-2 border-brand-purple pl-3 font-mono text-[11px] tracking-[0.18em] text-txt-muted uppercase">
              SIGN IN
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-txt-primary">
              Welcome back.
            </h1>
            <p className="text-xs text-txt-secondary font-sans">
              Access your CredChain identity or portal desk.
            </p>
          </div>

          <div className="bg-bg-sunken border border-border-main rounded-md p-4 space-y-3">
            <div className="text-[11px] font-mono font-semibold text-txt-muted tracking-wider uppercase">
              // ONE-TAP DEMO AUTH
            </div>
            <div className="space-y-2">
              {ONE_TAP.map((t) => (
                <button
                  key={t.role}
                  type="button"
                  onClick={() => handleOneTapAuth(t.route, t.role)}
                  className={`w-full py-2.5 px-3 bg-bg-surface border border-border-main ${t.accentBorder} ${t.accentBg} rounded-md text-xs font-medium text-txt-primary transition-colors cursor-pointer flex justify-between items-center group`}
                >
                  <div className={`flex items-center gap-2.5 ${t.accentText}`}>
                    {t.icon}
                    <span className="font-semibold text-txt-primary">{t.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-txt-muted">
                    <span>{t.email}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border-subtle" />
            <span className="text-[10px] font-mono text-txt-muted uppercase tracking-wider">
              Or manual login
            </span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <LabeledInput
              label="EMAIL ADDRESS"
              icon={<Mail className="w-4 h-4" />}
              type="email"
              required
              value={email}
              onChange={setEmail}
              placeholder="name@example.com"
            />
            <LabeledInput
              label="PASSWORD"
              icon={<Lock className="w-4 h-4" />}
              type="password"
              required
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-brand-purple hover:bg-brand-purple-dim text-white font-semibold text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" strokeWidth={2} />
              <span>Sign In</span>
            </button>
          </form>

          <div className="pt-4 border-t border-border-subtle text-center text-xs text-txt-secondary font-sans">
            Don't have an account?{" "}
            <Link to="/role" className="text-brand-purple font-semibold hover:text-txt-primary">
              Create one here
            </Link>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl w-full mx-auto pt-6 border-t border-border-subtle block min-[900px]:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-txt-muted hover:text-txt-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to home</span>
        </Link>
      </footer>
    </div>
  );
}

function LabeledInput({
  label,
  icon,
  type,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-[11px] font-mono text-txt-muted uppercase tracking-wider block">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-muted">{icon}</span>
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-bg-sunken border border-border-main rounded-md pl-10 pr-4 py-3 text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-brand-purple transition-colors font-mono"
        />
      </div>
    </div>
  );
}
