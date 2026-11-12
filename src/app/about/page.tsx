import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Academic background, software engineering profile, and contact details for Md. Ismail Hossain (Jahangirnagar University PMIT).",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-10">
      <Breadcrumbs items={[{ label: "About" }]} />

      <header className="space-y-2 pb-6 border-b border-hairline">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Md. Ismail Hossain
        </h1>
        <p className="text-base text-ink-secondary">
          Computer science researcher and software builder in Dhaka, Bangladesh.
        </p>
      </header>

      <section className="prose-academic space-y-4">
        <p>
          I am a Computer Science graduate and Master&apos;s candidate in Professional Masters in
          Information Technology (PMIT) at the{" "}
          <strong>Institute of Information Technology (IIT), Jahangirnagar University</strong>.
        </p>
        <p>
          My work spans two areas. On the research side, I formulated the{" "}
          <strong>TCRA Framework</strong> (Transparency, Controllability, Reliability, Auditability)
          to evaluate the intelligence-automation boundary in AI-assisted software systems, alongside
          studies in critical game studies, spatial public health GIS, open-science digital
          forensics, and computational musicology.
        </p>
        <p>
          On the software side, I build local-first tools for everyday tasks without accounts or
          subscriptions: Windows media and backup utilities, Android TV apps, offline mobile
          utilities, and browser-based web apps.
        </p>
      </section>

      {/* Contact / Collaborate */}
      <section className="rounded-card border border-hairline bg-surface p-6 space-y-4">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Contact and collaboration
        </h2>
        <p className="text-sm text-ink-secondary leading-relaxed">
          If you want to request a custom build, propose a research collaboration, or share
          feedback on a project, email me directly.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${siteConfig.author.email}?subject=Inquiry%20from%20Research%20and%20Projects`}
            className={buttonClasses({ variant: "primary" })}
          >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            <span>Email {siteConfig.author.email}</span>
          </a>
          <Link
            href="/showcase"
            className={buttonClasses({ variant: "quiet" })}
          >
            <span>Browse showcase</span>
          </Link>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4 pt-4 border-t border-hairline">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Education
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-card border border-hairline bg-surface">
            <div className="font-serif font-semibold text-base text-ink">
              Institute of Information Technology (IIT), Jahangirnagar University
            </div>
            <p className="text-xs text-ink-secondary mt-1">
              Professional Masters in Information Technology (PMIT) · AI software trust and systems reliability
            </p>
          </div>
          <div className="p-4 rounded-card border border-hairline bg-surface">
            <div className="font-serif font-semibold text-base text-ink">
              B.Sc. in Computer Science and Engineering (CSE)
            </div>
            <p className="text-xs text-ink-secondary mt-1">
              Algorithms, software engineering, and machine learning systems
            </p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="space-y-3 pt-4 border-t border-hairline">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Profiles
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "quiet" })}
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "quiet" })}
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "quiet" })}
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </div>
  );
}
