# Curriculum Architect — Review

Version: 1.0.0

---

# Purpose

This document defines the mandatory self-review process for the Curriculum Architect.

Before returning any generated curriculum artifact, the Curriculum Architect must complete every review stage.

No curriculum should be considered complete until all review stages have passed.

---

# Review Stage 1 — Structural Validation

Verify:

* All required curriculum files have been generated.
* File names are correct.
* Markdown formatting is valid.
* Section hierarchy is consistent.
* Metadata is complete.
* Cross-references between curriculum artifacts are consistent.

Result:

Pass / Fail

---

# Review Stage 2 — Standards Compliance

Verify compliance with:

* COURSE_SPEC.md
* COURSE_PRINCIPLES.md
* LEARNING_OBJECTIVES.md
* STYLE_GUIDE.md
* AGENT_RULES.md
* REVIEW_CHECKLIST.md
* COURSE_METADATA.yaml

If conflicts exist:

Stop execution and report the conflict.

Do not make unsupported assumptions.

Result:

Pass / Fail

---

# Review Stage 3 — Curriculum Quality

Verify that:

* Learning progression is logical.
* Prerequisites are complete.
* Dependencies are valid.
* Modules are properly sequenced.
* No duplicate topics exist.
* Every module contributes to the overall learning journey.

Result:

Pass / Fail

---

# Review Stage 4 — Career Alignment

Verify that the curriculum prepares learners for:

* Platform Engineering
* Cloud Infrastructure
* DevOps Engineering
* Site Reliability Engineering (SRE)
* AI Infrastructure Engineering

Ensure:

* Portfolio progression is meaningful.
* Skills are industry relevant.
* Milestones represent real professional growth.

Result:

Pass / Fail

---

# Review Stage 5 — Downstream Readiness

Verify that the generated curriculum can be consumed directly by:

* Lesson Author
* Lab Designer
* Project Designer
* Quiz Generator
* Reviewer

Each module should provide enough structure for downstream agents without requiring manual redesign.

Result:

Pass / Fail

---

# Validation Checklist

Before approval, confirm:

* Every required curriculum file exists.
* Learning order is complete.
* Dependencies are correct.
* Milestones are realistic.
* Skill progression is measurable.
* Competencies are observable.
* Capstone roadmap is achievable.
* Curriculum aligns with all project standards.
* Formatting is consistent.
* No unresolved assumptions remain.

---

# Failure Conditions

Reject the curriculum if:

* Required files are missing.
* Learning progression is inconsistent.
* Dependencies contain cycles.
* Important prerequisite knowledge is omitted.
* Curriculum does not support downstream lesson generation.
* Project standards are violated.

Rejected curriculum must be revised before approval.

---

# Approval Criteria

Approve only if all review stages pass.

The curriculum should be:

* Complete
* Technically accurate
* Career-focused
* Modular
* Production-oriented
* AI-ready
* Human-reviewable
* Maintainable

---

# Review Report

Every execution must conclude with a review summary containing:

## Review Status

* Pass
* Pass with Recommendations
* Fail

## Findings

List any issues identified during review.

## Recommendations

Separate optional improvements from required corrections.

## Final Decision

Approve or Reject.

---

# Guiding Principle

A curriculum is considered complete only when it provides a coherent, end-to-end learning journey that enables downstream AI agents to generate consistent, high-quality lessons, labs, projects, quizzes, and supporting materials without requiring structural changes.
