import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Rezme.svg"
                alt="Rezme Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-white">Rezme</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              AI-powered resume and cover letter tailoring for every job
              description. Get hired faster with Rezme.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-400 transition-colors">
                  Log in
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-indigo-400 transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Rezme. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Data hosted in Germany</span>
          </div>
          <p className="text-sm">Made with ❤️ for job seekers</p>
        </div>
      </div>
    </footer>
  );
}
