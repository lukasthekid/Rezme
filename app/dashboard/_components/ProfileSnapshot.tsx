"use client";

import Link from "next/link";
import { CheckCircle2, Settings, Zap } from "lucide-react";

interface ProfileSnapshotProps {
  hasDocuments: boolean;
  hasProfile: boolean;
  isPro: boolean;
  resumeRemaining: number | null;
  coverRemaining: number | null;
  /** Free tier: true when a resume file is already stored (must delete to replace). */
  uploadSlotInUse: boolean;
}

export function ProfileSnapshot({
  hasDocuments,
  hasProfile,
  isPro,
  resumeRemaining,
  coverRemaining,
  uploadSlotInUse,
}: ProfileSnapshotProps) {
  const allReady = hasDocuments && hasProfile;

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-border p-4 h-full flex flex-col">
      {/* Profile Readiness */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Ready to Apply</h2>
          <p className="text-sm text-foreground-muted mt-0.5">
            Profile {allReady ? "complete" : "incomplete"}
          </p>
        </div>
        {allReady && (
          <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-2.5 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={[
              "h-7 w-7 rounded-md flex items-center justify-center",
              hasDocuments ? "bg-secondary/10" : "bg-slate-100",
            ].join(" ")}
          >
            <CheckCircle2
              className={[
                "h-3.5 w-3.5",
                hasDocuments ? "text-secondary" : "text-slate-400",
              ].join(" ")}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Base Resume</p>
            <p className="text-xs text-foreground-muted">
              {hasDocuments ? "Active" : "Not uploaded"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={[
              "h-7 w-7 rounded-md flex items-center justify-center",
              hasProfile ? "bg-secondary/10" : "bg-slate-100",
            ].join(" ")}
          >
            <CheckCircle2
              className={[
                "h-3.5 w-3.5",
                hasProfile ? "text-secondary" : "text-slate-400",
              ].join(" ")}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Profile Details</p>
            <p className="text-xs text-foreground-muted">
              {hasProfile ? "Complete" : "Incomplete"}
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/settings"
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 px-4 py-2 text-sm font-medium text-foreground transition-colors"
      >
        <Settings className="h-4 w-4" />
        Update Settings
      </Link>

      {/* Divider */}
      <div className="border-t border-border my-4" />

      {/* Plan Usage */}
      <div className="flex items-start gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">Plan usage</h3>
          <p className="text-xs text-foreground-muted">
            {isPro ? "Pro — unlimited" : "Starter — limited"}
          </p>
        </div>
      </div>

      {isPro ? (
        <p className="text-sm text-foreground font-medium">
          Unlimited resume and cover letter generations.
        </p>
      ) : (
        <ul className="space-y-1.5 text-sm text-foreground">
          <li className="flex justify-between gap-2">
            <span className="text-foreground-muted">Resumes</span>
            <span className="font-semibold tabular-nums">
              {resumeRemaining ?? 0} left
            </span>
          </li>
          <li className="flex justify-between gap-2">
            <span className="text-foreground-muted">Cover letters</span>
            <span className="font-semibold tabular-nums">
              {coverRemaining ?? 0} left
            </span>
          </li>
          <li className="flex justify-between gap-2">
            <span className="text-foreground-muted">Resume file</span>
            <span className="font-semibold text-right">
              {uploadSlotInUse ? (
                <>
                  In use —{" "}
                  <Link
                    href="/dashboard/settings"
                    className="text-primary font-semibold hover:underline"
                  >
                    replace
                  </Link>
                </>
              ) : (
                "Free"
              )}
            </span>
          </li>
        </ul>
      )}

      {!isPro && (
        <Link
          href="/dashboard/billing"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          Upgrade to Pro
        </Link>
      )}
    </div>
  );
}
