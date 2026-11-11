# The Evolution of Contemporary Bangladeshi Music Culture

**A Computational Analysis of Genre Development, Global Influences, Listener Communities, and Musical Ecosystems**

An open dataset, analysis pipeline and research paper on how Bangladesh's
popular music changed between 1972 and the present — and, just as importantly,
on what that record can and cannot support.

**Research title**: From Folk Roots to Digital Streams: The Evolution of
Bangladeshi Music Genres, Listener Cultures, and Global Musical Influences

---

## Where the project stands

| | |
|---|---:|
| Artists catalogued (target 300) | **63** |
| Events catalogued (target 500) | **23** |
| Schema / referential errors | **0** |
| Influence citations (all sourced) | **169** normalised from 83 raw |
| Network edges over 63 acts | **179** across 4 layers |
| Louvain modularity, observational layers | **0.428** |

The framework, pipeline and analytical outputs are complete and reusable. The
dataset is at roughly a fifth of its artist target and a twentieth of its event
target. The audience-side data the project's central construct requires does not
exist here at all — see *What this project cannot do* below.

## Start here

| If you want | Read |
|---|---|
| The findings | [`docs/research-paper-draft-complete.md`](docs/research-paper-draft-complete.md) |
| The wider research landscape, and what it changes here | [`docs/research-landscape-extended.md`](docs/research-landscape-extended.md) |
| How genres emerged and transmitted | [`docs/genre-evolution-map.md`](docs/genre-evolution-map.md) |
| How live music is organised | [`docs/concert-ecosystem-map.md`](docs/concert-ecosystem-map.md) |
| Where it is heading, and how confidently | [`docs/future-trends-forecast.md`](docs/future-trends-forecast.md) |
| Where the framework was wrong | [`frameworks/bmem-validation.md`](frameworks/bmem-validation.md) |
| Individual artists in depth | [`analysis/case-studies/`](analysis/case-studies/) |
| To run the analysis yourself | [`analysis/README.md`](analysis/README.md) |
| To browse the data | the [web frontend](#frontend), or [`data/`](data/) |

## Four results

1. **The strand arrival order is not the received one.** The catalogue's first
   hip-hop release (1993, *Tri-Rotner Khepa*) predates its first alternative
   (1996), folk-fusion (1997), progressive (1999) and pop (2002) formations. It
   comes two years after the first original Bangla metal album, not two decades.

2. **Influence citations are structured — and so is the evidence for them.**
   Metal and progressive acts name specific bands (Metallica 6 citing acts,
   Megadeth 5, Pink Floyd 4 and the only vector reaching three strands); pop and
   folk acts name traditions. That asymmetry reflects who gets interviewed as
   much as how music transmits, and is reported as a property of the evidence.

3. **The network is genuinely structured, and it is not a preference network.**
   Modularity 0.428 with six interpretable communities — but the edges record
   shared bills, shared members and stated influences. The classic
   mainstream-rock community exists because Ayub Bachchu moved between those
   bands; the folk strand's centrality is festival programming policy. It is a
   **co-appearance** network, and the project renames it accordingly.

4. **The project's own concert typology is falsified by its own data.** Every
   multi-act bill in the catalogue mixes genre strands. Large commemorative
   festivals are discovery spaces, not the subcultural gatherings the framework
   predicted.

A methodological result travels with these: projecting a concert hypergraph onto
artist pairs without correcting for bill size lets one twelve-act festival
contribute 66 edges and depresses observed modularity from 0.428 to 0.159. Any
scene network built from festival lineups needs the correction.

## What this project cannot do

Stated plainly, because it bounds every claim above:

- **No audience data of any kind.** No streaming, playlist, or engagement
  signals. Blocked pending Spotify Web API and YouTube Data API v3 credentials,
  which the project owner must register. Every listener claim here is inferred
  from co-billing and from what artists and journalists said.
- **No audio-feature analysis.** Every statement about tempo, production or
  arrangement rests on documented description and discographic sequence.
- **Measurable documentation bias.** The hip-hop strand shows one
  political-content marker against six for alternative rock, contradicting the
  literature. That is an artefact of how the records were written, and the paper
  reports it as one.
- **Geographic concentration.** 19 of 23 events are in Dhaka.

## Repository

```
bangladesh-music-evolution/
├── docs/
│   ├── research-paper-draft-complete.md   # the paper (second draft, with results)
│   ├── research-proposal.md               # original proposal
│   ├── methodology.md                     # data sources and analytical methods
│   ├── literature-review.md               # working review with retrieval status
│   ├── annotated-bibliography.md          # APA entries with annotations
│   ├── genre-evolution-map.md             # strand lifecycles and transmission
│   ├── concert-ecosystem-map.md           # typology and what it shows
│   ├── future-trends-forecast.md          # graded forecasts
│   └── roadmap.md                         # status and next actions
├── frameworks/
│   ├── bmem.md                            # the structural model
│   ├── bmem-validation.md                 # the model tested against data
│   └── bmef.md                            # the process companion
├── data/
│   ├── artists/<slug>/metadata.json       # 63 artist records
│   ├── concerts/*.json                    # 23 event records
│   ├── networks/                          # generated graph data
│   ├── genres/, timelines/                # narrative notes
│   └── schemas/                           # JSON Schemas for artists and concerts
├── analysis/
│   ├── lib/common.py                      # loaders and normalisation
│   ├── scripts/                           # the seven-step pipeline
│   ├── outputs/                           # computed JSON and CSV
│   ├── case-studies/                      # five sound-evolution studies
│   └── visualizations/                    # seven SVG figures
└── web/                                   # Next.js frontend over data/
```

## Frameworks

**BMEM** — the Bangladesh Musical Ecosystem Model: six interacting dimensions
(Historical Evolution, Global Influence, Local Adaptation, Listener Preference
Networks, Music Experience Culture, Industry Transformation). Tested against
data in `frameworks/bmem-validation.md`, which proposes ten revisions and
corrects two dimensions outright.

**BMEF** — the process companion: four change mechanisms with distinct
observable signatures (repertoire substitution, personnel transmission,
programmatic exposure, format adaptation), each with a stated evidence
requirement, and an explicit boundary marking sonic and audience change as
unmeasurable in this project.

**BMPN** — the network: artists as nodes; edges from shared bills, shared
members, stated domestic influence, and (flagged as inferred) shared global
influence.

## Genres under study

| Genre strand | Catalogued acts | Representative artists |
|---|---:|---|
| Alternative / Indie | 16 | Meghdol, Shironamhin, Black, Shunno, Nemesis, Aurthohin |
| Mainstream Rock | 13 | James/Nagar Baul, Miles, LRB, Souls, Feedback, Ark |
| Heavy Metal | 12 | Warfaze, Rockstrata, Powersurge, Mechanix, Cryptic Fate |
| Hip-Hop / Rap | 8 | Ashraf Babu & Charu, Deshi MCs, Stoic Bliss, Jalali Set, Hannan |
| Pop | 7 | Habib Wahid, Tahsan, Minar, Imran, Nancy, Kona |
| Folk & Folk Fusion | 5 | Arnob, Lalon Band, Chirkutt, Maqsood O' Dhaka, F Minor |
| Progressive Rock/Metal | 2 | Artcell, Karnival |

Folk motifs are documented in 20 of 63 acts across every strand — folk functions
as a cross-strand resource rather than as one genre among seven.

## Running the analysis

```bash
pip install networkx matplotlib jsonschema scipy

python3 analysis/scripts/validate_data.py        # schema + referential integrity
python3 analysis/scripts/build_bmpn.py           # network layers
python3 analysis/scripts/analyze_bmpn.py         # communities + centrality
python3 analysis/scripts/temporal_analysis.py    # decade curves
python3 analysis/scripts/concert_ecosystem.py    # typology
python3 analysis/scripts/influence_analysis.py   # citations
python3 analysis/scripts/make_visualizations.py  # figures
```

All scripts are idempotent. Every number in the paper comes from
`analysis/outputs/` or `data/networks/`; every figure is rendered from those
files, so no figure can disagree with a reported number.

## Contributing data

The two conventions that matter most:

- **Null over invention.** Where a value is undocumented, leave it null and tag
  the record `needs-verification`. The schema permits null on `formed_year` and
  on discography years and labels for exactly this reason.
- **Record the gap, don't fill it.** The 2016 Joy Bangla Concert has an empty
  lineup and a note explaining why. Inferring its bill from adjacent years would
  have produced clean-looking data and a false network.

`analysis/scripts/validate_data.py` exits non-zero on any schema or referential
error and can gate CI.

## Frontend

An interactive site over the dataset lives in [`web/`](./web), statically
generated from the JSON in `data/` and the pipeline's computed outputs — so a
page can never report a number the pipeline disagrees with.

| Section | What you can do |
|---|---|
| Artists, Concerts | Faceted search over the catalogue — strand, decade, city, coverage, ecosystem class |
| Network | The multi-layer graph with each evidence layer switchable, community colouring, and a per-act inspector |
| Influences | Explore citations from either end, with the evidence and stated confidence behind each claim |
| Timeline | Fifty years by decade, with drill-down to the acts and shows behind each bar |
| Genres | The seven strands: formation span, cited influences, documented localisation |
| Findings | The computed results, each with the qualification it needs |
| Research | The paper, frameworks and case studies as readable pages |
| Data | Coverage per strand, dataset downloads, and what the project cannot do |

```bash
cd web
npm install
npm run dev
```

Deploy to Vercel by importing this repo and setting the project's **Root
Directory** to `web`; no other configuration is required.

## License

Research materials for academic and cultural research purposes; see
[`LICENSE`](LICENSE). Data collected from public sources.

---

## 👤 Author & Contact

**Md. Ismail Hossain**  
*Technology Professional & AI / Software Systems Researcher*  
*Professional Masters in Information Technology (PMIT), Institute of Information Technology (IIT), Jahangirnagar University, Dhaka, Bangladesh*  
*B.Sc. in Computer Science & Engineering*

- 📧 **Email:** [ismailhossain013@gmail.com](mailto:ismailhossain013@gmail.com)
- 🌐 **Portfolio:** [https://smile-plzz.github.io/Ismail_Hossain/](https://smile-plzz.github.io/Ismail_Hossain/)
- 🐙 **GitHub:** [@smile-plzz](https://github.com/smile-plzz)
- 💼 **LinkedIn:** [md-ismail-hossain-2938541b1](https://www.linkedin.com/in/md-ismail-hossain-2938541b1/)
- 📘 **Facebook:** [optimisticyetpessimist](https://www.facebook.com/optimisticyetpessimist/)
- 🐦 **X (Twitter):** [@smile_plzzz_](https://x.com/smile_plzzz_)
- 📍 **Location:** Dhaka, Bangladesh

---

**Repository**: https://github.com/smile-plzz/bangladesh-music-evolution-paper  
**Status**: Active research — paper at second draft, dataset expanding
