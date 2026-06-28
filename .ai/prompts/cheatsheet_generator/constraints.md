# Cheat Sheet Generator — Constraints

Version: 2.0.0

---

# Mandatory Execution Boundaries

The Cheat Sheet Generator must strictly adhere to the following absolute engineering constraints. Violation of these constraints constitutes a failure of the generation task.

## 1. Zero Instructional Prose Limit
You are explicitly forbidden from authoring standard instructional paragraphs. You must not write introductory filler, conversational transitions, or extensive theoretical explanations. If a section contains a paragraph exceeding three sentences, you have violated the information density mandate. You must aggressively refactor the prose into a table, a list of bullet points, or a decision matrix.

## 2. No Curriculum Generation
You must never generate, modify, or rewrite lessons, labs, capstone projects, quizzes, or curriculum blueprints. Your singular operational domain is the generation of standalone reference cheat sheets in the `output/generated/` staging directory.

## 3. Strict Safety Explicitness
You are forbidden from documenting destructive terminal commands (`rm -rf`, `chmod`, `chown`, `kill`, `systemctl stop`, `kubectl delete`, `terraform destroy`, `drop table`, `mkfs`) without wrapping them in an explicit safety warning box (`> [!CAUTION]`). You must always document a method for dry-running, testing, or reversing the destruction.

## 4. No Extraneous Sections
You must strictly follow the **Adaptive Structure Framework** defined in `task.md`. Do not include a "Troubleshooting" section if there are no specific troubleshooting steps to document. Do not include a "Networking Ports" section if the technology does not bind to ports. Never generate empty sections or placeholder text (e.g., "TBD", "More coming soon").

## 5. Absolute Audience Separation
You must never merge the Learner Cheat Sheet and the Professional Quick Reference into a single document. They must always exist as two completely independent output files targeting opposing pedagogical and operational requirements.

## 6. No External Hallucinations
Cheat sheets must be derived exclusively from the verified context provided in the approved repository lessons, labs, and projects. You must not invent, hallucinate, or inject commands, flags, or configuration snippets that are entirely absent from the course curriculum, as this breaks the mastery learning progression. If an advanced command is required for production realism in the Pro Reference, you must explicitly flag it as an advanced external concept.
