import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsentBanner from "@/components/CookieConsent";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rezme – AI Resume Tailoring for Every Job",
  description:
    "Stop sending generic applications. Rezme uses AI to tailor your resume and cover letter to each job description in seconds. More interviews, less effort.",
  icons: {
    icon: "/Rezme.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
