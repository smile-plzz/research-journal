import { ProvenanceMethod, ProvenanceSource } from "@/lib/catalog/schema";
import { Tooltip } from "@/components/ui/Tooltip";
import { CheckCircle2, HelpCircle, FileText, Settings, Cpu } from "lucide-react";

interface MetadataProvenancePillProps {
  label: string;
  source: ProvenanceSource;
  method: ProvenanceMethod;
  verified: boolean;
}

export function MetadataProvenancePill({
  label,
  source,
  method,
  verified,
}: MetadataProvenancePillProps) {
  const getIcon = () => {
    switch (method) {
      case "manifest-explicit":
        return <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
      case "extracted":
        return <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" />;
      case "configured-default":
        return <Settings className="w-3 h-3 text-stone-600 dark:text-stone-400" />;
      case "heuristic-derived":
        return <Cpu className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
      default:
        return <HelpCircle className="w-3 h-3 text-stone-400" />;
    }
  };

  const getSourceDisplay = () => {
    switch (source) {
      case ".publication.json":
        return "Explicit Manifest";
      case "CITATION.cff":
        return "Citation CFF";
      case ".zenodo.json":
        return "Zenodo Metadata";
      case "README.md":
        return "README Extraction";
      case "context.md":
        return "Context Scope";
      case "config/authors.ts":
        return "Configured Default";
      case "heuristics":
        return "Heuristic Synthesized";
    }
  };

  const methodDescriptions: Record<ProvenanceMethod, string> = {
    "manifest-explicit": "Explicitly declared inside a publication manifest file",
    extracted: "Automatically parsed from repository citation or documentation",
    "configured-default": "Provided from verified author registry defaults",
    "heuristic-derived": "Inferred from repository structure and commit history",
  };

  return (
    <Tooltip
      content={`${label} source: ${getSourceDisplay()}. ${
        methodDescriptions[method] || ""
      } (${verified ? "verified" : "unverified"})`}
    >
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700/60 cursor-default">
        {getIcon()}
        <span className="font-sans font-medium text-stone-700 dark:text-stone-300">
          {label}:
        </span>
        <span>{getSourceDisplay()}</span>
      </div>
    </Tooltip>
  );
}

