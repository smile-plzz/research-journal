export interface RepoRegistryItem {
  repoName: string;
  workId: string;
  archetype:
    | "numbered-stage-monograph"
    | "modular-latex-thesis"
    | "geospatial-empirical-data-science"
    | "computational-cultural-ecosystem"
    | "open-science-investigative-corpus";
  editionLabel?: string;
  domainId: string;
  publicationType:
    | "thesis"
    | "research-monograph"
    | "empirical-study"
    | "technical-report"
    | "computational-study"
    | "working-paper";
  publicationStatus:
    | "Thesis"
    | "Preprint"
    | "Working Paper"
    | "Submission Copy"
    | "Published"
    | "Research Monograph";
  primaryManuscriptFile?: string;
  isFeatured?: boolean;
}

export const repositoryInclusionList: string[] = [
  "tcra-thesis-draft-01-paper",
  "JU-PMIT-TCRA-Research-SubmissionCopy-paper",
  "JU-PMIT-TCRA-Research-Tightened-paper",
  "JU-PMIT-TCRA-Research-humanize-paper",
  "battlefield-bad-company-2-paper",
  "metro-last-light-paper",
  "spec-ops-the-line-paper",
  "the-last-of-us-part-ii-paper",
  "bd-health-access-gap-paper",
  "brain-tumor-classification-efficientnet-gradcam-paper",
  "driver-psychology-analysis-paper",
  "DictatorBeingCancelledOverSocialMediaHype-paper",
  "bangladesh-music-evolution-paper",
  "listener-taste-growth-profile-paper",
  "The-Sound-of-Identity-paper",
];

export const repositoryExclusionList: string[] = [
  "2D-Java-Game",
  "AutoPowerOff",
  "git-game",
  "Element-Screenshot-Extension",
  "Indie-App-Marketplace",
  "portfolio-cms-ismail",
  "iBackup",
  "NearDrop",
];

