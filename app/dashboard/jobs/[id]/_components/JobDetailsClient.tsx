"use client";

import { useState } from "react";
import { Sparkles, PenLine, ArrowRight, FileText } from "lucide-react";
import { GenerationModal } from "../../_components/GenerationModal";
import { ResumeGenerator } from "../../_components/ResumeGenerator";
import { CoverLetterGenerator } from "../../_components/CoverLetterGenerator";
import { ExpandableJobDescription } from "../../_components/ExpandableJobDescription";

interface JobDetailsClientProps {
  jobId: number;
  jobDescription: string;
}

export function JobDetailsClient({ jobId, jobDescription }: JobDetailsClientProps) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Application Studio — Hero Section */}
      <section className="noise-overlay rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 shadow-xl overflow-hidden animate-fade-in-up animation-delay-100">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-2">
            Application Studio
          </p>
          <h2 className="display-font text-3xl sm:text-4xl text-white italic mb-2">
            Craft your application
          </h2>
          <p className="text-sm text-indigo-200/70 max-w-lg mb-8">
            Generate tailored documents that match this position. Our AI analyzes the job description and your profile to create compelling, personalized materials.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Resume Card */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="group relative bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/[0.12] p-6 hover:bg-white/[0.14] hover:border-white/[0.22] transition-all duration-300 text-left w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="h-11 w-11 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-indigo-400/20 group-hover:bg-indigo-500/30 group-hover:ring-indigo-400/40 transition-all duration-300">
                  <Sparkles className="h-5 w-5 text-indigo-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Tailored Resume
                  </h3>
                  <p className="text-sm text-indigo-200/60 leading-relaxed">
                    Customize your experience to match this specific job description
                  </p>
                </div>
              </div>
              <div className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-5 py-3 text-sm font-bold shadow-sm transition-all duration-300 group-hover:shadow-md">
                Start Tailoring
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>

            {/* Cover Letter Card */}
            <button
              onClick={() => setCoverLetterModalOpen(true)}
              className="group relative bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/[0.12] p-6 hover:bg-white/[0.14] hover:border-white/[0.22] transition-all duration-300 text-left w-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/10"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="h-11 w-11 rounded-xl bg-teal-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-teal-400/20 group-hover:bg-teal-500/30 group-hover:ring-teal-400/40 transition-all duration-300">
                  <PenLine className="h-5 w-5 text-teal-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Smart Cover Letter
                  </h3>
                  <p className="text-sm text-indigo-200/60 leading-relaxed">
                    Generate a persuasive letter matching your tone and profile
                  </p>
                </div>
              </div>
              <div className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-white px-5 py-3 text-sm font-bold shadow-sm transition-all duration-300 group-hover:bg-secondary-hover group-hover:shadow-md">
                Draft Letter
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Job Description */}
      <section className="bg-surface rounded-xl border border-border p-6 animate-fade-in-up animation-delay-200">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-foreground-subtle" />
          <h2 className="text-lg font-bold text-foreground">
            About the Role
          </h2>
        </div>
        <div className="text-sm text-foreground-muted leading-relaxed">
          <ExpandableJobDescription text={jobDescription} />
        </div>
      </section>

      {/* Resume Generation Modal */}
      <GenerationModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        documentType="Resume"
      >
        <ResumeGenerator jobId={jobId} />
      </GenerationModal>

      {/* Cover Letter Generation Modal */}
      <GenerationModal
        isOpen={coverLetterModalOpen}
        onClose={() => setCoverLetterModalOpen(false)}
        documentType="Cover Letter"
      >
        <CoverLetterGenerator jobId={jobId} />
      </GenerationModal>
    </div>
  );
}
