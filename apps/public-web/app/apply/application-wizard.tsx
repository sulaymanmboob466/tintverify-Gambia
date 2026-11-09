"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

type ApplicantType = "individual" | "company" | "representative";
type DocumentKind = "document" | "photo";
type Errors = Record<string, string>;

type ApplicantDetails = {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  residentialAddress: string;
  drivingLicenceNumber: string;
  companyName: string;
  businessRegistrationNumber: string;
  companyAddress: string;
  contactFullName: string;
  contactEmail: string;
  contactPhone: string;
  ownerFullName: string;
  ownerEmail: string;
  ownerPhone: string;
  representativeFullName: string;
  representativeEmail: string;
  representativePhone: string;
};

type Vehicle = {
  id: number;
  registrationNumber: string;
  make: string;
  model: string;
  colour: string;
};

type SelectedDocument = {
  name: string;
  size: number;
};

type DocumentDefinition = {
  key: string;
  label: string;
  description: string;
  kind: DocumentKind;
};

const steps = [
  { title: "Applicant", description: "Who is applying" },
  { title: "Vehicle", description: "Vehicle details" },
  { title: "Documents", description: "Supporting files" },
  { title: "Review", description: "Check and confirm" },
];

const applicantTypeOptions: Array<{ value: ApplicantType; title: string; description: string }> = [
  { value: "individual", title: "Individual vehicle owner", description: "Apply for your own vehicle." },
  { value: "company", title: "Company", description: "Apply on behalf of a registered business." },
  { value: "representative", title: "Authorised representative", description: "Apply for a vehicle owner with permission." },
];

const emptyApplicant = (): ApplicantDetails => ({
  fullName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  residentialAddress: "",
  drivingLicenceNumber: "",
  companyName: "",
  businessRegistrationNumber: "",
  companyAddress: "",
  contactFullName: "",
  contactEmail: "",
  contactPhone: "",
  ownerFullName: "",
  ownerEmail: "",
  ownerPhone: "",
  representativeFullName: "",
  representativeEmail: "",
  representativePhone: "",
});

const createVehicle = (id: number): Vehicle => ({
  id,
  registrationNumber: "",
  make: "",
  model: "",
  colour: "",
});

