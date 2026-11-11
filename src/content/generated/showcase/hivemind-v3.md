# ⊞ HIVEMIND: Cybernetic Multi-Agent Swarm Orchestration

Hivemind is an advanced, high-tech cognitive orchestration platform that coordinates a collective intelligence of specialized sub-agents. It breaks down complex user objectives, facilitates deep collaborative board discussions, dynamically assigns specialized AI models based on task efficiency, and executes multi-stage development workflows with real-time visual telemetry.

---

## 🌌 System Philosophy: Swarm Intelligence

Traditional AI interactions are limited to single-agent, single-turn prompts. Hivemind introduces a **decentralized, role-specialized steering board** that acts as a cognitive amplifier:
- **Task Decomposition**: The AI Director breaks down objectives into modular subtasks.
- **Collaborative Deliberation**: Specialized roles (Product Directors, Tech Leads, Security Specialists) deliberate, propose, and refine ideas before any execution begins.
- **Model Efficiency Matching**: Higher-reasoning models are recruited for architecture and coding, while high-velocity utility models handle validation, documentation, and automated test coverage.

---

## 🛠️ Key Architectural Pillars

### 1. Swarm Specialization Matrix
Hivemind supports dynamic provisioning of roles across multiple domain expertise:
* **Architect**: Blueprints, system topologies, and logical designs.
* **Strategist**: Decides strategic milestones and aligns the board's scope.
* **Researcher**: Fact-checks libraries, API behaviors, and technology dependencies.
* **Coder**: Generates clean, robust, syntax-perfect source code.
* **QA Engineer**: Synthesizes deep unit test suites and validates behaviors.
* **Security Specialist**: Runs robust validation audits, defuses edge cases, and sanitizes variables.
* **UX Specialist**: Fine-tunes aesthetic layout rhythm, visual hierarchy, and interaction flow.
* **Database Admin**: Designs schema normalization structures and relational indexing.

### 2. Live Specialization Override
Users can hot-reload the swarm composition at any stage of the process:
- Toggle core modules or add custom-defined active subnets.
- Re-route workload vectors to different specializations instantly.

### 3. D3 Real-Time Workload Matrix (`TaskRadialProgress`)
Using **D3.js**, Hivemind includes an elegant radial progress and workload allocation analyzer:
- **Outer Ring Progress**: A glowing neon cyan arc indicating overall task completion status.
- **Inner Donut Chart**: Colors represent active roles and show exactly how tasks are divided across the swarm.
- **Concentric Tick Marks**: High-tech vector indicators providing precise status feedback.
- **Interactive States**: Hover transitions for agent data investigation.

### 4. Swarm Recruitment Blueprint (`BoardMeetingSummary`)
A visual high-tech dashboard displaying optimal model allocations for each active agent:
- **Performance Indexing**: Highlights Reasoning Power vs. Velocity ratings per role.
- **Contextual Justification**: Shows why a model was matched (e.g., GPT-4o for system planning vs. Gemini Flash for concurrent QA testing).
- **Binding Safeguards**: Ensures real-time tasks lock onto the most efficient active sub-agent.

### 5. High-Reliability Agent Communication
Hivemind ensures zero-deadlock workflows using advanced recovery mechanics:
- **Dynamic Token Budgeting**: When hitting credit or token allocation exceptions (e.g., restricted OpenRouter token affordances), the system extracts the current affordance limit from the error response, scales the `max_tokens` safely (at 95%), and automatically retries the inference.
- **Active Model Fallback Loops**: If a primary assigned model fails to respond due to credits, rate limits, or connectivity issues, the execution chain cascades down a pre-registered array of backup models to keep communication uninterrupted.
- **Robust Schema Healing**: If an agent produces non-JSON content under JSON instruction constraints, a fallback parser wraps the response seamlessly to prevent pipeline breaks.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React icons.
- **Data Visualizations**: D3.js (v7) custom SVG radial rendering.
- **Backend Server**: Node.js Express, TypeScript, Server-Sent Events (SSE) telemetry.
- **Core AI Integration**: `@google/genai` (Google Gemini SDK) with automatic Interactions API and standard generation fallbacks.

---

## 🚀 Quick Start & Deployment

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   npm install
   ```

2. Set up your environment variables by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your standard Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Launch the development cluster:
   ```bash
   npm run dev
   ```
   The development server will mount on port `3000` with hot-reloading active.

### Production Compiles
To bundle both the frontend static build and compile the server.ts backend into a highly optimized, cold-start resistant file:
```bash
npm run build
```
Launch the compiled service in standalone mode:
```bash
npm run start
```

---

## 🗂️ Project Directory Structure

```text
├── server.ts                       # Backend orchestration server, SSE logic, & AI agent loops
├── package.json                    # Workspace dependencies and script configurations
├── tsconfig.json                   # TypeScript project rules and path mapping
├── src/
│   ├── main.tsx                    # React client entry point
│   ├── App.tsx                     # Main layout & router
│   ├── types.ts                    # Shared domain type definitions
│   ├── index.css                   # Tailwind CSS global configurations & font setups
│   └── components/
│       ├── TaskRadialProgress.tsx  # Dynamic D3.js circular progress & workload visualizer
│       ├── BoardMeetingSummary.tsx # Swarm model recruitment blueprint & capability indicators
│       ├── BoardMeetingRoom.tsx    # Live steering board dialogue interface & role toggling
│       ├── AgentDiscussion.tsx     # Real-time sub-agent execution chat feed
│       ├── TaskNode.tsx            # Visual graph representation of subtask deliverables
│       ├── NewWorkflowForm.tsx     # Custom swarm initialization portal
│       └── ExecutionLogs.tsx       # Live diagnostic telemetry log
```

---

## 📡 Live Telemetry & Server-Sent Events (SSE)

Hivemind avoids slow HTTP polling by running a permanent Server-Sent Events telemetry link:
1. Whenever the steering board speaks or a task transitions state, the backend raises a workflow state update.
2. Clients instantly receive the structured payload via `/api/workflows/:id/events`.
3. The React UI updates the D3 concentric charts and logs in real-time, resulting in an immersive, high-fidelity experience.
