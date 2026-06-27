# Running AI Agents

## Purpose

This document explains how to execute AI agents within the Platform Engineering & AI Infrastructure Course repository using Google Antigravity.

---

# Prerequisites

* Repository is synced with GitHub.
* Repository is connected to Antigravity.
* All project standards are committed.
* The desired agent and prompt package exist.

---

# Execution Workflow

1. Open the project in Antigravity.
2. Start a new AI task.
3. Ensure the repository root is the working directory.
4. Ask the agent to execute using `.ai/bootstrap.yaml`.
5. Allow the agent to read the required project files.
6. Review the generated output.
7. Commit only approved changes.

---

# Standard Execution Prompt

Use this prompt when starting a new execution:

> Execute the active agent defined in `.ai/bootstrap.yaml`. Follow the configured load order, use the specified prompt modules, comply with all project standards, and generate only the requested outputs. Perform the defined review process before completing the task.

---

# Review Process

Every generated artifact must be reviewed before merging.

Check:

* Technical accuracy
* Standards compliance
* Formatting
* Completeness
* Reusability
* Maintainability

---

# Promotion Pipeline

Generated output:

output/generated/

↓

Technical Review

↓

output/reviewed/

↓

QA Approval

↓

output/approved/

↓

Final repository location

---

# Update Project State

After a successful execution:

* Update `.ai/project_state.yaml`
* Commit the generated artifacts
* Record any follow-up tasks
* Proceed to the next workflow stage
