import { siteConfig } from "@/config/site";
import {
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  GraduationCap,
  BookOpen,
  Mail,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Md. Ismail Hossain",
  description:
    "Academic background, software engineering profile, and contact details for Md. Ismail Hossain (Jahangirnagar University PMIT).",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <header className="pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
          About Md. Ismail Hossain
        </h1>
        <p className="font-serif italic text-lg text-stone-600 dark:text-stone-400">
          Computer Science Researcher, PMIT Scholar & Software Builder
        </p>
      </header>

      {/* Narrative Bio */}
      <section className="prose-academic space-y-4">
        <p>
          I am a Computer Science graduate and Master&apos;s candidate in Professional Masters in
          Information Technology (PMIT) at the{" "}
          <strong>Institute of Information Technology (IIT), Jahangirnagar University</strong>,
          Dhaka, Bangladesh.
        </p>
        <p>
          My work spans two complementary wings. On the research side, I formulated the{" "}
          <strong>TCRA Framework</strong> (Transparency, Controllability, Reliability, Auditability)
          to evaluate the intelligence-automation boundary in AI-assisted software systems, alongside
          studies in <em>Critical Game Studies</em>, <em>Spatial Public Health GIS</em>,{" "}
          <em>Open-Science Digital Forensics</em>, and <em>Computational Musicology</em>.
        </p>
        <p>
          On the engineering side, I build practical, local-first software that solves everyday
          problems without cloud lock-in or subscriptions: Windows media and backup utilities,
          Android TV apps, offline mobile finance tools, and browser-only web applications.
        </p>
      </section>

      {/* Direct Contact / Buy / Contribute Callout */}
      <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-cream-100/70 dark:bg-stone-900/50 p-6 space-y-3">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Mail className="w-5 h-5 text-academic" />
          <span>Get in Touch: Buy Builds, Collaborate, or Contribute</span>
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          If you want to buy a packaged or custom build of any software project, propose a
          research collaboration, hire me for a project, or contribute improvements, please email me
          directly.
        </p>
        <div className="pt-1">
          <a
            href={`mailto:${siteConfig.author.email}?subject=Inquiry%20from%20Research%20and%20Projects`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-academic hover:bg-academic-hover text-white text-xs font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email {siteConfig.author.email}</span>
          </a>
        </div>
      </section>

      {/* Academic Credentials & Affiliations */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-academic" />
          <span>Academic Affiliation & Education</span>
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="font-serif text-base text-stone-900 dark:text-stone-100">
                Institute of Information Technology (IIT), Jahangirnagar University
              </strong>
              <span className="font-mono text-xs text-stone-500">Dhaka, Bangladesh</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-xs">
              Professional Masters in Information Technology (PMIT) · Focus: AI Software Trust & Systems Reliability
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <strong className="font-serif text-base text-stone-900 dark:text-stone-100">
                B.Sc. in Computer Science and Engineering (CSE)
              </strong>
              <span className="font-mono text-xs text-stone-500">Graduate</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-xs">
              Foundations in Algorithms, Data Structures, Software Engineering, and Machine Learning Systems
            </p>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-academic" />
          <span>Research & Software Focus</span>
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">
              AI Software Reliability & TCRA
            </strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Code auditors, LLM evaluation interfaces, hallucination bounds, and transparency metrics.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-academic" />
              <span>Local-First Desktop & Mobile Tools</span>
            </strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Native C#/.NET Windows utilities, Kotlin Android TV apps, and zero-backend web tools.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">
              Critical Ludology & Cultural Studies
            </strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Procedural ethics, narrative analysis, and computational network modeling of music culture.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">
              Geospatial Public Health & Digital Forensics
            </strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Spatial accessibility modeling, medical imaging diagnostics, and empirical claims ledgers.
            </span>
          </li>
        </ul>
      </section>

      {/* Profiles & External Links */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
          Profiles & Contact
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-academic" />
            <span>{siteConfig.author.email}</span>
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Github className="w-4 h-4 text-stone-900 dark:text-stone-100" />
            <span>GitHub (@{siteConfig.author.githubUsername})</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-300" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>
      </section>
    </div>
  );
}
