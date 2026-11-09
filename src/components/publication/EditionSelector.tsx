import { RepositoryEdition } from "@/lib/catalog/schema";
import { Layers, ExternalLink, GitCommit, CheckCircle2 } from "lucide-react";

interface EditionSelectorProps {
  editions: RepositoryEdition[];
}

export function EditionSelector({ editions }: EditionSelectorProps) {
  if (editions.length <= 1) return null;

  return (
    <div className="my-6 p-4 rounded-lg bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4 text-academic dark:text-academic-dark" />
        <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
          Associated Research Editions & Revision History ({editions.length})
        </h4>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
        This scholarly work spans multiple repository revisions reflecting thesis drafts,
        official university submission copies, and condensed conference publications.
      </p>

      <div className="space-y-2">
        {editions.map((ed) => (
          <div
            key={ed.repoName}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/60 text-xs gap-2"
          >
            <div className="flex items-center gap-2">
              {ed.isSubmissionCopy ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              ) : (
                <GitCommit className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
              )}
              <div>
                <span className="font-medium text-stone-800 dark:text-stone-200">
                  {ed.editionLabel}
                </span>
                <span className="font-mono text-[11px] text-stone-400 dark:text-stone-500 ml-2">
                  {ed.repoName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-[11px]">
              <span className="text-stone-400">
                Pushed: {new Date(ed.pushedAt).toLocaleDateString()}
              </span>
              <a
                href={ed.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-academic hover:underline"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

