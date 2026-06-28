# Cheat Sheet Generator — Task

Version: 2.0.0

---

# Objective

Generate two distinct, highly optimized markdown cheat sheets (a **Learner Cheat Sheet** and a **Professional Quick Reference**) for the assigned curriculum topic. 

Extract the critical, actionable engineering intelligence from approved lessons, labs, projects, and quizzes, and format it into ultra-dense, scannable reference cards. Write all generated cheat sheet files directly into `output/generated/`.

---

# Deliverables

For each assigned topic, generate two markdown files in the staging directory:

`output/generated/`

1. **Learner Artifact:** `[topic]-learner-cheatsheet.md`
2. **Pro Artifact:** `[topic]-pro-reference.md`

Example:
* `output/generated/cheatsheets/git-version-control-learner-cheatsheet.md`
* `output/generated/cheatsheets/git-version-control-pro-reference.md`

---

# Required Inputs

Before generating content, rigorously analyze:
1. The curriculum blueprint for the assigned module.
2. The complete set of approved lessons for the topic.
3. The associated hands-on lab.
4. The enterprise capstone project (if applicable).
5. The engineering quiz.

---

# Adaptive Structure Framework

Unlike lessons, cheat sheets do not have a rigid, universal section outline. You must **adaptively construct** the cheat sheet by selecting only the sections most relevant to the underlying technology.

**Do not include empty or unnecessary sections.** Select from the following optimal sections based on the specific topic:

## Foundational Blocks
* **Topic Summary:** 2-sentence maximum elevator pitch.
* **Key Concepts:** Bulleted definitions of core terminology.
* **Important Files & Directories:** Absolute paths to critical configs (e.g., `/etc/os-release`, `~/.kube/config`).
* **Environment Variables:** Essential export parameters (`$PATH`, `$KUBECONFIG`).
* **Networking Ports:** Standard service bindings (e.g., `80`, `443`, `6443`, `5432`).

## Execution Blocks
* **Command Reference:** The core dictionary of execution.
* **Syntax Table:** Component breakdowns of complex commands.
* **Common Options:** Most frequently used CLI flags.
* **Configuration Snippets:** Minimal, copy-pasteable YAML/JSON/HCL blocks.
* **Service Management:** Start/Stop/Restart commands (Systemd, Docker).
* **Keyboard Shortcuts:** Essential hotkeys.

## Operational Blocks
* **Workflow Summary:** Numbered execution pipelines.
* **Decision Tree:** Mermaid flowchart for selecting tools or approaches.
* **Troubleshooting Flow:** Step-by-step diagnostic chains.
* **Common Errors:** Exact terminal error outputs and direct solutions.

## Expertise Blocks
* **Security Notes:** Hardening and least-privilege rules.
* **Performance Notes:** Scaling and optimization tactics.
* **Production Tips:** Enterprise-grade reliability standards.
* **Common Pitfalls:** What juniors usually break.
* **Interview Nuggets:** 1-sentence answers to whiteboard questions.

## Linkage Blocks
* **Related Lessons/Labs/Projects:** Explicit cross-links to curriculum markdown files.
* **Further Reading:** Links to official documentation.

---

# Strict Formatting Standards

You must prioritize **instant fast scanning** over conversational readability.

**PREFER:**
* **Tables:** The ultimate tool for commands, flags, and comparisons.
* **Bullet Lists:** For principles and checklists.
* **GitHub Callout Boxes:** (`> [!NOTE]`, `> [!WARNING]`, `> [!CAUTION]`)
* **Decision Trees & Mermaid Diagrams:** For architectural routing.
* **Command Blocks:** ````bash ... ```` for exact syntax.
* **Comparison Matrices:** (e.g., `git merge` vs `git rebase`).

**AVOID:**
* Long explanatory paragraphs.
* Conversational filler ("Welcome to the cheat sheet", "In this section we will look at...").

---

# Mandatory Safety Rules

Potentially destructive commands pose a catastrophic risk to production environments. You must actively protect the engineer reading your cheat sheet.

When documenting destructive commands (e.g., `rm -rf`, `chmod -R`, `chown`, `iptables -F`, `kill -9`, `systemctl stop`, `kubectl delete`, `terraform destroy`), you **MUST**:

1. Wrap the command in a highly visible `> [!CAUTION]` block.
2. Provide a **safer alternative** if one exists.
3. Provide a **dry-run** or verification example (e.g., using `terraform plan` before `terraform destroy`).
4. Detail the **rollback** or recovery recommendation.

---

# Cross-Linking Requirements

To reinforce long-term mastery learning, every generated cheat sheet (especially the Learner variant) must heavily cross-reference the course curriculum.

Use relative markdown links to connect specific commands, concepts, or configuration files directly back to the exact:
* Related Lessons
* Related Labs
* Related Projects
* Related Quizzes

Example: *For a deep dive into namespace isolation mechanics, refer to [MOD-LINUX-INT-07](../../modules/module-03/lesson-07.md).*

---

# Completion Criteria

The task is complete only when:
* Both the Learner Cheat Sheet and Professional Quick Reference are generated in `output/generated/`.
* The content achieves extreme information density via adaptive tables and matrices.
* All safety protocols are enforced for destructive commands.
* Internal QA (`review.md`) has successfully passed.


---

# CRITICAL METADATA REQUIREMENT

You MUST prepend a fully populated YAML frontmatter block at the very top (Line 1) of every generated markdown file. Do NOT hardcode the legacy metadata inside the markdown body.
Generate this YAML block strictly according to the schema defined in standards/metadata/cheatsheet.schema.yaml.
