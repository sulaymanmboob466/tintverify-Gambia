import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "./brand";

type AuthPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPageLayout({
  eyebrow,
  title,
  description,
  children,
}: AuthPageLayoutProps) {
  return (
    <main className="auth-page">
      <div className="demo-banner" role="note">
        <div className="page-shell demo-banner-content">
          <span className="demo-banner-dot" aria-hidden="true" />
          <p>DEMO PROTOTYPE — NOT AN OFFICIAL GOVERNMENT SERVICE</p>
        </div>
      </div>

      <header className="auth-header">
        <div className="auth-shell auth-header-content">
          <Brand />
          <Link className="auth-home-link" href="/">Back to homepage</Link>
        </div>
      </header>

      <section className="auth-content">
        <div className="auth-shell auth-layout">
          <aside className="auth-intro" aria-label="Prototype information">
            <p className="eyebrow"><span aria-hidden="true" /> Proposed applicant service</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="auth-intro-note">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M12 3 19 6v5c0 4.5-2.9 7.8-7 9.7C7.9 18.8 5 15.5 5 11V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p><strong>Demonstration only.</strong> Do not use real personal information. Nothing entered here is sent or saved.</p>
            </div>
          </aside>

          <div className="auth-card">
            <p className="auth-card-eyebrow">{eyebrow}</p>
            {children}
          </div>
        </div>
      </section>

      <footer className="auth-footer">
        <div className="auth-shell">
          <p>Independent TintVerify-Gambia prototype. Not an official government service.</p>
        </div>
      </footer>
    </main>
  );
}
