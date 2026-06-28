# Project Designer — Review (Self-Validation Process)

Version: 1.0.0

---

# Purpose

This document defines the mandatory internal self-validation process for the Project Designer.

Before saving any generated project into `output/generated/` and completing execution, the Project Designer must rigorously evaluate its own work against every review gate, paying specific attention to architectural sophistication, production realism, zero-trust security enforcement, and portfolio presentation impact.

No project is considered complete or valid until all self-validation review gates have successfully passed.

---

# Mandatory 8 Quality Gates

You must explicitly audit and verify your generated project markdown against the following eight foundational quality gates:

## Gate 1: Technical Correctness
* **Check:** Are all architectural specifications, directory layouts, YAML manifests, Terraform modules, and automation scripts (`verify-project.sh`) 100% syntactically correct, modern, and executable?
* **Result:** Pass / Fail

## Gate 2: Educational Value
* **Check:** Does the project successfully synthesize and apply accumulated knowledge from approved lessons and completed labs? Does it build elite engineering intuition without feeling like a basic copy-paste tutorial?
* **Result:** Pass / Fail

## Gate 3: Portfolio Quality
* **Check:** Is the project structure, code formatting, and presentation visually impressive and suitable for inclusion in an elite GitHub repository and personal portfolio?
* **Result:** Pass / Fail

## Gate 4: Production Realism
* **Check:** Does the business scenario establish an authentic, high-stakes enterprise assignment? Do the project constraints mirror live production environments rather than dry academic puzzles?
* **Result:** Pass / Fail

## Gate 5: Architecture Quality
* **Check:** Are system topologies clean, decoupled, and beautifully visualized using valid, error-free Mermaid syntax? Are structural architectural trade-offs explicitly analyzed?
* **Result:** Pass / Fail

## Gate 6: Security
* **Check:** Are modern zero-trust security standards (least-privilege IAM, non-root execution `runAsNonRoot: true`, read-only root filesystems, secret isolation) actively enforced across all configuration manifests?
* **Result:** Pass / Fail

## Gate 7: Maintainability
* **Check:** Are code and configuration manifests highly modular, cleanly structured (`config/`, `scripts/`, `src/`, `tests/`), and easy to extend or automate?
* **Result:** Pass / Fail

## Gate 8: Documentation Quality
* **Check:** Are all explanations clear, inspiring, and formatted in flawless GitHub Flavored Markdown? Are portfolio presentation tips concrete and actionable?
* **Result:** Pass / Fail

---

# Structural Verification

Verify that your generated project markdown contains all 12 mandatory sections in the exact order specified by `task.md`:

1. `## 1. Business Scenario`
2. `## 2. Project Goals`
3. `## 3. Required Skills`
4. `## 4. Prerequisites`
5. `## 5. Architecture Overview` (With valid Mermaid system diagram)
6. `## 6. Deliverables`
7. `## 7. Implementation Plan` (Enforcing planning before implementation and trade-off analysis)
8. `## 8. Validation Criteria` (With definitive `Expected Output`)
9. `## 9. Troubleshooting Guidance`
10. `## 10. Stretch Goals`
11. `## 11. Reflection`
12. `## 12. Portfolio Presentation Tips` (Spanning GitHub, portfolio, blog, resume, and interviews)

Verify that file naming matches the assigned project ID (e.g., `output/generated/projects/production-k8s-platform.md`).

---

# Validation Checklist

Before finalizing your project markdown file, confirm:

* All 12 mandatory sections exist in correct order.
* All eight quality gates (Technical Correctness → Documentation Quality) have successfully passed.
* The business scenario establishes an authentic workplace assignment.
* The implementation plan incorporates initial architectural planning and structural trade-off analysis.
* Code manifests enforce least-privilege security and non-root execution.
* Validation criteria definitively prove project success with expected outputs.
* Portfolio presentation tips provide elite guidance for resumes and interviews.
* No unverified assumptions or raw placeholder comments remain.

---

# Failure Conditions

Reject and regenerate your own project markdown file if:

* Any of the 12 mandatory sections are missing or out of order.
* Any of the eight quality gates fail.
* You created a superficial, basic tutorial or simple copy-paste script.
* You omitted the Mermaid architecture diagram or generated invalid syntax.
* You skipped evaluating architectural trade-offs or security considerations.
* Your portfolio presentation tips are vague or superficial (e.g., "put this on GitHub").

Projects failing any stage must be immediately revised internally before final delivery.

---

# Final Delivery & Handoff

Upon successful completion of all internal self-validation review gates:

1. Write the finalized project markdown file directly into `output/generated/`.
2. Update `.ai/project_state.yaml` to confirm project generation progress.
3. Hand off the generated project to the **Reviewer** AI agent for definitive educational, technical, and portfolio quality gate verification before official promotion to `projects/`.
