# L2 Writing AI Sandbox 📚🔬

An advanced, full-stack Conversational AI research sandbox designed to investigate how second language (L2) and bilingual academic writers interact with Large Language Models (LLMs) under different scaffolding, formatting, and prompt-controlled conditions.

This platform bridges the gap between academic writing instruction and empirical SLA (Second Language Acquisition) research. It enables researchers to customize, run, and analyze writing experiments while providing students with a structured, stress-free writing assistant.

---

## 🌟 Core System Architecture

The sandbox uses a robust, lightweight full-stack design that operates in real-time. It features decoupled dual interfaces: one for students engaging in the writing tasks and another authenticated portal for researchers tracking educational telemetry.

```
                  +--------------------------------+
                  |       Student Interface        |
                  |  - Writing environment         |
                  |  - AI feedback chat (modular)  |
                  |  - Anxiety & efficacy trackers|
                  +---------------+----------------+
                                  |
                                  | REST / SSE APIs (Auto-save)
                                  v
                  +--------------------------------+
                  |    Express Backend (server.ts) |
                  |  - Unified LLM API Gateway     |
                  |  - Local File DB Persistence   |
                  |  - Audit Log & Metrics Service |
                  +---------------+----------------+
                                  |
                                  | Authorized Admin Access
                                  v
                  +--------------------------------+
                  |      Researcher Dashboard      |
                  |  - Live experiment design      |
                  |  - High-precision Analytics    |
                  |  - Data Exporter (CSV & JSON)  |
                  +--------------------------------+
```

---

## 🎨 Dual-Interface Experience Guide

### 1. Student Workspace
A three-pane workspace (task · essay · AI partner) that collapses to tabs on small screens:
- **Writing canvas**: Prose is set in a serif at a constrained measure, with a live word-count meter driven by the experiment's own `wordGoalMin` / `wordGoalMax`. A **focus mode** hides both side panels for distraction-free drafting.
- **Affective check-ins**: Anxiety and self-efficacy are collected on labelled 1–10 scales with verbal anchors, presented as a **modal dialog** so they are reachable at every viewport width. The pre-task and post-submission measures are required; mid-task ones are skippable.
- **Draft persistence**: A single debounced autosave writes 5 seconds after typing stops. The header shows the true save state (`Unsaved changes` / `Saving` / `Saved HH:MM` / `Save failed`), `Ctrl`/`Cmd`+`S` saves on demand, and closing the tab with unsaved work prompts a warning.
- **Session recovery**: Entering a previously issued participant code restores that participant's most recent unfinished draft and chat history.
- **AI partner**: Multi-line composer (`Enter` sends, `Shift`+`Enter` newlines), four scaffolding shortcuts, Markdown-rendered feedback, and explicit retry when a message fails to send.
- **Typing telemetry**: Typing state is synced to the researcher monitor on a 3-second idle timer.
- **Countdown timer**: Colour-shifts as time runs low and ends the task with a dialog rather than a blocking `alert()`.

### 2. Researcher Console
Gated by a passcode that is enforced **server-side** — every route below returns `401` without a valid session token:
- **Experiment builder**: Create, **edit**, duplicate and activate conditions. Exposes the full generation parameter set (temperature, top-p, presence/frequency penalties, max tokens) plus time limit and essay word goals. Deleting the live condition, or one with recorded sessions, requires explicit confirmation.
- **Live monitor**: Polls every 10 seconds (toggleable) so typing state and word counts update without manual refresh. The session table is sortable on every numeric column and shows relative start times.
- **Analytics**: Anxiety vs. self-efficacy by check-in order, model distribution, and daily recruitment volume. **No placeholder data** — an empty study renders as an explicit empty state, and each check-in point reports the `n` behind its average.
- **Session inspector**: Full behavioural timeline, every self-report, the draft or final submission, and the complete chat transcript, with a one-click plain-text report.
- **Export suite**: Sessions CSV, messages CSV, self-reports CSV, and a nested JSON corpus.

---

## 🔧 Unified LLM Integration Gateway

The back-end includes a streamlined, high-performance API Dispatcher (`server.ts`) supporting several top generative AI models simultaneously. This interface enables real-time interaction through:

