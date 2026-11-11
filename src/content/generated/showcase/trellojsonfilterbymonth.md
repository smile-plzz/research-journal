

# 🗂️ Trello JSON Date Filter

A **standalone, browser-based Trello JSON analyzer** that helps you filter cards, actions, and comments by a **single month** or a **custom date range** — no server required.
Upload your Trello board export, choose a month or date window, and instantly get:

* Filtered lists of cards or actions.
* Full comment details.
* Range-based summary reports.
* Interactive bar charts.
* One-click CSV and PDF exports.

All processing happens **locally in your browser** — no data ever leaves your computer.

---

## 🚀 Features

### 🔍 Core Filters

* **Cards** – Filter by creation date, due date, or last activity.
* **Actions** – Filter all activity, including comments, by month or custom range.
* **Comment Extraction** – Include comment text (`commentCard`) for qualitative analysis.
* **Time Range Modes** – Toggle between quick month/year selection and precise start/end dates.

### 📊 Reporting

* **Activity Report** (for Actions)

  * KPIs: total actions, comments, card creations, checklist ops, etc.
  * Summaries: actions by type, member, and day.
* **Charts**

  * Bar charts for **Actions by Type**, **Member**, and **Day**.
  * Adjustable top-member limit.
  * Download charts as PNGs.

### 📄 Exports

* **Filtered JSON** – Save filtered results.
* **CSV Reports**

  * All actions (with comment text)
  * Comments only
  * By type, member, or day
* **PDF Reports**

  * Combines KPIs, charts, and tables into a print-ready report.
  * Auto-opens “Save as PDF” dialog.

### 🧪 Built-in Self Tests

A “Run tests” button verifies core functionality:

* Date range validation
* Comment inclusion logic
* Fallback printing when pop-ups are blocked

---

## 🧩 How It Works

1. Export your Trello board:

   * Open your board → **Menu → More → Print and export → Export as JSON**
2. Open `index.html` in any modern browser.
3. Upload the JSON file or paste the contents.
4. Choose:

   * **Year and Month** or switch to a **Custom Date Range**
   * **Target:** Cards or Actions
   * **Date Field:** Created, Due, or Last Activity (for cards)
   * (Optional) Filter by action types or comments only.
5. Click **Filter**.
6. Preview, analyze, or download your results:

   * JSON, CSV, or full PDF report.

---

## 🧱 Technical Overview

### Frontend

* Pure **HTML + CSS + JavaScript** — no dependencies.
* Runs entirely offline (using the File API and Blob URLs).

### Architecture

| Component                 | Responsibility                                               |
| ------------------------- | ------------------------------------------------------------ |
| `getActiveRange()`        | Normalizes month vs. custom range selections                 |
| `filterCardsInRange()`    | Filters cards by date range and date field                   |
| `filterActionsInRange()`  | Filters actions by type and date                             |
| `buildReport()`           | Generates KPI counts and grouped summaries                   |
| `renderReport()`          | Renders tables and enables CSV exports                       |
| `drawBarChart()`          | SVG-based bar chart renderer (no libraries)                  |
| `generatePdf()`           | Creates a self-contained HTML report and triggers print/save |
| `runTests()`              | Built-in unit tests (runs in-browser)                        |

### Data Handling

* `monthRange(year, month)` returns UTC start/end boundaries plus a printable label.
* Custom ranges use `parseDateInput()` and UTC math to include the entire end date.
* Comment text lives in `action.data.text`.
* Dates are normalized with `Date.UTC()` for consistent filtering.

---

## 🧪 Running the App

Simply open `index.html` in your browser:

```bash
# No dependencies required
open index.html
```

If testing locally via file:// protocol throws CORS issues for chart downloads (rare on Chromium browsers), you can use a lightweight static server:

