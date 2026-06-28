# Lesson Author — Review

Version: 2.0.0

---

# Purpose

This document defines the mandatory Version 2.0 five-stage self-review process for the Lesson Author.

Before saving any generated lesson into `output/generated/` and completing execution, the Lesson Author must rigorously evaluate its work against every review stage, paying specific attention to educational quality, difficulty progression, and capability statement verification.

No lesson is considered complete until all review stages have successfully passed.

---

# Review Stage 1 — Structural Validation

Verify:

* All 21 required sections exist in the exact order specified by `TEMPLATE_LESSON.md`.
* File naming matches the assigned lesson ID (e.g., `module-01/lesson-01.md`).
* Markdown formatting is syntactically valid (proper headers, closed code blocks, valid tables).
* Section hierarchy is clear and consistent.
* Horizontal rules (`---`) cleanly separate major sections.

Result:

Pass / Fail

---

# Review Stage 2 — Standards Compliance

Verify compliance with:

* `COURSE_SPEC.md`
* `COURSE_PRINCIPLES.md`
* `LEARNING_OBJECTIVES.md`
* `STYLE_GUIDE.md`
* `AGENT_RULES.md`
* `REVIEW_CHECKLIST.md`

If standards conflict or mandatory sections are omitted:

Stop execution and report the failure.

Do not make unsupported assumptions.

Result:

Pass / Fail

---

# Review Stage 3 — Technical Accuracy

Verify that:

* All theoretical explanations reflect precise, verified engineering concepts.
* CLI commands, flags, and configuration snippets are syntactically correct and functional.
* Diagrams (Mermaid/ASCII) accurately depict architectural flows and system mechanics.
* Code examples strictly follow the Input → Code → Expected Output → Explanation pattern.
* Troubleshooting workflows strictly follow Problem → Cause → Diagnosis → Solution.

Result:

Pass / Fail

---

# Review Stage 4 — Educational Quality & Progression (v2.0 Focus)

Verify that:

* **Appropriate Level:** The lesson strictly adheres to the active Difficulty Progression Model (e.g., `MOD-LINUX-BEG` contains 100% Beginner / 0% Intermediate / 0% Advanced internals).
* **Capability Verification:** The lesson explicitly weaves in and directly fulfills the active **Capability Statement** from `curriculum.md` in the Lesson Overview and Learning Objectives.
* **Zero Assumed Knowledge:** The lesson assumes *only* knowledge explicitly taught in preceding lessons. Terminal symbols (`$!`, `&`, `2>&1`) are clearly explained.
* **Deferred Complexity:** Advanced production internals or complex edge cases are appropriately deferred and signposted to future modules.
* **Instructor Tone:** The writing reads like an inspiring, world-class technical instructor (clear, patient, empathetic, encouraging) rather than dense internal engineering documentation.
* **Intuition First:** The six core questions (What, Why, When, How, Production, Advanced Signposting) are fully answered. The learner is guaranteed to feel confident and motivated.

Result:

Pass / Fail

---

# Review Stage 5 — AI & Downstream Readiness

Verify that:

* Standalone labs, portfolio projects, quizzes, and cheat sheets are correctly summarized and referenced without generating duplicate downstream content within the lesson.
* No raw placeholder comments (`<!-- ... -->`) remain unpopulated in the final output.
* The lesson markdown is structured cleanly for automated parsing, linting, and static website generation.

Result:

Pass / Fail

---

# Validation Checklist

Before final approval, confirm:

* Every mandatory section from `TEMPLATE_LESSON.md` is present.
* Explanations build intuition and motivation before showing syntax.
* Tone is encouraging, clear, and bootcamp-instructor modeled.
* Difficulty progression rules and Capability Statements are perfectly enforced.
* Formatting is flawless Markdown.
* All code blocks include expected outputs and clear explanations.
* Downstream files are correctly referenced.
* No unverified assumptions remain.

---

# Failure Conditions

Reject the lesson if:

* Any of the 21 required sections are missing or out of order.
* Advanced production internals appear prematurely in beginner modules (violating progression rules).
* The active Capability Statement is missing or unsupported.
* The tone feels like dense internal documentation or assumes excessive prior knowledge.
* Commands contain fabricated flags or syntax errors.
* Placeholder comments remain in the text.
* Standalone lab or project content is improperly generated inside the lesson body.
* Project standards are violated.

Lessons failing any stage must be immediately revised before approval.

---

# Approval Criteria

Approve only if all five review stages pass perfectly.

The generated lesson must be:

* Complete
* Technically accurate
* Deeply educational and intuitive
* Progression compliant
* Production oriented
* AI-ready
* Structurally compliant

---

# Review Report

Every Lesson Author execution must conclude with a review summary appended to the output containing:

## Review Status

* Pass
* Pass with Recommendations
* Fail

## Findings

List any structural, technical, or educational checks verified during review (highlighting v2.0 learner confidence metrics and Capability Statement alignment).

## Recommendations

Suggest optional enhancements for downstream lab, project, or quiz agents.

## Final Decision

Approve or Reject.

---

# Guiding Principle

A lesson is considered complete only when it stands as a world-class, deeply empowering educational artifact that builds absolute learner confidence and provides a seamless, intuitive bridge toward professional engineering mastery.