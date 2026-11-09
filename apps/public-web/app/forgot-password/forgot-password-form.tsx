"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ForgotPasswordForm() {
  const [emailError, setEmailError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!email) {
      setEmailError("Enter your email address.");
      setIsComplete(false);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      setIsComplete(false);
      return;
    }

    event.currentTarget.reset();
    setEmailError("");
    setIsComplete(true);
  };

  return (
    <>
      <div className="auth-card-heading">
        <h2>Request a password reset</h2>
        <p>Enter your email address. A future service could send reset instructions to it.</p>
      </div>

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="form-grid form-grid-single">
          <div className="form-field form-field-wide">
            <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
              onInput={() => {
                setEmailError("");
                setIsComplete(false);
              }}
            />
            {emailError && <p className="field-error" id="email-error" role="alert">{emailError}</p>}
          </div>
        </div>

        {isComplete && <div className="form-success" role="status"><strong>Demonstration request complete.</strong> No reset email was sent, and nothing was saved.</div>}
        <button className="auth-submit" type="submit">Request password reset</button>
      </form>

      <p className="auth-switch">Remember your password? <Link href="/login">Return to sign in</Link></p>
    </>
  );
}
