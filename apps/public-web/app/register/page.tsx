import type { Metadata } from "next";
import { AuthPageLayout } from "../components/auth-page-layout";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "Create an applicant account | TintVerify-Gambia",
  description: "Demonstration applicant account registration for TintVerify-Gambia.",
};

export default function RegisterPage() {
  return (
    <AuthPageLayout
      eyebrow="Create an account"
      title="Start with an applicant account."
      description="Choose the account type that best describes who is applying. The form will show only the details relevant to that choice."
    >
      <RegistrationForm />
    </AuthPageLayout>
  );
}
