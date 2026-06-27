# Template Architect — Review

Version: 1.0.0

---

# Purpose

This document defines the self-review process for the Template Architect.

Before returning any generated template, the agent must perform all review stages.

Templates should never be returned without completing this review.

---

# Review Stage 1 — Structural Validation

Verify:

* All required sections exist.
* Section order is logical.
* Headings are consistent.
* Markdown formatting is valid.
* Metadata is complete.
* Placeholders are present where required.

Result

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

If conflicts exist:

Stop and report them.

Do not invent a solution.

Result

Pass / Fail

---

# Review Stage 3 — Maintainability Review

Verify that the template:

* Is reusable.
* Is technology-agnostic where appropriate.
* Avoids duplication.
* Uses consistent terminology.
* Supports future expansion.
* Is understandable without additional documentation.

Result

Pass / Fail

---

# Review Stage 4 — AI Generation Readiness

Verify that:

* Placeholders clearly instruct future AI agents.
* No educational content has been generated accidentally.
* The template is easy for both AI and humans to use.
* The template can support repeated generation without modification.

Result

Pass / Fail

---

# Validation Checklist

Before approval, confirm:

* All required sections are present.
* Formatting is consistent.
* Markdown is valid.
* Metadata is complete.
* Template purpose is clear.
* Version information exists.
* Placeholders are descriptive.
* No duplicate sections exist.
* No unsupported assumptions exist.

---

# Failure Conditions

Reject the template if:

* Required sections are missing.
* Project standards are violated.
* Placeholders are ambiguous.
* Formatting is inconsistent.
* Technology-specific assumptions reduce reusability.
* Educational content replaces template placeholders.

Templates that fail review must be revised before approval.

---

# Approval Criteria

Approve only if all review stages pass.

The generated template should be:

* Consistent
* Modular
* Maintainable
* AI-friendly
* Human-editable
* Standards-compliant

---

# Review Report

Every review should conclude with a summary containing:

## Review Status

* Pass
* Pass with Recommendations
* Fail

## Findings

List any issues identified.

## Recommendations

Suggest improvements separately from required changes.

## Final Decision

Approve or Reject.

---

# Guiding Principle

A template is considered complete only when it can be reused to generate hundreds of consistent, high-quality educational artifacts with minimal future modification.

