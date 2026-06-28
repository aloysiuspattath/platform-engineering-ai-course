# Lab Designer — Review (Self-Validation Process)

Version: 1.0.0

---

# Purpose

This document defines the mandatory internal self-validation process for the Lab Designer.

Before saving any generated lab into `output/generated/` and completing execution, the Lab Designer must rigorously evaluate its own work against every review gate, paying specific attention to absolute system safety, technical reproducibility, progressive difficulty flow, and failure-driven learning depth.

No lab is considered complete or valid until all self-validation review gates have successfully passed.

---

# Mandatory 8 Quality Gates

You must explicitly audit and verify your generated lab markdown against the following eight foundational quality gates:

## Gate 1: Technical Accuracy
* **Check:** Are all CLI commands, flags, scripts, file paths, and expected outputs 100% syntactically correct, modern, and executable?
* **Result:** Pass / Fail

## Gate 2: Absolute Safety
* **Check:** Is the lab completely free of un-isolated destructive host commands (`rm -rf /*`, un-scoped formatting)? Are prominent, bold warnings displayed before any operation that alters system-wide host configurations or network routing tables?
* **Result:** Pass / Fail

## Gate 3: Educational Quality
* **Check:** Does the lab maintain an encouraging, clear, and professional mentorship tone that builds unshakeable learner confidence? Are command justifications (*What it does*, *Why it matters*, *What success looks like*) fully detailed in early stages?
* **Result:** Pass / Fail

## Gate 4: Beginner Friendliness
* **Check:** Are concepts introduced smoothly without jarring jargon spikes? Is prerequisite knowledge limited strictly to what was taught in the companion lesson and preceding modules?
* **Result:** Pass / Fail

## Gate 5: Production Realism
* **Check:** Does the business scenario establish an authentic junior Platform Engineer workplace simulation? Do the exercises reflect realistic, high-impact enterprise engineering work rather than dry academic puzzles?
* **Result:** Pass / Fail

## Gate 6: Successful Completion
* **Check:** Are the validation steps, verification commands, and expected outputs precise and unambiguous, definitively proving that the entire lab was completed successfully?
* **Result:** Pass / Fail

## Gate 7: Troubleshooting Quality
* **Check:** Does the failure-driven learning scenario intentionally introduce a realistic mistake, break down how to read the terminal error message, walk through the exact diagnostic verification, and execute a safe recovery workflow?
* **Result:** Pass / Fail

## Gate 8: Cleanup Completeness
* **Check:** Are the cleanup procedures non-destructive to the host machine? Do they cleanly and completely remove all temporary resources, containers, and user directories provisioned during the lab?
* **Result:** Pass / Fail

---

# Structural Verification

Verify that your generated lab markdown contains all 11 mandatory sections in the exact order specified by `task.md`:

1. `## 1. Business Scenario`
2. `## 2. Learning Objectives`
3. `## 3. Prerequisites`
4. `## 4. Environment Setup`
5. `## 5. Guided Exercises (With Progressive Difficulty)` (Enforcing Guided → Partially Guided → Independent → Production Challenge)
6. `## 6. Checkpoints`
7. `## 7. Validation`
8. `## 8. Troubleshooting (Failure-Driven Learning)`
9. `## 9. Reflection Questions`
10. `## 10. Cleanup`
11. `## 11. Stretch Goals`

Verify that file naming matches the assigned lab ID (e.g., `output/generated/labs/linux-getting-started.md`).

---

# Validation Checklist

Before finalizing your lab markdown file, confirm:

* All 11 mandatory sections exist in correct order.
* All eight quality gates (Technical Accuracy → Cleanup Completeness) have successfully passed.
* Commands include clear explanations of what they do, why they matter, and what success looks like.
* Progressive difficulty smoothly evolves from Guided to Production Challenge.
* An intentional failure-driven troubleshooting exercise is successfully integrated.
* Cleanup instructions cleanly restore the host environment without destructive side effects.
* No unverified assumptions or raw placeholder comments remain.

---

# Failure Conditions

Reject and regenerate your own lab markdown file if:

* Any of the 11 mandatory sections are missing or out of order.
* Any of the eight quality gates fail.
* You included un-isolated destructive commands on host filesystems (violating safety rules).
* You dumped walls of terminal commands without explaining what they do or why they matter.
* You omitted the intentional failure-driven troubleshooting exercise.
* Your cleanup instructions fail to remove provisioned resources or risk damaging host files.

Labs failing any stage must be immediately revised internally before final delivery.

---

# Final Delivery & Handoff

Upon successful completion of all internal self-validation review gates:

1. Write the finalized lab markdown file directly into `output/generated/`.
2. Update `.ai/project_state.yaml` to confirm lab generation progress.
3. Hand off the generated lab to the **Reviewer** AI agent for definitive educational and technical quality gate verification before official promotion to `labs/`.
