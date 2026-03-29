import { auth } from "@/auth";
import {
  hasProAccess,
  remainingCoverLetterGenerations,
  remainingResumeGenerations,
} from "@/lib/billing/limits";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ImportJobForm } from "./_components/ImportJobForm";
import { JobImportEngine } from "./_components/JobImportEngine";
import { ProfileSnapshot } from "./_components/ProfileSnapshot";
import Link from "next/link";
import { Upload, Wand2, Send, CheckCircle2, Lock, FileText, ArrowRight } from "lucide-react";
import { ApplicationStatusBadge } from "@/components/ApplicationStatusBadge";

export default async function DashboardHome() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const userId = (session.user as { id?: string }).id;
  if (!userId || typeof userId !== "string") redirect("/");

  const email = session.user.email ?? "unknown";

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      phoneNumber: true,
      streetAddress: true,
      city: true,
      postcode: true,
      country: true,
      linkedInUrl: true,
      plan: true,
      stripeSubscriptionStatus: true,
      resumeGenerationsUsed: true,
      coverLetterGenerationsUsed: true,
    },
  });

  // Check if user has uploaded documents (using raw query since Document model is ignored)
  type CountResult = { count: bigint };
  const countRows = await prisma.$queryRaw<CountResult[]>`
    SELECT COUNT(*) as count
    FROM documents
    WHERE metadata->>'user_id' = ${String(userId)}
  `;
  const documentCount = Number(countRows[0]?.count ?? 0);

  const isPro = user
    ? hasProAccess(user.plan, user.stripeSubscriptionStatus)
    : false;
  const resumeRemaining = user
    ? remainingResumeGenerations(
        user.plan,
        user.stripeSubscriptionStatus,
        user.resumeGenerationsUsed
      )
    : null;
  const coverRemaining = user
    ? remainingCoverLetterGenerations(
        user.plan,
        user.stripeSubscriptionStatus,
        user.coverLetterGenerationsUsed
      )
    : null;
  const uploadSlotInUse = !isPro && documentCount > 0;

  // If no documents, show onboarding hero
  if (documentCount === 0) {
    const userName = session.user.name || email.split("@")[0] || "there";
    const firstName = userName.split(" ")[0];

    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <header className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Welcome to Rezme, {firstName}
          </h1>
          <p className="text-lg text-foreground-muted">
            Let's get you hired. Complete these steps to start generating tailored resumes and cover letters.
          </p>
        </header>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (col-span-2) - Progress + Action Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-4 sm:p-6 shadow-lg text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Getting Started</h2>
                  <p className="text-indigo-100 text-sm mt-1">
                    You're just a few steps away from your first AI-generated application
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">25%</div>
                  <div className="text-indigo-100 text-sm">Complete</div>
                </div>
              </div>
              <div className="w-full bg-indigo-400/30 rounded-full h-3 overflow-hidden">
                <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: '25%' }} />
              </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 - Active: Upload Base Resume */}
          <div className="bg-surface rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-primary relative">
            <div className="absolute -top-3 -right-3 bg-secondary text-white rounded-full p-2 shadow-lg">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upload Base Resume
              </h3>
              <p className="text-sm text-foreground-muted mb-4">
                Start by uploading your resume, CV, or any career documents. We'll extract your experience and skills.
              </p>
            </div>
            <Link
              href="/dashboard/settings"
              className="w-full inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200"
            >
              Upload Now
            </Link>
          </div>

          {/* Card 2 - Locked: Parse Experience */}
          <div className="bg-surface rounded-xl p-6 shadow-sm opacity-60 cursor-not-allowed relative">
            <div className="absolute -top-3 -right-3 bg-slate-300 text-white rounded-full p-2 shadow-lg">
              <Lock className="h-5 w-5" />
            </div>
            <div className="mb-4">
              <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground-muted mb-2">
                Parse Experience
              </h3>
              <p className="text-sm text-foreground-subtle mb-4">
                Our AI will analyze your documents and structure your career history for optimal presentation.
              </p>
            </div>
            <button
              disabled
              className="w-full inline-flex items-center justify-center rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              Locked
            </button>
          </div>

          {/* Card 3 - Locked: Generate First Cover Letter */}
          <div className="bg-surface rounded-xl p-6 shadow-sm opacity-60 cursor-not-allowed relative">
            <div className="absolute -top-3 -right-3 bg-slate-300 text-white rounded-full p-2 shadow-lg">
              <Lock className="h-5 w-5" />
            </div>
            <div className="mb-4">
              <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground-muted mb-2">
                Generate First Application
              </h3>
              <p className="text-sm text-foreground-subtle mb-4">
                Once your profile is ready, generate your first tailored resume and cover letter in seconds.
              </p>
            </div>
            <button
              disabled
              className="w-full inline-flex items-center justify-center rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              Locked
            </button>
          </div>
            </div>
          </div>

          {/* Side Column (col-span-1) - Why Complete Your Profile */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-border h-full flex flex-col">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Why complete your profile?
              </h2>
              
              {/* Visual Placeholder */}
              <div className="relative mb-6">
                <div className="aspect-[4/5] rounded-xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
                  {/* Blurry Document Lines Effect */}
                  <div className="absolute inset-0 p-6 space-y-2.5 opacity-40">
                    <div className="h-3 bg-slate-300 rounded w-3/4 blur-[2px]"></div>
                    <div className="h-3 bg-slate-300 rounded w-full blur-[2px]"></div>
                    <div className="h-3 bg-slate-300 rounded w-5/6 blur-[2px]"></div>
                    <div className="h-4 bg-slate-400 rounded w-1/2 blur-[2px] mt-4"></div>
                    <div className="h-2.5 bg-slate-300 rounded w-full blur-[2px]"></div>
                    <div className="h-2.5 bg-slate-300 rounded w-4/5 blur-[2px]"></div>
                    <div className="h-2.5 bg-slate-300 rounded w-full blur-[2px]"></div>
                  </div>

                  {/* Center Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-secondary to-secondary-hover text-white px-4 py-3 rounded-lg shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-200">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="font-bold text-sm">Unlock AI Persona</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-3 right-3 h-6 w-6 border-t-2 border-r-2 border-slate-300 rounded-tr-lg opacity-50"></div>
                  <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-slate-300 rounded-bl-lg opacity-50"></div>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Tailor resumes in seconds
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      AI-written cover letters
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Track all applications
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Land more interviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has profile details
  const hasProfile = !!(user?.name && user?.phoneNumber && user?.city);

  const recentApplications = await prisma.jobApplication.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Job Import Card */}
          <div className="bg-surface rounded-xl shadow-sm border border-border p-4">
            <div className="mb-3">
              <h2 className="text-xl font-bold text-foreground">New Application</h2>
              <p className="text-sm text-foreground-muted mt-0.5">
                Import a job description to generate tailored documents
              </p>
            </div>
            <JobImportEngine />
          </div>

          {/* Recent Applications */}
          <div className="bg-surface rounded-xl shadow-sm border border-border p-4 flex-1 min-h-0 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Recent Applications</h3>
              <Link
                href="/dashboard/applications"
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                View all
              </Link>
            </div>

            {recentApplications.length > 0 ? (
              <div className="flex-1 min-h-0">
                <div className="divide-y divide-border">
                  {recentApplications.map((app) => {
                    const date = new Date(app.appliedAt ?? app.updatedAt);
                    const diffDays = Math.floor(
                      (Date.now() - date.getTime()) / 86_400_000
                    );
                    const relDate =
                      diffDays === 0
                        ? "Today"
                        : diffDays === 1
                          ? "1d ago"
                          : diffDays < 7
                            ? `${diffDays}d ago`
                            : diffDays < 30
                              ? `${Math.floor(diffDays / 7)}w ago`
                              : `${Math.floor(diffDays / 30)}mo ago`;

                    return (
                      <Link
                        key={app.id}
                        href={`/dashboard/jobs/${app.job.id}`}
                        className="flex items-center gap-3 py-3 px-1 -mx-1 rounded-lg group hover:bg-slate-50/80 transition-colors"
                      >
                        {app.job.companyLogo ? (
                          <img
                            src={app.job.companyLogo}
                            alt=""
                            className="h-8 w-8 flex-shrink-0 rounded-lg border border-slate-200 bg-white object-contain p-0.5"
                          />
                        ) : (
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500">
                            {app.job.companyName?.charAt(0) ?? "?"}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground truncate">
                              {app.job.companyName || "Unknown"}
                            </span>
                            <span className="text-foreground-subtle text-xs hidden sm:inline">
                              &middot;
                            </span>
                            <span className="text-sm text-foreground-muted truncate hidden sm:inline">
                              {app.job.jobTitle || "Untitled role"}
                            </span>
                          </div>
                          <p className="text-sm text-foreground-muted truncate sm:hidden">
                            {app.job.jobTitle || "Untitled role"}
                          </p>
                        </div>

                        <ApplicationStatusBadge status={app.stage} />

                        <span className="text-xs text-foreground-subtle whitespace-nowrap hidden sm:block">
                          {relDate}
                        </span>

                        <ArrowRight className="h-4 w-4 text-foreground-subtle group-hover:text-primary transition-colors flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center py-6">
                  <FileText className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-foreground mb-0.5">
                    No applications yet
                  </h4>
                  <p className="text-xs text-foreground-muted max-w-xs mx-auto">
                    Import your first job above to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <ProfileSnapshot
            hasDocuments={documentCount > 0}
            hasProfile={hasProfile}
            isPro={isPro}
            resumeRemaining={resumeRemaining}
            coverRemaining={coverRemaining}
            uploadSlotInUse={uploadSlotInUse}
          />
        </div>
      </div>
    </div>
  );
}
