export interface CollectionEntryRef {
  kind: "work" | "project";
  slug: string;
}

export interface CuratedCollection {
  id: string;
  title: string;
  description: string;
  items: CollectionEntryRef[];
}

export const curatedCollections: CuratedCollection[] = [
  {
    id: "ai-trust-tcra",
    title: "AI Trust and the TCRA Framework",
    description:
      "Thesis research on the intelligence-automation boundary alongside evaluation tools built to audit AI-assisted software.",
    items: [
      { kind: "work", slug: "tcra-intelligence-automation-boundary" },
      { kind: "project", slug: "tcra-code-auditor-v4" },
      { kind: "project", slug: "vibebench-forensic-viewer" },
      { kind: "project", slug: "hermes-model-router" },
    ],
  },
  {
    id: "game-studies",
    title: "Game Studies Monographs",
    description:
      "Long-form critical monographs examining narrative deception, moral agency, military satire, and worldbuilding.",
    items: [
      { kind: "work", slug: "spec-ops-narrative-deception" },
      { kind: "work", slug: "the-last-of-us-part-ii-moral-agency" },
      { kind: "work", slug: "metro-last-light-ethics-of-survival" },
      { kind: "work", slug: "battlefield-bad-company-2-satire" },
      { kind: "work", slug: "hollow-knight-lore" },
      { kind: "work", slug: "red-dead-redemption-lore" },
    ],
  },
  {
    id: "windows-apps",
    title: "Windows Desktop Tools",
    description:
      "Local-first Windows applications for media management, file transfers, backups, and duplicate cleanup.",
    items: [
      { kind: "project", slug: "luma" },
      { kind: "project", slug: "neardrop" },
      { kind: "project", slug: "dedupe-light" },
      { kind: "project", slug: "ibackup" },
      { kind: "project", slug: "photo-library" },
      { kind: "project", slug: "lyricfloat" },
    ],
  },
  {
    id: "dhaka-bangladesh",
    title: "Dhaka and Bangladesh",
    description:
      "Spatial health access studies, computational musicology, digital forensics, and civic tools focused on Bangladesh.",
    items: [
      { kind: "work", slug: "bd-health-access-gap" },
      { kind: "work", slug: "bangladesh-music-evolution" },
      { kind: "work", slug: "digitally-cancelled-bangladesh-2024" },
      { kind: "work", slug: "driver-psychology-traffic-behavior" },
      { kind: "project", slug: "bangladesh-constitution-rag" },
    ],
  },
];