```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

---

## 🧠 Developer Notes

### Key Files

| File                   | Description                             |
| ---------------------- | --------------------------------------- |
| `index.html`           | Main application and all JS logic       |
| `README.md`            | This documentation                      |
| (optional) `style.css` | You can extract CSS for maintainability |

### Adding New Features

* To include new Trello action types, append to the `POP_TYPES` array.
* To add more KPIs or visualizations:

  * Extend `buildReport()` to count or group by new fields.
  * Add a new chart via `drawBarChart(svg, rows, labelKey, valueKey)`.

### Common Pitfalls

| Issue                                                 | Fix                                                                   |
| ----------------------------------------------------- | --------------------------------------------------------------------- |
| “Cannot read properties of null (reading 'document')” | Fixed by wrapping all code in `DOMContentLoaded`.                     |
| Pop-up blocker prevents PDF generation                | Falls back to iframe-based print method automatically.                |
| Large dataset slows preview                           | Disable “Preview all rows” toggle to limit preview to first 200 rows. |

---

## 📘 Test Cases

| Test                        | Description                                         |
| --------------------------- | --------------------------------------------------- |
| **monthRange()**            | Returns correct UTC start/end/label for given month |
| **createdFromId()**         | Extracts date from Trello card ID.                  |
| **filterActionsInRange()**  | Filters correctly by type and date.                 |
| **getActiveRange()**        | Validates custom start/end dates.                   |
| **generatePdf()**           | Falls back gracefully if pop-ups are blocked.       |

Run tests by clicking **Run tests** in the UI — results appear inline with ✅ / ❌ indicators.

---
# Trello Activity and Support Analyzer Specification

This notebook provides a comprehensive analysis of Trello activity, focusing on support interactions, issue resolution, and team productivity, with a particular emphasis on late-night activity and merchant go-lives.

## Input Data

The analyzer requires two JSON files exported from Trello:

1.  **Trello Actions JSON**: Contains a history of all actions performed on the Trello board (e.g., card movements, comments, attachments).
2.  **Trello Cards JSON**: Contains information about all cards on the Trello board (e.g., card name, list ID, creation date).

These files should be uploaded using the provided file upload interface in the notebook.

## Configuration

The analyzer can be configured using the following variables in the "Setup & Imports" cell:

-   `TZ`: The reporting timezone (e.g., "Asia/Dhaka").
-   `DONE_LIST_NAMES`: A set of case-insensitive list names that indicate a card is considered "done", "resolved", or "completed".
-   `GO_LIVE_SUBSTRING`: A substring used to identify lists that represent a "go-live" state for merchants (case-insensitive).
-   `ISSUE_REPORT_KEYWORDS`: A list of keywords used to identify comments that report an issue (case-insensitive).
-   `ISSUE_RESOLVE_KEYWORDS`: A list of keywords used to identify comments that resolve an issue (case-insensitive).
-   `OUT_DIR`: The directory where output files (Excel report, Markdown report, HTML report, charts) will be saved.

## Analysis

The analyzer performs the following analysis:

-   **Total Interactions:** Counts the total number of actions recorded in the Trello actions data.
-   **Late-night Interactions:** Identifies and counts actions that occurred during the configured late-night hours (20:00 to 06:00 in the specified timezone).
-   **Issues Reported:** Identifies comments containing keywords from `ISSUE_REPORT_KEYWORDS` as reported issues.
-   **Issues Resolved:** Identifies comments containing keywords from `ISSUE_RESOLVE_KEYWORDS` or cards moved to lists specified in `DONE_LIST_NAMES` as resolved issues.
-   **Resolution Rate:** Calculates the percentage of reported issues that were resolved.
-   **Merchants Gone Live:** Identifies unique cards that were moved to a list containing the `GO_LIVE_SUBSTRING`.
-   **Average and Median Resolution Time:** Calculates the average and median time taken to resolve issues, based on the timestamp of the first issue report and the first resolution action for each card.
-   **Total Cards Worked On:** Counts the number of unique cards that had any activity recorded.
-   **Total Comments and Updates:** Counts the total number of comment and update actions.
-   **Action Type Distribution:** Provides a count of each type of action.
-   **Member Contribution:** Shows the number of actions performed by each team member.
-   **Daily Activity Trends:** Generates time series data for total daily actions, daily reported vs. resolved issues, and daily late-night interactions.
-   **Post-Live Issues:** Identifies issues reported and resolved after a merchant's go-live date.

## Output

The analyzer generates the following outputs:

-   **Excel Report (.xlsx):** A comprehensive report containing various sheets with detailed data, including:
    -   Summary of key metrics.
    -   Daily actions.
    -   Daily reported vs. resolved issues.
    -   Resolution times per card.
    -   Late-night actions details.
    -   Live merchants and post-live issues.
    -   Raw reported and resolved issues data.
    -   Action type distribution.
    -   Member contribution.
-   **Markdown Report (.md):** A human-readable report summarizing the key findings, including executive summary, team activity overview, late-night analysis, issue lifecycle analysis, merchant go-live and post-live issues, key insights and recommendations, and an appendix with data references and logic.
-   **HTML Report (.html):** A simple HTML version of the Markdown report, embedding the generated charts.
-   **Charts (.png):** Several charts visualizing key trends:
    -   Daily actions overview.
    -   Reported vs. resolved issues per day.
    -   Resolution time distribution histogram.
    -   Late-night interactions per day.
    -   Late-night interactions by member (top 10).

All output files are saved to the directory specified by the `OUT_DIR` configuration variable.

## Dependencies

The analyzer requires the following Python libraries:

-   `pandas`
-   `openpyxl`
-   `xlsxwriter`
-   `pytz`
-   `matplotlib`

These dependencies are automatically installed during the setup phase of the notebook.

## Limitations

-   The accuracy of issue detection and resolution depends on the consistency of comment keywords and Trello list naming conventions.
-   The "change vs. August" metric in the executive summary requires a Trello actions file for August 2025 to be present in the same directory and follow the specified naming convention (`*action*2025-08*` or `*action*aug*`). If not found, this metric will be "N/A".
-   Resolution time is calculated based on the *first* reported and *first* resolved action for a given card. Subsequent reports or resolutions on the same card are not considered in this calculation.
---
https://colab.research.google.com/drive/16AnJEc4o19NtYHSLpmWVEcJs5-iAdgHk?usp=sharing
---

## 📄 License

MIT License.
You are free to modify, distribute, and embed this app in your Trello analytics workflows.

---

## 👨‍💻 Author & Contributions

Created by **[Ismail Hossain]** – DevsNest Workspace
For issues, contributions, or enhancements:

* PRs and feedback welcome
* Built for real-world Trello reporting and automation needs


