import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AURELIA SAREES — Handwoven Heritage",
  description:
    "Handwoven Banarasi, Kanjivaram, Chanderi and more — considered sarees for the moments you carry with you.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={[fraunces.variable, manrope.variable].join(" ")}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
