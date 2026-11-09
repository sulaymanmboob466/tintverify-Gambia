import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TintVerify-Gambia | Demonstration Prototype",
  description:
    "An independent demonstration prototype for a proposed vehicle tinted-glass permit application service in The Gambia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
