# Quiz Generator — Review (Self-Validation Process)

Version: 1.0.0

---

# Purpose

This document defines the mandatory internal self-validation process for the Quiz Generator.

Before saving any generated quiz into `output/generated/` and completing execution, the Quiz Generator must rigorously evaluate its own work against every review gate, paying specific attention to Bloom's Taxonomy balance, technical accuracy, elimination of ambiguous/trick phrasing, and exhaustive feedback depth.

No quiz is considered complete or valid until all self-validation review gates have successfully passed.

---

# Mandatory 7 Quality Gates

You must explicitly audit and verify your generated quiz markdown against the following seven foundational quality gates:

## Gate 1: Technical Accuracy
* **Check:** Are all CLI commands, terminal logs, configuration snippets, error codes, and answer key explanations 100% syntactically correct, modern, and technically verified?
* **Result:** Pass / Fail

## Gate 2: Educational Value
* **Check:** Does the quiz actively reinforce core mental models and operate as an empowering teaching instrument rather than a dry exam test? Does the Answer Key provide exhaustive explanations?
* **Result:** Pass / Fail

## Gate 3: Appropriate Difficulty
* **Check:** Are the questions perfectly aligned with the target module's established difficulty level? (e.g., zero advanced kernel internals in Module 01; zero simplistic true/false questions in Module 15).
* **Result:** Pass / Fail

## Gate 4: Balanced Bloom Distribution
* **Check:** Does the question batch achieve the required balance across Bloom's Taxonomy tiers (`20% Remember`, `30% Understand`, `25% Apply`, `20% Analyze`, `5% Evaluate / Design`)?
* **Result:** Pass / Fail

## Gate 5: No Ambiguous Questions
* **Check:** Is the phrasing of every question crystal clear? Are all subjective terms ("best", "better", "easiest") strictly anchored to explicit enterprise business constraints?
* **Result:** Pass / Fail

## Gate 6: No Trick Questions
* **Check:** Are all options fair, representative, and completely free of misleading syntax traps or microscopic typographic "gotchas"? Do incorrect options represent genuine engineering misconceptions?
* **Result:** Pass / Fail

## Gate 7: Production Relevance
* **Check:** Do the scenarios, log failures, and command interpretations reflect authentic, high-impact enterprise engineering work rather than artificial academic trivia?
* **Result:** Pass / Fail

---

# Structural & Feedback Verification

Verify that your generated quiz markdown contains all mandatory sections in the exact order specified by `task.md`:

1. `## Quiz Metadata` (Quiz ID, Associated Module/Lesson, Passing Score)
2. `## Section 1: Multiple Choice & Multiple Select Questions` (Remember, Understand, Apply tiers)
3. `## Section 2: Command Interpretation & Log Analysis` (Analyze tier)
4. `## Section 3: Scenario & Architectural Decisions` (Evaluate / Design tier)
5. `## Section 4: Short Answer & Reflection Questions`
6. `## Answer Key & Explanations` (Enclosed in `<details>` block with exhaustive feedback: Correct Answer, Detailed Explanation, Why Alternatives are Incorrect, Lesson Reference)

Verify that file naming matches the assigned quiz ID (e.g., `output/generated/quizzes/terraform-fundamentals-quiz.md`).

---

# Validation Checklist

Before finalizing your quiz markdown file, confirm:

* All mandatory sections exist in correct order.
* All seven quality gates (Technical Accuracy → Production Relevance) have successfully passed.
* Bloom's Taxonomy target distribution is achieved.
* Questions actively exercise log analysis, command interpretation, and architectural trade-offs.
* The Answer Key includes exhaustive explanations, debunks incorrect options point-by-point, and provides explicit lesson citations.
* Questions contain zero ambiguous wording or misleading trick phrasing.
* No unverified assumptions or raw placeholder comments remain.

---

# Failure Conditions

Reject and regenerate your own quiz markdown file if:

* Any mandatory sections are missing or out of order.
* Any of the seven quality gates fail.
* You included obscure historical trivia, raw release dates, or superficial true/false dumps.
* You failed to achieve the required Bloom's Taxonomy distribution tiers.
* You designed ambiguous questions or unfair typographic trick traps.
* Your Answer Key is superficial (e.g., listing simple letters without debunking incorrect options).

Quizzes failing any stage must be immediately revised internally before final delivery.

---

# Final Delivery & Handoff

Upon successful completion of all internal self-validation review gates:

1. Write the finalized quiz markdown file directly into `output/generated/`.
2. Update `.ai/project_state.yaml` to confirm quiz generation progress.
3. Hand off the generated quiz to the **Reviewer** AI agent for definitive educational and technical quality gate verification before official promotion to `quizzes/`.
