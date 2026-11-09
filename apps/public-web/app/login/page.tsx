import type { Metadata } from "next";
import { AuthPageLayout } from "../components/auth-page-layout";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Applicant sign in | TintVerify-Gambia",
  description: "Demonstration applicant sign-in page for TintVerify-Gambia.",
};

export default function LoginPage() {
  return (
    <AuthPageLayout
      eyebrow="Applicant sign in"
      title="Continue with your proposed application journey."
      description="This screen shows how applicants could securely return to their account to manage applications and updates."
    >
      <LoginForm />
    </AuthPageLayout>
  );
}
