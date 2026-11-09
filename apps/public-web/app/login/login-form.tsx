"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function LoginForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const clearError = (fieldName: string) => {
    setIsComplete(false);
    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) return currentErrors;
      const remainingErrors = { ...currentErrors };
      delete remainingErrors[fieldName];
      return remainingErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nextErrors: Record<string, string> = {};

    if (!email) nextErrors.email = "Enter your email address.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";

    setErrors(nextErrors);
    setIsComplete(false);

    if (Object.keys(nextErrors).length === 0) {
      event.currentTarget.reset();
      setIsComplete(true);
    }
  };

  return (
    <>
      <div className="auth-card-heading">
        <h2>Sign in to your account</h2>
        <p>Use the email address and password for your applicant account.</p>
      </div>

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="form-grid form-grid-single">
          <div className="form-field form-field-wide">
            <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" autoComplete="off" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onInput={() => clearError("email")} />
            {errors.email && <p className="field-error" id="email-error" role="alert">{errors.email}</p>}
          </div>
          <div className="form-field form-field-wide">
            <div className="field-label-row"><label htmlFor="password">Password <span aria-hidden="true">*</span></label><Link href="/forgot-password">Forgot password?</Link></div>
            <input id="password" name="password" type="password" autoComplete="off" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} onInput={() => clearError("password")} />
            {errors.password && <p className="field-error" id="password-error" role="alert">{errors.password}</p>}
          </div>
        </div>

        {isComplete && <div className="form-success" role="status"><strong>Demonstration sign-in complete.</strong> No account was accessed and nothing was sent or saved.</div>}
        <button className="auth-submit" type="submit">Sign in to demonstration</button>
      </form>

      <p className="auth-switch">New to the proposed service? <Link href="/register">Create an account</Link></p>
    </>
  );
}
