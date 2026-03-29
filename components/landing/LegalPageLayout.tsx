import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  contactEmail: string;
  children: ReactNode;
};

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  contactEmail,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] pt-32 pb-16">
        <div className="absolute inset-0 noise-overlay opacity-50" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition-colors hover:border-indigo-200 hover:text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
                Legal
              </p>
              <h1 className="display-font max-w-3xl text-5xl leading-none text-slate-950 sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Contact
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Last updated</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Questions or requests</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-indigo-700 transition-colors hover:text-indigo-900"
                  >
                    <Mail className="h-4 w-4" />
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.35)] sm:p-12">
            <div className="space-y-10">{children}</div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-b border-slate-200 pb-10 last:border-b-0 last:pb-0">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-8 text-slate-600 [&_a]:font-semibold [&_a]:text-indigo-700 [&_a]:transition-colors [&_a]:hover:text-indigo-900 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:text-slate-600 [&_li]:list-disc">
        {children}
      </div>
    </section>
  );
}
