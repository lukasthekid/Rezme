"use client";

import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

export function ProblemSolution() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="display-font text-4xl sm:text-5xl text-slate-900 leading-[1.06] mb-4">
            Applying to jobs shouldn&apos;t be a second job.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what changes when you stop doing it manually.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* The Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-400 uppercase tracking-wider">
                Before Rezme
              </h3>
              <X className="w-5 h-5 text-slate-300" />
            </div>
            <ul className="space-y-4">
              {[
                "Hours tweaking Word documents for every application",
                'Generic "To Whom It May Concern" cover letters',
                "Lost track of which resume went to which company",
                "Messy spreadsheets to track status",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-500">
                  <X className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />
                  <span className="text-[0.95rem] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The Rezme Way */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative">
              <h3 className="text-base font-semibold text-indigo-400 uppercase tracking-wider">
                With Rezme
              </h3>
              <div className="bg-indigo-600 text-white p-1 rounded-full">
                <Check className="w-4 h-4" />
              </div>
            </div>
            <ul className="space-y-4 relative">
              {[
                "Resume & cover letter tailored in seconds with AI",
                "Personalized content matched to each job description",
                "Visual Kanban board to track every application",
                "2,400+ people have already made the switch",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-indigo-900">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[0.95rem] font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
