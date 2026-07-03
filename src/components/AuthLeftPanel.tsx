import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import authSidebarImg from "../assets/images/credchain_auth_sidebar_1782708558420.jpg";

export interface RoleInfo {
  id: "candidate" | "issuer" | "verifier";
  badge: string;
  textColor: string;
  borderColor: string;
  heading: string;
  perks: string[];
}

export const ROLE_SPECS: Record<string, RoleInfo> = {
  candidate: {
    id: "candidate",
    badge: "CANDIDATE",
    textColor: "text-role-candidate",
    borderColor: "border-role-candidate",
    heading: "Build your verified identity.",
    perks: [
      "Request credentials from your institution",
      "Generate AI-powered verified resumes",
      "Share a tamper-proof public profile",
      "QR code for instant employer verification",
    ],
  },
  issuer: {
    id: "issuer",
    badge: "INSTITUTION",
    textColor: "text-role-issuer",
    borderColor: "border-role-issuer",
    heading: "Issue tamper-evident credentials.",
    perks: [
      "Cryptographically sign academic records",
      "Instant verification portal for employers",
      "Batch issuance via secure CSV upload",
      "Revocation & status ledger management",
    ],
  },
  verifier: {
    id: "verifier",
    badge: "EMPLOYER",
    textColor: "text-role-verifier",
    borderColor: "border-role-verifier",
    heading: "Verify credentials instantly.",
    perks: [
      "Zero-fraud cryptographic proof check",
      "One-click applicant background audit",
      "Direct institutional verification ledger",
      "Download verified candidate dossiers",
    ],
  },
};

interface AuthLeftPanelProps {
  role: "candidate" | "issuer" | "verifier";
  currentStep?: number;
  totalSteps?: number;
}

export default function AuthLeftPanel({ role, currentStep, totalSteps }: AuthLeftPanelProps) {
  const spec = ROLE_SPECS[role] || ROLE_SPECS.candidate;

  return (
    <div className="w-[45%] flex-shrink-0 bg-bg-surface p-10 lg:p-14 xl:p-16 flex flex-col justify-between relative overflow-hidden border-r border-border-main select-none">
      {/* Background infrastructure image at very low opacity */}
      <img
        src={authSidebarImg}
        alt=""
        aria-hidden
        style={{ opacity: "var(--auth-sidebar-opacity)" }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-luminosity"
      />

      {/* Top: Logo */}
      <div className="relative z-10 flex items-center">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <Logo wordmarkSize="lg" />
        </Link>
      </div>

      {/* Middle: content */}
      <div className="relative z-10 my-auto py-10 space-y-6 max-w-xl">
        {/* Role label — left border rule, no pill */}
        <div className={`border-l-2 ${spec.borderColor} pl-3 font-mono text-[11px] tracking-[0.18em] uppercase font-semibold ${spec.textColor}`}>
          {spec.badge}
        </div>

        <h2 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-txt-primary tracking-tight leading-snug">
          {spec.heading}
        </h2>

        <ul className="space-y-3.5 pt-4">
          {spec.perks.map((perk, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm lg:text-base text-txt-secondary leading-relaxed font-sans">
              <div className={`w-5 h-5 rounded-sm border border-border-main bg-bg-sunken flex items-center justify-center flex-shrink-0 mt-0.5 ${spec.textColor}`}>
                <Check className="w-3 h-3" strokeWidth={2.5} />
              </div>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: step indicator + back link */}
      <div className="relative z-10 pt-6 space-y-4 border-t border-border-subtle">
        {typeof currentStep === "number" && typeof totalSteps === "number" && totalSteps > 0 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-sm transition-all duration-200 ${
                  currentStep === i + 1
                    ? `w-8 ${spec.textColor.replace("text-", "bg-")}`
                    : i + 1 < currentStep
                    ? `w-4 ${spec.textColor.replace("text-", "bg-")}/50`
                    : "w-2 bg-border-main"
                }`}
              />
            ))}
            <span className="ml-2 font-mono text-[11px] text-txt-muted">
              {currentStep} / {totalSteps}
            </span>
          </div>
        )}

        <Link
          to="/role"
          className="text-xs font-mono text-txt-muted hover:text-txt-primary transition-colors inline-flex items-center gap-2 group pt-1"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Choose a different role</span>
        </Link>
      </div>
    </div>
  );
}
