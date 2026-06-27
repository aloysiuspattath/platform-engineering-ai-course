# Lesson Author — Review

Version: 1.0.0

---

# Purpose

This document defines the mandatory five-stage self-review process for the Lesson Author.

Before saving any generated lesson into `output/generated/` and completing execution, the Lesson Author must rigorously evaluate its work against every review stage.

No lesson is considered complete until all review stages have successfully passed.

---

# Review Stage 1 — Structural Validation

Verify:

* All 21 required sections exist in the exact order specified by `TEMPLATE_LESSON.md`.
* File naming matches the assigned lesson ID (e.g., `MOD-LINUX-01.md`).
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
* CLI commands, flags, and configuration snippets are syntactically correct and production ready.
* Diagrams (Mermaid/ASCII) accurately depict architectural flows and system mechanics.
* Code examples strictly follow the Input → Code → Expected Output → Explanation pattern.
* Troubleshooting workflows strictly follow Problem → Cause → Diagnosis → Solution.

Result:

Pass / Fail

---

# Review Stage 4 — Educational Quality

Verify that:

* The tone embodies a senior engineer mentoring a junior colleague (friendly, direct, encouraging, precise).
* Content avoids marketing fluff, unnecessary jargon, and filler text.
* Core concepts are reinforced through practical, hands-on demonstrations.
* The lesson cultivates an engineering mindset by exploring trade-offs, common mistakes, and failure scenarios.
* Learning tracks (🟢 Core, 🔵 Professional, 🟣 Expert) are clearly delineated.

Result:

Pass / Fail

---

# Review Stage 5 — AI & Downstream Readiness

Verify that:

* Standalone labs, portfolio projects, quizzes, and cheat sheets are correctly referenced without generating duplicate downstream content within the lesson.
* No raw placeholder comments (`<!-- ... -->`) remain unpopulated in the final output.
* The lesson markdown is structured cleanly for automated parsing, linting, and static website generation.

Result:

Pass / Fail

---

# Validation Checklist

Before final approval, confirm:

* Every mandatory section from `TEMPLATE_LESSON.md` is present.
* Explanations are technically accurate and production focused.
* Tone is professional, concise, and mentoring.
* Formatting is flawless Markdown.
* All code blocks include expected outputs and explanations.
* Downstream files are correctly referenced.
* No unresolved assumptions remain.

---

# Failure Conditions

Reject the lesson if:

* Any of the 21 required sections are missing or out of order.
* Commands contain fabricated flags or syntax errors.
* Explanations are superficial, generic, or rely on marketing fluff.
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
* Educational and practical
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

List any structural, technical, or educational checks verified during review.

## Recommendations

Suggest optional enhancements for downstream lab, project, or quiz agents.

## Final Decision

Approve or Reject.

---

# Guiding Principle

A lesson is considered complete only when it can stand as a world-class, technically authoritative educational artifact that empowers learners to solve real-world engineering problems with confidence.

# Educational Review

Before approving a lesson verify:

- Does the lesson assume too much prior knowledge?
- Are concepts introduced before implementation?
- Is the difficulty appropriate for this module?
- Are advanced topics deferred appropriately?
- Can a motivated beginner complete this lesson confidently?
- Is technical depth proportional to the learner's current stage?