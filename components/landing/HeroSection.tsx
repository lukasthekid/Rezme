"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrowserFrame } from "./BrowserFrame";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-slate-50 flex items-center noise-overlay">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1000px_400px_at_85%_10%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_400px_at_10%_80%,rgba(20,184,166,0.14),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_bottom,rgba(248,250,252,0.1),rgba(248,250,252,0.9)_45%,rgba(248,250,252,1))]" />
      <div className="absolute inset-0 pointer-events-none opacity-35 [background-size:24px_24px] [background-image:linear-gradient(to_right,rgba(100,116,139,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,.1)_1px,transparent_1px)]" />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-6xl pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left z-10">
          {/* Staggered reveal: badge → h1 → p → CTAs → social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-indigo-700 text-sm font-semibold mb-6 shadow-sm"
          >
            Purpose-built for modern job search
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="display-font text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-6 leading-[1.03]"
          >
            Get your resume interview-ready for every role.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg sm:text-xl text-slate-700 mb-8 max-w-lg leading-relaxed"
          >
            Keep your voice. Sharpen the message. Rezme matches your experience to each job posting without the repetitive rewriting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/90 text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-white hover:border-slate-300 transition-all duration-200"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="pt-8 border-t border-slate-200/80"
          >
            <p className="text-sm text-slate-500 font-medium mb-4">
              Teams and candidates use Rezme across
            </p>
            <div className="flex flex-wrap gap-3">
              {["Product", "Engineering", "Marketing", "Operations"].map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-medium text-slate-600"
                >
                  {domain}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative h-[600px] w-full hidden lg:block z-10">
          <BrowserFrame
            image="/screenshots/dashboard.jpg"
            alt="Rezme Dashboard"
            className="w-full h-full flex items-center justify-center"
            interactive
            imagePriority
          />
        </div>
      </div>
    </section>
  );
}
