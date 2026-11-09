const processSteps = [
  {
    number: "01",
    title: "Prepare your information",
    description:
      "Review the demonstration checklist and gather your vehicle and supporting documents before you begin.",
  },
  {
    number: "02",
    title: "Submit an application",
    description:
      "A future application journey will guide applicants through the required details and document uploads.",
  },
  {
    number: "03",
    title: "Follow the progress",
    description:
      "Applicants will be able to view clear status updates as their application moves through the proposed process.",
  },
];

const requirements = [
  {
    title: "Applicant details",
    description:
      "Contact details and identification information appropriate to the type of applicant.",
    icon: "person",
  },
  {
    title: "Vehicle registration document",
    description:
      "A document showing the vehicle registration details for the vehicle in the application.",
    icon: "document",
  },
  {
    title: "Vehicle photographs",
    description:
      "Clear photographs of the front, rear, left side and right side of the vehicle.",
    icon: "vehicle",
  },
  {
    title: "Supporting documents",
    description:
      "For example, a driving licence or relevant company or representative documents where applicable.",
    icon: "folder",
  },
];

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 3 34 8v10c0 8.9-5.9 15.4-14 19-8.1-3.6-14-10.1-14-19V8l14-5Z" fill="currentColor" />
      <path d="m14 20 4 4 8-9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RequirementIcon({ icon }: { icon: string }) {
  if (icon === "person") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 20c.8-3.6 3.3-5.5 7.5-5.5s6.7 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "vehicle") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="m5.2 15 1.5-5h10.6l1.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15h16v3.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5V15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 20v1M17 20v1M7 17.5h.01M17 17.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "folder") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h5l2 2h7A1.5 1.5 0 0 1 20.5 9.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 13h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3.5v4h4M9 13h6M9 16.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main id="home">
      <div className="demo-banner" role="note">
        <div className="page-shell demo-banner-content">
          <span className="demo-banner-dot" aria-hidden="true" />
          <p>DEMO PROTOTYPE — NOT AN OFFICIAL GOVERNMENT SERVICE</p>
        </div>
      </div>

      <header className="site-header">
        <div className="page-shell header-content">
          <a className="brand" href="#home" aria-label="TintVerify-Gambia home">
            <BrandMark />
            <span>
              <strong>TintVerify</strong>
              <small>Gambia</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#requirements">Requirements</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" /> Vehicle tinted-glass permits</p>
            <h1 id="hero-title">A clearer path for tinted-glass permit applications.</h1>
            <p className="hero-intro">
              TintVerify-Gambia demonstrates how a simple, secure digital service could help applicants prepare, submit and follow a vehicle tinted-glass permit application.
            </p>
            <div className="hero-actions" id="demo-access">
              <a className="button button-primary" href="/apply">
                Apply for a Tint Permit <ArrowIcon />
              </a>
              <a className="button button-secondary" href="/login">
                Track Application
              </a>
            </div>
            <p className="hero-disclaimer">
              This independent demonstration is not operated by, approved by or affiliated with the Gambia Police Force.
            </p>
          </div>

          <div className="hero-panel" aria-label="Illustration of the proposed applicant service">
            <div className="hero-panel-glow" aria-hidden="true" />
            <div className="application-card">
              <div className="application-card-topline">
                <span>PROPOSED APPLICANT PORTAL</span>
                <span className="status-pill"><i /> Demo view</span>
              </div>
              <div className="application-summary">
                <div className="summary-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m5 15 1.5-5h11l1.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 15h16v3.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M7.5 17.5h.01M16.5 17.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p>Vehicle permit application</p>
                  <strong>Start with what you have</strong>
                </div>
              </div>
              <div className="progress-list">
                <div className="progress-item is-active"><span>1</span><p>Applicant information</p><b>Ready</b></div>
                <div className="progress-item"><span>2</span><p>Vehicle details</p><b>Next</b></div>
                <div className="progress-item"><span>3</span><p>Supporting documents</p><b>Later</b></div>
              </div>
              <div className="application-card-foot">
                <span>Designed for phones, tablets and desktop</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
            <div className="trust-card">
              <div className="trust-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3 19 6v5c0 4.5-2.9 7.8-7 9.7C7.9 18.8 5 15.5 5 11V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div><strong>Privacy-conscious by design</strong><span>Information would be handled through a secure proposed workflow.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-note" id="service-availability" aria-label="Prototype availability notice">
        <div className="page-shell service-note-content">
          <div className="service-note-icon" aria-hidden="true">i</div>
          <p><strong>This is a design demonstration.</strong> Application submission and application tracking are planned for later development and are not available on this page.</p>
        </div>
      </section>

      <section className="process-section" id="how-it-works" aria-labelledby="process-title">
        <div className="page-shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow"><span aria-hidden="true" /> A simple proposed journey</p>
            <h2 id="process-title">How the application process could work</h2>
            <p>Designed to make each step easier to understand from the first visit to a status update.</p>
          </div>
          <ol className="process-grid">
            {processSteps.map((step) => (
              <li key={step.number} className="process-card">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="requirements-section" id="requirements" aria-labelledby="requirements-title">
        <div className="page-shell requirements-layout">
          <div className="requirements-copy">
            <p className="eyebrow"><span aria-hidden="true" /> Prepare before you apply</p>
            <h2 id="requirements-title">A demonstration checklist for applicants</h2>
            <p>
              Having the relevant information ready could make the proposed application process faster and easier to complete.
            </p>
            <p className="requirements-notice">
              <strong>For demonstration only.</strong> Final document requirements and procedures would need to be confirmed by the appropriate authority.
            </p>
          </div>
          <div className="requirements-grid">
            {requirements.map((requirement) => (
              <article className="requirement-card" key={requirement.title}>
                <div className="requirement-icon"><RequirementIcon icon={requirement.icon} /></div>
                <h3>{requirement.title}</h3>
                <p>{requirement.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="next-section" aria-labelledby="next-title">
        <div className="page-shell next-card">
          <div>
            <p className="eyebrow eyebrow-light"><span aria-hidden="true" /> TintVerify-Gambia</p>
            <h2 id="next-title">Built to explain the proposed service clearly.</h2>
            <p>This independent prototype is being developed with fictional information only. It does not issue permits or collect applications at this stage.</p>
          </div>
          <a className="button button-light" href="#requirements">Review the checklist <ArrowIcon /></a>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#home" aria-label="TintVerify-Gambia home">
              <BrandMark />
              <span><strong>TintVerify</strong><small>Gambia</small></span>
            </a>
            <p>Independent vehicle tinted-glass permit service demonstration prototype.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <a href="#how-it-works">How it works</a>
            <a href="#requirements">Requirements</a>
            <a href="#service-availability">Prototype notice</a>
          </div>
          <div>
            <h2>Contact</h2>
            <p>Contact details are not yet available for this independent demonstration.</p>
            <span className="contact-placeholder">Email placeholder — to be confirmed</span>
            <span className="contact-placeholder">Telephone placeholder — to be confirmed</span>
          </div>
        </div>
        <div className="page-shell footer-bottom">
          <p>© {new Date().getFullYear()} TintVerify-Gambia. Independent prototype.</p>
          <p>DEMO PROTOTYPE — NOT AN OFFICIAL GOVERNMENT SERVICE</p>
        </div>
      </footer>
    </main>
  );
}