function getDocumentDefinitions(applicantType: ApplicantType, vehicles: Vehicle[]): DocumentDefinition[] {
  const applicantDocuments: DocumentDefinition[] = [];

  if (applicantType === "individual") {
    applicantDocuments.push({
      key: "driving-licence",
      label: "Driving licence document",
      description: "PDF, JPG or PNG — maximum 10 MB.",
      kind: "document",
    });
  }

  if (applicantType === "company") {
    applicantDocuments.push({
      key: "company-registration",
      label: "Company registration document",
      description: "PDF, JPG or PNG — maximum 10 MB.",
      kind: "document",
    });
  }

  if (applicantType === "representative") {
    applicantDocuments.push(
      {
        key: "representative-identification",
        label: "Representative identification document",
        description: "PDF, JPG or PNG — maximum 10 MB.",
        kind: "document",
      },
      {
        key: "authorisation-letter",
        label: "Authorisation letter or supporting document",
        description: "PDF, JPG or PNG — maximum 10 MB.",
        kind: "document",
      },
    );
  }

  const vehicleDocuments = vehicles.flatMap((vehicle, index) => {
    const vehicleName = applicantType === "company" ? `Vehicle ${index + 1}` : "Vehicle";
    const prefix = `vehicle-${vehicle.id}`;

    return [
      {
        key: `${prefix}-registration`,
        label: `${vehicleName} registration document`,
        description: "PDF, JPG or PNG — maximum 10 MB.",
        kind: "document" as const,
      },
      {
        key: `${prefix}-front-photo`,
        label: `${vehicleName} front photograph`,
        description: "JPG or PNG — maximum 5 MB.",
        kind: "photo" as const,
      },
      {
        key: `${prefix}-rear-photo`,
        label: `${vehicleName} rear photograph`,
        description: "JPG or PNG — maximum 5 MB.",
        kind: "photo" as const,
      },
      {
        key: `${prefix}-left-photo`,
        label: `${vehicleName} left-side photograph`,
        description: "JPG or PNG — maximum 5 MB.",
        kind: "photo" as const,
      },
      {
        key: `${prefix}-right-photo`,
        label: `${vehicleName} right-side photograph`,
        description: "JPG or PNG — maximum 5 MB.",
        kind: "photo" as const,
      },
    ];
  });

  return [...applicantDocuments, ...vehicleDocuments];
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasValidPhoneLength(value: string) {
  return value.replace(/\D/g, "").length >= 7;
}

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(size >= 1024 * 1024 ? 1 : 2)} MB`;
}

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  type?: "date" | "email" | "tel" | "text";
  required?: boolean;
  onChange: (value: string) => void;
};

function TextInput({
  id,
  label,
  value,
  error,
  hint,
  type = "text",
  required = false,
  onChange,
}: TextInputProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      />
      {hint && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function TextArea({ id, label, value, error, required = false, onChange }: TextAreaProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field form-field-wide">
      <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
      <textarea
        id={id}
        value={value}
        rows={3}
        required={required}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
      />
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}

type DocumentUploadProps = {
  definition: DocumentDefinition;
  selected?: SelectedDocument;
  error?: string;
  resetKey: number;
  onSelect: (definition: DocumentDefinition, file: File | undefined) => void;
};

function DocumentUpload({ definition, selected, error, resetKey, onSelect }: DocumentUploadProps) {
  const isPhoto = definition.kind === "photo";
  const inputId = `upload-${definition.key}`;

  return (
    <div className={`document-upload ${error ? "has-error" : ""}`}>
      <div>
        <label htmlFor={inputId}>{definition.label} <span aria-hidden="true">*</span></label>
        <p>{definition.description}</p>
      </div>
      <div className="document-upload-control">
        <input
          key={`${definition.key}-${resetKey}`}
          id={inputId}
          type="file"
          accept={isPhoto ? ".jpg,.jpeg,.png,image/jpeg,image/png" : ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onSelect(definition, event.target.files?.[0])}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        <label className="upload-button" htmlFor={inputId}>Choose file</label>
        <span>{selected ? selected.name : "No file chosen"}</span>
      </div>
      {selected && <p className="document-selected">Selected locally: {formatFileSize(selected.size)}. This file is not uploaded.</p>}
      {error && <p className="field-error" id={`${inputId}-error`} role="alert">{error}</p>}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-item">
      <dt>{label}</dt>
      <dd>{value || "Not provided"}</dd>
    </div>
  );
}

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicantType, setApplicantType] = useState<ApplicantType>("individual");
  const [applicant, setApplicant] = useState<ApplicantDetails>(emptyApplicant);
  const [vehicles, setVehicles] = useState<Vehicle[]>([createVehicle(1)]);
  const [nextVehicleId, setNextVehicleId] = useState(2);
  const [documents, setDocuments] = useState<Record<string, SelectedDocument>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [demoAcknowledgement, setDemoAcknowledgement] = useState(false);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const documentDefinitions = useMemo(
    () => getDocumentDefinitions(applicantType, vehicles),
    [applicantType, vehicles],
  );

  const clearError = (errorKey: string) => {
    setErrors((currentErrors) => {
      if (!currentErrors[errorKey]) return currentErrors;
      const remainingErrors = { ...currentErrors };
      delete remainingErrors[errorKey];
      return remainingErrors;
    });
  };

  const updateApplicant = (field: keyof ApplicantDetails, value: string) => {
    setApplicant((currentApplicant) => ({ ...currentApplicant, [field]: value }));
    clearError(field);
  };

  const updateVehicle = (vehicleId: number, field: keyof Omit<Vehicle, "id">, value: string) => {
    setVehicles((currentVehicles) => currentVehicles.map((vehicle) => (
      vehicle.id === vehicleId ? { ...vehicle, [field]: value } : vehicle
    )));
    clearError(`vehicle-${vehicleId}-${field}`);
  };

  const changeApplicantType = (nextType: ApplicantType) => {
    setApplicantType(nextType);
    setVehicles([createVehicle(1)]);
    setNextVehicleId(2);
    setDocuments({});
    setDemoAcknowledgement(false);
    setErrors({});
    setUploadResetKey((currentKey) => currentKey + 1);
  };

  const addVehicle = () => {
    setVehicles((currentVehicles) => [...currentVehicles, createVehicle(nextVehicleId)]);
    setNextVehicleId((currentId) => currentId + 1);
  };

  const removeVehicle = (vehicleId: number) => {
    setVehicles((currentVehicles) => currentVehicles.filter((vehicle) => vehicle.id !== vehicleId));
    setDocuments((currentDocuments) => Object.fromEntries(
      Object.entries(currentDocuments).filter(([key]) => !key.startsWith(`vehicle-${vehicleId}-`)),
    ));
  };

  const validateApplicant = (): Errors => {
    const nextErrors: Errors = {};
    const requireValue = (field: keyof ApplicantDetails, label: string) => {
      if (!applicant[field].trim()) nextErrors[field] = `Enter ${label.toLowerCase()}.`;
    };
    const checkEmail = (field: keyof ApplicantDetails) => {
      if (applicant[field] && !isValidEmail(applicant[field])) nextErrors[field] = "Enter a valid email address.";
    };
    const checkPhone = (field: keyof ApplicantDetails) => {
      if (applicant[field] && !hasValidPhoneLength(applicant[field])) nextErrors[field] = "Enter a valid phone number.";
    };

    if (applicantType === "individual") {
      requireValue("fullName", "your full name");
      requireValue("dateOfBirth", "your date of birth");
      requireValue("email", "your email address");
      requireValue("phone", "your phone number");
      requireValue("residentialAddress", "your residential address");
      requireValue("drivingLicenceNumber", "your driving licence number");
      checkEmail("email");
      checkPhone("phone");

      if (applicant.dateOfBirth && new Date(applicant.dateOfBirth).getTime() >= Date.now()) {
        nextErrors.dateOfBirth = "Enter a date of birth in the past.";
      }
    }

    if (applicantType === "company") {
      requireValue("companyName", "the company name");
      requireValue("businessRegistrationNumber", "the business registration number");
      requireValue("companyAddress", "the company address");
      requireValue("contactFullName", "the contact person's full name");
      requireValue("contactEmail", "the contact email address");
      requireValue("contactPhone", "the contact phone number");
      checkEmail("contactEmail");
      checkPhone("contactPhone");
    }

    if (applicantType === "representative") {
      requireValue("ownerFullName", "the vehicle owner's full name");
      requireValue("ownerEmail", "the vehicle owner's email address");
      requireValue("ownerPhone", "the vehicle owner's phone number");
      requireValue("representativeFullName", "your full name");
      requireValue("representativeEmail", "your email address");
      requireValue("representativePhone", "your phone number");
      checkEmail("ownerEmail");
      checkEmail("representativeEmail");
      checkPhone("ownerPhone");
      checkPhone("representativePhone");
    }

    return nextErrors;
  };

  const validateVehicles = (): Errors => {
    const nextErrors: Errors = {};

    vehicles.forEach((vehicle, index) => {
      const prefix = applicantType === "company" ? `vehicle ${index + 1}` : "vehicle";
      if (!vehicle.registrationNumber.trim()) nextErrors[`vehicle-${vehicle.id}-registrationNumber`] = `Enter the ${prefix} registration number.`;
      if (!vehicle.make.trim()) nextErrors[`vehicle-${vehicle.id}-make`] = `Enter the ${prefix} make.`;
      if (!vehicle.model.trim()) nextErrors[`vehicle-${vehicle.id}-model`] = `Enter the ${prefix} model.`;
    });

    return nextErrors;
  };

  const validateDocuments = (): Errors => {
    const nextErrors: Errors = {};

    documentDefinitions.forEach((definition) => {
      if (!documents[definition.key]) {
        nextErrors[`document-${definition.key}`] = "Choose a file for this document.";
      }
    });

    return nextErrors;
  };

  const validateReview = (): Errors => (
    demoAcknowledgement ? {} : { demonstrationAcknowledgement: "Confirm the demonstration notice before continuing." }
  );

  const moveToStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continueToNextStep = () => {
    const currentErrors = currentStep === 0
      ? validateApplicant()
      : currentStep === 1
        ? validateVehicles()
        : validateDocuments();

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      moveToStep(currentStep + 1);
    }
  };

  const selectDocument = (definition: DocumentDefinition, file: File | undefined) => {
    const errorKey = `document-${definition.key}`;

    if (!file) {
      setDocuments((currentDocuments) => {
        const remainingDocuments = { ...currentDocuments };
        delete remainingDocuments[definition.key];
        return remainingDocuments;
      });
      clearError(errorKey);
      return;
    }

    const fileName = file.name.toLowerCase();
    const allowedExtensions = definition.kind === "photo"
      ? [".jpg", ".jpeg", ".png"]
      : [".pdf", ".jpg", ".jpeg", ".png"];
    const sizeLimit = definition.kind === "photo" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

    if (!allowedExtensions.some((extension) => fileName.endsWith(extension))) {
      setDocuments((currentDocuments) => {
        const remainingDocuments = { ...currentDocuments };
        delete remainingDocuments[definition.key];
        return remainingDocuments;
      });
      setErrors((currentErrors) => ({
        ...currentErrors,
        [errorKey]: definition.kind === "photo" ? "Choose a JPG or PNG photograph." : "Choose a PDF, JPG or PNG file.",
      }));
      return;
    }

    if (file.size > sizeLimit) {
      setDocuments((currentDocuments) => {
        const remainingDocuments = { ...currentDocuments };
        delete remainingDocuments[definition.key];
        return remainingDocuments;
      });
      setErrors((currentErrors) => ({
        ...currentErrors,
        [errorKey]: `Choose a file no larger than ${definition.kind === "photo" ? "5" : "10"} MB.`,
      }));
      return;
    }

    setDocuments((currentDocuments) => ({
      ...currentDocuments,
      [definition.key]: { name: file.name, size: file.size },
    }));
    clearError(errorKey);
  };

  const completeDemonstration = () => {
    setApplicant(emptyApplicant());
    setVehicles([createVehicle(1)]);
    setNextVehicleId(2);
    setDocuments({});
    setErrors({});
    setDemoAcknowledgement(false);
    setUploadResetKey((currentKey) => currentKey + 1);
    setIsComplete(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep < steps.length - 1) {
      continueToNextStep();
      return;
    }

    const applicantErrors = validateApplicant();
    const vehicleErrors = validateVehicles();
    const documentErrors = validateDocuments();
    const reviewErrors = validateReview();
    const allErrors = { ...applicantErrors, ...vehicleErrors, ...documentErrors, ...reviewErrors };

    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      if (Object.keys(applicantErrors).length > 0) moveToStep(0);
      else if (Object.keys(vehicleErrors).length > 0) moveToStep(1);
      else if (Object.keys(documentErrors).length > 0) moveToStep(2);
      return;
    }

    completeDemonstration();
  };

  const restart = () => {
    setApplicantType("individual");
    setApplicant(emptyApplicant());
    setVehicles([createVehicle(1)]);
    setNextVehicleId(2);
    setDocuments({});
    setErrors({});
    setDemoAcknowledgement(false);
    setUploadResetKey((currentKey) => currentKey + 1);
    setCurrentStep(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <section className="demo-confirmation" aria-labelledby="confirmation-title">
        <div className="confirmation-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3 19 6v5c0 4.5-2.9 7.8-7 9.7C7.9 18.8 5 15.5 5 11V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="m8.5 12 2.3 2.3L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="auth-card-eyebrow">Demonstration complete</p>
        <h2 id="confirmation-title">Nothing has been submitted.</h2>
        <p>You completed the frontend demonstration. No application, permit, payment request, document upload or personal record was created, saved or sent.</p>
        <div className="confirmation-actions">
          <button className="auth-submit confirmation-button" type="button" onClick={restart}>Start another demo</button>
          <Link className="confirmation-home-link" href="/">Return to homepage</Link>
        </div>
      </section>
    );
  }

  return (
    <form className="application-wizard" noValidate onSubmit={handleSubmit}>
      <ol className="application-progress" aria-label="Application progress">
        {steps.map((step, index) => (
          <li className={index === currentStep ? "is-current" : index < currentStep ? "is-complete" : ""} key={step.title} aria-current={index === currentStep ? "step" : undefined}>
            <span>{index < currentStep ? "✓" : index + 1}</span>
            <div><strong>{step.title}</strong><small>{step.description}</small></div>
          </li>
        ))}
      </ol>

      <div className="application-card">
        {Object.keys(errors).length > 0 && (
          <div className="application-error-summary" role="alert">
            <strong>Please review the highlighted fields.</strong> Each required detail needs to be completed before you continue.
          </div>
        )}

        {currentStep === 0 && (
          <section aria-labelledby="applicant-step-title">
            <div className="application-card-heading">
              <p className="auth-card-eyebrow">Step 1 of 4</p>
              <h2 id="applicant-step-title">Applicant information</h2>
              <p>Tell us who would be making this proposed application.</p>
            </div>

            <fieldset className="account-type-group application-type-group">
              <legend>Applicant type</legend>
              <div className="account-type-options">
                {applicantTypeOptions.map((option) => (
                  <label className={`account-type-option ${applicantType === option.value ? "is-selected" : ""}`} key={option.value}>
                    <input type="radio" name="applicantType" value={option.value} checked={applicantType === option.value} onChange={() => changeApplicantType(option.value)} />
                    <span className="account-type-control" aria-hidden="true" />
                    <span><strong>{option.title}</strong><small>{option.description}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-section-heading application-section-heading">
              <h3>{applicantTypeOptions.find((option) => option.value === applicantType)?.title} details</h3>
              <p>Fields marked with * are required.</p>
            </div>

            <div className="form-grid">
              {applicantType === "individual" && (
                <>
                  <TextInput id="fullName" label="Full name" value={applicant.fullName} required error={errors.fullName} onChange={(value) => updateApplicant("fullName", value)} />
                  <TextInput id="dateOfBirth" label="Date of birth" type="date" value={applicant.dateOfBirth} required error={errors.dateOfBirth} onChange={(value) => updateApplicant("dateOfBirth", value)} />
                  <TextInput id="email" label="Email address" type="email" value={applicant.email} required error={errors.email} onChange={(value) => updateApplicant("email", value)} />
                  <TextInput id="phone" label="Phone number" type="tel" value={applicant.phone} required error={errors.phone} onChange={(value) => updateApplicant("phone", value)} />
                  <TextArea id="residentialAddress" label="Residential address" value={applicant.residentialAddress} required error={errors.residentialAddress} onChange={(value) => updateApplicant("residentialAddress", value)} />
                  <TextInput id="drivingLicenceNumber" label="Driving licence number" value={applicant.drivingLicenceNumber} required error={errors.drivingLicenceNumber} onChange={(value) => updateApplicant("drivingLicenceNumber", value)} />
                </>
              )}

              {applicantType === "company" && (
                <>
                  <TextInput id="companyName" label="Company name" value={applicant.companyName} required error={errors.companyName} onChange={(value) => updateApplicant("companyName", value)} />
                  <TextInput id="businessRegistrationNumber" label="Business registration number" value={applicant.businessRegistrationNumber} required error={errors.businessRegistrationNumber} onChange={(value) => updateApplicant("businessRegistrationNumber", value)} />
                  <TextInput id="contactFullName" label="Contact person's full name" value={applicant.contactFullName} required error={errors.contactFullName} onChange={(value) => updateApplicant("contactFullName", value)} />
                  <TextInput id="contactEmail" label="Contact email address" type="email" value={applicant.contactEmail} required error={errors.contactEmail} onChange={(value) => updateApplicant("contactEmail", value)} />
                  <TextInput id="contactPhone" label="Contact phone number" type="tel" value={applicant.contactPhone} required error={errors.contactPhone} onChange={(value) => updateApplicant("contactPhone", value)} />
                  <TextArea id="companyAddress" label="Company address" value={applicant.companyAddress} required error={errors.companyAddress} onChange={(value) => updateApplicant("companyAddress", value)} />
                </>
              )}

              {applicantType === "representative" && (
                <>
                  <TextInput id="ownerFullName" label="Vehicle owner's full name" value={applicant.ownerFullName} required error={errors.ownerFullName} onChange={(value) => updateApplicant("ownerFullName", value)} />
                  <TextInput id="ownerEmail" label="Vehicle owner's email address" type="email" value={applicant.ownerEmail} required error={errors.ownerEmail} onChange={(value) => updateApplicant("ownerEmail", value)} />
                  <TextInput id="ownerPhone" label="Vehicle owner's phone number" type="tel" value={applicant.ownerPhone} required error={errors.ownerPhone} onChange={(value) => updateApplicant("ownerPhone", value)} />
                  <TextInput id="representativeFullName" label="Representative's full name" value={applicant.representativeFullName} required error={errors.representativeFullName} onChange={(value) => updateApplicant("representativeFullName", value)} />
                  <TextInput id="representativeEmail" label="Representative's email address" type="email" value={applicant.representativeEmail} required error={errors.representativeEmail} onChange={(value) => updateApplicant("representativeEmail", value)} />
                  <TextInput id="representativePhone" label="Representative's phone number" type="tel" value={applicant.representativePhone} required error={errors.representativePhone} onChange={(value) => updateApplicant("representativePhone", value)} />
                </>
              )}
            </div>
          </section>
        )}

        {currentStep === 1 && (
          <section aria-labelledby="vehicle-step-title">
            <div className="application-card-heading">
              <p className="auth-card-eyebrow">Step 2 of 4</p>
              <h2 id="vehicle-step-title">Vehicle details</h2>
              <p>{applicantType === "company" ? "Add each vehicle this company would include in the proposed application." : "Provide the details of the vehicle for this proposed application."}</p>
            </div>

            <div className="vehicle-list">
              {vehicles.map((vehicle, index) => (
                <section className="vehicle-entry" key={vehicle.id} aria-labelledby={`vehicle-${vehicle.id}-title`}>
                  <div className="vehicle-entry-heading">
                    <div>
                      <p>Vehicle {index + 1}</p>
                      <h3 id={`vehicle-${vehicle.id}-title`}>{applicantType === "company" ? "Company vehicle" : "Vehicle information"}</h3>
                    </div>
                    {applicantType === "company" && vehicles.length > 1 && <button className="text-action" type="button" onClick={() => removeVehicle(vehicle.id)}>Remove</button>}
                  </div>
                  <div className="form-grid">
                    <TextInput id={`vehicle-${vehicle.id}-registrationNumber`} label="Registration number" value={vehicle.registrationNumber} required error={errors[`vehicle-${vehicle.id}-registrationNumber`]} onChange={(value) => updateVehicle(vehicle.id, "registrationNumber", value)} />
                    <TextInput id={`vehicle-${vehicle.id}-make`} label="Vehicle make" value={vehicle.make} required error={errors[`vehicle-${vehicle.id}-make`]} onChange={(value) => updateVehicle(vehicle.id, "make", value)} />
                    <TextInput id={`vehicle-${vehicle.id}-model`} label="Vehicle model" value={vehicle.model} required error={errors[`vehicle-${vehicle.id}-model`]} onChange={(value) => updateVehicle(vehicle.id, "model", value)} />
                    <TextInput id={`vehicle-${vehicle.id}-colour`} label="Vehicle colour (if applicable)" value={vehicle.colour} error={errors[`vehicle-${vehicle.id}-colour`]} onChange={(value) => updateVehicle(vehicle.id, "colour", value)} />
                  </div>
                </section>
              ))}
            </div>

            {applicantType === "company" && <button className="add-vehicle-button" type="button" onClick={addVehicle}><span aria-hidden="true">+</span> Add another vehicle</button>}
          </section>
        )}

        {currentStep === 2 && (
          <section aria-labelledby="documents-step-title">
            <div className="application-card-heading">
              <p className="auth-card-eyebrow">Step 3 of 4</p>
              <h2 id="documents-step-title">Supporting documents</h2>
              <p>Select the demonstration files that would support this application. Files remain in your browser and are never uploaded.</p>
            </div>

            <div className="document-list">
              {documentDefinitions.map((definition) => (
                <DocumentUpload
                  key={definition.key}
                  definition={definition}
                  selected={documents[definition.key]}
                  error={errors[`document-${definition.key}`]}
                  resetKey={uploadResetKey}
                  onSelect={selectDocument}
                />
              ))}
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section aria-labelledby="review-step-title">
            <div className="application-card-heading">
              <p className="auth-card-eyebrow">Step 4 of 4</p>
              <h2 id="review-step-title">Review before demonstration submission</h2>
              <p>Check this local-only summary. You can return to any earlier section to make changes.</p>
            </div>

            <div className="review-sections">
              <section className="review-section">
                <div className="review-section-heading"><h3>Applicant</h3><button type="button" onClick={() => moveToStep(0)}>Edit</button></div>
                <dl className="review-list">
                  <ReviewItem label="Applicant type" value={applicantTypeOptions.find((option) => option.value === applicantType)?.title ?? ""} />
                  {applicantType === "individual" && <><ReviewItem label="Name" value={applicant.fullName} /><ReviewItem label="Email" value={applicant.email} /><ReviewItem label="Phone" value={applicant.phone} /><ReviewItem label="Driving licence number" value={applicant.drivingLicenceNumber} /></>}
                  {applicantType === "company" && <><ReviewItem label="Company" value={applicant.companyName} /><ReviewItem label="Business registration number" value={applicant.businessRegistrationNumber} /><ReviewItem label="Contact" value={applicant.contactFullName} /><ReviewItem label="Contact email" value={applicant.contactEmail} /></>}
                  {applicantType === "representative" && <><ReviewItem label="Vehicle owner" value={applicant.ownerFullName} /><ReviewItem label="Owner email" value={applicant.ownerEmail} /><ReviewItem label="Representative" value={applicant.representativeFullName} /><ReviewItem label="Representative email" value={applicant.representativeEmail} /></>}
                </dl>
              </section>

              <section className="review-section">
                <div className="review-section-heading"><h3>Vehicles</h3><button type="button" onClick={() => moveToStep(1)}>Edit</button></div>
                <dl className="review-list">
                  {vehicles.map((vehicle, index) => <ReviewItem key={vehicle.id} label={`Vehicle ${index + 1}`} value={`${vehicle.registrationNumber} · ${vehicle.make} ${vehicle.model}${vehicle.colour ? ` · ${vehicle.colour}` : ""}`} />)}
                </dl>
              </section>

              <section className="review-section">
                <div className="review-section-heading"><h3>Documents</h3><button type="button" onClick={() => moveToStep(2)}>Edit</button></div>
                <dl className="review-list">
                  {documentDefinitions.map((definition) => <ReviewItem key={definition.key} label={definition.label} value={documents[definition.key]?.name ?? "Not selected"} />)}
                </dl>
              </section>
            </div>

            <div className="demo-privacy-notice">
              <h3>Demonstration privacy notice</h3>
              <p>This prototype does not submit, store or share any information or files. Do not use real personal or vehicle details. A future production system would provide an approved privacy notice before accepting an application.</p>
            </div>
            <label className={`form-checkbox ${errors.demonstrationAcknowledgement ? "has-error" : ""}`}>
              <input type="checkbox" checked={demoAcknowledgement} onChange={(event) => { setDemoAcknowledgement(event.target.checked); clearError("demonstrationAcknowledgement"); }} />
              <span>I understand this is a demonstration and that no permit application will be submitted or created.</span>
            </label>
            {errors.demonstrationAcknowledgement && <p className="field-error checkbox-error" role="alert">{errors.demonstrationAcknowledgement}</p>}
          </section>
        )}

        <div className="wizard-actions">
          {currentStep > 0 && <button className="wizard-back" type="button" onClick={() => moveToStep(currentStep - 1)}>Back</button>}
          {currentStep < steps.length - 1 ? (
            <button className="wizard-next" type="button" onClick={continueToNextStep}>Continue</button>
          ) : (
            <button className="wizard-next" type="submit">Complete demonstration</button>
          )}
        </div>
      </div>
    </form>
  );
}
