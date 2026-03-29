"use client";

import { motion } from "framer-motion";
import { Import, Wand2, Send } from "lucide-react";

const steps = [
  {
    icon: Import,
    number: "01",
    title: "Import the job",
    description:
      "Paste a URL from LinkedIn, Indeed, or Glassdoor. Rezme extracts the role, requirements, and key skills automatically.",
    accentBg: "bg-blue-600",
    ringColor: "ring-blue-100",
  },
  {
    icon: Wand2,
    number: "02",
    title: "Let AI tailor it",
    description:
      "Your resume and cover letter are rewritten to match the job description — keeping your voice, sharpening the message.",
    accentBg: "bg-indigo-600",
    ringColor: "ring-indigo-100",
  },
  {
    icon: Send,
    number: "03",
    title: "Apply and track",
    description:
      "Download your optimized PDF, send the application, and follow its status from your personal Kanban board.",
    accentBg: "bg-teal-600",
    ringColor: "ring-teal-100",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered heading */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-indigo-500 tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="display-font text-4xl sm:text-5xl text-slate-900 leading-[1.06] max-w-2xl mx-auto">
            From job posting to tailored application in under a minute.
          </h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12">
          {/* Connector line — sits at the vertical center of the 64px icons */}
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-teal-200" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className={`relative w-16 h-16 mb-6 z-10 rounded-full ${step.accentBg} ring-8 ${step.ringColor} flex items-center justify-center shadow-md`}>
                <step.icon className="w-7 h-7 text-white" />
                {/* Step number badge */}
                <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
              </div>

              <h3 className="display-font text-2xl text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-[0.95rem] max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
