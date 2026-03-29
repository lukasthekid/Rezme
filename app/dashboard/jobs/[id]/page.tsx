import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ExpandableJobDescription } from "../_components/ExpandableJobDescription";
import { JobApplicationTracker } from "../_components/JobApplicationTracker";
import { JobDetailsClient } from "./_components/JobDetailsClient";
import { ExternalLink, Building2 } from "lucide-react";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const jobId = Number(id);
  if (!Number.isFinite(jobId)) notFound();

  // Prisma client types may lag until you run `prisma generate` after schema changes.
  // We keep runtime behavior correct and relax TS here.
  const job = await (prisma as any).jobListing.findUnique({
    where: { id: jobId },
  });

  if (!job) notFound();

  const locationParts = [job.locationCity, job.country].filter(
    (v: unknown): v is string => typeof v === "string" && v.trim().length > 0
  );

  // Format posted date (for now, use created date)
  const postedDate = new Date(job.createdAt);
  const daysAgo = Math.floor(
    (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const postedText =
    daysAgo === 0
      ? "Today"
      : daysAgo === 1
      ? "1 day ago"
      : `${daysAgo} days ago`;

  return (
    <div className="min-h-screen">
      {/* Job Header */}
      <header className="bg-surface border-b border-border animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Left Side - Logo & Info */}
            <div className="flex items-center gap-5 flex-1 min-w-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.companyName ? `${job.companyName} logo` : "Company logo"}
                  className="h-14 w-14 rounded-xl border border-border bg-white object-contain flex-shrink-0 shadow-sm"
                />
              ) : (
                <div className="h-14 w-14 rounded-xl border border-border bg-slate-50 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Building2 className="h-7 w-7 text-foreground-subtle" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h1 className="display-font text-3xl sm:text-4xl text-foreground mb-1.5 italic">
                  {job.jobTitle || "Job listing"}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground-muted">
                  <span className="font-semibold text-foreground">
                    {job.companyName || "Unknown company"}
                  </span>
                  {locationParts.length > 0 && (
                    <>
                      <span className="text-foreground-subtle">·</span>
                      <span>{locationParts.join(", ")}</span>
                    </>
                  )}
                  <span className="text-foreground-subtle">·</span>
                  <span>{postedText}</span>
                  {typeof job.numberOfApplicants === "number" && job.numberOfApplicants > 0 && (
                    <>
                      <span className="text-foreground-subtle">·</span>
                      <span>
                        {job.numberOfApplicants.toLocaleString()} applicant
                        {job.numberOfApplicants === 1 ? "" : "s"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden sm:block">
                <JobApplicationTracker jobId={job.id} />
              </div>

              {job.url && !job.url.startsWith("manual://") && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border hover:border-border-hover bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors shadow-sm"
                  title="Open original posting"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden md:inline">View Original</span>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Status Tracker */}
          <div className="sm:hidden mt-5 pt-5 border-t border-border">
            <JobApplicationTracker jobId={job.id} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <JobDetailsClient 
            jobId={job.id}
            jobDescription={job.jobDescription ?? ""}
          />
        </div>
      </div>
    </div>
  );
}

