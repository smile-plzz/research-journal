import { siteConfig } from "@/config/site";
import { ExternalLink, Github, Linkedin, Globe, GraduationCap, Award, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Researcher | Md. Ismail Hossain",
  description:
    "Academic background, research profile, and scholarly interests of Md. Ismail Hossain (Jahangirnagar University PMIT).",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <header className="pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
          About the Researcher
        </h1>
        <p className="font-serif italic text-lg text-stone-600 dark:text-stone-400">
          Md. Ismail Hossain — Computer Science Researcher & PMIT Scholar
        </p>
      </header>

      {/* Narrative Bio */}
      <section className="prose-academic space-y-4">
        <p>
          I am a Computer Science graduate and Master’s candidate in Professional Masters in
          Information Technology (PMIT) at the <strong>Institute of Information Technology (IIT),
          Jahangirnagar University</strong>, Dhaka, Bangladesh.
        </p>
        <p>
          My scholarship bridges empirical software engineering, human-AI alignment, and critical
          humanities. In my master’s research, I formulated the <strong>TCRA Framework</strong> (Transparency,
          Controllability, Reliability, Auditability), a formal evaluation methodology designed to
          empirically locate the intelligence–automation boundary in LLM-assisted and vibe-coded
          software systems.
        </p>
        <p>
          Beyond automated software verification, my research program extends across four allied domains:
          long-form <em>Critical Game Studies monographs</em> deconstructing procedural ethics,
          moral complicity, and post-Cold War satire in interactive media; <em>Spatial Public Health GIS</em> modeling
          district-level healthcare delivery inequalities in Bangladesh; <em>Open-Science Digital Forensics</em> auditing
          disinformation ecosystems during the 2024 political transition; and <em>Computational Musicology</em> tracing
          fifty-year genre lineages and listener taste growth lifecycles.
        </p>
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

      {/* Core Research Interests */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-academic" />
          <span>Core Research Interests</span>
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">AI Software Reliability & TCRA</strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Autonomous agents, code auditors, hallucination bounds, and transparency metrics.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">Critical Ludology & Procedural Rhetoric</strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Ludo-narrative dissonance, trauma ethics, military satire, and player complicity in video games.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">Geospatial Healthcare Delivery</strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              OpenStreetMap routing networks, spatial Lorenz curves, and resource-constrained clinics.
            </span>
          </li>
          <li className="p-3 rounded border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/20">
            <strong className="block text-stone-900 dark:text-stone-100 mb-1">Empirical Digital Forensics</strong>
            <span className="text-stone-500 dark:text-stone-400 leading-relaxed">
              YouTube political mobilization, state censorship, claims ledgers, and open-science preprints.
            </span>
          </li>
        </ul>
      </section>

      {/* Profiles & External Links */}
      <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-100">
          Scholarly & Professional Profiles
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Github className="w-4 h-4 text-stone-900 dark:text-stone-100" />
            <span>GitHub Profile (@{siteConfig.author.githubUsername})</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Personal Portfolio</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:border-academic text-xs font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-300" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>
      </section>
    </div>
  );
}

