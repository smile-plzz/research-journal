# Taste as It Ages: Age, Openness, and the Evolution of Music Preference Across the Listening Life

**Author:** Md. Ismail Hossain  
**Affiliation:** Institute of Information Technology (IIT), Jahangirnagar University, Dhaka, Bangladesh  
**Email:** [ismailhossain013@gmail.com](mailto:ismailhossain013@gmail.com)  
**Profile & Links:** [Portfolio](https://smile-plzz.github.io/Ismail_Hossain/) | [GitHub](https://github.com/smile-plzz) | [LinkedIn](https://www.linkedin.com/in/md-ismail-hossain-2938541b1/) | [Facebook](https://www.facebook.com/optimisticyetpessimist/)  

*v4.3 — broadened full-length synthesis, with artist-level anchors, a derived audience-age model, attribute profiles by age group, and song-level dissections. Adds a scope-and-method section, a formal three-axis
framework, the large-sample age-trend literature that partially contradicts v3.0's "age-stable
content" claim, developmental (pre-bump) and late-life sections, social-transmission and
cultural-stratification accounts, cross-cultural evidence, a technology-as-moderator section, and a
protocol-grade empirical extension built on a named, obtainable dataset.*

---

## Abstract

Music preference is often treated as fixed once formed, but psychological and behavioral-data
research shows it follows a structured arc across the lifespan: rapid crystallization in adolescence
and young adulthood, a lasting bias toward music from that period (the "reminiscence bump"), and a
gradual narrowing of active discovery from the late 20s onward. Earlier versions of this paper argued
that the evidence splits into two independent axes — a **timing axis** (age-driven: when taste
crystallizes and how discovery declines) and a **content axis** (personality-driven and age-stable:
which region of the preference space a listener occupies). This version retains that distinction but
substantially revises it. Large-sample age-trend work (Bonneville-Roussy, Rentfrow, Xu & Potter,
2013; Bonneville-Roussy, Stillwell, Kosinski & Rust, 2017) shows preference *content* is not in fact
age-stable in the aggregate: liking for Unpretentious and Jazzy/Sophisticated material rises with
age, Classical holds flat, and Intense and Contemporary material declines. The two-axis model is
therefore replaced with a **three-axis framework** separating preference **content** (a slowly
drifting centroid in the MUSIC space), preference **breadth** (openness of the sampled region, which
follows a documented non-monotonic path from childhood open-earedness through adolescent narrowing to
a partial young-adult rebound and late-life decline), and **engagement** (how much music is consumed
and how important it is rated, which declines roughly monotonically from adolescence). The
reminiscence bump is recast as a property of the *emotional weighting* attached to the formation
window rather than of the content axis itself, which resolves the apparent contradiction between
"taste is set for life" and "preferences shift with age": different variables, different answers.
Around this core, the paper adds developmental evidence from before the bump (§9, open-earedness),
social and cross-generational transmission (§10, the cascading bump), cultural-stratification
accounts that treat breadth as a status resource rather than a psychological trait (§11), the
cross-cultural record (§12), an illustrative individual trajectory (§13) and a population-level
genre-demographics survey (§14), and streaming/algorithmic curation as a moderator that may be
actively reshaping the discovery curve for cohorts now in their formation window (§16). Artist-level
anchors (§14.2), three documented cases in which a decades-old recording acquired a mass young
audience through a single exogenous event (§14.3), a dated falsifiable forecast about hip-hop's
audience demographics (§14.4), and a null model deriving expected audience age from an artist's peak
year alone (§14.5) test the framework against concrete cases rather than aggregates. A predicted attribute profile by age group (§14.7),
an 85-artist directory with genre, MUSIC dimension and derived cohort (Appendix B), and twelve
song-level dissections (Appendix C) carry the argument down to the level of individual sounds. The
null model's *failures* (§14.6) are the productive part: pre-war classical and 1950s jazz have no living
formation cohort at all, which makes their audiences direct evidence that preference content is
acquired in adulthood rather than carried forward from a formation window. Predicted
attribute profiles by age group (§14.7) restate the whole arc in terms of tempo, dynamics, timbre,
harmony, structure and lyric mode rather than genre, and locate its likeliest single driver: what
music is *for* moves from social display to private regulation. Appendices B and C add an artist
directory of ~85 acts with genre, MUSIC dimension and derived cohort age, and twelve song-level
dissections. It
closes with a protocol-grade empirical extension (§18) specified against LFM-2b — a public, age-labeled,
two-billion-event Last.fm listening corpus that makes the previously "blocked on data access"
test executable — and a tiered accounting of evidential strength (§19).

---

## Version history

| Version | What it added |
|---|---|
| v1.0 | First complete draft: bump, discovery decline, MUSIC model, reconciliation, limitations. |
| v1.1 | §5 illustrative individual trajectory. |
| v2.0 | Abstract/introduction brought into line with the full section list; references de-caveated. |
| v3.0 | §6 population-level genre/artist age demographics, with an explicit non-peer-review caveat. |
| **v4.0–v4.3** | **Scope/method and evidence tiers (§2); formal three-axis framework (§3, §8); the large-sample age-trend literature that revises the old "age-stable content" claim (§7); engagement as a separate axis (§6); pre-bump development (§9); social transmission and the cascading bump (§10); cultural-stratification/omnivore accounts (§11); cross-cultural evidence (§12); streaming and algorithmic curation as a moderator (§16); later life (§17); protocol-grade empirical extension on a named public dataset (§18); tiered limitations (§19). Artist-level anchors, exogenous catalog shocks, a dated falsifiable forecast, and a release-date null model for audience age with its four deviation classes (§14.2–§14.6); predicted sound-attribute profiles per age group (§14.7); the documented cross-generational interpolation case (§10); an ~85-artist directory (Appendix B) and twelve song dissections (Appendix C). Intermediate revisions v4.1–v4.3 added and extended the artist-level material (§14.2–§14.7, Appendices B–C) incrementally and were not logged separately at the time; they are recorded here as one band rather than reconstructed after the fact.** |

---

## 1. Introduction

Ask someone what music "moved" them most and, disproportionately, the answer comes from their teens
or twenties — regardless of how old they are now. This is not simple nostalgia; it is a
well-documented and repeatable finding across self-report, autobiographical-memory, and
behavioral-log data, replicated in samples ranging from a few hundred undergraduates to a quarter of
a million online respondents to two billion logged listening events.

The finding is easy to state and surprisingly hard to interpret, because "music taste" is not one
variable. At least four different things are commonly meant by it, and the age literature reports a
different answer for each:

1. **What a listener likes** — the region of stylistic space their preferences occupy.
2. **How wide that region is** — whether they like many kinds of music or few.
3. **How much music matters to them** — hours consumed, self-rated importance, contexts of use.
4. **How fast they add to it** — the rate at which genuinely new material enters rotation.

Conflating these produces the field's most familiar apparent contradiction: the popular claim that
"your taste is set by 24" sits alongside published, large-sample evidence that aggregate preference
ratings shift steadily and measurably across adulthood. Both are true. They are statements about
different variables.

This paper asks four questions in order:

1. **How does music taste change with age** — what widens, what narrows, what drifts, and when?
   (§4–§7)
2. **Why** does it change on that particular timetable rather than continuously or randomly — what
   are the candidate mechanisms, and which are actually evidenced? (§4.3, §8–§11)
3. **How far does this generalize** — across cultures, cohorts, genres, and technological eras?
   (§12–§16)
4. **How would the model be tested against behavior** rather than restated from prior literature?
   (§18)

**Contribution.** The paper's claim is not that any individual finding here is new — all of §4–§17
is synthesis of published work. The contribution is the *decomposition*: showing that the literature's
seemingly incompatible results resolve cleanly once content, breadth, engagement, and discovery rate
are treated as four distinct dependent variables on a shared developmental timetable, and specifying
the decomposition precisely enough (§3, §8) that it makes falsifiable predictions (§18) on data that
already exists.

**A note on what changed in v4.0.** Earlier versions of this paper asserted that preference *content*
is essentially age-independent, governed by stable personality traits. Section 7 presents the
large-sample evidence that this is wrong as stated, and §8 rebuilds the model to accommodate it. The
revision is retained visibly rather than silently corrected, because the shape of the error is
instructive: it came from reading a *within-person stability* claim (personality predicts taste, and
personality is stable) as a *between-age invariance* claim (therefore taste does not shift with age).
Those are different claims and the data separates them.

---

## 2. Scope, method, and evidence tiers

### 2.1 What this paper is

This is a **literature review and theoretical synthesis**. It collects no primary data, and Section
18 proposes the empirical study that would test its central claims; that study has not been run.

One distinction matters, because three sections would otherwise look inconsistent with the sentence
above. *Collecting no primary data* is not the same as *deriving nothing new*. §14.5 builds a null
model of audience age from release date, §14.6 classifies the four ways observation departs from it,
and §14.7 states a predicted attribute profile by age group. These are original derivations from
published parameters and from the framework in §3 — not syntheses of prior claims, and not
measurements either. Each is labeled in place, and each appears in Appendix A as a derivation or a
prediction rather than as a finding.

### 2.2 How sources were selected

Sources were gathered by iterative topic search across the psychology of music preference,
lifespan-development, music-information-retrieval, and cultural-sociology literatures, following
citation trails outward from four anchor findings (the reminiscence bump, the discovery-decline
curve, the MUSIC preference model, and the large-sample age-trend studies). Coverage is deliberately
broad rather than systematic: this is not a PRISMA-style systematic review, no inclusion protocol was
pre-registered, and no formal search-and-screen log was kept. Section 19 treats that as a limitation
rather than a footnote, because it admits selection bias toward findings that are well covered in
English-language secondary sources.

### 2.3 Evidence tiers

Claims in this paper rest on evidence of visibly unequal quality, and the paper's usefulness depends
on not flattening that. Every substantive claim is assigned one of four tiers, used consistently
throughout and summarized again in §19:

| Tier | Meaning | Examples in this paper |
|---|---|---|
| **A** | Peer-reviewed, large-sample, replicated or directly corroborated by an independent source. | The reminiscence bump (§4); the MUSIC model's factor structure in Western samples (§6); age trends in engagement and preference across 250k+ respondents (§6, §7). |
| **B** | Peer-reviewed but single-study, or replicated only partially / only in one cultural context. | The gendered bump-timing split (§4.2); the personality/age dissociation (§7.2); the MUSIC model in non-Western samples (§12). |
| **C** | Credible non-peer-reviewed analysis of real large-scale data — industry research, well-documented data-blog analysis, preprints. | The discovery-decline age estimate (§5.1); algorithmic-curation effects on diversity (§16). |
| **D** | Industry/market survey aggregation without published sampling methodology, or fan-run surveys. | The genre- and artist-level age-demographic table (§14). |

Where tiers conflict, the higher tier governs and the conflict is stated rather than resolved by
selection. The v3.0→v4.0 revision in §7 is exactly this rule being applied: a Tier-A result
overriding a Tier-B inference.

### 2.4 Terminology

- **Preference content**: which styles a listener likes, expressed as a position in a preference
  space (here, the five MUSIC dimensions).
- **Preference breadth**: how much of that space a listener likes — dispersion, not location.
- **Engagement**: consumption volume and self-rated importance of music.
- **Discovery rate**: the proportion of listening devoted to material new to the listener, and
  separately, new to the world.
- **Sonic age** (after the UMAP 2025 study's usage, §5.2): the release-era of the music being played,
  as distinct from the listener's own age. The gap between the two is the paper's central
  observable.
- **Formation window**: the developmental period, roughly ages 10–25, in which the reminiscence
  bump's emotional weighting is laid down.

---

## 3. Conceptual framework

Before reviewing the evidence it helps to state the framework it will be organized into, so that each
finding can be attached to a specific variable. For a listener $i$ at chronological age $a$, define
four quantities:

- **$C_i(a)$ — the content centroid.** The listener's mean position in a five-dimensional preference
  space (Mellow, Unpretentious, Sophisticated, Intense, Contemporary). *Where* their taste sits.
- **$B_i(a)$ — breadth.** The dispersion of actual listening around that centroid; operationally, the
  entropy of the play distribution over genres, styles, or eras. *How wide* their taste is.
- **$E_i(a)$ — engagement.** Volume of listening and self-rated importance of music. *How much music
  matters.*
- **$D_i(a)$ — discovery rate.** Share of listening devoted to material the listener has not
  previously encountered. *How fast new material enters.*

And one weighting function:

- **$w_i(t)$ — emotional weight by era.** How much personal significance the listener attaches to
  music released (or first encountered) at time $t$. The reminiscence bump is the empirical claim
  that $w_i$ is not flat but peaks sharply when $t$ falls in $i$'s formation window.

The literature's four apparently competing headline findings then map onto four different variables
without contradiction:

| Popular claim | Which variable | What the evidence actually says |
|---|---|---|
| "Your taste is set by your mid-20s." | $w_i(t)$ | True: the emotional-weight peak is laid down in the formation window and persists (§4). |
| "Taste shifts steadily through adulthood." | $C_i(a)$ | True: the centroid drifts toward Unpretentious/Sophisticated and away from Intense/Contemporary (§7). |
| "People get closed-minded as they age." | $B_i(a)$ | Partly true, and non-monotonic: breadth falls in adolescence, partly rebounds in young adulthood, declines later (§9, §11). |
| "People stop finding new music around 30." | $D_i(a)$ | Approximately true, but life-stage tracks it better than age (§5). |

The rest of the paper populates these four functions from the evidence, then reassembles them (§8,
§17) into a single lifespan account.

Two clarifications matter for reading what follows. First, **all four are population averages over
cross-sectional data**; individual trajectories vary substantially, and almost nothing in this
literature is genuinely longitudinal (§19.2). Second, **$C$, $B$, $E$ and $D$ are not independent by
construction** — a listener with low engagement mechanically has fewer opportunities to discover — so
part of §18's job is to estimate them jointly rather than assume orthogonality.

---

## 4. The reminiscence bump: when emotional weight is laid down

### 4.1 The core finding *(Tier A)*

The reminiscence bump is the finding that autobiographical memories — and preferences tied to them —
cluster disproportionately around adolescence and early adulthood. Applied to music, adults rate
songs from roughly their teens through mid-20s as most personally significant and most preferred,
even decades later.

Holbrook & Schindler's foundational 1989 study put the peak of preference in **about the 24th
year** (often restated downstream as 23.5, a decimal implying precision the paper's own summary does
not claim).
Jakubowski, Eerola, Tillmann, Perrin & Heine (2020) replicate the effect using
autobiographical-memory methodology rather than pure preference ratings, which matters: it shows the
bump is not an artifact of asking people to rate liking, since it survives a change in the dependent
variable. Krumhansl & Zupnick (2013) and subsequent work extend it to recognition and
familiarity measures.

In the terms of §3, the bump is a claim about $w_i(t)$: emotional weighting by era is peaked, not
flat, and the peak location is indexed to the listener's own development rather than to any absolute
historical period.

### 4.2 Timing, and the gendered split *(Tier B)*

The clearest recent evidence on timing comes from a 2025 global study by Burunat, Mavrolampados,
Duman, Köhler, Saarikallio, Luck & Toiviainen out of the University of Jyväskylä's Center of
Excellence in Music, Mind, Body and Brain, published in *Memory*. It asked nearly 2,000 participants
across 84 countries to identify the single piece of music most personally meaningful to them.

Aggregated across the sample, meaningfulness follows an inverted-U peaking around **age 17** — but
the peak location itself is gendered: **men peak earlier, at ~15.9**, with a bump that stays stable
into older age, while **women peak later, at ~19**, and show a stronger **recency effect**, with
later-life music continuing to carry meaning alongside the adolescent peak rather than being fully
eclipsed by it.

The proposed explanation is developmental rather than purely neurocognitive: men's musical identity
is theorized to consolidate earlier via adolescent peer bonding and independence-seeking, while
women's consolidates over a longer window tied to relationship and emotional milestones extending
further into young adulthood. This is a proposed interpretation offered by the study's authors, not
an independently tested mechanism, and the paper should be read as establishing the *pattern* at
Tier A-minus (large, cross-national, peer-reviewed) while the *explanation* remains Tier B.

Note also that the ~17 aggregate peak sits meaningfully earlier than Holbrook & Schindler's ~24.
The two are not measuring the same construct — *personal meaningfulness of a single most-significant
piece* versus *preference ratings across a catalog* — and the discrepancy is itself informative: it
suggests the emotional-weight function $w_i$ may peak earlier than the preference function while both
sit inside a common formation window. Reconciling the two precisely is an open question (§18, H2).

### 4.3 Mechanisms

Four mechanisms are invoked in this literature, and they are not mutually exclusive. They differ in
how much direct evidence supports them:

**(a) Neurocognitive encoding advantage *(Tier A for the general effect, Tier B as applied to music)*.**
Adolescence and early adulthood are a period of heightened memory encoding generally — the same bump
appears for autobiographical memories unrelated to music — so anything experienced then gets
consolidated more vividly. Kudaravalli, Kathios, Loui & Davidow (2024), reviewing the neurocognitive
and social-brain development literature, tie the musical bump specifically to adolescent changes in
reward processing and heightened dopaminergic response to novelty, alongside continuing prefrontal
maturation. EEG work using bump-era popular songs as autobiographical-memory cues in aging samples
provides convergent, if preliminary, physiological evidence.

**(b) Identity formation *(Tier B, theoretically well-motivated)*.** Music functions as a social and
identity marker precisely during the years when identity is actively being built, giving songs from
that window outsized emotional weight independent of memory mechanics. This is the mechanism §13's
illustrative case makes most visible: adolescent genre allegiance is legible to peers as a social
signal in a way adult preference generally is not.

**(c) Self-defining memory consolidation *(Tier B)*.** Experiences from this period are
disproportionately integrated into the lifelong self-narrative and later recalled as *explanations* of
identity. Once a song is load-bearing for a self-narrative, its retrieval is reinforced every time
that narrative is rehearsed — which predicts that bump-era preference should be more resistant to
extinction than mere familiarity would produce.

**(d) Sheer exposure and rehearsal *(Tier A as a mechanism in general, undertested here)*.** People
in the formation window simply listen to more music, more repeatedly, in more socially shared
contexts (§6). Some fraction of the bump may be a plain frequency-of-exposure effect requiring no
special developmental machinery. This is the least glamorous explanation and the least well isolated
in the literature; §18 (H2c) proposes a design that can partially separate it, since exposure counts
are directly observable in listening logs while identity salience is not.

**A note on what would falsify (a)–(d).** These mechanisms are usually presented as complementary,
which risks unfalsifiability. They do make divergent predictions: a pure exposure account predicts
the bump should scale with formation-window listening volume and disappear for listeners whose heavy
listening began later; an identity account predicts it should be strongest for genres with high
social legibility (§14's pop-punk and Britpop cases) and weaker for ambient or functional music; a
neurocognitive account predicts the window should be developmentally fixed and *not* shift with the
age at which a listener's heavy listening happened to start. These are separable on listening-history
data (§18).

### 4.4 The bump is not the only bump *(Tier B)*

Recent work complicates the single-peak picture. Musical memory appears to be shaped by at least
three temporal bumps:

- the **reminiscence bump** proper, in the listener's own adolescence;
- a **cascading bump**, in which listeners show elevated liking for music from their *parents'*
  adolescent years — i.e., music that was ambient in the childhood home (§10);
- a **recency bump**, elevated significance for recently encountered music, stronger in women per
  §4.2 and never fully absent.

That $w_i(t)$ is multi-modal rather than single-peaked matters for the empirical design in §18: a
model fitting one Gaussian to era-preference data will systematically misestimate the adolescent peak
by absorbing cascade and recency mass into it.

---

## 5. The discovery decline: when new intake slows

### 5.1 The behavioral finding *(Tier C, primary source verified)*

Self-report explains *what* people say they prefer; behavioral data shows *what they actually do*.
Kalia's 2015 analysis of U.S. Spotify listening data, combined with Echo Nest artist-popularity
metrics, found active discovery of new and mainstream music rises through the teens, then declines
steadily through the 20s, with listeners statistically settling into a stable, non-expanding
repertoire by roughly **age 33**.

The decline is not uniform across groups. Two moderators stand out:

- **Gender**: the decline is faster for men than for women — a mirror-image of the §4.2 finding that
  women show a stronger recency effect. Two independent literatures, using different methods and
  different constructs, converge on the same directional claim: women keep taking in new music
  longer. The convergence is suggestive rather than established: the §4.2 side is peer-reviewed and
  large, but the behavioral side rests on Kalia alone, and the re-analysis that corroborates Kalia's
  age figure reports no gender breakdown at all (see the sourcing note below). It is treated as a
  primary target in §18 (H3) precisely because it is currently under-evidenced.
- **Parenthood**: the arrival of children predicts a sharp drop in mainstream and new-music listening
  *regardless of the listener's age at the time* — sometimes described informally as a "parent tax"
  on cultural currency.

The parenthood finding is the single most important result in this section, because it is the
clearest available evidence that **age is a proxy, not a cause**. If a life event produces the drop
independent of when it occurs, then the mechanism is at least partly about available attention and
lifestyle bandwidth, not about chronological age or developmental stage.

*Sourcing note.* Kalia's original analysis was published on the *Skynet & Ebert* blog and is widely
cited (Hypebot, WNYC, NME). It was read directly when this section was first written, and confirms
stabilization "by their mid-30s," a steeper decline for men than women, and the parenthood effect.
The post now returns HTTP 403 to automated retrieval, so re-verification requires opening it in a
browser; that caveat is recorded here rather than silently carried. The paper's "~33" figure is a
point estimate within the source's "mid-30s"/"early 30s" range. statsignificant.com's re-analysis
independently corroborates the age figure (Deezer ~31, Spotify ~33) and the parenthood effect, but
**not** the gender split, on which it is silent. Kalia therefore remains the sole source for the
gender moderator. All of this is Tier C: real large-scale data, competently analyzed, but not
peer-reviewed and without published methods detail sufficient for replication.

### 5.2 Independent corroboration from listening logs *(Tier C, and the most direct evidence available)*

The v3.0 draft rested §5's entire behavioral claim on Kalia alone, which §19 flagged as a
single-source dependency. That dependency is now partially discharged. Golubovikj, Ferwerda, Said &
Tkalcic's "Soundtracks of Our Lives: How Age Influences Musical Preferences" (UMAP 2025) analyzes the LFM-2b Last.fm corpus (§18.1) — a refined subset of
**42,883 users** with plausible age data and consistent listening — and introduces **Song's Sonic
Age (SSA)**, the release-era of a track relative to the listener's own age, as the central
observable.

Their reported pattern:

- **Younger listeners** favor music whose sonic age matches their current age — i.e. new releases —
  while also exploring older catalog material.
- **This persists until roughly age 40**, after which preference shifts toward music with a sonic age
  of **10–20 years** — that is, music from the listener's own youth.
- **Beyond 40**, consumption of current music declines and nostalgia-weighted listening dominates.

This is close to a direct behavioral measurement of $w_i(t)$ and $D_i(a)$ on the same data, and it
independently reproduces the qualitative shape Kalia reported from a different platform, a different
decade, and a different research community. The two disagree on timing — Kalia's stabilization at
~33 versus the UMAP study's inflection nearer 40 — which is exactly the kind of quantitative
disagreement §18 is designed to adjudicate, and which may itself be a cohort or platform effect
(Last.fm's user base skews toward more engaged listeners than Spotify's).

### 5.3 What "discovery" means, and why it is unstable *(conceptual)*

A caution that becomes load-bearing in §16: "discovery" conflates two things that were nearly
identical in the broadcast era and have come apart under streaming.

- **New-to-the-world discovery**: listening to music released recently.
- **New-to-the-listener discovery**: listening to music the listener has not heard before, of any
  era.

Kalia's popularity-indexed measure tracks the first. A listener who at 35 stops following the charts
but begins working through the 1970s Ethiopian jazz catalog scores as having *stopped discovering* on
that measure while having an extremely high new-to-them intake rate. Whether the observed decline in
$D$ is a decline in curiosity or a decline in *chart-following specifically* is unresolved by the
existing data, and §18 (H4) separates the two explicitly. This is not a quibble: the two readings
imply opposite things about whether taste "closes."

---

## 6. Engagement: how much music matters, and to whom *(Tier A)*

A variable the earlier drafts of this paper left implicit deserves its own axis, because the
best-powered study in this entire literature is primarily about it.

Bonneville-Roussy, Rentfrow, Xu & Potter (2013), *"Music through the ages: Trends in musical
engagement and preferences from adolescence through middle adulthood"* (*Journal of Personality and
Social Psychology*), pooled two large cross-sectional samples totaling **more than a quarter of a
million individuals** to chart age differences in musical attitudes, engagement, and preferences from
adolescence through middle age. On engagement — $E_i(a)$ in §3's terms — the findings are
unambiguous:

- **Young people listen to music substantially more often than middle-aged adults.**
- **The self-rated importance of music declines with age**, though adults still rate it as important
  in absolute terms — this is a decline from a very high adolescent baseline, not a collapse to
  indifference.
- **The contexts of listening narrow**: young people listen in a wide variety of settings, including
  many social and public ones, whereas adults listen predominantly in private.

That third finding deserves more attention than it usually gets. It links the engagement axis
directly to the discovery axis by a plausible mechanism: **the social contexts in which people
encounter music they did not choose are exactly the contexts that thin out with age.** Parties,
shared dorms, car rides with peers, record shops, gigs attended for social rather than musical
reasons — these are discovery infrastructure, and they are a function of life stage rather than of
neurology. A listener whose music consumption has migrated entirely to solitary, self-selected,
algorithmically-assisted listening has lost the main channel through which unchosen new material used
to arrive.

This reframes §5's decline substantially. If discovery falls partly because *unchosen exposure* falls,
then the decline is environmental rather than dispositional, and it should be reversible by
environmental change — a testable implication (§18, H5) and one with an obvious real-world corollary:
people who keep going to gigs, or who acquire a new social listening context in mid-life, should show
attenuated discovery decline.

---

## 7. Age trends in preference content: the finding that revises this paper

### 7.1 The MUSIC model *(Tier A in Western samples)*

Rentfrow & Gosling's (2003) *"Do Re Mi's of Everyday Life"* analyzed preferences of over 3,500
listeners and found they cluster into a small number of underlying dimensions — originally four
(Reflective & Complex, Intense & Rebellious, Upbeat & Conventional, Energetic & Rhythmic), later
refined by Rentfrow et al. (2011, 2012) into five, abbreviated **MUSIC**: **M**ellow,
**U**npretentious, **S**ophisticated, **I**ntense, **C**ontemporary. The five-factor structure has
replicated across multiple Western samples and stimulus sets, including with audio-excerpt rather
than genre-label stimuli, which addresses the obvious criticism that genre labels measure social
identification rather than sonic preference.

Each dimension correlates with broader Big Five traits. The most consistent single correlate across
this literature is **openness to experience**: listeners higher in openness disproportionately favor
the Sophisticated and Intense ends of the space (classical, jazz, and harder, heavier, or
unconventional material).

### 7.2 The problem: content is not age-stable *(Tier A — this supersedes v3.0's §4)*

Versions 1.0–3.0 of this paper drew the following inference: personality is comparatively stable
across adulthood; personality predicts preference content; therefore preference content is
comparatively age-stable, and age governs only sampling behavior. Setti & Kahn (2024) were cited in
support, finding that once *uses of music* and age are controlled, general personality traits
including openness lose predictive power for moment-to-moment consumption.

**That inference does not survive contact with the large-sample age-trend literature.**
Bonneville-Roussy et al. (2013), and then Bonneville-Roussy, Stillwell, Kosinski & Rust (2017) in
*"Age trends in musical preferences in adulthood: 1"* (*Musicae Scientiae*), report three distinct
age trajectories across the preference space:

| Trajectory | Dimensions / genres | Direction with age |
|---|---|---|
| **Upward** | Jazzy and Unpretentious material (jazz, blues, folk, country, easy-listening) | Increasingly **liked** with age |
| **Stable** | Classical genres and clips | Roughly **flat** across the age range |
| **Downward** | Contemporary and Intense material (pop, dance, rap, rock, punk, metal) | Increasingly **disliked** with age |

These are aggregate cross-sectional trends over hundreds of thousands of respondents, replicated
across two independent studies and extended in two companion papers on social influences
(Bonneville-Roussy & Rust, 2018) and on perceived musical attributes (Bonneville-Roussy & Eerola,
2018). They are among the best-powered results in the field. The content centroid $C_i(a)$ **moves**,
and it moves in a consistent direction.

### 7.3 Reconciling the two results

The contradiction is real but resolvable, and the resolution is the substance of this paper's revised
model. Four points:

**(i) Between-age drift is not within-person instability.** Cross-sectional age trends can be
produced by cohort effects — a 60-year-old in 2013 liking more jazz than a 20-year-old may reflect
1970s youth culture, not aging. The Bonneville-Roussy papers acknowledge that only longitudinal data
spanning decades could settle this, and none exists at scale. So "the centroid drifts with age" is
established; "the centroid drifts *within a person* as they age" is not. This is the field's single
largest open question and is H1 in §18.

**(ii) The drift is directional and interpretable, which argues partly against pure cohort effects.**
The observed direction — toward lower-arousal, more harmonically conventional, more privately consumed
material and away from high-arousal, high-volume, socially performed material — matches the
engagement findings in §6 (listening migrating to private contexts) and the companion paper's
attribute analysis. A pure cohort account would not predict that the drift aligns so neatly with an
independently measured shift in *how and where* people listen.

**(iii) Personality predicts position relative to peers, not absolute position.** A high-openness
55-year-old and a high-openness 20-year-old may both sit at the Sophisticated/Intense end *of their
own age group's distribution* while occupying different absolute positions. Openness is a
between-person predictor; age is a within-cohort location shift. Read this way, Rentfrow & Gosling
and Bonneville-Roussy et al. are not in conflict at all — they are describing orthogonal components of
the same variance. This is the reading v4.0 adopts.

**(iv) The bump lives on a different variable.** Crucially, none of the age-trend evidence contradicts
the reminiscence bump, because the bump is a claim about $w_i(t)$ — emotional weighting of the
formation era — not about $C_i(a)$. A listener can simultaneously drift toward folk and jazz in
present-day active listening *and* retain the adolescent punk catalog as their most emotionally
load-bearing music. §13's illustrative case is exactly this configuration, and §14's pop-punk data
shows it at population scale.

### 7.4 What survives of the old two-axis model

The timing/content distinction survives in weakened, more precise form. What does **not** survive:
the claim that content is age-*invariant*. What does survive: that content changes **slowly and
smoothly**, on a different timetable and by a different mechanism than discovery rate, which changes
**sharply and life-stage-contingently**. Two processes, still — but "fixed vs. moving" was the wrong
contrast. The right one is **slow drift vs. fast gating**.

---

## 8. The revised framework: three axes and a weighting function

Assembling §4–§7 into §3's notation:

**Axis 1 — Content ($C_i(a)$): slow drift.**
Position in MUSIC space. Predicted *between persons* by personality, chiefly openness (§7.1).
Drifts *with age* in a consistent aggregate direction — up on Unpretentious/Jazzy, flat on Classical,
down on Intense/Contemporary (§7.2). The drift is gradual, monotonic over the observed range, and
possibly confounded with cohort (§7.3(i)). Timescale: decades.

**Axis 2 — Breadth ($B_i(a)$): non-monotonic.**
Dispersion of listening around the centroid. High in early childhood (open-earedness, §9), narrowing
sharply at 10–11 as peer-anchored identity work begins, partially rebounding in young adulthood, and
declining again toward old age. Also structured by education and social position independent of age
(§11). Timescale: years, with sharp developmental transitions.

**Axis 3 — Engagement ($E_i(a)$): monotonic decline from an adolescent peak.**
Volume, self-rated importance, and breadth of listening *contexts*. Falls steadily from adolescence
through middle age, with the sharpest structural change being the migration from social/public to
private listening (§6). Timescale: decades, but with life-event discontinuities.

**Gate — Discovery rate ($D_i(a)$): fast, life-stage-contingent.**
Share of intake that is new. Rises through the teens, declines through the 20s, stabilizes in the
early-to-mid 30s (§5.1), with a further nostalgia-dominated shift after ~40 (§5.2). Better predicted
by life events — partnership, parenthood, career load — than by calendar age (§5.1). This is the axis
where age is most clearly a proxy. Timescale: months; a single life event can shift it.

**Weighting — Emotional era-weight ($w_i(t)$): laid down once, multi-modal, persistent.**
Peaked over the formation window (~15–24, gendered: men ~15.9, women ~19; §4.2), with secondary
cascading (parental-era) and recency modes (§4.4). Once established, essentially permanent — this is
the component that genuinely *is* "set for life," and mistaking it for Axis 1 is the source of the
entire "is taste fixed?" confusion.

The lifespan account this yields:

> A listener's stylistic position is set *relative to their peers* early, by disposition, and then
> **drifts** slowly with age along a common population trajectory. The **width** of what they sample
> collapses at adolescence, partially recovers, then narrows again. **How much** music they consume
> falls steadily from an adolescent peak, and the *social* contexts of consumption fall fastest.
> The **rate** at which new material enters is gated by life stage rather than by age directly, and
> once it closes it rarely reopens without an environmental change. And whatever was heard during the
> formation window keeps a permanent **emotional premium** that no amount of subsequent drift erases.

Everything after this section either tests, bounds, or complicates that account.

---

## 9. Before the bump: open-earedness and the developmental baseline *(Tier B)*

The literature reviewed so far begins at adolescence, which leaves the formation window without a
baseline: taste does not begin at 13.

Hargreaves (1982) introduced **"open-earedness"** — a receptivity to a wide range of musical styles,
including unconventional and unfamiliar ones. The developmental pattern, refined in later work
(Hargreaves, North & Tarrant; Hargreaves & Bonneville-Roussy, 2018; Louven, 2016, offering a critical
reworking of the construct):

- Children **under about 5** are markedly open-eared, showing little systematic rejection of
  unfamiliar or non-mainstream styles.
- Open-earedness **declines through later childhood**, with the drop typically beginning around
  **age 10–11**.
- It **partially rebounds in young adulthood**.
- It **declines again toward old age**.

Two things follow for this paper's framework.

**First, the breadth axis is non-monotonic, and its first inflection precedes the bump.** The
narrowing at 10–11 is not the discovery-decline of §5 arriving early; it is a different process,
occurring *before* the formation window rather than after it, and driven by the onset of peer-group
conformity pressure rather than by attention scarcity. Any model that treats breadth as simply
"declining with age" gets the first fifteen years backwards.

**Second, it locates what the reminiscence bump actually does.** The bump does not open taste — taste
was more open at 7 than at 17. What the formation window does is **commit**: it narrows the sampled
region while attaching an enduring emotional premium to what remains. Formation is a *selection* event
operating on a pre-existing broader base, not an *expansion* event. That reframing matters for §16,
because it changes what one should expect streaming to do: frictionless access can expand what is
*available* during the window without necessarily changing the psychological pressure to commit to a
narrow, socially legible subset of it.

The construct is contested. Louven's (2016) critique argues that "open-earedness" as measured
conflates tolerance, curiosity, and mere unfamiliarity-response, and Hargreaves & Bonneville-Roussy's
(2018) own paper is titled as an open question about measurement. Tier B accordingly: the
developmental shape is consistently reported, the construct validity is genuinely disputed.

---

## 10. Social transmission: where taste comes from before it is chosen *(Tier B)*

Taste is not generated endogenously and then expressed. It is transmitted, and the transmission
channels are age-structured.

**The cascading bump.** Beyond the listener's own adolescent peak, young adults show elevated liking
for music from their **parents'** adolescent years — the "cascading reminiscence bump" (§4.4).
Krumhansl & Zupnick (2013) documented this in young listeners rating music across five decades,
finding a secondary peak located in the parental generation's formation window rather than anywhere
justified by the music's intrinsic qualities or contemporary popularity.

The mechanism is unglamorous and probably correct: music that was ambient in the childhood home
during the pre-adolescent open-eared period (§9) is encoded before the narrowing, is associated with
positive attachment contexts, and is therefore available to be re-adopted later without the identity
cost of adopting a peer-illegible style. This makes the cascading bump the clearest single piece of
evidence that **exposure environment, not just developmental stage, shapes $w_i$** — the developmental
stage of the *listener* cannot explain why the second peak lands specifically on the parents' window.

**A case where the cascade is documented in the credits.** Olivia Rodrigo's "good 4 u" (2021) drew
immediate public comparison to Paramore's "Misery Business" (2007); three months after release,
Hayley Williams and Josh Farro were retroactively added as co-writers, taking a combined 50% royalty
share, the credit treated as an interpolation. The case is useful here for a reason unrelated to
authorship disputes: it is a rare instance where cross-generational stylistic transmission is
**explicitly registered** rather than inferred. A 2007 pop-punk record — formation-window music for
listeners now in their early-to-mid 30s — supplied the stylistic template for a 2021 record aimed at
listeners then in *their* formation window, and the resemblance was legible enough to the younger
audience (largely via TikTok mashups) to force a legal acknowledgment. That is the cascading
mechanism operating one full generation-step, with a paper trail. It also shows the cascade need not
travel through the original recordings at all: the parental-era style can arrive re-encoded in
contemporary production, which no measure based on release-year distributions would detect.

**Social sources through adulthood.** Bonneville-Roussy & Rust (2018), the second paper in the
*Age trends* series, examines sources of social influence as determinants of adult preference
explicitly, treating changing reference groups — family, peers, partner, colleagues, children — as
drivers of the age trends reported in the first paper. Their own framing is cautious: these are
cross-sectional snapshots and would be "best confirmed by longitudinal studies spanning decades."

**Why this matters structurally.** §6 established that listening contexts privatize with age. §10
establishes that taste transmission is fundamentally social. Together they suggest the discovery
decline (§5) is not primarily a story about individual psychology at all, but about the **thinning of
a social network's music-transmission function** across the life course. This is the paper's strongest
candidate for a unifying mechanism behind the timing axis, and it is currently underevidenced —
promoted here to a first-class hypothesis (§18, H5) rather than a remark.

---

## 11. Breadth as a social resource: the omnivore literature *(Tier B, different discipline)*

The psychology literature treats breadth as a dispositional trait (openness) or a developmental stage
(open-earedness). Cultural sociology treats it as a **status resource**, and this alternative account
has to be addressed or the framework in §8 is discipline-parochial.

Peterson's (1992) **cultural-omnivore thesis** found that high-status groups displayed *broader*, more
eclectic tastes than lower-status groups — "omnivores" versus "univores" — challenging Bourdieu's
elite-to-mass model in which elite taste is restricted to high-status forms. Under the omnivore
account, liking many kinds of music is not a psychological openness measure but a display of
cultural competence and social mobility: knowing how to appreciate across the hierarchy is itself the
status marker.

Three findings from this literature bear directly on the framework:

- **Breadth is stratified by education and class independent of age.** Any age trend in $B_i(a)$
  measured on an unrepresentative sample is partially confounded with the sample's educational
  composition — a serious concern for the Tier-C listening-log studies (§5.2, §18), whose user bases
  are self-selected and skew educated.
- **The age relationship is contested and possibly non-linear.** Some work hypothesizes and finds age
  positively related to omnivorousness (older, higher-status listeners displaying broader taste),
  which is the *opposite* of the psychological breadth-declines-with-age account. The reconciliation
  is probably that these measure different things: self-reported *liking across genres* (a
  competence claim) versus *actual play distribution entropy* (a behavior). A listener can credibly
  claim to appreciate jazz, hip-hop, and opera while playing three artists on repeat.
- **Omnivorousness is not stable over historical time.** Work updating Peterson's comparison found
  that the high omnivorousness observed in 1992 had **declined** by 2002 and 2008, contrary to the
  expectation of continued expansion, and other work finds omnivorous taste unstable within
  individuals over time. So even the between-person structure of breadth has a period component.

**The implication for this paper is a measurement warning, and it is a serious one.** §8's breadth
axis is only well defined once one commits to whether $B$ means *stated liking breadth* or *revealed
play-distribution breadth*. These correlate imperfectly, respond to different things, and the two
literatures have largely been measuring one each while both calling it "openness." §18 measures the
behavioral one and says so explicitly, and any comparison to the self-report literature should be
treated as cross-construct rather than confirmatory.

---

## 12. Cross-cultural evidence *(Tier B, and the framework's weakest flank)*

The core findings of §4–§7 rest heavily on U.S. and U.K. samples. What is known outside them:

**Preference structure.** Rentfrow et al. (2012) replicated the five-factor MUSIC structure across
multiple samples and geographic regions including Brazil, supporting cross-cultural applicability
*for preferences over Western music*. Chee, Leung & de Vries (2024, *Musicae Scientiae* 28, 76–92)
tested it in a Malaysian sample of 444 participants (59.7% ethnically Chinese) rating 50 musical
excerpts: the model **partially replicated**, with the **Sophisticated and Intense factors virtually
identical** to prior findings and the remaining factors less cleanly recovered. That specific pattern
is informative rather than merely disappointing — it suggests the dimensions tied most closely to
structural and arousal properties of the music travel better than the dimensions tied to
culturally-specific genre categories, which is what one would expect if MUSIC's Mellow/Unpretentious/
Contemporary factors are partly encoding local genre-market structure.

**Preference universals.** Greenberg et al. (2022), "Universals and Variations in Musical
Preferences," studied preferential reactions to Western music across **53 countries**, finding both
cross-culturally consistent structure and systematic national variation, and linking preference
dimensions to personality in a way broadly consistent with the Western findings.

**Bump timing.** The Jyväskylä 2025 study (§4.2) is the strongest cross-cultural datapoint in this
paper — ~2,000 participants across 84 countries — but it measures *personal meaningfulness*, not
discovery behavior or preference structure.

**The honest summary.** Cross-cultural support is **uneven across the three empirical pillars**:
reasonable for the bump (§4), partial and structure-dependent for preference content (§7),
and **essentially absent for the discovery decline (§5)**, whose entire evidence base is
U.S.-Spotify and Last.fm data with a heavily Western, heavily male, heavily online user
composition. The framework in §8 should be read as a model of listeners in
Western, high-streaming-penetration markets until tested elsewhere. Note also that every study named
here tests reactions to **Western music**; the question of whether the same preference dimensions
organize listening in traditions with different tonal, rhythmic, and social organization is barely
touched by this literature at all.

---

## 13. An illustrative individual trajectory

The mechanisms in §4–§12 are easier to see against a concrete trajectory than in the abstract. What
follows is a **composite, illustrative profile** — not a real individual's case, not data, and not
evidence for anything. Its purpose is to show what the framework predicts one should *see*, and to
make the framework's predictions concrete enough to be obviously wrong if they are wrong.

| Age range | Typical genre pull | Example artists | What §4–§12 predicts is happening |
|---|---|---|---|
| Childhood / pre-teen (~8–12) | High-energy, hook-driven, often peer- or sibling-introduced pop-punk | Blink-182; Green Day, Sum 41, Avril Lavigne | **Post-open-eared, pre-bump.** Per §9, open-earedness has already begun narrowing around 10–11; per §10, what is available to narrow *toward* is largely inherited (family, older siblings, radio, the ambient home catalog that later produces the cascading bump). Pop-punk's simple, high-arousal, rebellious-but-safe register is a common gateway: an early, low-cost independence signal that precedes real peer-driven identity work. |
| Teenage (~13–18) | Britpop / melodic guitar rock with strong lyrical and cultural identity | Blur, Oasis; Pulp, Suede, The Verve | **The formation window (§4).** Genre choice here is doing identity work, not only aesthetic work: picking a side (Blur vs. Oasis was a literal tabloid rivalry) is precisely the peer-anchored, socially-legible taste-marking that §4.3(b) describes, and §6's finding that adolescent listening happens in many *social* contexts is what makes that legibility possible. Whatever is adopted here acquires a permanent premium in $w_i(t)$ — regardless of what happens to $C_i(a)$ later. |
| Twenties | Continued high discovery, broadening around the formation core | Radiohead, Muse, Arctic Monkeys as adjacent expansions of the formation core | **Peak sampling, beginning to gate.** $D$ is at or just past its maximum and starting to decline (§5.1); $B$ shows the young-adult rebound §9 describes; $E$ is beginning its long fall from the adolescent peak (§6). |
| Adulthood (~late 20s onward) | Progressive and technical rock/metal — harmonically and structurally complex | Dream Theater, Porcupine Tree, Tool; King Crimson, Opeth, Steven Wilson, Haken | **Content drift under a closing gate.** This register sits in the MUSIC model's **Sophisticated** and **Intense** dimensions, which load most heavily on openness (§7.1). Read through the revised framework, this is *not* a replacement of teenage taste: it is $C_i(a)$ drifting toward complexity and away from immediacy (§7.2 — noting that the population trend is *away* from Intense, so a listener holding Intense while gaining Sophisticated is drifting against the aggregate on one dimension, which is exactly what high openness predicts at the between-person level, §7.3(iii)) while $D$ has fallen far enough that the drift proceeds through deepening rather than through breadth. |
| Middle age (~40+) | Increasingly nostalgia-weighted active listening; private contexts | Return traffic to Blur/Oasis; drift toward Unpretentious/Jazzy per §7.2 (Cash, Nelson, jazz catalog) | Per §5.2, active listening reweights toward music with a sonic age of 10–20 years; per §6, listening has largely privatized. The Britpop catalog does not return because taste "regressed"; it returns because $w_i$ never stopped being peaked there and $D$ is no longer supplying competition. |

**Two things this trajectory does not show.** It is not evidence that Britpop taste was *replaced* by
prog — under the model, Blur and Oasis very plausibly remain the most emotionally load-bearing music
in the profile even while prog dominates present-day active listening. The distinction between
preference content *that persists* and preference content *currently being added to* is the entire
point of separating $w_i(t)$ from $C_i(a)$, and a single case cannot demonstrate it. And it is one
illustrative composite, not a validated pattern: the actual test is §18.

---

## 14. Population-level evidence: genre and artist age demographics *(Tier D)*

§13 grounds the model in one illustrative case. This section widens the lens to population-level
survey and industry data on which genres actually skew toward which ages — the closest available
substitute, short of the cohort analysis proposed in §18, for checking whether the framework
generalizes past a single trajectory. **Every figure in this section is Tier D** (see §2.3 and the
caveat closing this section); it is included because directional population data is genuinely
informative about *shape*, and excluded from carrying any load about *magnitude*.

| Genre | Age skew | Data point |
|---|---|---|
| Hip-hop/rap | Young, sharply so | Most-liked genre for ages 12–35; 54% of 20–24-year-olds name it their *favorite* genre, vs. 5% of 55–64-year-olds (Statista figure, undated, via aggregator). |
| Dance/pop | Young | Under-indexes with older age groups; over-indexes with younger ones, alongside hip-hop. |
| Rock (mainstream) | Older-skewing | Under-indexed by younger age groups relative to hip-hop/dance/pop; still a large audience overall (~20.5% of US album sales, 2022). |
| Country | Older, and gendered | 56% of country fans are 45+; audience skews 62% female (2022 Luminate data). |
| Classical | Bimodal, older-weighted | 29% of the classical audience is under 35, but the majority is 55+ — a real younger minority coexisting with an older majority. |
| Progressive rock | Aging, but shifting younger | ~75% of ProgRock.com radio-station listeners were over 45 (2016); a separate 2020 fan-group survey found 63% under 45. Different sampling frames, not two waves of one survey — directionally suggestive only. |
| Metal (broadly) | Younger-preferred on average, but durable | Preference surveys find metal more preferred by younger listeners and disliked by older ones on average, yet major metal festivals show mixed-age crowds with a significant 40–60+ contingent. Average preference and committed-fan retention are different measurements. |
| Pop-punk | Young core, dual-track nostalgia | Warped Tour was ~90% ages 15–25 at its last edition; pop-punk also functions as a gateway genre for new young listeners *and* a nostalgia genre for the cohort that was 15–25 when it first broke. |

### 14.1 Reading the table against the framework

The genre data is broadly consistent with §8's framework, with one instructive complication.

**Where it fits straightforwardly.** Hip-hop, dance, and pop's youth skew fits both the discovery
gate (§5) and the content drift (§7.2): these are the genres most tied to *current* chart activity,
so an audience that has stopped following the charts drops out of their listenership mechanically —
and independently, they sit in the Contemporary dimension, which the Bonneville-Roussy trend data
shows declining with age. Two mechanisms, same prediction. Country and mainstream rock's older skew
is consistent with bump-anchoring (§4): both genres' commercial peaks are further in the past, so
their present-day audience disproportionately reflects listeners whose formation window overlapped
that peak. Country's position is doubly overdetermined, since it also sits in the Unpretentious
dimension that §7.2 shows *rising* with age.

**Where it complicates.** Progressive rock and, more sharply, pop-punk show real **bidirectional age
traffic**: prog's audience appearing measurably younger in a 2020 survey than a 2016 radio sample
suggested, and pop-punk sustaining both a live 15–25 core and an openly acknowledged nostalgia
audience now 30–40+. A genre's audience-age profile is therefore not "old genre, old audience" but a
mixture of at least four populations:

1. **bump-anchored returners** — listeners whose formation window overlapped the genre's peak;
2. **new young discoverers**, for whom the back catalog is now trivially accessible via streaming
   (§16) at zero marginal cost and with no social barrier to entry;
3. **cascading-bump inheritors** (§10) — young listeners for whom the genre was ambient in the
   childhood home because it was their *parents'* formation-window music;
4. the genre's **current chart-era demographic**, if it still has one.

Category 3 is a v4.0 addition to this analysis and it does real work: a 2020s teenager discovering
1990s Britpop or 1970s prog is not necessarily an anomaly requiring a streaming-access explanation,
because their parents' formation window is exactly where it sits. Distinguishing categories 2 and 3
empirically requires parental-cohort information that no current dataset carries, which is a
genuine limit on what §18 can test.

The §13 pop-punk case sits in category 2 or 3 depending on household: the genre functioning as an
accessible on-ramp for a listener who has not yet reached the formation window, not as evidence
against the bump.

**Caveat on this section's sourcing.** Every figure above comes from industry/survey aggregators
(Statista, Luminate, gitnux.org, headphonesaddict.com, a single fan-run survey for the progressive-rock
figures) rather than peer-reviewed sources, and none report sampling methodology in enough detail to
assess representativeness. Several are aggregator restatements of primary industry research whose
original methodology is not public. Treat this table as directionally informative — enough to motivate
the reading above — and not as evidence of the same weight as §4–§7. Flagged again in §19.


### 14.2 Artist-level anchors

The genre table treats audiences as aggregates. Individual artists make the mechanisms visible more
sharply, because an artist has a fixed release date while their audience does not — which makes the
gap between the two directly observable. The cases below are **illustrative anchors, not data**
(Tier D throughout: chart reporting and press coverage), chosen because each isolates one mechanism
from §4–§16 rather than merely being popular.

| Mechanism | Anchor artists | What the case shows |
|---|---|---|
| **Bump-anchoring** (§4) — audience aged with the release | Blur, Oasis, Pulp (Britpop, mid-90s); Nirvana, Pearl Jam; Wu-Tang Clan, A Tribe Called Quest | Present-day audiences skew toward listeners whose formation window overlapped the commercial peak. Britpop is the §13 case's own anchor; the hip-hop examples matter for §14.4. |
| **Content drift, upward dimensions** (§7.2) | Miles Davis, John Coltrane (Sophisticated); Johnny Cash, Dolly Parton, Willie Nelson (Unpretentious) | The genres whose liking *rises* with age. Cash's late *American Recordings* run is the interesting variant: an Unpretentious-dimension artist acquiring a substantially younger audience through repertoire choice, i.e. drift running the other way. |
| **Content drift, downward dimensions** (§7.2) | Bad Bunny, Olivia Rodrigo, Chappell Roan (Contemporary); Slipknot, Bring Me the Horizon (Intense) | The dimensions whose liking *falls* with age, and the artists currently occupying the formation window of listeners now aged 13–24. |
| **Openness / high-Sophisticated pursuit** (§7.1) | Dream Theater, Porcupine Tree, Tool, King Crimson, Radiohead, Steven Wilson | Structurally and harmonically complex material, loading on Sophisticated and Intense — the region §13's adult phase drifts toward. |
| **Durable committed fandom** (§14, metal row) | Iron Maiden, Metallica, Rush, Grateful Dead | Average preference declines with listener age while *committed*-fan retention does not. Mixed-age crowds at these artists' shows are the visible form of the distinction between the two measurements. |
| **Dual-track nostalgia** (§14, pop-punk row) | My Chemical Romance, Paramore, Fall Out Boy, Avril Lavigne, Blink-182 | The same catalog serving a current teenage audience and a bump-anchored 30–40+ audience simultaneously. The *When We Were Young* festival (Las Vegas, 2022) is the clean case: an explicitly nostalgia-framed emo/pop-punk bill headlined by My Chemical Romance, Paramore, and Avril Lavigne, whose demand required expanding from one date to three. A festival that sells out three days on a lineup whose commercial peak was 15–20 years earlier is a bump-anchored cohort with adult disposable income, not a youth market. |
| **Cascading bump** (§10) | The Beatles, Fleetwood Mac, ABBA, Queen, Pink Floyd | Perennial cross-generational catalogs whose young audiences cannot be explained by their own formation windows. Krumhansl & Zupnick's parental-era secondary peak lands squarely on this repertoire. |
| **Prog rejuvenation** (§14, prog row) | Sleep Token, Polyphia, Ghost alongside Yes, Genesis, Rush | The younger-skewing shift the 2016-vs-2020 survey comparison gestures at is at least partly a *new-production* effect, not only back-catalog access: the Sophisticated/Intense region has contemporary occupants with young audiences. |

### 14.3 Exogenous catalog shocks: when release year and audience age come apart

Three well-documented recent cases isolate the §16.1 access mechanism unusually cleanly, because in
each a decades-old recording acquired a mass young audience through a single identifiable exogenous
event, with no change to the music itself:

- **Kate Bush, "Running Up That Hill" (1985 → 2022).** After use in *Stranger Things* season 4, it
  reached No. 1 on the UK Official Singles Chart **37 years after release** — the longest gap to No. 1
  in chart history — with global streams up roughly **8,700%** in a week. Bush became the oldest
  woman to top the chart, at 63.
- **Metallica, "Master of Puppets" (1986 → 2022).** Also via *Stranger Things* season 4, it entered
  the *Billboard* Hot 100 **for the first time ever**, at No. 40, on ~17.5 million weekly US streams
  with on-demand streaming up ~650% week-over-week.
- **Fleetwood Mac, "Dreams" (1977 → 2020).** A single viral TikTok video returned it to the Hot 100
  top 40 for the first time in 30 years (re-entering at No. 21, peaking at No. 12), with its best
  streaming week ever more than four decades after release.

**Why these matter to the argument, and what they do not show.** They do *not* falsify the
reminiscence bump — a 15-year-old adopting a 1985 record is having their formation-window experience
on schedule; only the *sonic age* of the material is anomalous. That is precisely §16.3's H6
scenario made visible: $w_i(t)$ stays peaked in **listener age** while decoupling from **release
year**. Any instrument that measures the bump by release date would score these listeners as
anomalies rather than as ordinary cases of the mechanism operating over a wider catalog.

They also give the discovery-decline literature a problem it cannot currently handle. Each event
produced an enormous spike in *new-to-listener* discovery of *old* music — which registers on
Kalia-style popularity-indexed measures as no discovery at all, or worse, as a *decline* in
mainstream-currency, since the music is not new to the world (§5.3). A measure that cannot see the
Kate Bush event is not measuring curiosity.

And they suggest a testable addition to §18: **sync and virality events are natural experiments.**
They are dated, exogenous to any individual listener, and produce sharp discontinuities in a
specific track's adoption. Comparing adoption by listener age around such an event would estimate
how *age itself* moderates responsiveness to an equal-opportunity exposure shock — holding the music,
the moment, and the access cost constant across cohorts. To this author's knowledge that design has
not been run, and it would isolate the age effect better than any cross-sectional preference survey.

### 14.4 A dated prediction: hip-hop's youth skew must decay

The genre table's sharpest single figure — 54% of 20–24-year-olds report generally liking hip-hop
versus 5% of over-55s — is usually read as a fact about the genre. Under the framework it cannot be
one, and this is a place where the model makes a falsifiable forecast rather than a retrodiction.

Hip-hop's commercial arrival dates to the late 1970s and early 1980s. Listeners whose formation
window fell across that period — those who were 15–24 in, say, 1985 — are now in their mid-50s to
mid-60s. If bump-anchoring (§4) is a real developmental mechanism and not a property of particular
genres, then **the over-55 hip-hop figure must rise steadily over the coming decades**, mechanically,
as each successive cohort ages carrying its formation-window catalog with it. The current 5% figure
is a **period effect** — a snapshot of a genre younger than its oldest possible fans — not a stable
genre characteristic.

The same reasoning applies in reverse to rock's older skew (§14.1): part of what looks like "rock is
for older listeners" is that rock's mass-market formation windows are further back, and that
component will continue to age out.

This prediction is worth stating because it is cheap to check and hard to explain away. It requires
no new instrument — repeated cross-sectional genre-preference surveys already exist — and the
competing account (that hip-hop is intrinsically youth-coded and will keep skewing young regardless
of cohort) makes the opposite prediction on the same data. If the over-55 hip-hop share is still near
5% in 2040, the bump-anchoring explanation of genre-age demographics is in serious trouble.



### 14.5 Deriving expected audience age from release date

The anchor table in §14.2 assigns artists to mechanisms qualitatively. The framework supports
something stricter: if bump-anchoring (§4) is real, then an artist's **core audience age is
predictable from their commercial peak year alone**, with no audience data required.

For an artist whose commercial peak fell in year $P$, the bump-anchored core cohort — listeners whose
formation window (ages ~15–24) overlapped that peak — has, in year $Y$, an age of approximately:

$$\text{core cohort age} \;\approx\; (Y - P) + 15 \;\text{ to }\; (Y - P) + 24$$

The table below applies this at $Y = 2026$. **Every age range in it is a derivation, not a
measurement.** Peak years are approximate and contestable; the ranges describe where the
*bump-anchored* component of an audience should sit, not the whole audience; and they deliberately
ignore every other channel by which listeners arrive. That is the point — the table's value is as a
**null model**, and the interesting artists are the ones it gets wrong (§14.6).

| Approx. peak | Artists | Derived core cohort age in 2026 |
|---|---|---|
| ~1959–1965 | Miles Davis (*Kind of Blue*), John Coltrane, early Beatles | 76–91 |
| ~1967–1972 | The Beatles (late), Led Zeppelin, King Crimson, Grateful Dead, Miles Davis (*Bitches Brew*) | 69–83 |
| ~1973–1978 | Pink Floyd, Queen, ABBA, Fleetwood Mac, Bob Marley, Yes, Genesis, Dolly Parton, Willie Nelson | 63–77 |
| ~1979–1985 | Michael Jackson, Madonna, Kate Bush, Iron Maiden, Rush, The Cure, Prince | 56–71 |
| ~1986–1991 | Metallica, Run-DMC, Public Enemy, Guns N' Roses, N.W.A, Nirvana, Depeche Mode | 50–64 |
| ~1992–1997 | Wu-Tang Clan, A Tribe Called Quest, Blur, Oasis, Pulp, Radiohead, Nas, Björk, Dream Theater | 44–58 |
| ~1998–2003 | Blink-182, Eminem, Linkin Park, Tool, Avril Lavigne, Slipknot, The Strokes, Destiny's Child | 38–52 |
| ~2004–2009 | My Chemical Romance, Paramore, Fall Out Boy, Arctic Monkeys, Kanye West, Porcupine Tree, Amy Winehouse | 32–46 |
| ~2010–2015 | Adele, Kendrick Lamar, Drake, Lorde, Bring Me the Horizon, Daft Punk (*RAM*), The Weeknd | 26–40 |
| ~2016–2020 | BTS, Billie Eilish, Ghost, Tyler the Creator, Post Malone, Bad Bunny (early) | 21–34 |
| ~2021–2025 | Olivia Rodrigo, Chappell Roan, Sleep Token, Polyphia, Ice Spice, Sabrina Carpenter, Bad Bunny (peak) | 16–29 |

Read down the right-hand column and the §14.1 genre table's shape falls out mechanically. Country and
mainstream rock skew older because their mass-market peaks sit in the upper rows; hip-hop and pop
skew younger because theirs sit in the lower ones. **No genre-specific explanation is required** —
which is the §14.4 forecast restated: the skews are positions on a conveyor, not properties of the
music.

### 14.6 Where observation departs from the derivation — and why that is the useful part

Four classes of artist violate the null model, and each violation identifies a specific mechanism
operating *in addition to* bump-anchoring. These deviations are more informative than the fits.

**(a) Genres whose formation cohort is largely gone — evidence for adult acquisition.** The
derivation puts the bump-anchored audience for *Kind of Blue* (1959) at **76–91** in 2026, and for
the Baroque and Classical repertoire at no living cohort whatsoever. Yet jazz has a substantial
living audience and classical retains 29% of its audience under 35 (§14.1). **This cannot be
bump-anchoring**, and it is not a marginal correction — for pre-war classical repertoire it is the
*entire* audience. Every one of those listeners acquired the taste in adulthood.

This is the strongest available evidence for the content-drift axis (§7.2) as a real acquisition
process rather than a cohort artifact, and it is evidence of a kind the survey literature cannot
supply: Bonneville-Roussy et al.'s finding that liking for Jazzy and Sophisticated material *rises*
with age would be uninterpretable as drift if it could be explained by cohorts carrying
formation-window taste forward — and for repertoire older than any living listener, it demonstrably
cannot be. Classical and jazz are the control condition the age-trend literature never designed.

**(b) Multi-generational transmission — the cascade at scale.** The Grateful Dead's derived cohort is
**69–78**, yet Dead & Company have played to visibly mixed-age audiences with a substantial cohort in
their 20s and 30s. The Beatles, Pink Floyd, Queen, Fleetwood Mac and ABBA are the same story in
milder form: catalogs that recruit continuously across generations. Per §10, this is the cascading
bump operating through household exposure — these are the records that were ambient in the childhood
homes of the listeners now adopting them, encoded during the open-eared period (§9) and available for
re-adoption later without identity cost. The prediction that distinguishes cascade from mere quality:
**cascade catalogs should be exactly the ones with high parental household penetration**, not the
ones critics rate highest, and those two sets come apart (the Velvet Underground and Captain
Beefheart are canonical and do not cascade; ABBA is not canonical and does).

**(c) Continuous producers — audiences as stacked cohorts, not single ones.** Metallica, Iron Maiden,
Taylor Swift, Radiohead and Beyoncé each have 20–40 years of continuous relevant output, so their
audiences are **sums over multiple formation windows** rather than one. The null model's single range
is simply the wrong shape for them. Taylor Swift is the extreme case: an artist who has occupied the
formation window of listeners now ~30 (2008–2010 country era) *and* those now ~20 (*1989*/*Reputation*)
*and* those now in it (*Midnights* onward), while the earliest cohort aged alongside her. Her
re-recording project is arguably the purest commercial exploitation of $w_i(t)$ yet attempted:
it monetizes the emotional premium on formation-window material by selling the *same songs* back to
the cohort that formed on them. That it worked is a data point about the durability of the weighting
function.

**(d) Sync and virality rejuvenation.** The §14.3 cases. Kate Bush's derived cohort is **56–65**; the
2022 audience was substantially teenage. Metallica's is **50–64**; the *Stranger Things* audience was
not. These are the sharpest violations in the table and the ones with a dated, identifiable cause.

**What the four deviations add up to.** Bump-anchoring is the default and it explains the aggregate
genre skews well. But at least four other channels move listeners onto catalogs their birth year does
not predict — adult acquisition, household cascade, continuous production, and exogenous exposure
shocks. Three of the four have become *more* powerful under streaming (§16.1), which is a further
reason to expect the audience-age structure documented in §14.1 to loosen rather than hold. A useful
formulation for §18: the null model above is a testable baseline, and **the residual from it is the
quantity of interest** — per artist, per genre, per cohort. Fitting it on LFM-2b and examining which
artists have the largest residuals would identify cascade and acquisition catalogs empirically rather
than by the anecdote used here.



### 14.7 Sound-preference profiles by age group

Genres are a coarse instrument: they bundle sonic properties with social meaning and commercial
history, and they are historically unstable (§19.3). The third paper in the *Age trends* series —
Bonneville-Roussy & Eerola (2018), *Musicae Scientiae* 22(3), 394–414 — attacks this directly, asking
whether age trends in preference are driven by **intrinsic attributes of the music** rather than by
genre labels. Their design had 481 adults rate preferences for 51 audio clips *and* for musical
attributes grouped under **dynamics, pitch, structure, tempo, and timbre**, with MIR features
extracted from the clips. Their dimensional groupings are worth stating because they cut differently
from genre: **Intense** (metal, punk, rock), **Jazzy** (blues, funk, jazz, Latin, reggae), and
**Unpretentious** (country, gospel, pop, R&B/soul).

The profiles below use that five-attribute taxonomy as descriptive vocabulary, mapped onto §17's
five phases. **An honest label is needed here.** The attribute *categories* are taken from
Bonneville-Roussy & Eerola; the phase-by-phase attribute values are **inferred** from the genre-level
age trends (§7.2), the engagement and context findings (§6), and the developmental sequence (§9) —
they are not read off a published table of attribute-by-age coefficients. Searching for direct
evidence that older listeners systematically prefer lower-arousal music turned up surprisingly
little: it is widely assumed and thinly measured. Treat this section as **the framework's predicted
attribute profile**, i.e. a set of hypotheses (testable via audio features on LFM-2b, §18), not as a
finding.

| Attribute | **Phase 0–1: Inheritance & commitment** (≤12) | **Phase 2: Formation** (13–24) | **Phase 3: Stabilization** (25–35) | **Phase 4: Drift** (35–60) | **Phase 5: Concentration** (60+) |
|---|---|---|---|---|---|
| **Tempo** | Fast, steady, unambiguous pulse | Fast to mid; danceable or mosh-able; tempo as energy signal | Mid; tempo becomes contextual (work, commute, chores) | Mid to slow; tolerance for slow-developing material rises | Slow to mid; tempo largely irrelevant to selection |
| **Dynamics** | Compressed, loud, consistent | Loud, with dynamic contrast as drama (loud–quiet–loud) | Moderate; listening moves to environments where loud is impractical (§6) | Wide dynamic range tolerated and increasingly sought | Moderate; comfort and intelligibility over impact |
| **Timbre** | Bright, clean, hook-forward | Distorted, aggressive, or heavily produced — timbre as identity marker | Mixed; production polish noticed rather than assumed | Acoustic, organic, and "warm" timbres gain ground (the Unpretentious/Jazzy shift, §7.2) | Familiar timbres strongly favored; novelty in timbre reads as noise |
| **Pitch/harmony** | Diatonic, 3–4 chords, no modulation | Diatonic with attitude — power chords, modal-minor colorings | Widening: extended harmony, modal writing become legible | Harmonic complexity actively valued (jazz, classical acquisition, §14.6a) | Complexity retained if already acquired; rarely newly acquired |
| **Structure** | Short (2–3 min), verse–chorus, high repetition | Verse–chorus with a payoff; the singalong chorus is the social unit | Longer forms tolerated; album-length listening returns for some | Long-form, through-composed, and improvised structures accessible | Familiar structures; repetition becomes a feature, not a limitation |
| **Lyric mode** | Literal, comic, or absent | First-person, oppositional, identity-declarative | Retrospective, ambivalent | Narrative, elegiac, or lyrics de-emphasized entirely | Lyrics as memory cue more than as content |
| **Function** (§6, §15) | Ambient, social, inherited | Identity display, peer bonding, emotional intensity | Mood regulation, focus, background | Mood regulation and nostalgia; private contexts dominate | Emotional meaning, memory, continuity (§15) |
| **Exemplar register** | Blink-182, Green Day, chart pop | Oasis, Nirvana, MCR, Olivia Rodrigo, Kendrick Lamar | Radiohead, Arctic Monkeys, The National | Tool, Porcupine Tree, Steely Dan, Miles Davis, Johnny Cash | Classical repertoire, standards, formation-window catalog |

**The single strongest pattern across the row.** Read left to right, one thing changes more than
anything else: **what the music is for.** It moves from *social display* to *private regulation*.
Every attribute shift follows from that — loud, fast, timbrally aggressive, lyrically declarative
music is optimized for a shared room and a listener who needs to be seen liking it; harmonically
complex, dynamically wide, slow-developing music is optimized for private attention. §6's finding
that listening contexts privatize with age is therefore not one age trend among several. It is
plausibly *the* mechanism generating most of the attribute profile above, and it makes a sharp
prediction: **attribute drift should track the privatization of listening contexts more closely than
it tracks age.** A 45-year-old who still listens mostly in social settings should show a younger
attribute profile than their birth year predicts. That is testable, and it is not currently tested.


---

## 15. The far end: music in later life

The literature reviewed so far mostly stops at middle age. Three things are known about the far end
of the arc, and they matter because they test whether the framework describes a *trajectory* or
merely a *first half*.

**Breadth declines again, but engagement does not vanish.** §9's open-earedness sequence ends with a
renewed decline toward old age, and §6's engagement trend is downward through middle adulthood. But
the Tier-D data in §14 (classical's 55+ majority, metal's persistent 40–60+ festival contingent) and
the general finding that adults still rate music as important in absolute terms both argue against
reading this as disengagement. The better reading is **concentration**: fewer styles, fewer contexts,
undiminished intensity within what remains.

**Selectivity is theoretically predicted, not just observed.** Carstensen's **socioemotional
selectivity theory** holds that as time horizons shorten, people become increasingly selective,
investing more in emotionally meaningful goals and less in information-seeking or
horizon-expanding ones. Applied to music, this predicts almost exactly the observed pattern: reduced
exploration ($D$ and $B$ down) with *sustained or increased* investment in emotionally significant,
already-known material ($w_i$-weighted listening up). Older adults' documented preference for
distraction and positive-reappraisal emotion-regulation strategies, and the finding that self-chosen
music regulates induced negative affect effectively across age groups, both fit this reading.

This is worth emphasizing because it supplies the **motivational account the framework otherwise
lacks**. §5 and §6 explain the discovery decline in terms of attention scarcity and thinning social
context — both essentially stories about *constraint*. SST supplies a complementary story about
*preference*: late-life narrowing may be partly a rational reallocation toward known emotional payoff
rather than an erosion of capacity. These are separable in principle (constraint predicts that
relieving the constraint restores exploration; selectivity predicts it does not) and, to this
author's knowledge, have not been directly compared in the music domain. That is a genuine gap and a
better use of a future study than another cross-sectional preference survey.

**The bump outlives almost everything.** Bump-era music remains an effective autobiographical-memory
cue late into life — the basis for its use in dementia care and reminiscence therapy, and the setting
for the EEG work noted in §4.3(a). $w_i(t)$, in other words, is the most durable component of the
entire system: it is laid down first and it degrades last, persisting through substantial decline in
the machinery that produced it. Any account that treats the bump as merely a preference artifact has
to explain that durability.

---

## 16. Technology as a moderator: streaming, access, and algorithmic curation

Every behavioral finding in §5 comes from platform data, which means the platform is not a neutral
observation window — it is part of the mechanism. Three distinct effects need separating.

### 16.1 Access: the collapse of the discovery cost function *(structural, uncontested)*

In the broadcast and physical-retail eras, listening to a 1974 record required owning it or waiting
for someone to play it. Back-catalog exploration had a real per-item cost in money, time, and
physical access. Under streaming that cost is approximately zero and approximately equal for all
eras. This has two consequences the pre-streaming literature could not have measured:

- **New-to-the-world and new-to-the-listener discovery come apart entirely** (§5.3). Kalia's
  popularity-indexed measure — the basis for the "~33" figure — cannot distinguish a listener who has
  stopped exploring from one who has stopped exploring *the charts*.
- **Cohort-specific catalogs stop being cohort-specific.** §14's categories 2 and 3 exist at scale
  only because access is free. A genre's audience can rejuvenate without any new production, which
  is not something the models in §4–§7 were built to accommodate.

### 16.2 Curation: algorithms narrow measured diversity *(Tier C, and the finding cuts both ways)*

Anderson, Maystre, Mehrotra, Anderson & Lalmas (2020), *"Algorithmic Effects on the Diversity of
Consumption on Spotify"* (The Web Conference), analyzed platform-scale listening and reported two
results that sit in tension:

- **High consumption diversity is strongly associated with important long-term user outcomes** —
  conversion and retention.
- **Algorithmically-driven listening is associated with *reduced* consumption diversity**, relative
  to organic listening, while being *more effective* precisely for users who were already low in
  diversity.

The authors frame this as a central tension for platforms: recommend what users will enjoy now, or
preserve the diversity associated with their staying. For this paper the implication is sharper —
**the platform is applying a downward pressure on $B_i(a)$ that is confounded with the age trend the
same platform data is being used to measure.** A cross-sectional finding that older listeners have
narrower play distributions cannot, on platform data alone, distinguish developmental narrowing from
differential exposure to algorithmic curation, especially if older and younger users differ in how
much of their listening is algorithmically sourced (they very likely do).

The literature is not unanimous. Work reframing the filter-bubble question in terms of scale effects
(*Scientific Reports*, 2024) finds that algorithmic devices can foster both confining and
diversifying dynamics, with the apparent contradiction traceable to differences in how diversity is
represented and at what scale it is measured — a diversity metric computed over artists, genres, and
styles can move in different directions on the same data. So: reduced diversity is a real and
replicated finding at some scales, and "filter bubble" as a blanket description is not supported.

### 16.3 The open question: is the timetable itself stable? *(unresolved)*

The sharpest unanswered question in this entire paper. Nearly all the discovery-behavior evidence
(§5.1) predates or sits early in streaming's maturity. A 20-year-old today has near-frictionless
access to entire back catalogs a 20-year-old in 1995 did not, encounters much of their music through
recommendation rather than social context (§6, §10), and is forming taste inside a system that
actively optimizes for short-term engagement.

At least three of the framework's components could plausibly shift for streaming-native cohorts:

- **$D$**: the ~33 stabilization point could move later (more accessible discovery) or earlier
  (algorithmic satisfaction reducing the need to search).
- **$B$**: adolescent narrowing (§9) could soften if identity work no longer requires committing to a
  scarce, locally available subset — or intensify, if recommendation systems narrow faster than peer
  groups ever did.
- **$w_i(t)$**: if formation-window listening is dominated by algorithmically-surfaced catalog music
  from many eras rather than by contemporary releases, the bump could **decouple from release year**
  entirely, remaining sharply peaked in *listener age* while flattening in *sonic age*. That would be
  invisible to any study measuring the bump by release date, and it is directly testable on data that
  already exists (§18, H6). §14.3's catalog-shock cases are this scenario already visible in the
  chart record.

That last possibility is, in this author's view, the most interesting live hypothesis in the field,
and it has a limited window: it requires cohorts whose formation window fell entirely inside the
streaming era to be old enough to measure, which is only now becoming true.

---

## 17. Synthesis: the lifespan arc

Assembling §4–§16 into a single account. The arc has five phases; the first and last are additions in
v4.0, and the phase boundaries are approximate population averages with substantial individual
variance.

**Phase 0 — Inheritance (birth to ~10).** High open-earedness (§9). Taste is ambient rather than
chosen: the household catalog dominates, and what is encoded here supplies the cascading bump
decades later (§10). $B$ is at its lifetime maximum; $C$ is essentially the parents'; $D$ is
meaningless as a construct because nearly everything is new; $w$ is beginning to accumulate.

**Phase 1 — Commitment (~10 to ~15).** Open-earedness drops sharply (§9). Peer legibility becomes the
governing constraint. This phase *narrows* rather than expands: the listener selects a defensible
region from an already-broad base. $B$ falls fast.

**Phase 2 — Formation (~13 to ~24; peak ~16 men, ~19 women).** The reminiscence bump is laid down
(§4). Maximum engagement (§6), maximum discovery rate (§5), maximum social listening context. Identity
work, neurocognitive encoding advantage, and sheer exposure volume all point the same way, which is
why the bump is so robust and so hard to mechanistically decompose (§4.3). Whatever is heard here
acquires a permanent premium in $w_i(t)$.

**Phase 3 — Stabilization (~mid-20s to ~35).** $D$ declines through the 20s and stabilizes in the
early-to-mid 30s (§5.1), gated by life events — partnership, parenthood, career load — more tightly
than by age. $E$ falls from its adolescent peak and listening privatizes (§6), removing the
unchosen-exposure channel that supplied much of Phase 2's intake (§10). $C$ begins its slow drift
(§7.2). New intake increasingly gets judged *against* the formation catalog rather than evaluated
fresh.

**Phase 4 — Maintenance and drift (~35 to ~60).** $C$ continues drifting toward
Unpretentious/Jazzy/Sophisticated and away from Intense/Contemporary (§7.2). Active listening
reweights toward sonic age 10–20 years — the listener's own youth (§5.2). $B$ narrows further,
plausibly under both developmental and algorithmic pressure (§16.2). Taste does not freeze: openness
varies between individuals, and life events can reopen active discovery, but the *default* is a
stable, bump-anchored repertoire.

**Phase 5 — Concentration (~60+).** Breadth and engagement decline further (§9, §15), but within a
narrowed range, intensity and emotional significance hold or increase — consistent with
socioemotional selectivity (§15). $w_i(t)$ proves the most durable component in the system,
outlasting much of the machinery that produced it.

**The claim this yields.** "Does taste change with age?" has four correct answers, and which one is
right depends entirely on which variable is measured:

- **Emotional weighting ($w$)**: set in the formation window and effectively permanent. *No, it does
  not change.*
- **Content ($C$)**: drifts slowly and directionally across adulthood. *Yes, gradually.*
- **Breadth ($B$)**: non-monotonic — wide, then narrow, then partially wide, then narrow. *Yes, and
  not in one direction.*
- **Discovery rate ($D$)**: declines sharply and stays down, on a life-stage rather than an age
  schedule. *Yes, sharply, and age is the wrong predictor.*

The popular claims that "people's taste changes as they age" and "taste is set for life once formed"
are therefore not competing hypotheses. They are answers to different questions that happen to share
a noun.

---

## 18. Proposed empirical extension: a protocol

Everything above is synthesis. This section specifies the study that would test it. Earlier versions
listed the empirical extension as blocked on data access; that blocker is largely removed, and what
follows is written at the level of detail a pre-registration would need, so that the paper commits to
falsifiable predictions rather than gesturing at future work.

### 18.1 Data

**Primary: LFM-2b.** A public research dataset of Last.fm listening events (Schedl et al., HCIR/CHIIR
2022) containing:

- **~2 billion listening events** from **over 120,000 users**,
- spanning **February 2005 to March 2020** (>15 years — long enough for genuine within-person
  longitudinal analysis, which is what this literature most lacks),
- covering ~50 million distinct tracks by ~5 million artists,
- with **user demographics including age, gender, and country**, and item-level genre/style
  annotations plus lyric embeddings.

LFM-2b is the reason the §18 study is now executable rather than aspirational. It is the only widely
available corpus that carries **age labels**, **per-event timestamps**, and **a time span long enough
to observe the same listener aging**. Prior work has already used it for age-related preference
analysis (the UMAP 2025 study, §5.2), which both demonstrates feasibility and supplies a baseline to
replicate against.

**Supplementary sources.**

- **Release-year metadata** (MusicBrainz / Discogs) to compute sonic age, since LFM-2b's own release
  metadata is incomplete.
- **The Music Listening Histories Dataset** (Vigliensoni & Fujinaga) as a robustness check on a
  different user population.
- **Volunteer-donated Spotify Extended Streaming History exports**, with consent, as a small
  streaming-era-native validation sample — Last.fm's user base skews toward engaged,
  self-tracking listeners and toward the pre-streaming-native cohorts, which is this design's most
  serious external-validity threat (§18.6).

### 18.2 Operational definitions

Every construct in §3 must be computable from event logs. Proposed operationalizations, stated so
they can be criticized:

| Construct | Measure |
|---|---|
| $C_i(a)$ — content centroid | Mean position of a listener's play-weighted tracks in an embedding space; either the MUSIC dimensions approximated by mapping genre tags onto the five factors, or a learned audio/tag embedding with the MUSIC dimensions projected in. Computed per listener per 6-month window. |
| $B_i(a)$ — breadth | Shannon entropy of the play distribution over (a) genres, (b) artists, (c) release decades, computed per window. Reported separately at all three scales, per §16.2's finding that diversity metrics disagree across scales. |
| $E_i(a)$ — engagement | Events per active week; number of distinct listening sessions; session-length distribution. |
| $D_i(a)$ — discovery rate | Share of plays in window $t$ by artists the listener has no prior plays of, at a 12-month lookback. Reported in two variants: **new-to-listener** (any release year) and **new-to-world** (released within 24 months), per §5.3. |
| $w_i(t)$ — era weight | Distribution of plays over the sonic age of played tracks, normalized against a catalog-availability baseline so that the measure reflects listener choice rather than what exists. |
| Formation window | Ages 13–24, with peak location estimated per listener rather than assumed. |

**The availability normalization in the $w$ row is not optional.** Any raw sonic-age distribution is
dominated by the fact that far more music exists from recent decades and that platform catalogs
under-represent older material. Failing to normalize would manufacture a recency bias and could
easily produce a spurious bump wherever catalog density happens to peak.

### 18.3 Hypotheses

Stated with the prediction that would falsify each.

**H1 — Within-person content drift.** $C_i(a)$ drifts within individuals over the observation window
in the direction Bonneville-Roussy et al. report cross-sectionally (up Unpretentious/Sophisticated,
down Intense/Contemporary), and the within-person drift is smaller than the cross-sectional age
gradient. *This is the study's single most valuable result*, because it is the direct
cohort-vs-development test the entire field is missing (§7.3(i)). **Falsified if** within-person
centroids are stationary while cross-sectional gradients persist — which would mean the age trends in
§7 are cohort artifacts and §8's Axis 1 does not exist as a developmental phenomenon.

**H2 — Behavioral replication of the bump.** Availability-normalized $w_i(t)$ peaks when sonic age
corresponds to the listener's ages 13–24, with a men-earlier/women-later split (§4.2). Sub-parts:
**H2a** the peak is multi-modal, with a secondary mode at the parental formation window (§4.4, §10);
**H2b** the peak in *behavior* sits later than the ~17 self-reported meaningfulness peak, since
meaningfulness and habitual play are different constructs (§4.2); **H2c** peak location is
*independent* of the age at which the listener's heavy listening began — which distinguishes the
developmental account from the pure-exposure account (§4.3(d)). **Falsified for H2c if** listeners
who started logging heavily at 30 show a bump at 30.

**H3 — The gender convergence.** Women show both a later bump peak and a slower discovery decline
than men, in the same dataset, measured behaviorally. This unifies two findings currently held by
separate literatures using separate methods (§4.2, §5.1). **Falsified if** the two effects fail to
co-occur within listeners.

**H4 — Discovery decline is chart-following, not curiosity.** New-to-world discovery declines with
age substantially faster than new-to-listener discovery. **Falsified if** both decline at similar
rates — which would mean §5's decline is genuine closure rather than a measurement artifact of
popularity indexing, and would strengthen rather than weaken the standard reading.

**H5 — Social context predicts discovery better than age.** Using observable proxies for listening
context — session diversity, co-listening features where available, concert-attendance signals from
scrobble patterns, sharp discontinuities in listening volume as life-event proxies — life-stage
indicators outperform chronological age in predicting $D$. This is §6 and §10's unifying mechanism
stated as a test. **Falsified if** age alone dominates once these proxies are included.

**H6 — The streaming-native decoupling.** For cohorts whose formation window fell entirely within the
streaming era, $w_i$ remains peaked in *listener age* but flattens in *sonic age* — i.e., the bump
survives, but the music in it stops being contemporaneous with the window (§16.3). **Falsified if**
streaming-native cohorts show the same sonic-age concentration as earlier cohorts. Testable on
LFM-2b's later years, with acknowledged low power at the young end.

**H7 — Breadth is non-monotonic.** $B_i(a)$ shows the §9 pattern where the age range permits:
narrowing through early adolescence, partial rebound in the early 20s, renewed decline after. LFM-2b's
age coverage is thin at the youngest end, so this is a partial test at best. **Falsified if** breadth
declines monotonically across all observable ages.

**H8 — Sync and virality events as natural experiments.** Around a dated, exogenous catalog shock
(§14.3), adoption of the affected track declines with listener age even though exposure, access cost,
and the music itself are held constant across cohorts. This isolates age's moderation of
responsiveness to an equal-opportunity exposure event, which no cross-sectional preference measure
can do. **Falsified if** adoption is flat in age — which would mean the discovery decline is entirely
about *exposure opportunity* (§6, §10) rather than about any change in responsiveness to exposure,
and would be a strong result in its own right. Requires event-dated listening logs; feasible on
LFM-2b for pre-2020 events.

**H9 — The release-date null model, and its residuals.** The §14.5 derivation (core audience age
≈ (current year − peak year) + 15…24) predicts a substantial share of variance in observed
artist-level audience age. **Falsified if** it does not — which would put bump-anchoring's role in
population-level genre demographics in doubt. The more valuable output is the **residual**: artists
whose audience is systematically younger than derived should sort into the four §14.6 classes —
adult acquisition (jazz, classical), household cascade, continuous production, and exposure shocks.
Fitting the null model on LFM-2b and ranking artists by residual would identify cascade and
acquisition catalogs *empirically* rather than by the anecdote §14.6 relies on, and supplies a direct
test of §14.6(b)'s distinguishing prediction: residuals should track parental household penetration,
not critical canonicity. Appendix C proposes three audio-feature-measurable predictors of a positive
residual — **low entry cost, timbral era-neutrality, and fragment-robustness** — which would turn
"which old records find young audiences" into a forecastable quantity. **H9b:** the residual is
predictable from audio features alone.

### 18.4 Analysis strategy

- **Within-person longitudinal models** (mixed-effects with random slopes per listener) as the
  primary design for H1, H4, H5, H7 — this is what distinguishes the study from the cross-sectional
  work it seeks to adjudicate.
- **Age–period–cohort decomposition** for H1 and H6, with explicit acknowledgment that APC models are
  not identified without constraints; the constraint chosen must be stated and results reported
  under multiple constraint choices rather than one.
- **Availability-normalized era models** for H2, fitting a mixture rather than a single peak (§4.4).
- **Pre-registration before analysis**, with the hypothesis set above frozen and any additional
  analyses reported as exploratory. Given the dataset's size, effectively any effect will be
  "significant"; the report should lead with effect sizes and uncertainty intervals and should
  pre-commit to a smallest effect size of interest for each hypothesis.

### 18.5 Confounds requiring explicit handling

1. **Selection into the platform.** Last.fm users self-select for engaged, self-documenting listening
   and skew male, Western, and online — §11's warning that breadth is stratified by education and
   class applies directly. Age effects and selection effects are entangled at the platform level and
   cannot be fully separated within the dataset.
2. **Attrition.** Users who stop scrobbling leave the panel non-randomly, and the plausible reason for
   leaving — declining engagement — is one of the dependent variables. Requires explicit
   survivorship modeling; naive within-person trends will be biased toward listeners whose engagement
   did *not* decline.
3. **Catalog and metadata availability** over time and by era, per §18.2.
4. **Algorithmic sourcing.** LFM-2b events do not reliably indicate whether a play was
   algorithmically recommended, so §16.2's confound cannot be controlled directly — only bounded by
   comparing platforms and eras.
5. **Scrobbling artifacts.** Duplicate scrobbles, offline sync bursts, non-human clients, and
   partial plays all distort volume and discovery measures; a documented cleaning protocol must be
   published with results.
6. **Age self-report.** LFM-2b's age field is user-entered and includes implausible values; prior work
   filters to plausible ranges, and the filter itself is a selection step that should be reported.

### 18.6 Scope, ethics, and what this cannot answer

The dataset is public and released for research use, but it comprises real listening histories, and
listening history is sensitive — it can reveal religion, sexuality, mental-health state, and
language community. Requirements: use under the dataset's stated license and terms; no
re-identification attempts; no linkage to external identity data; report only aggregate results; and
for any volunteer-donated exports, informed consent covering secondary use and a right of withdrawal.

**What the study cannot answer**, and should not be presented as answering: it observes behavior, not
preference — a play is not a liking judgment; it cannot measure emotional significance, which is the
construct the bump literature actually cares about, only its behavioral shadow; it has no personality
measures, so §7's between-person openness account is untestable on this data and would need a
separate consented survey linkage; and its population is non-representative in ways (§18.5(1)) that no
statistical adjustment fully repairs. It is a strong test of the *timing* claims and a weak test of
the *content* claims.

---

## 19. Limitations

Organized by what each limitation threatens, and stated at the strength the evidence warrants.

### 19.1 Threats to the conclusions as stated

- **The cohort-versus-development confound is unresolved, and it is load-bearing.** §7's content
  drift, §9's breadth trajectory, and much of §14 rest on cross-sectional data. If the observed age
  gradients are generational rather than developmental, §8's Axis 1 does not exist as described and
  §17's Phase 4 is a description of a particular generation rather than of aging. This is the single
  largest open question in the paper and the reason H1 leads §18.
- **Correlation, not mechanism.** §17's five-phase arc is a plausible synthesis, not an independently
  tested causal model. The strongest evidence that age is a proxy rather than a cause remains the
  parenthood finding (§5.1) — one dataset, one analysis, not peer-reviewed, not replicated.
- **The mechanisms in §4.3 are underdetermined.** Four candidate explanations for the bump are
  presented as complementary. They are, as §4.3 concedes, at risk of being unfalsifiable in
  combination; the paper's response is to specify divergent predictions (§18, H2c), not to claim the
  question is settled.

### 19.2 Threats from the evidence base

- **Almost nothing here is longitudinal.** With the partial exception of the LFM-2b-based work
  (§5.2), the entire literature is cross-sectional. Bonneville-Roussy and colleagues say so
  themselves about their own results.
- **Tier dependence.** By §2.3's tiering: the bump (§4) and the age-trend/engagement findings (§6,
  §7) are Tier A and can carry weight. The discovery decline (§5) — the paper's whole timing axis —
  is Tier C, resting on a blog analysis and a preprint-stage conference paper. The genre table (§14)
  is Tier D throughout. **The framework's two halves are not equally supported**, and the more
  quotable half is the weaker one.
- **Single-source claims.** The gendered bump split (§4.2) and the personality/age dissociation
  (§7.2) each rest on one study. The parenthood effect rests on one analysis.
- **Construct mismatch across the synthesis.** The paper joins studies measuring self-reported
  liking, autobiographical-memory salience, rated personal meaningfulness, and logged play counts,
  and treats them as views of one system. §11 shows that at least one of these pairings (stated vs.
  revealed breadth) is known to diverge. Some of the framework's tidiness may be an artifact of
  reading four literatures as if they shared a dependent variable.

### 19.3 Threats to generality

- **Western sourcing, unevenly offset.** Per §12: reasonable cross-cultural support for the bump,
  partial and structure-dependent support for the MUSIC model, essentially none for the discovery
  decline. And every cross-cultural study cited tests reactions to *Western* music.
- **Platform sourcing.** All behavioral evidence comes from Spotify and Last.fm users, who are not
  a random sample of listeners, and whose behavior is shaped by the platforms measuring it (§16.2).
- **Streaming-era confound.** The discovery-behavior data predates streaming's maturity. Whether the
  ~33 stabilization point or the formation window itself holds for streaming-native cohorts is open
  (§16.3, H6).
- **Genre-label dependence.** Much of §7 and all of §14 depend on genre categories that are
  historically contingent, commercially defined, and unstable across markets and decades. "Rock"
  in 1975 and 2022 are not the same object, which puts a hard ceiling on the precision of any
  long-run era comparison.

### 19.4 Threats from how this review was conducted

- **Non-systematic search (§2.2).** No pre-registered protocol, no screening log, no
  inter-rater reliability, English-language sources only. Selection bias toward well-publicized
  findings — and toward findings with accessible secondary coverage — is likely and unquantified.
- **Publication bias.** Null results on age–preference relationships are unlikely to be published or
  covered, so a review assembled this way will over-represent clean effects.
- **Author-side interpretation.** The framework in §8 was constructed after reading the evidence
  rather than pre-specified, so its fit to that evidence is not itself confirmatory. §18 exists
  because that is the only real remedy.

---

## 20. Conclusion

Music taste changes with age, but not as one process, and the long-running argument about whether it
"changes" or is "set for life" persists mainly because the two sides are measuring different things.

Separating the variables resolves it. **Emotional weighting** — the premium attached to music from the
formation window, peaking around 16 for men and 19 for women — is laid down once and is effectively
permanent, outlasting most of the cognitive machinery that produced it. **Discovery rate** declines
sharply from the late 20s and stabilizes in the early-to-mid 30s, gated far more tightly by life
events than by birthdays, and plausibly by the thinning of the social contexts through which unchosen
music used to arrive rather than by any narrowing of the mind. **Content** drifts slowly across
adulthood, toward the unpretentious and the sophisticated and away from the intense and the
contemporary — a finding this version of the paper had to accommodate against its own earlier claim
that content was age-stable. And **breadth** moves in neither direction consistently: widest in early
childhood, cut sharply at the onset of peer-legible identity work, partially recovered in young
adulthood, narrowed again in later life.

The resulting picture is less romantic than "the songs of your youth stay with you," and more
specific. What stays is the *weighting*, not the repertoire. What narrows is the *rate of intake*,
not the capacity for it. What drifts is *where the taste sits*, slowly, along a path most listeners
walk in the same direction. And what closes the gate is mostly not age at all but the disappearance
of the rooms other people played music in.

Two things would move this from synthesis to knowledge. The first is the within-person test (§18,
H1): the field has enormous cross-sectional evidence for content drift and almost no evidence that
any individual person's taste actually drifts, and LFM-2b now makes that answerable. The second is
the streaming-native question (§16.3, H6): the cohorts whose formation window fell entirely inside
frictionless catalog access and algorithmic curation are only now old enough to measure, and if the
reminiscence bump has decoupled from release year for them, most of the instruments this literature
uses to detect it would not notice.

---

## Appendix A — Claim-to-evidence map

A compact audit of what supports what, for readers who want to check the load-bearing structure
without re-reading. Tiers per §2.3.

| # | Claim | Section | Tier | Primary support | Status |
|---|---|---|---|---|---|
| 1 | Preference/memory peaks for music from adolescence–mid-20s | §4.1 | A | Holbrook & Schindler 1989; Jakubowski et al. 2020 | Replicated across methods |
| 2 | Bump peak is gendered (M ~15.9, F ~19) | §4.2 | B | Burunat et al. 2025 | Single study, large & cross-national |
| 3 | Bump has cascading and recency modes | §4.4 | B | Krumhansl & Zupnick 2013; Burunat et al. 2025 | Consistent, not consolidated |
| 4 | Discovery declines through the 20s, stabilizes ~33 | §5.1 | C | Kalia 2015; corroborated on the age figure by statsignificant.com (Deezer ~31, Spotify ~33) | Not peer-reviewed; primary post now blocks automated retrieval (HTTP 403) |
| 5 | Post-40 listening reweights to sonic age 10–20y | §5.2 | C | *Soundtracks of Our Lives*, UMAP 2025 | Independent corroboration of #4's shape |
| 6 | Parenthood drops discovery independent of age | §5.1 | C | Kalia 2015 | Single analysis; load-bearing for the age-as-proxy claim |
| 7 | Engagement and music-importance decline with age | §6 | A | Bonneville-Roussy et al. 2013 (250k+) | Best-powered result in the review |
| 8 | Listening contexts privatize with age | §6 | A | Bonneville-Roussy et al. 2013 | Underexploited; drives §10's mechanism |
| 9 | MUSIC five-factor structure | §7.1 | A (West) / B (elsewhere) | Rentfrow & Gosling 2003; Rentfrow et al. 2012; Chee et al. 2024 | Partial replication in Malaysia |
| 10 | Openness predicts Sophisticated/Intense preference | §7.1 | A | Rentfrow & Gosling 2003 + successors | Between-person only |
| 11 | Content drifts with age (up U/Jazzy, down I/C) | §7.2 | A | Bonneville-Roussy et al. 2013, 2017, 2018 | Cross-sectional; cohort confound open |
| 12 | Personality loses predictive power vs. uses+age | §7.2 | B | Setti & Kahn 2024 | Single study; reinterpreted in v4.0 |
| 13 | Open-earedness high in childhood, drops ~10–11, rebounds, declines | §9 | B | Hargreaves 1982; Hargreaves & Bonneville-Roussy 2018; Louven 2016 | Construct validity disputed |
| 14 | Omnivorousness is status-stratified and period-unstable | §11 | B | Peterson 1992; de Vries & Reeves 2022; instability literature | Different discipline, different construct |
| 15 | Genre audiences skew by age as tabulated | §14 | D | Statista and Luminate figures via aggregators; fan surveys | Directional only; only the hip-hop row has been traced to its stated upstream source |
| 16 | SST predicts late-life narrowing with sustained intensity | §15 | B | Carstensen (SST); music emotion-regulation literature | Applied, not directly tested in music |
| 17 | Algorithmic listening reduces measured diversity | §16.2 | C | Anderson et al. 2020; cf. Sci. Rep. 2024 scale-effects | Contested; scale-dependent |
| 18 | LFM-2b enables the §18 study | §18.1 | — | Schedl et al. 2022 | Dataset property, verified |
| 19 | Decades-old catalog can acquire a mass young audience via a single sync/virality event | §14.3 | D | Kate Bush 2022; Metallica 2022; Fleetwood Mac 2020 (chart reporting) | Well documented; illustrative, not causal-inferential |
| 20 | Cross-generational style transfer can bypass the original recordings | §10 | D | Rodrigo/Paramore interpolation credit, 2021 | Single documented case |
| 21 | Hip-hop's over-55 share must rise as its first cohorts age | §14.4 | — | Prediction from claim #1 | **Untested forecast**, stated to be falsifiable |
| 22 | Core audience age is derivable from peak year alone | §14.5 | — | Derivation from claim #1 | **Null model**, not a measurement; H9 tests it |
| 23 | Pre-war classical and 1950s–60s jazz audiences cannot be bump-anchored | §14.6(a) | Derivation (not an empirical tier) | No living formation cohort | Strongest evidence for adult acquisition / content drift |
| 24 | Cascade catalogs track household penetration, not critical canonicity | §14.6(b) | — | Prediction | Untested; distinguishes cascade from quality |
| 25 | Attribute preference shifts with age across dynamics/pitch/structure/tempo/timbre | §14.7 | — | Attribute taxonomy from Bonneville-Roussy & Eerola 2018; values **inferred** | **Predicted profile, not a finding** — direct age×attribute evidence is thin |
| 26 | Attribute drift tracks privatization of listening context better than age | §14.7 | — | Prediction | Untested; follows from claim #8 |
| 27 | Records beating their derived cohort share low entry cost, timbral era-neutrality, fragment-robustness | App. C | — | Close reading of 12 tracks | Interpretive; measurable with audio features (H9) |
| 25 | Attribute profile shifts because listening's *function* moves from social display to private regulation | §14.7 | — | Inferred from §6 + §7.2 | **Predicted profile, not a finding**; testable via audio features |
| 26 | Sync-rejuvenation candidates are predictable from timbral era-neutrality | App. C | — | Close reading of 12 tracks | Untested; H9b |


---

## Appendix B — Artist directory: genre, dimension, and derived cohort age

A working reference for the artists named across §13–§14. **Peak year** is the approximate commercial
or cultural peak and is contestable in most rows. **Derived cohort (2026)** applies §14.5's null
model — `(2026 − peak) + 15…24` — and is a **model output, never a measurement**: it says where
bump-anchored listeners *should* be, so that departures (the **Dev.** column) are visible. **MUSIC**
gives the dimension the artist principally loads on (M = Mellow, U = Unpretentious, S = Sophisticated,
I = Intense, C = Contemporary; §7.1). Deviation classes per §14.6: **(a)** adult acquisition,
**(b)** household cascade, **(c)** continuous producer / stacked cohorts, **(d)** sync or virality
rejuvenation. A blank Dev. column means the null model is expected to fit.

| Artist | Genre | MUSIC | Peak | Derived cohort (2026) | Dev. |
|---|---|---|---|---|---|
| J.S. Bach, Mozart, Beethoven | Classical repertoire | S | pre-1830 | *no living cohort* | (a) |
| Duke Ellington, Billie Holiday | Big band, vocal jazz | S/M | ~1940 | 101–110 | (a) |
| Miles Davis (*Kind of Blue*) | Modal jazz | S | 1959 | 82–91 | (a) |
| John Coltrane | Modal / free jazz | S | ~1964 | 77–86 | (a) |
| Elvis Presley | Rock & roll | U/C | ~1957 | 84–93 | (b) |
| The Beatles | Pop/rock | C/U | ~1967 | 74–83 | (b) |
| The Beach Boys | Pop, art pop | M/U | ~1966 | 75–84 | (b) |
| Bob Dylan | Folk, folk rock | S/U | ~1966 | 75–84 | (a)(c) |
| Jimi Hendrix | Psychedelic rock | I | ~1968 | 73–82 | (b) |
| Led Zeppelin | Hard rock | I | ~1971 | 70–79 | (b) |
| King Crimson | Progressive rock | S/I | ~1972 | 69–78 | (a) |
| Grateful Dead | Psychedelic / jam | M/S | ~1972 | 69–78 | **(b)** |
| Yes, Genesis | Progressive rock | S | ~1973 | 68–77 | |
| Pink Floyd | Progressive rock | S/M | ~1973 | 68–77 | (b) |
| David Bowie | Art rock, glam | S/C | ~1973 | 68–77 | (b)(c) |
| Stevie Wonder | Soul, funk | U/S | ~1974 | 67–76 | (a) |
| Queen | Rock, arena pop | C/I | ~1976 | 65–74 | (b)(d) |
| ABBA | Pop | C/U | ~1976 | 65–74 | **(b)** |
| Fleetwood Mac | Soft rock | M/U | 1977 | 64–73 | **(b)(d)** |
| Bob Marley | Reggae | U/M | ~1977 | 64–73 | (b) |
| Dolly Parton | Country | U | ~1977 | 64–73 | (c) |
| Willie Nelson | Country, outlaw | U | ~1978 | 63–72 | (c) |
| Kraftwerk | Electronic | S/C | ~1978 | 63–72 | (a) |
| Joy Division / New Order | Post-punk, synth | I/C | ~1980 | 61–70 | (a) |
| Rush | Progressive rock | S/I | ~1981 | 60–69 | (b) |
| Michael Jackson | Pop, R&B | C | 1982 | 59–68 | (b) |
| The Cure | Post-punk, goth | M/I | ~1985 | 56–65 | (b) |
| Madonna | Pop | C | ~1985 | 56–65 | (c) |
| Kate Bush | Art pop | S/M | 1985 | 56–65 | **(d)** |
| Iron Maiden | Heavy metal | I | ~1984 | 57–66 | (c) |
| Prince | Funk, pop, rock | C/S | ~1984 | 57–66 | (b) |
| Run-DMC | Hip-hop | C/I | ~1986 | 55–64 | |
| Metallica | Thrash → metal | I | 1986–91 | 50–64 | **(c)(d)** |
| Public Enemy | Hip-hop | I/C | ~1988 | 53–62 | (a) |
| Guns N' Roses | Hard rock | I | ~1988 | 53–62 | |
| N.W.A | Hip-hop | I/C | ~1989 | 52–61 | |
| Depeche Mode | Synth-pop, electronic | C/I | ~1990 | 51–60 | |
| Nirvana | Grunge | I | 1991 | 50–59 | **(b)(d)** |
| A Tribe Called Quest | Hip-hop, jazz rap | S/C | ~1992 | 49–58 | (a) |
| Dr. Dre / Snoop Dogg | Hip-hop, G-funk | C | ~1993 | 48–57 | |
| Wu-Tang Clan | Hip-hop | I/C | 1993 | 48–57 | |
| Nas | Hip-hop | S/C | ~1994 | 47–56 | |
| Björk | Art pop, electronic | S | ~1995 | 46–55 | (a) |
| Blur | Britpop | C/S | ~1995 | 46–55 | |
| Oasis | Britpop | C/U | ~1995 | 46–55 | (d) |
| Pulp | Britpop | C/S | ~1995 | 46–55 | |
| Spice Girls | Pop | C | 1996 | 45–54 | (b) |
| Radiohead | Alt rock → art rock | S | ~1997 | 44–53 | (a)(c) |
| Dream Theater | Progressive metal | S/I | ~1992 | 49–58 | (c) |
| Blink-182 | Pop-punk | C/I | 1999 | 42–51 | **(b)** |
| Eminem | Hip-hop | I/C | ~2000 | 41–50 | |
| Linkin Park | Nu metal | I/C | ~2001 | 40–49 | (d) |
| Tool | Progressive metal | S/I | ~1998 | 43–52 | (a) |
| Slipknot | Nu metal | I | ~2001 | 40–49 | |
| Avril Lavigne | Pop-punk | C | 2002 | 39–48 | (b) |
| The Strokes | Garage rock revival | C/I | ~2002 | 39–48 | |
| Johnny Cash (*American* era) | Country, folk | U | 2002 | 39–48 | **(a)(b)** |
| Porcupine Tree | Progressive rock | S | ~2005 | 36–45 | (a) |
| Arctic Monkeys | Indie rock | C/I | 2006 | 35–44 | (c) |
| My Chemical Romance | Emo, pop-punk | I/C | 2006 | 35–44 | |
| Kanye West | Hip-hop | C/S | ~2007 | 34–43 | (c) |
| Paramore | Pop-punk, emo | C/I | 2007 | 34–43 | (b) |
| Amy Winehouse | Soul, jazz pop | U/S | ~2007 | 34–43 | (a) |
| Fall Out Boy | Pop-punk | C | ~2006 | 35–44 | |
| Taylor Swift | Country → pop | C/U | 2008– | *stacked, ~18–40* | **(c)** |
| Adele | Soul-pop | U/M | 2011 | 30–39 | |
| Daft Punk | Electronic | C/S | ~2013 | 28–37 | (b) |
| Kendrick Lamar | Hip-hop | S/I | ~2013 | 28–37 | (c) |
| Drake | Hip-hop, R&B | C | ~2015 | 26–35 | (c) |
| Lorde | Alt pop | M/C | ~2013 | 28–37 | |
| Bring Me the Horizon | Metalcore → alt | I/C | ~2013 | 28–37 | (c) |
| The Weeknd | R&B, synth-pop | M/C | ~2016 | 25–34 | (c) |
| Tyler, the Creator | Hip-hop, alt | S/C | ~2019 | 22–31 | |
| Ghost | Occult rock, metal | I/C | ~2018 | 23–32 | |
| BTS | K-pop | C | ~2018 | 23–32 | |
| Billie Eilish | Alt pop | M/C | 2019 | 22–31 | |
| Bad Bunny | Reggaeton, Latin trap | C | ~2021 | 20–29 | |
| Olivia Rodrigo | Pop, pop-punk revival | C/I | 2021 | 20–29 | |
| Polyphia | Instrumental prog | S | ~2022 | 19–28 | |
| Sabrina Carpenter | Pop | C | ~2024 | 17–26 | |
| Chappell Roan | Pop | C | ~2024 | 17–26 | |
| Sleep Token | Progressive metal, alt | I/S | ~2023 | 18–27 | |

**How to read the Dev. column.** Bold entries are the strongest violations. The pattern worth noting
is that deviations cluster at the **top** of the table (adult acquisition, since no formation cohort
survives) and at the **middle** (household cascade, since those are the records that were ambient in
1990s and 2000s childhoods) — while the bottom third has almost none, because those artists have not
existed long enough for any mechanism other than bump-anchoring to have operated on them yet. **The
deviation column is therefore partly a clock.** Rows added to the bottom of this table in 2050 will
have accumulated their own (b) and (d) marks.

---

## Appendix C — Song-level dissections

Twelve tracks, each chosen because a specific structural property explains its age behavior. This is
**analytic close reading, not measurement** (Tier D): the structural descriptions are conventional
and checkable by ear or score, but the inferences drawn from them are interpretive. Durations and
tempi are approximate and as commonly reported.

**1. Blink-182 — "All the Small Things" (1999).** *Pop-punk; C/I.* ~2:48, three chords, no
modulation, no key change, no bridge worth the name, a wordless "na-na" hook, lyrics comic and
literal. Every property is optimized for **low cost of entry**: nothing in it requires prior
listening experience to parse. That is exactly what §13's Phase 0–1 needs from a gateway record —
it can be adopted at nine without any of the cultural knowledge that adopting, say, Radiohead at
nine would demand. Gateway status is a structural property, not a marketing one.

**2. Oasis — "Wonderwall" (1995).** *Britpop; C/U.* Capo at the second fret, a four-chord loop
(Em7–G–Dsus4–A7sus4) that never resolves conventionally, mid-tempo, a chorus pitched in a range most
untrained voices can shout. Its enduring function is **communal**: it is a song built to be sung by a
room, which is precisely the Phase 2 requirement (§14.7 — the singalong chorus as the social unit).
Its persistence at parties and football grounds three decades on is bump-anchoring made audible: the
1995 cohort is now 46–55 and still supplies the room.

**3. Nirvana — "Smells Like Teen Spirit" (1991).** *Grunge; I.* Four power chords, loud–quiet–loud
dynamic architecture, lyrics semantically opaque to the point of being unquotable as argument. The
opacity is the point — it permits projection, which is what identity-declarative listening (§4.3b)
requires. **Its age behavior is anomalous and instructive**: derived cohort 50–59, yet it is
continuously re-adopted by successive teenage cohorts. It is a formation-window record that keeps
finding new formation windows, which is §14.6's cascade and §16.3's H6 in one track.

**4. Metallica — "Master of Puppets" (1986).** *Thrash metal; I with S.* ~8.5 minutes, multiple
tempo and feel changes, an extended clean-toned middle section with harmonized lead guitar, riff
material developed rather than repeated. Structurally it is **Intense on the surface and
Sophisticated underneath** — which is why it works as an §14.6(c)/(d) case: complex enough to reward
the adult listener who acquired it, immediate enough that a 2022 teenager who met it via *Stranger
Things* could take it on first contact.

**5. Tool — "Lateralus" (2001).** *Progressive metal; S/I.* ~9:24; the chorus vocal syllable counts
follow the Fibonacci sequence, and the metric cycle moves through 9/8, 8/8 and 7/8. This is a record
that is **not adoptable without prior listening capital** — it presupposes tolerance for long form,
odd meter, and delayed payoff. It is therefore almost never a gateway record and almost always an
acquisition, which places it precisely where §13 places it: the adult phase, reached by drift rather
than by formation.

**6. Porcupine Tree — "Arriving Somewhere But Not Here" (2005).** *Progressive rock; S.* ~12 minutes,
a slow-building first half, a heavy central section, ambient production. Its role in the framework is
as a **bridge**: it is legible to a listener whose formation window was alternative or metal, while
demanding the long-form attention that Phase 3–4 makes available (§14.7, Structure row). Records like
this are how the content centroid actually moves — not by abandoning the old region but by extending
from its edge.

**7. Kate Bush — "Running Up That Hill" (1985).** *Art pop; S/M.* Fairlight CMI-driven, built on a
repeating minor-mode ostinato with an unusually plain, insistent rhythmic bed under a wide vocal.
The structural reason its 2022 revival worked: the **production is timbrally non-period-specific**.
It does not sound like 1985 the way a gated-reverb rock record does, so a listener with no
1980s reference frame hears no era signal to reject. Compare a record whose timbre is a dated
identifier: those do not rejuvenate on sync. **Sync-rejuvenation candidates are predictable from
timbre**, which is a testable claim and, as far as this review found, an untested one.

**8. Fleetwood Mac — "Dreams" (1977).** *Soft rock; M/U.* Essentially two chords for its entire
length, over an unvarying drum groove — the harmonic interest is almost nil and the record works
entirely on feel, timbre, and vocal. Its 2020 TikTok revival is coherent with this: a track that is
**structurally indifferent to where you enter it** survives being encountered as a 15-second
fragment. Highly sectional music does not clip well; loop-based music does. That is a structural
prediction about which catalog rejuvenates in a short-video era.

**9. Miles Davis — "So What" (1959).** *Modal jazz; S.* 32-bar AABA, built on D Dorian with the
bridge lifted a semitone to E♭ Dorian; harmonic motion is nearly absent by design. Its audience is
the paper's cleanest §14.6(a) case: the derived cohort is **82–91**, so essentially every listener
under 75 acquired it in adulthood. It also illustrates *why* such acquisition happens late — modal
improvisation offers little to a listener without the harmonic vocabulary to hear what is being
withheld. **Sophisticated-dimension material has a prerequisite structure**, and prerequisites take
time to accumulate.

**10. Johnny Cash — "Hurt" (2002, orig. Nine Inch Nails, 1994).** *Country/folk reading of industrial
rock; U over I.* The same lyrics and chord sequence, restaged with acoustic guitar, piano, and a
73-year-old voice. This is a **cascade running backwards**: rather than a young artist interpolating
parental-era material (§10), an older artist recontextualized a record from the formation window of
listeners then aged 23–32, and in doing so recruited that cohort to a catalog whose derived cohort
was decades older. It is the clearest single demonstration that the Unpretentious dimension's
age-rise (§7.2) can be *accelerated by repertoire choice* rather than waited out.

**11. Paramore — "Misery Business" (2007) → Olivia Rodrigo — "good 4 u" (2021).** *Pop-punk; C/I.*
Same energetic register, same declarative first-person lyric mode, same chorus architecture, 14 years
apart — with the resemblance formally acknowledged via retroactive co-writing credit (§10). The pair
is the framework's cascade documented on both ends: a record from one cohort's formation window
supplying the template for the next one's, **without the younger audience necessarily encountering
the original at all.** Any measure of cross-generational influence based on release-year listening
distributions would miss this entirely.

**12. ABBA — "Dancing Queen" (1976).** *Pop; C/U.* Dense multi-tracked vocal harmony, unambiguous
major-key tonality, a descending piano figure as signature hook, lyric addressed to a
seventeen-year-old. Derived cohort 65–74, yet it has one of the widest age spreads of any record in
this appendix. §14.6(b)'s distinguishing test is visible here: ABBA carries little critical
canonicity and enormous **household penetration**, and it is the second that predicts cascade. A
record played at weddings is a record encoded during the open-eared period (§9) by every child in
the room.

**What the twelve have in common.** Three structural properties recur in every track that beats its
derived cohort age: **low entry cost** (adoptable without prior listening capital), **timbral
era-neutrality** (no dated production signal to reject), and **fragment-robustness** (survives being
met out of context). None of the three is about quality, and all three are measurable with existing
audio-feature tooling. That is a concrete addition to §18: **the residual in H9 should be predictable
from audio features**, and if it is, "which old records will find young audiences" becomes a
forecastable quantity rather than a retrospective anecdote.


---

## References

### Reminiscence bump and autobiographical memory

- Holbrook, M. B., & Schindler, R. M. (1989). Some exploratory findings on the development of musical
  tastes. *Journal of Consumer Research*, 16(1), 119–124.
- Jakubowski, K., Eerola, T., Tillmann, B., Perrin, F., & Heine, L. (2020). A cross-sectional study of
  reminiscence bumps for music-related memories in adulthood. *Music & Science*, 3.
  https://journals.sagepub.com/doi/10.1177/2059204320965058
- Burunat, I., Mavrolampados, A., Duman, D., Köhler, F., Saarikallio, S. H., Luck, G., & Toiviainen,
  P. (2025). Memory bumps across the lifespan in personally meaningful music. *Memory*. (~2,000
  participants, 84 countries; aggregate peak ~17; men ~15.9, women ~19 with stronger recency effect.)
  https://www.tandfonline.com/doi/full/10.1080/09658211.2025.2557960 ·
  press coverage: https://www.jyu.fi/en/news/global-study-shows-why-the-songs-from-our-teens-leave-a-lasting-mark-on-us
- Kudaravalli, R., Kathios, N., Loui, P., & Davidow, J. Y. (2024). Revisiting the musical reminiscence
  bump: insights from neurocognitive and social brain development in adolescence. *Frontiers in
  Psychology*, 15:1472767.
  https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1472767/full
- Krumhansl, C. L., & Zupnick, J. A. (2013). Cascading reminiscence bumps in popular music.
  *Psychological Science*, 24(10), 2057–2068. — cross-generational (parental-era) secondary peak.
- Martínez-Saez, M. C., Ros, L., López-Cano, M., Nieto, M., Navarro, B., & Latorre, J. M. (2024).
  Effect of popular songs from the reminiscence bump as autobiographical memory cues in aging: A
  preliminary study using EEG. *Frontiers in Neuroscience*, 17, 1300751.
  https://doi.org/10.3389/fnins.2023.1300751 — n=35, ages 61–73; preliminary.

### Discovery behavior and listening logs

- Kalia, A. (2015). Music was better back then: When do we stop keeping up with popular music?
  *Skynet & Ebert*.
  https://skynetandebert.com/2015/04/22/music-was-better-back-then-when-do-we-stop-keeping-up-with-popular-music/
  — Spotify/Echo Nest analysis; mid-30s stabilization, steeper decline for men, parenthood effect.
  Re-analysis: https://www.statsignificant.com/p/when-do-we-stop-finding-new-music
- Golubovikj, A. M., Ferwerda, B., Said, A., & Tkalcic, M. (2025). Soundtracks of our lives: How age
  influences musical preferences. *Adjunct Proceedings of the 33rd ACM Conference on User Modeling,
  Adaptation and Personalization (UMAP '25)*.
  https://dl.acm.org/doi/10.1145/3708319.3733673 · preprint: arXiv:2509.08337 — LFM-2b subset of
  42,883 users; introduces Song's Sonic Age; shift to SSA 10–20y after ~40.
- Schedl, M., Brandl, S., Lesota, O., Parada-Cabaleiro, E., Penz, D., & Rekabsaz, N. (2022). LFM-2b: A
  dataset of enriched music listening events for recommender systems research and fairness analysis.
  *Proceedings of CHIIR '22*. https://dl.acm.org/doi/10.1145/3498366.3505791 — ~2B events, 120k+
  users, 2005–2020, with age/gender/country.
- Schedl, M. (2016). The LFM-1b dataset for music retrieval and recommendation. *ICMR '16*.
  https://dl.acm.org/doi/10.1145/2911996.2912004
- Vigliensoni, G., & Fujinaga, I. (2017). The Music Listening Histories Dataset. *Proceedings of the
  18th International Society for Music Information Retrieval Conference (ISMIR 2017)*, Suzhou,
  96–102. https://archives.ismir.net/ismir2017/paper/000180.pdf

### Preference structure and personality

- Rentfrow, P. J., & Gosling, S. D. (2003). The do re mi's of everyday life: The structure and
  personality correlates of music preferences. *Journal of Personality and Social Psychology*, 84(6),
  1236–1256. https://gosling.psy.utexas.edu/wp-content/uploads/2014/09/JPSP03musicdimensions.pdf
- Rentfrow, P. J., Goldberg, L. R., & Levitin, D. J. (2011). The structure of musical preferences: A
  five-factor model. *Journal of Personality and Social Psychology*, 100(6), 1139–1157.
- Rentfrow, P. J., Goldberg, L. R., Stillwell, D. J., Kosinski, M., Gosling, S. D., & Levitin, D. J.
  (2012). The song remains the same: A replication and extension of the MUSIC model. *Music
  Perception*, 30(2), 161–185.
  https://projects.ori.org/lrg/PDFs_papers/RentfrowEtal2012MUSICReplicationMP.pdf
- Setti, F., & Kahn, J. H. (2024). Evaluating how facets of openness to experience predict music
  preference. *Musicae Scientiae*. https://journals.sagepub.com/doi/10.1177/10298649231174751
- Greenberg, D. M., et al. (2022). Universals and variations in musical preferences: A study of
  preferential reactions to Western music in 53 countries. *Journal of Personality and Social
  Psychology*. https://gwern.net/doc/psychology/personality/2022-greenberg.pdf
- Chee, Z. J., Leung, Y., & de Vries, M. (2024). Replication of the music preference (MUSIC) model and
  evaluation of its association with personality and autistic traits. *Musicae Scientiae*, 28(1),
  76–92. https://journals.sagepub.com/doi/10.1177/10298649231167488 — Malaysian sample (n=444);
  partial replication, Sophisticated and Intense factors virtually identical.

### Age trends, engagement, and development

- Bonneville-Roussy, A., Rentfrow, P. J., Xu, M. K., & Potter, J. (2013). Music through the ages:
  Trends in musical engagement and preferences from adolescence through middle adulthood. *Journal of
  Personality and Social Psychology*, 105(4), 703–717. https://pubmed.ncbi.nlm.nih.gov/23895269/ —
  >250,000 respondents; engagement and music-importance decline with age; listening privatizes.
- Bonneville-Roussy, A., Stillwell, D., Kosinski, M., & Rust, J. (2017). Age trends in musical
  preferences in adulthood: 1. Conceptualization and empirical investigation. *Musicae Scientiae*,
  21(4). https://journals.sagepub.com/doi/abs/10.1177/1029864917691571 — upward (Jazzy/Unpretentious),
  stable (Classical), downward (Contemporary/Intense) trends; the MPAM model.
- Bonneville-Roussy, A., & Rust, J. (2018). Age trends in musical preferences in adulthood: 2. Sources
  of social influences as determinants of preferences. *Musicae Scientiae*, 22(2).
  https://journals.sagepub.com/doi/10.1177/1029864917704016
- Bonneville-Roussy, A., & Eerola, T. (2018). Age trends in musical preferences in adulthood: 3.
  Perceived musical attributes as intrinsic determinants of preferences. *Musicae Scientiae*, 22(3),
  394–414. https://journals.sagepub.com/doi/10.1177/1029864917718606 — N=481 rating 51 audio clips
  and attributes across dynamics, pitch, structure, tempo and timbre, with MIR features extracted;
  supplies the attribute taxonomy used in §14.7 (the phase-by-phase values there are inferred, not
  taken from this paper).
- Hargreaves, D. J. (1982). The development of aesthetic reactions to music. *Psychology of Music*,
  Special Issue, 51-54. — the original "open-earedness" hypothesis.
- Hargreaves, D. J., & Bonneville-Roussy, A. (2018). What is 'open-earedness', and how can it be
  measured? *Musicae Scientiae*, 22(2). https://journals.sagepub.com/doi/10.1177/1029864917697783
- Louven, C. (2016). Hargreaves' "open-earedness": A critical discussion and new approach on the
  concept of musical tolerance and curiosity. *Musicae Scientiae*, 20(2).
  https://journals.sagepub.com/doi/abs/10.1177/1029864916633264

### Later life and motivation

- Carstensen, L. L., Isaacowitz, D. M., & Charles, S. T. (1999). Taking time seriously: A theory of
  socioemotional selectivity. *American Psychologist*, 54(3), 165–181.
  https://doi.org/10.1037/0003-066X.54.3.165
- Groarke, J. M., & Hogan, M. J. (2019). Listening to self-chosen music regulates induced negative
  affect for both younger and older adults. *PLOS ONE*, 14(6), e0218017.
  https://doi.org/10.1371/journal.pone.0218017
- Vieillard, S., Pinabiaux, C., & Bigand, E. (2020). Positive and detached reappraisal of threatening
  music in younger and older adults. *Frontiers in Human Neuroscience*, 14, 216.
  https://doi.org/10.3389/fnhum.2020.00216

### Cultural stratification

- Peterson, R. A. (1992). Understanding audience segmentation: From elite and mass to omnivore and
  univore. *Poetics*, 21(4), 243–258.
- de Vries, R., & Reeves, A. (2022). What does it mean to be a cultural omnivore? Conflicting visions
  of omnivorousness in empirical research. *Sociological Research Online*.
  https://journals.sagepub.com/doi/10.1177/13607804211006109
- Rossman, G., & Peterson, R. A. (2015). The instability of omnivorous cultural taste over time.
  *Poetics*, 52, 139–153. https://www.sciencedirect.com/science/article/abs/pii/S0304422X15000418
- Nault, J.-F., Baumann, S., Childress, C., & Rawlings, C. M. (2021). The social positions of taste
  between and within music genres: From omnivore to snob. *European Journal of Cultural Studies*,
  24(3), 717-740.
  https://journals.sagepub.com/doi/full/10.1177/13675494211006090
- The effects of class, age, gender and race on musical preferences: An examination of the
  omnivore/univore framework.
  https://vtechworks.lib.vt.edu/items/b0da3993-9aa7-422d-9eee-04b0aff7753f

### Platforms and algorithmic curation

- Anderson, A., Maystre, L., Mehrotra, R., Anderson, I., & Lalmas, M. (2020). Algorithmic effects on
  the diversity of consumption on Spotify. *Proceedings of The Web Conference 2020*.
  https://dl.acm.org/doi/10.1145/3366423.3380281
- Reframing the filter bubble through diverse scale effects in online music consumption (2025).
  *Scientific Reports*, 15, 4071. https://www.nature.com/articles/s41598-024-75967-0 — ~50,000 Deezer
  users; accepted October 2024, published 2025.
- Against filter bubbles: Diversified music recommendation via weighted hypergraph embedding
  learning. arXiv:2402.16299. https://arxiv.org/html/2402.16299v1

### Artist-level cases and catalog shocks (§10, §14.2–§14.4 — Tier D: chart and press reporting)

- Kate Bush, "Running Up That Hill" reaching UK No. 1 in 2022, 37 years after release, after
  *Stranger Things* season 4: Official Charts Company,
  https://www.officialcharts.com/chart-news/kate-bushs-running-up-that-hill-is-official-charts-number-1-single-singer-becomes-3-x-official-charts-record-breaker-with-stranger-things-success__36605/
  · NME, https://www.nme.com/news/music/kate-bush-reaches-number-one-with-running-up-that-hill-37-years-after-release-3250046
  · streaming-increase figures via CNN, https://www.cnn.com/2022/06/23/media/stranger-things-4-netflix-kate-bush
- Metallica, "Master of Puppets" entering the *Billboard* Hot 100 for the first time in 2022 (No. 40,
  ~17.5M weekly US streams, ~650% streaming increase): Variety,
  https://variety.com/2022/music/news/metallica-master-of-puppets-streaming-stranger-things-bump-1235312316/
  · Billboard, https://www.billboard.com/music/chart-beat/metallica-master-of-puppets-stranger-things-five-burning-questions-1235113442/
- Fleetwood Mac, "Dreams" returning to the Hot 100 top 40 in 2020 after a viral TikTok video (re-entry
  at No. 21, peak No. 12; best streaming week ever): Billboard,
  https://www.billboard.com/pro/fleetwood-mac-dreams-viral-tiktok-moment/ · Official Charts,
  https://www.officialcharts.com/chart-news/fleetwood-mac-s-dreams-re-enters-the-top-40-after-viral-tiktok-video__31257/
- Olivia Rodrigo, "good 4 u": retroactive co-writing credit to Hayley Williams and Josh Farro of
  Paramore ("Misery Business", 2007), combined 50% royalty share, treated as an interpolation:
  Variety, https://variety.com/2021/music/news/olivia-rodrigo-paramore-good-4-u-misery-business-1235048791/
  · triple j, https://www.abc.net.au/triplej/news/olivia-rodrigo-good-4-u-writing-credits-paramore-misery-business/13515004
- *When We Were Young* festival (Las Vegas, 2022), emo/pop-punk nostalgia bill headlined by My
  Chemical Romance, Paramore and Avril Lavigne, expanded from one date to three on demand:
  Consequence, https://consequence.net/2022/01/when-we-were-young-festival-2022-lineup/ · NME,
  https://www.nme.com/news/music/when-we-were-young-festival-2022-check-out-the-set-times-3331173

### Genre and artist age demographics (§14 — Tier D, see the caveat closing §14)

- Hip-hop/rap age skew (favorite-genre shares by age bracket, attributed on the page to Statista,
  undated), via headphonesaddict.com:
  https://headphonesaddict.com/rap-and-hip-hop-statistics/
- Rock/country/classical age breakdowns via gitnux.org: https://gitnux.org/music-genre-statistics/
  and https://headphonesaddict.com/music-genre-statistics/
- Progressive rock 2016 vs. 2020 age-demographic comparison: Defector Music (2020).
  https://defectormusic.wordpress.com/2020/04/13/progressive-rock-demographics-2020/
- Pop-punk / Warped Tour audience-age framing: Miami New Times.
  https://www.miaminewtimes.com/music/blink-182-and-gen-z-fans-20244443/
