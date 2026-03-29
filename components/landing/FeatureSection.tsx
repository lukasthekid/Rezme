"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame } from "./BrowserFrame";
import { Sparkles, FileCheck, LayoutDashboard, CheckCircle2, ChevronDown } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    wrapperBg: "bg-indigo-100/40",
    blobBg: "bg-indigo-300",
    title: "Tailor your resume in seconds",
    description:
      "Our AI analyzes the job description and surfaces your most relevant experience instantly. No more staring at a blank page.",
    bullets: [
      "Context-aware AI rewriting",
      "Keyword optimization for ATS",
      "Tone matching (Professional, Creative, etc.)",
    ],
    expandedContent:
      "Rezme reads the full job description — responsibilities, required skills, and preferred qualifications — then cross-references it against your uploaded resume. It surfaces gaps, suggests stronger phrasing for your bullet points, and reorders sections to put your most relevant experience front and center. The whole process takes under 30 seconds.",
    image: "/screenshots/job-view.webp",
    imageAlt: "AI Job Analysis",
  },
  {
    icon: FileCheck,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    wrapperBg: "bg-teal-100/40",
    blobBg: "bg-teal-300",
    title: "Pass the bots. Impress humans.",
    description:
      "Generate perfectly formatted PDFs that clear Applicant Tracking Systems and look polished to hiring managers.",
    bullets: [
      "ATS-friendly templates",
      "Real-time scoring & feedback",
      "One-click PDF export",
    ],
    expandedContent:
      "Over 75% of resumes are rejected by ATS software before a human ever reads them. Rezme scans for missing keywords, checks formatting compatibility, and gives you a score before you export. Our templates are tested against Greenhouse, Lever, Workday, and iCIMS — the four most widely used systems in enterprise hiring.",
    image: "/screenshots/resume.webp",
    imageAlt: "Professional Resume",
  },
  {
    icon: LayoutDashboard,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    wrapperBg: "bg-purple-100/40",
    blobBg: "bg-purple-300",
    title: "Organize your job search",
    description:
      "Stop using spreadsheets. Every application, document, and update lives in one centralized dashboard.",
    bullets: [
      "Visual Kanban pipeline",
      "Status tracking & reminders",
      "Centralized notes & documents",
    ],
    expandedContent:
      "Every application you create in Rezme is automatically added to your board with the job title, company, and date. Move cards from Applied → Interview → Offer as you progress. Add notes, attach documents, and set follow-up reminders — everything in one place so nothing falls through the cracks.",
    image: "/screenshots/applications.webp",
    imageAlt: "Application Kanban Board",
  },
];

export function FeatureSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex flex-col gap-12 lg:gap-20 items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full lg:w-1/2">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.iconBg} mb-8`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                <h3 className="display-font text-3xl sm:text-4xl text-slate-900 mb-6 leading-[1.1]">
                  {feature.title}
                </h3>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 ${feature.iconColor} flex-shrink-0 mt-0.5`}
                      />
                      <span className="text-slate-700 font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Expandable detail */}
                <AnimatePresence>
                  {expanded === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 leading-relaxed mb-8 pt-2 border-t border-slate-100">
                        {feature.expandedContent}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className={`group flex items-center gap-2 font-semibold ${feature.iconColor} hover:opacity-80 transition-opacity`}
                >
                  {expanded === index ? "Show less" : "Learn more"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expanded === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Image Content */}
              <div className="flex-1 w-full lg:w-1/2">
                <div className={`relative rounded-2xl p-2 ${feature.wrapperBg}`}>
                  <div
                    className={`absolute -inset-4 rounded-full blur-3xl opacity-20 ${feature.blobBg}`}
                  />
                  <BrowserFrame
                    image={feature.image}
                    alt={feature.imageAlt}
                    className="relative shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
