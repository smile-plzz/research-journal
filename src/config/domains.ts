export interface DomainDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  color: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
  keywords: string[];
}

export const researchDomains: DomainDefinition[] = [
  {
    id: "ai-hci-tcra",
    slug: "ai-hci-tcra",
    name: "AI, Human-Computer Interaction & Software Engineering",
    shortName: "AI & HCI",
    description:
      "Locating the intelligence–automation boundary, evaluating vibe-coded LLM systems, code auditor frameworks, and empirical evaluation of AI software trust.",
    longDescription:
      "Investigates the boundary between human intent and automated code generation. Central to this domain is the TCRA Framework (Transparency, Controllability, Reliability, Auditability) formulated at Jahangirnagar University PMIT, alongside empirical benchmarking of developer agency, reliability boundaries, and model hallucinations in software development.",
    color: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      text: "text-amber-800 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800/40",
      accent: "#B45309",
    },
    keywords: [
      "TCRA Framework",
      "Vibecoding",
      "AI Code Generation",
      "LLM Reliability",
      "Transparency",
      "Controllability",
      "Auditability",
      "Software Engineering",
    ],
  },
  {
    id: "ludology-game-studies",
    slug: "ludology-game-studies",
    name: "Game Studies & Critical Ludology",
    shortName: "Game Studies",
    description:
      "Interdisciplinary scholarly monographs deconstructing narrative deception, moral complicity, military satire, and procedural trauma in interactive media.",
    longDescription:
      "Employs critical humanities, procedural rhetoric, narrative theory, and post-Cold War political analysis to examine major contemporary video game texts. Conducted through the structured 15+ stage monograph pipeline covering exhaustive scene-matrices, ludonarrative dissonance, and moral agency.",
    color: {
      bg: "bg-stone-100 dark:bg-stone-900/40",
      text: "text-stone-800 dark:text-stone-300",
      border: "border-stone-300 dark:border-stone-800",
      accent: "#57534E",
    },
    keywords: [
      "Ludology",
      "Critical Game Studies",
      "Narrative Analysis",
      "Military Satire",
      "Moral Agency",
      "Procedural Rhetoric",
      "Trauma Theory",
      "Interactive Storytelling",
    ],
  },
  {
    id: "health-gis-biomedical",
    slug: "health-gis-biomedical",
    name: "Public Health, GIS & Biomedical Engineering",
    shortName: "Public Health & GIS",
    description:
      "Spatial disparities in healthcare accessibility, OSM routing network analysis, socioeconomic inequality modeling, and deep learning MRI classification.",
    longDescription:
      "Combines geospatial data science (OSM road networks, catchment modeling, Lorenz inequality indices) with deep learning architectures (EfficientNet with Grad-CAM visual interpretability) to tackle healthcare delivery inequities and clinical diagnostics in developing nations.",
    color: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      text: "text-emerald-800 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-800/40",
      accent: "#047857",
    },
    keywords: [
      "Healthcare Accessibility",
      "GIS",
      "Spatial Disparities",
      "OSM Routing",
      "EfficientNet",
      "Grad-CAM",
      "Medical Imaging",
      "Brain Tumor MRI",
    ],
  },
  {
    id: "political-social-forensics",
    slug: "political-social-forensics",
    name: "Political Science & Digital Forensics",
    shortName: "Digital Forensics",
    description:
      "Empirical investigations of disinformation, YouTube influencer dynamics, state censorship, and mass mobilization during political transformations.",
    longDescription:
      "Examines the information ecosystem surrounding the July 2024 Bangladesh political transition. Utilizes Interrupted Time Series (ITS) regression, claims ledgers, verified fact-checking corpora, and open-science ethics to track digital mob dynamics, censorship circumvention, and political cancellation.",
    color: {
      bg: "bg-rose-50 dark:bg-rose-950/30",
      text: "text-rose-800 dark:text-rose-300",
      border: "border-rose-200 dark:border-rose-800/40",
      accent: "#BE123C",
    },
    keywords: [
      "Digital Forensics",
      "Disinformation",
      "Interrupted Time Series",
      "Social Media Mobilization",
      "Political Cancellation",
      "Fact-Checking Corpus",
      "Claims Ledger",
    ],
  },
  {
    id: "computational-musicology",
    slug: "computational-musicology",
    name: "Computational Musicology & Cultural Studies",
    shortName: "Computational Musicology",
    description:
      "Network analysis of genre development, longitudinal listener taste evolution, artist influence graphs, and musical subculture dynamics in Bangladesh.",
    longDescription:
      "Bridges ethnomusicology, sociological preference curves, and graph theory. Analyzes the fifty-year evolution of contemporary Bangladeshi music through artist influence networks, concert ecosystem taxonomies, and demographic openness aging models.",
    color: {
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      text: "text-indigo-800 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-800/40",
      accent: "#4338CA",
    },
    keywords: [
      "Computational Musicology",
      "Network Analysis",
      "Genre Evolution",
      "Listener Taste Lifecycles",
      "Bangladeshi Rock Lineage",
      "Cultural Informatics",
    ],
  },
];

export function getDomainById(id: string): DomainDefinition | undefined {
  return researchDomains.find((d) => d.id === id || d.slug === id);
}

