import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "../components/brand";
import { ApplicationWizard } from "./application-wizard";

export const metadata: Metadata = {
  title: "Tint permit application | TintVerify-Gambia",
  description: "Demonstration vehicle tinted-glass permit application form for TintVerify-Gambia.",
};

export default function ApplyPage() {
  return (
    <main className="apply-page">
      <div className="demo-banner" role="note">
        <div className="page-shell demo-banner-content">
          <span className="demo-banner-dot" aria-hidden="true" />
          <p>DEMO PROTOTYPE — NOT AN OFFICIAL GOVERNMENT SERVICE</p>
        </div>
      </div>

      <header className="apply-header">
        <div className="apply-shell apply-header-content">
          <Brand />
          <nav aria-label="Application navigation">
            <Link href="/register">Account demo</Link>
            <Link href="/">Back to homepage</Link>
          </nav>
        </div>
      </header>

      <section className="apply-content" aria-labelledby="application-title">
        <div className="apply-shell">
          <div className="apply-intro">
            <p className="eyebrow"><span aria-hidden="true" /> Proposed applicant service</p>
            <h1 id="application-title">Vehicle tinted-glass permit application</h1>
            <p>Complete one short section at a time. This is a frontend demonstration: no information or document is submitted, stored or used to issue a permit.</p>
          </div>
          <ApplicationWizard />
        </div>
      </section>

      <footer className="auth-footer">
        <div className="apply-shell">
          <p>Independent TintVerify-Gambia prototype. Not an official government service.</p>
        </div>
      </footer>
    </main>
  );
}
