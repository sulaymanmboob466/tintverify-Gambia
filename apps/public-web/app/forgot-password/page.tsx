import type { Metadata } from "next";
import { AuthPageLayout } from "../components/auth-page-layout";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password | TintVerify-Gambia",
  description: "Demonstration password reset page for TintVerify-Gambia.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageLayout
      eyebrow="Password support"
      title="Reset your password."
      description="Enter the email address connected to your applicant account and a future service could send password reset instructions."
    >
      <ForgotPasswordForm />
    </AuthPageLayout>
  );
}