export const knownRepoRegistry: Record<string, RepoRegistryItem> = {
  // TCRA Thesis Series
  "JU-PMIT-TCRA-Research-SubmissionCopy-paper": {
    repoName: "JU-PMIT-TCRA-Research-SubmissionCopy-paper",
    workId: "tcra-intelligence-automation-boundary",
    archetype: "modular-latex-thesis",
    editionLabel: "Submission Copy (Official PMIT Thesis)",
    domainId: "ai-hci-tcra",
    publicationType: "thesis",
    publicationStatus: "Thesis",
    primaryManuscriptFile: "thesis.tex",
    isFeatured: true,
  },
  "JU-PMIT-TCRA-Research-Tightened-paper": {
    repoName: "JU-PMIT-TCRA-Research-Tightened-paper",
    workId: "tcra-intelligence-automation-boundary",
    archetype: "modular-latex-thesis",
    editionLabel: "Tightened Conference Revision",
    domainId: "ai-hci-tcra",
    publicationType: "thesis",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "thesis.tex",
    isFeatured: false,
  },
  "JU-PMIT-TCRA-Research-humanize-paper": {
    repoName: "JU-PMIT-TCRA-Research-humanize-paper",
    workId: "tcra-intelligence-automation-boundary",
    archetype: "modular-latex-thesis",
    editionLabel: "Humanized & Peer-Review Revision",
    domainId: "ai-hci-tcra",
    publicationType: "thesis",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "thesis.tex",
    isFeatured: false,
  },
  "tcra-thesis-draft-01-paper": {
    repoName: "tcra-thesis-draft-01-paper",
    workId: "tcra-intelligence-automation-boundary",
    archetype: "modular-latex-thesis",
    editionLabel: "Foundational Draft 01",
    domainId: "ai-hci-tcra",
    publicationType: "thesis",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "thesis.tex",
    isFeatured: false,
  },

  // Game Studies Monograph Series
  "spec-ops-the-line-paper": {
    repoName: "spec-ops-the-line-paper",
    workId: "spec-ops-narrative-deception",
    archetype: "numbered-stage-monograph",
    editionLabel: "Full Research Monograph",
    domainId: "ludology-game-studies",
    publicationType: "research-monograph",
    publicationStatus: "Research Monograph",
    primaryManuscriptFile: "08_FULL_RESEARCH_PAPER.md",
    isFeatured: true,
  },
  "the-last-of-us-part-ii-paper": {
    repoName: "the-last-of-us-part-ii-paper",
    workId: "the-last-of-us-part-ii-moral-agency",
    archetype: "numbered-stage-monograph",
    editionLabel: "Full Research Monograph",
    domainId: "ludology-game-studies",
    publicationType: "research-monograph",
    publicationStatus: "Research Monograph",
    primaryManuscriptFile: "14_FULL_RESEARCH_PAPER.md",
    isFeatured: true,
  },
  "metro-last-light-paper": {
    repoName: "metro-last-light-paper",
    workId: "metro-last-light-ethics-of-survival",
    archetype: "numbered-stage-monograph",
    editionLabel: "Full Research Monograph",
    domainId: "ludology-game-studies",
    publicationType: "research-monograph",
    publicationStatus: "Research Monograph",
    primaryManuscriptFile: "12_FULL_RESEARCH_PAPER.md",
    isFeatured: false,
  },
  "battlefield-bad-company-2-paper": {
    repoName: "battlefield-bad-company-2-paper",
    workId: "battlefield-bad-company-2-satire",
    archetype: "numbered-stage-monograph",
    editionLabel: "Full Research Monograph",
    domainId: "ludology-game-studies",
    publicationType: "research-monograph",
    publicationStatus: "Research Monograph",
    primaryManuscriptFile: "12_FULL_RESEARCH_PAPER.md",
    isFeatured: false,
  },

  // Public Health, GIS & Biomedical
  "bd-health-access-gap-paper": {
    repoName: "bd-health-access-gap-paper",
    workId: "bd-health-access-gap",
    archetype: "geospatial-empirical-data-science",
    editionLabel: "Empirical Geospatial Study",
    domainId: "health-gis-biomedical",
    publicationType: "empirical-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "docs/methodology.md",
    isFeatured: true,
  },
  "brain-tumor-classification-efficientnet-gradcam-paper": {
    repoName: "brain-tumor-classification-efficientnet-gradcam-paper",
    workId: "brain-tumor-classification-efficientnet-gradcam",
    archetype: "geospatial-empirical-data-science",
    editionLabel: "Dense EfficientNet + Grad-CAM Study",
    domainId: "health-gis-biomedical",
    publicationType: "empirical-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "docs/paper_revision_2026/paper.md",
    isFeatured: false,
  },
  "driver-psychology-analysis-paper": {
    repoName: "driver-psychology-analysis-paper",
    workId: "driver-psychology-traffic-behavior",
    archetype: "geospatial-empirical-data-science",
    editionLabel: "Behavioral Analytics Study",
    domainId: "health-gis-biomedical",
    publicationType: "computational-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "README.md",
    isFeatured: false,
  },

  // Political Science & Digital Forensics
  "DictatorBeingCancelledOverSocialMediaHype-paper": {
    repoName: "DictatorBeingCancelledOverSocialMediaHype-paper",
    workId: "digitally-cancelled-bangladesh-2024",
    archetype: "open-science-investigative-corpus",
    editionLabel: "Empirical Preprint Package & Claims Ledger",
    domainId: "political-social-forensics",
    publicationType: "empirical-study",
    publicationStatus: "Preprint",
    primaryManuscriptFile: "digitally-cancelled-paper-draft.md",
    isFeatured: true,
  },

  // Computational Musicology & Cultural Studies
  "bangladesh-music-evolution-paper": {
    repoName: "bangladesh-music-evolution-paper",
    workId: "bangladesh-music-evolution",
    archetype: "computational-cultural-ecosystem",
    editionLabel: "Computational Framework & Network Study",
    domainId: "computational-musicology",
    publicationType: "computational-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "docs/literature-review.md",
    isFeatured: true,
  },
  "listener-taste-growth-profile-paper": {
    repoName: "listener-taste-growth-profile-paper",
    workId: "listener-taste-growth-profile",
    archetype: "computational-cultural-ecosystem",
    editionLabel: "Longitudinal Listener Profile Study",
    domainId: "computational-musicology",
    publicationType: "computational-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "paper/draft.md",
    isFeatured: false,
  },
  "The-Sound-of-Identity-paper": {
    repoName: "The-Sound-of-Identity-paper",
    workId: "the-sound-of-identity",
    archetype: "computational-cultural-ecosystem",
    editionLabel: "Cultural Identity & Sonic Analysis",
    domainId: "computational-musicology",
    publicationType: "computational-study",
    publicationStatus: "Working Paper",
    primaryManuscriptFile: "paper/manuscript.md",
    isFeatured: false,
  },
};

