import React, { useEffect, useState } from "react";
import { Download, Mail, Sparkles, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { showCvDownloadToast } from "@/components/CvDownloadToast";

const summaryPoints = [
  "Mobile app developer with full-stack product experience.",
  "Strong fit for React Native, frontend, and API-connected roles.",
  "Comfortable across auth, payments, dashboards, deployment, and product UX.",
  "Available for remote roles, freelance work, and product collaborations.",
];

export default function RecruiterSummary() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="recruiter-summary-trigger"
        data-cursor-kicker="Recruiter"
        data-cursor-message="Quick fit"
      >
        <Sparkles className="h-4 w-4" />
        <span>Why hire me?</span>
      </button>

      {isOpen && (
        <div className="recruiter-summary-layer" role="presentation">
          <button
            type="button"
            className="recruiter-summary-backdrop"
            aria-label="Close recruiter summary"
            onClick={() => setIsOpen(false)}
          />
          <section
            className="recruiter-summary-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-summary-title"
          >
            <button
              type="button"
              className="recruiter-summary-close"
              aria-label="Close recruiter summary"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            <p className="recruiter-summary-kicker">Recruiter quick summary</p>
            <h2 id="recruiter-summary-title">Why hire Dagm?</h2>
            <p className="recruiter-summary-copy">
              I build complete mobile and web product flows with clean UI,
              reliable APIs, and enough backend understanding to move quickly
              across real product teams.
            </p>

            <div className="recruiter-summary-grid">
              <div>
                <span>Role fit</span>
                <strong>Mobile, frontend, full-stack</strong>
              </div>
              <div>
                <span>Core stack</span>
                <strong>React Native, Next.js, TypeScript, Go, PostgreSQL</strong>
              </div>
              <div>
                <span>Availability</span>
                <strong>Remote roles, freelance, collaborations</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>
            </div>

            <ul className="recruiter-summary-list">
              {summaryPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="recruiter-summary-actions">
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Email Dagm
              </a>
              <a href={profile.cvPath} download onClick={showCvDownloadToast}>
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
