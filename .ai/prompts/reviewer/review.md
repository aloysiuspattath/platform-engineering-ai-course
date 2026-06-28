# Reviewer — Review (Self-Validation Process)

Version: 1.0.0

---

# Purpose

This document defines the mandatory five-stage internal self-validation process for the Reviewer.

Before saving any Review Report into `output/reviewed/` and completing execution, the Reviewer must rigorously evaluate its own report against every review stage, paying specific attention to structural completeness, categorical scoring rigor, educational empathy, and unambiguous promotion decisions.

No Review Report is considered complete or valid until all self-validation review stages have successfully passed.

---

# Review Stage 1 — Structural Report Validation

Verify that your generated Review Report contains all seven mandatory sections in the exact order specified by `task.md`:

1. `## 1. Executive Summary`
2. `## 2. Scores by Category` (With fully populated markdown table)
3. `## 3. Issues Found` (With specific line/section citations)
4. `## 4. Required Corrections` (Itemized list or explicit "None")
5. `## 5. Optional Improvements`
6. `## 6. Promotion Decision` (`PASS`, `PASS WITH RECOMMENDATIONS`, `REQUIRES REVISION`, or `REJECT`)
7. `## 7. Reviewer Confidence`

Verify that file naming follows the target artifact ID with a `-review.md` suffix.

Result:

Pass / Fail

---

# Review Stage 2 — 10 Review Categories Validation

Verify that your `Scores by Category` table explicitly evaluates, assigns a numerical score (1-10), and provides a clear, objective justification for every single one of the 10 core categories:

1. Technical Accuracy
2. Educational Quality
3. Difficulty Progression
4. Cognitive Load
5. Template Compliance
6. Production Relevance
7. Hands-on Quality
8. Writing Quality
9. Cross-Module Consistency
10. Repository Standards Compliance

Omission of any category instantly invalidates the review report.

Result:

Pass / Fail

---

# Review Stage 3 — Educational Rigor Validation

Verify that your evaluation rigorously enforced the course's foundational mastery learning principles:

* **Beginner Protection:** Confirm that you actively screened for and rejected content that overwhelms beginners with premature technical complexity, C-structs, or dense internal documentation prose in early modules.
* **Concept-before-Implementation:** Confirm that you verified mental models were established prior to CLI syntax.
* **Motivation before Implementation:** Confirm that you verified the *why* was clearly articulated before the *how*.
* **Appropriate Cognitive Load:** Confirm that you flagged excessive jargon thrashing or peripheral rabbit holes.
* **Learner Confidence:** Confirm that you verified the artifact maintains an encouraging, supportive, bootcamp-instructor tone.

Result:

Pass / Fail

---

# Review Stage 4 — Technical Rigor Validation

Verify that your technical evaluation thoroughly audited the target artifact for pristine engineering standards:

* **Command Correctness:** Confirm that you verified all CLI commands, flags, and scripts are syntactically valid and executable.
* **Modern Best Practices:** Confirm that you verified infrastructure code exhibits clean declarative patterns and idempotency safeguards.
* **No Deprecated Technologies:** Confirm that you verified the content relies entirely on modern, active enterprise tooling (rejecting legacy or sunset tools).
* **Realistic Production Guidance:** Confirm that you verified scalability metrics, circuit breakers, and high-availability topologies reflect real-world enterprise realities.
* **Accurate Security Guidance:** Confirm that you verified least-privilege IAM, non-root container security contexts, and strict governance rules are correctly enforced.

Result:

Pass / Fail

---

# Review Stage 5 — Promotion Decision & Pipeline Validation

Verify that your final Promotion Decision is definitive and strictly respects pipeline promotion rules:

* **Unambiguous Outcome:** Confirm that the decision is exactly one of `PASS`, `PASS WITH RECOMMENDATIONS`, `REQUIRES REVISION`, or `REJECT`.
* **Alignment with Scores:** Confirm that an artifact receiving `PASS` has high scores (typically 9-10) across all categories with zero required corrections.
* **Strict Promotion Blocking:** Confirm that any artifact receiving `REQUIRES REVISION` or `REJECT` has promotion strictly blocked, with a clear, actionable punch-list provided under `Required Corrections`.
* **No File Modification:** Confirm that you have written the review report to `output/reviewed/` as a standalone file without editing or modifying the target artifact directly.

Result:

Pass / Fail

---

# Validation Checklist

Before finalizing your Review Report, confirm:

* All seven mandatory report sections exist in correct order.
* All 10 review categories are explicitly scored and justified.
* Beginner protection and difficulty progression rules were strictly enforced.
* Technical commands, production realism, and security guidance were rigorously verified.
* Promotion decision is definitive and unambiguous.
* Target artifact remains untouched in its original directory.
* Review report is staged correctly in `output/reviewed/`.

---

# Failure Conditions

Reject and regenerate your own Review Report if:

* Any of the seven mandatory sections are missing or out of order.
* Any of the 10 review categories are un-scored or lack justification.
* You allowed premature technical complexity or dense jargon to slip through in beginner modules.
* You issued an ambiguous or non-standard promotion decision (e.g., `PROVISIONAL PASS`).
* You attempted to edit the target artifact directly.
* Your required corrections are vague or lack specific section/line citations.

Review Reports failing any stage must be immediately revised internally before final delivery.

---

# Final Report Delivery & Handoff

Upon successful completion of all five self-validation review stages:

1. Write the finalized Review Report directly into `output/reviewed/`.
2. If the decision is `PASS`, update `.ai/project_state.yaml` to confirm artifact promotion to `output/approved/`.
3. If the decision is `REQUIRES REVISION` or `REJECT`, transmit the required corrections back to the respective authoring agent (e.g., Lesson Author or Lab Designer) for immediate remediation.
