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

const SITE_URL = "https://rezme.ai";
const TITLE = "Rezme – AI Resume Tailoring for Every Job";
const DESCRIPTION =
  "Stop sending generic applications. Rezme uses AI to tailor your resume and cover letter to each job description in seconds. More interviews, less effort.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Rezme",
  },
  description: DESCRIPTION,
  icons: {
    icon: "/Rezme.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Rezme",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