1. **Google Gemini (Native SDK)**: Complete integration using `@google/genai` to operate models like `gemini-2.5-flash` or `gemini-2.5-pro` with system instructions, safety features, and dynamic generation settings. Supports `GEMINI_API_KEY`.
2. **OpenAI Compatibility (REST API)**: Leverages state-of-the-art models (`gpt-4o`, `gpt-4o-mini`) directly over standard authorization request tunnels. Supports `OPENAI_API_KEY`.
3. **Anthropic Claude Suite**: Built-in support for Claude models (e.g., `claude-3-5-sonnet`) with standard system header formatting. Supports `ANTHROPIC_API_KEY`.
4. **DeepSeek API Gateway**: Run cost-effective coding and conversational inference using structured deepseek protocols. Supports `DEEPSEEK_API_KEY`.
5. **Groq Acceleration Network**: Accelerate student interactions with blazing fast open-weights pipelines including modern models: `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `llama-4-scout-17b-16e-instruct`, and `gemma2-9b-it`. Supports `GROQ_API_KEY`.
6. **Smart Local Sandbox Emulation**: If API credentials aren't provided globally or locally, the workspace runs a clever pedagogical simulator mimicking typical generative formats, enabling quick local testing and evaluation.

---

## 🗄️ Database Schema & File Blueprint

All sandbox data are persistently maintained in JSON matrices inside the `/data` folder. These files capture granular interactions:

### 1. Experiments Database (`/data/experiments.json`)
```json
{
  "id": "exp_abc123",
  "name": "Bilingual Grammar Scaffolding Study",
  "writingTask": "Write a 500-word response analyzing the impact of global trade...",
  "systemPrompt": "You are a friendly writing peer. Scaffolding is key—use leading questions...",
  "aiModel": "gemini-2.5-flash",
  "feedbackStyle": "Encouraging & Scaffolding",
  "timeLimit": 30,
  "temperature": 0.7,
  "maxTokens": 1000,
  "topP": 0.95,
  "presencePenalty": 0.0,
  "frequencyPenalty": 0.0,
  "wordGoalMin": 200,
  "wordGoalMax": 300,
  "isActive": true,
  "createdAt": "2026-06-18T09:12:00Z"
}
```

### 2. User Sessions Database (`/data/sessions.json`)
Monitors overall pacing, word densities, revisions, and the participant's affective state tracking:
```json
{
  "id": "S-5829",
  "participantId": "P-9021",
  "experimentId": "exp_abc123",
  "experimentName": "Bilingual Grammar Scaffolding Study",
  "aiModelUsed": "gemini-2.5-flash",
  "startTime": "2026-06-18T09:20:00Z",
  "endTime": "2026-06-18T09:50:00Z",
  "durationMs": 1800000,
  "wordCount": 427,
  "charCount": 2341,
  "messageCount": 14,
  "revisionsCount": 7,
  "writingData": {
    "initialDraft": "I think that global trade has positive side...",
    "revisions": [
      "I think that global trade has positive sides...",
      "I believe global trade yields various benefits..."
    ],
    "finalSubmission": "I believe global trade yields various benefits across different cultural zones...",
    "lastSavedAt": "2026-06-18T09:48:00Z",
    "isFinalized": true
  },
  "selfReports": [
    { "timestamp": "2026-06-18T09:20:05Z", "anxiety": 7, "selfEfficacy": 3, "context": "startup" },
    { "timestamp": "2026-06-18T09:35:00Z", "anxiety": 5, "selfEfficacy": 5, "context": "mid-chat" },
    { "timestamp": "2026-06-18T09:49:00Z", "anxiety": 3, "selfEfficacy": 8, "context": "on-submit" }
  ],
  "timeline": [
    { "timestamp": "2026-06-18T09:20:00Z", "type": "metrics_reported", "description": "Participant initiated session workspace" },
    { "timestamp": "2026-06-18T09:25:00Z", "type": "draft_autosaved", "description": "Incremental auto-save", "meta": { "wordCount": 150 } }
  ],
  "isCompleted": true
}
```

---

## 🚀 Quickstart & Development Installation

To get the program running locally for writing research, simply fulfill the following commands:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Secrets
Create a `.env` configuration file in the project's root folder and append appropriate keys (see `.env.example` as a template):
```env
PORT=3000
# Required before any real data collection. Leaving this unset keeps the
# development default (researcher123) active.
RESEARCHER_PASSCODE=choose_a_strong_passcode
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Launch Development Instance
Starts both the Express API container and Vite server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 4. Direct Build & Production Deployment
```bash
npm run build
npm run start
```

---

## 🔒 Security & Access Guards

- **Server-enforced console access**: Signing in issues a short-lived bearer token held in server memory. Every researcher endpoint — session listings, analytics, provider keys, and all four exports — requires it. Without a valid token they return `401`.
- **Passcode configuration**: Set `RESEARCHER_PASSCODE` to control access. When it is set, the development default (`researcher123`) stops working, and the sign-in screen's passcode hint disappears. **Set it before collecting real participant data.**
- **Submission locking**: Once a participant submits, the session is finalised — the server rejects further draft writes for that session.
- **API key isolation**: Provider keys are stored server-side and returned to the console masked. They are never sent to participant browsers, and submitting a blank key leaves the stored one untouched.

> **Note on deployment**: the JSON file store is single-process and has no locking, which is fine for pilot-scale studies on a single instance. Move to a real database before running concurrent participants across multiple instances.

---

## 📊 Analytics Post-Processing (For R & Python Data Scientists)

The tabular **CSV** export yields perfect structural coordinates for standard behavioral testing packages:

### SPSS / Jamovi Parsing Check
To calculate user motivation gains, track the differences between the startup check-in metrics and the final checks:
```r
# Typical R snippet to parse anxiety reductions across experiment groups:
df <- read.csv("l2_writing_anxiety_data.csv")
t.test(df$Avg.Anxiety ~ df$Experiment)
```

For heavy text-processing pipelines, downloading the **JSON** dump is highly recommended. It provides complete, nested message histories, including student prompts and AI responses, ready to be analyzed with NLP frameworks like `nltk`, `spaCy`, or token metrics analyzers.

---

*Academic writing studies represent a vital frontier. This workspace is built to make conversational data extraction scientific, accessible, and structured.* ✍️🔬
