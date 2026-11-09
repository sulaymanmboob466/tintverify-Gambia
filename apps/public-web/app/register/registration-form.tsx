"use client";

import Link from "next/link";
import { useState, type FormEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

type AccountType = "individual" | "company" | "representative";
type Errors = Record<string, string>;

const accountTypes: Array<{ value: AccountType; title: string; description: string }> = [
  {
    value: "individual",
    title: "Individual",
    description: "You are applying for yourself.",
  },
  {
    value: "company",
    title: "Company",
    description: "You are applying for a registered business.",
  },
  {
    value: "representative",
    title: "Authorised representative",
    description: "You are applying on behalf of a vehicle owner.",
  },
];

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

function InputField({ label, hint, error, id, name, required, ...inputProps }: InputFieldProps) {
  const inputId = id ?? name;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={inputId}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        {...inputProps}
        id={inputId}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      />
      {hint && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

function TextAreaField({ label, error, id, name, required, ...textAreaProps }: TextAreaFieldProps) {
  const inputId = id ?? name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="form-field form-field-wide">
      <label htmlFor={inputId}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        {...textAreaProps}
        id={inputId}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasValidPhoneLength(value: string) {
  return value.replace(/\D/g, "").length >= 7;
}

export function RegistrationForm() {
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [errors, setErrors] = useState<Errors>({});
  const [isComplete, setIsComplete] = useState(false);

  const clearError = (fieldName: string) => {
    setIsComplete(false);
    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const remainingErrors = { ...currentErrors };
      delete remainingErrors[fieldName];
      return remainingErrors;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    const value = (fieldName: string) => String(formData.get(fieldName) ?? "").trim();
    const requireValue = (fieldName: string, label: string) => {
      if (!value(fieldName)) {
        nextErrors[fieldName] = `Enter ${label.toLowerCase()}.`;
      }
    };

    if (accountType === "individual") {
      requireValue("fullName", "your full name");
      requireValue("dateOfBirth", "your date of birth");
      requireValue("residentialAddress", "your residential address");
      requireValue("drivingLicenceNumber", "your driving licence number");

      const dateOfBirth = value("dateOfBirth");
      if (dateOfBirth && new Date(dateOfBirth).getTime() >= Date.now()) {
        nextErrors.dateOfBirth = "Enter a date of birth in the past.";
      }
    }

    if (accountType === "company") {
      requireValue("companyName", "the company name");
      requireValue("businessRegistrationNumber", "the business registration number");
      requireValue("companyAddress", "the company address");
      requireValue("contactFullName", "the contact person's full name");
    }

    if (accountType === "representative") {
      requireValue("ownerFullName", "the vehicle owner's full name");
      requireValue("ownerPhone", "the vehicle owner's phone number");
      requireValue("representativeFullName", "your full name");

      if (value("ownerPhone") && !hasValidPhoneLength(value("ownerPhone"))) {
        nextErrors.ownerPhone = "Enter a valid phone number.";
      }
    }

    const emailField = accountType === "company" ? "companyEmail" : "email";
    const phoneField = accountType === "company" ? "companyPhone" : "phone";
    requireValue(emailField, "an email address");
    requireValue(phoneField, "a phone number");

    if (value(emailField) && !isValidEmail(value(emailField))) {
      nextErrors[emailField] = "Enter a valid email address.";
    }

    if (value(phoneField) && !hasValidPhoneLength(value(phoneField))) {
      nextErrors[phoneField] = "Enter a valid phone number.";
    }

    requireValue("password", "a password");
    requireValue("confirmPassword", "your password again");

    if (value("password") && value("password").length < 12) {
      nextErrors.password = "Use at least 12 characters.";
    }

    if (value("confirmPassword") && value("password") !== value("confirmPassword")) {
      nextErrors.confirmPassword = "The passwords do not match.";
    }

    if (formData.get("demonstrationAcknowledgement") !== "acknowledged") {
      nextErrors.demonstrationAcknowledgement = "Confirm that you will not use real information on this demonstration form.";
    }

    setErrors(nextErrors);
    setIsComplete(false);

    if (Object.keys(nextErrors).length === 0) {
      event.currentTarget.reset();
      setAccountType("individual");
      setIsComplete(true);
    }
  };

  return (
    <>
      <div className="auth-card-heading">
        <h2>Choose your account type</h2>
        <p>Select the option that applies to this proposed application.</p>
      </div>

      <form noValidate onSubmit={handleSubmit} className="auth-form">
        <fieldset className="account-type-group">
          <legend className="sr-only">Account type</legend>
          <div className="account-type-options">
            {accountTypes.map((option) => (
              <label className={`account-type-option ${accountType === option.value ? "is-selected" : ""}`} key={option.value}>
                <input
                  type="radio"
                  name="accountType"
                  value={option.value}
                  checked={accountType === option.value}
                  onChange={() => {
                    setAccountType(option.value);
                    setErrors({});
                    setIsComplete(false);
                  }}
                />
                <span className="account-type-control" aria-hidden="true" />
                <span><strong>{option.title}</strong><small>{option.description}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-section-heading">
          <h3>{accountTypes.find((option) => option.value === accountType)?.title} account details</h3>
          <p>Fields marked with * are required.</p>
        </div>

        <div className="form-grid">
          {accountType === "individual" && (
            <>
              <InputField label="Full name" name="fullName" required autoComplete="off" onInput={() => clearError("fullName")} error={errors.fullName} />
              <InputField label="Date of birth" name="dateOfBirth" type="date" required autoComplete="off" onInput={() => clearError("dateOfBirth")} error={errors.dateOfBirth} />
              <InputField label="Email address" name="email" type="email" required autoComplete="off" onInput={() => clearError("email")} error={errors.email} />
              <InputField label="Phone number" name="phone" type="tel" required autoComplete="off" onInput={() => clearError("phone")} error={errors.phone} />
              <TextAreaField label="Residential address" name="residentialAddress" required rows={3} autoComplete="off" onInput={() => clearError("residentialAddress")} error={errors.residentialAddress} />
              <InputField label="Driving licence number" name="drivingLicenceNumber" required autoComplete="off" onInput={() => clearError("drivingLicenceNumber")} error={errors.drivingLicenceNumber} />
            </>
          )}

          {accountType === "company" && (
            <>
              <InputField label="Company name" name="companyName" required autoComplete="off" onInput={() => clearError("companyName")} error={errors.companyName} />
              <InputField label="Business registration number" name="businessRegistrationNumber" required autoComplete="off" onInput={() => clearError("businessRegistrationNumber")} error={errors.businessRegistrationNumber} />
              <InputField label="Contact person's full name" name="contactFullName" required autoComplete="off" onInput={() => clearError("contactFullName")} error={errors.contactFullName} />
              <InputField label="Contact email address" name="companyEmail" type="email" required autoComplete="off" onInput={() => clearError("companyEmail")} error={errors.companyEmail} />
              <InputField label="Contact phone number" name="companyPhone" type="tel" required autoComplete="off" onInput={() => clearError("companyPhone")} error={errors.companyPhone} />
              <TextAreaField label="Company address" name="companyAddress" required rows={3} autoComplete="off" onInput={() => clearError("companyAddress")} error={errors.companyAddress} />
            </>
          )}

          {accountType === "representative" && (
            <>
              <InputField label="Vehicle owner's full name" name="ownerFullName" required autoComplete="off" onInput={() => clearError("ownerFullName")} error={errors.ownerFullName} />
              <InputField label="Vehicle owner's phone number" name="ownerPhone" type="tel" required autoComplete="off" onInput={() => clearError("ownerPhone")} error={errors.ownerPhone} />
              <InputField label="Your full name" name="representativeFullName" required autoComplete="off" onInput={() => clearError("representativeFullName")} error={errors.representativeFullName} />
              <InputField label="Your email address" name="email" type="email" required autoComplete="off" onInput={() => clearError("email")} error={errors.email} />
              <InputField label="Your phone number" name="phone" type="tel" required autoComplete="off" onInput={() => clearError("phone")} error={errors.phone} />
            </>
          )}

          <InputField label="Create a password" name="password" type="password" required hint="Use at least 12 characters." autoComplete="new-password" onInput={() => clearError("password")} error={errors.password} />
          <InputField label="Confirm password" name="confirmPassword" type="password" required autoComplete="new-password" onInput={() => clearError("confirmPassword")} error={errors.confirmPassword} />
        </div>

        <label className={`form-checkbox ${errors.demonstrationAcknowledgement ? "has-error" : ""}`}>
          <input type="checkbox" name="demonstrationAcknowledgement" value="acknowledged" onChange={() => clearError("demonstrationAcknowledgement")} />
          <span>I understand this is a demonstration form and will not use real personal information.</span>
        </label>
        {errors.demonstrationAcknowledgement && <p className="field-error checkbox-error" role="alert">{errors.demonstrationAcknowledgement}</p>}

        {isComplete && (
          <div className="form-success" role="status">
            <strong>Demonstration form complete.</strong> No account was created, and nothing was sent or saved.
          </div>
        )}

        <button className="auth-submit" type="submit">Create demonstration account</button>
      </form>

      <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
    </>
  );
}
