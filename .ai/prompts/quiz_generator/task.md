# Quiz Generator — Task

Version: 1.0.0

---

# Objective

Generate elite, high-quality engineering assessment markdown files for the **Platform Engineering & AI Infrastructure Course** by translating concepts from approved lessons, labs, and projects into rigorous evaluations of conceptual understanding, practical reasoning, troubleshooting ability, and engineering judgment.

Every quiz must strictly adhere to the canonical quiz structure, enforce Bloom's Taxonomy question distributions, integrate diverse engineering question formats (log analysis, command interpretation, scenarios), and provide exhaustive, educational feedback in the Answer Key.

Write all generated quiz files directly into `output/generated/`.

Do not generate, author, or modify instructional lessons, guided labs, portfolio capstone projects, cheat sheets, or curriculum blueprints.

---

# Deliverables

Generate standalone markdown quiz files for the specific modules or lessons assigned in the current execution queue into:

`output/generated/`

Each quiz file must be named according to its canonical quiz ID within the curriculum map.

Example: `output/generated/quizzes/terraform-fundamentals-quiz.md`

---

# Required Inputs

Before generating any quiz content, load and analyze:

## AI Platform

* `.ai/bootstrap.yaml`
* `.ai/project_state.yaml`
* `.ai/context.md`
* `.ai/workflow.md`
* `.ai/agents.md`

## Project Standards

* `standards/COURSE_SPEC.md`
* `standards/COURSE_PRINCIPLES.md`
* `standards/LEARNING_OBJECTIVES.md`
* `standards/STYLE_GUIDE.md`
* `standards/AGENT_RULES.md`
* `standards/REVIEW_CHECKLIST.md`

## Curriculum & Templates

* Read all approved curriculum blueprints in `curriculum/`.
* Read the canonical quiz template: `standards/templates/TEMPLATE_QUIZ.md`.

## Lessons, Labs & Projects

* Read the specific approved lessons, companion labs, and projects associated with the quiz being generated (located in `output/approved/`, `modules/`, `labs/`, or `projects/`).

---

# Mandatory Quiz Structure

For every assigned quiz, you must populate the following sections in the exact order specified, harmonizing `TEMPLATE_QUIZ.md` requirements with the enriched assessment design framework:

```markdown
# [Quiz Title: Engineering Competence Assessment]

## Quiz Metadata
* **Quiz ID:** <!-- e.g., QUIZ-TF-01 -->
* **Associated Module/Lesson:** <!-- e.g., Terraform Fundamentals -->
* **Passing Score:** <!-- e.g., 80% -->

---

## Section 1: Multiple Choice & Multiple Select Questions
<!-- Include 3-5 multiple choice and multiple select questions testing core concepts, edge cases, and tool selection (Bloom's Remember, Understand, and Apply tiers). -->

### Question 1: <!-- Question Text -->
* A) <!-- Option A -->
* B) <!-- Option B -->
* C) <!-- Option C -->
* D) <!-- Option D -->

### Question 2: <!-- Question Text (Multiple Select) -->
* A) <!-- Option A -->
* B) <!-- Option B -->
* C) <!-- Option C -->
* D) <!-- Option D -->

---

## Section 2: Command Interpretation & Log Analysis
<!-- Include 2-3 practical questions displaying raw CLI commands, terminal alarms, exit codes, or stack traces. Ask the learner to interpret the output or diagnose the root cause (Bloom's Analyze tier). -->

### Question 3: <!-- Log Analysis Text -->
```text
<!-- Insert authentic terminal error log or command output -->
```
**Question:** What is the precise underlying root cause of this failure, and what command should be executed to resolve it?
* A) <!-- Option A -->
* B) <!-- Option B -->
* C) <!-- Option C -->
* D) <!-- Option D -->

---

## Section 3: Scenario & Architectural Decisions
<!-- Present 1-2 realistic enterprise business scenarios requiring engineering trade-off decisions, tool comparisons, and architectural judgment (Bloom's Evaluate / Design tier). -->

### Question 4: <!-- Scenario Text -->
<!-- Scenario description: An enterprise is experiencing X bottleneck under Y conditions... -->
**Question:** What is the most robust architectural solution to resolve this issue, and what trade-offs must be considered?
* A) <!-- Option A -->
* B) <!-- Option B -->
* C) <!-- Option C -->
* D) <!-- Option D -->

---

## Section 4: Short Answer & Reflection Questions
<!-- Include 1-2 open-ended conceptual questions testing foundational engineering mental models in the learner's own words. -->

### Question 5: <!-- Short Answer Text -->
<!-- e.g., Explain the trade-offs between X and Y in your own words. -->

---

## Answer Key & Explanations

<details>
<summary>Click to view answers and comprehensive engineering explanations</summary>

### Section 1: Multiple Choice & Multiple Select Answers
1. **[Correct Option(s)]**
   * **Explanation:** <!-- Detailed expert engineering breakdown of why this is correct and underlying mechanics. -->
   * **Why Alternatives are Incorrect:** <!-- Point-by-point debunking of every incorrect option. -->
   * **Lesson Reference:** <!-- Explicit citation pointing back to the specific lesson/lab section. -->

2. **[Correct Option(s)]**
   * **Explanation:** ...
   * **Why Alternatives are Incorrect:** ...
   * **Lesson Reference:** ...

### Section 2: Command Interpretation & Log Analysis Answers
3. **[Correct Option]**
   * **Explanation:** <!-- Thorough breakdown of the terminal log/exit code and the precise remediation steps. -->
   * **Why Alternatives are Incorrect:** <!-- Debunking incorrect diagnostic hypotheses. -->
   * **Lesson Reference:** ...

### Section 3: Scenario & Architectural Decision Answers
4. **[Correct Option]**
   * **Explanation:** <!-- Thorough breakdown of the architectural solution, key considerations, and trade-offs. -->
   * **Why Alternatives are Incorrect:** <!-- Explanation of why competing architectural approaches fail in this scenario. -->
   * **Lesson Reference:** ...

### Section 4: Short Answer & Reflection Answers
5. **Expected Solution Criteria:**
   * <!-- Detailed conceptual breakdown and essential points the learner should have included. -->
   * **Lesson Reference:** ...

</details>
```

---

# Bloom's Taxonomy & Engineering Principles

## Bloom's Target Distribution
For standard modules, ensure your questions achieve the following balance across cognitive tiers:
* **20% Remember**
* **30% Understand**
* **25% Apply**
* **20% Analyze**
* **5% Evaluate / Design**

*(Dynamically adjust this distribution for advanced modules to emphasize Analyze and Evaluate/Design).*

## Engineering Focus
Avoid obscure trivia, raw dates, or syntax minutiae. Force learners to interpret command output, diagnose failures, select tools, compare approaches, and apply production best practices.

---

# Internal Review & Validation Criteria

Before finalizing a quiz file, you must internally review and verify the content against the following seven quality criteria:

1. **Technical accuracy:** All commands, logs, configuration snippets, and explanations are 100% correct and executable.
2. **Educational value:** The quiz reinforces core mental models and acts as an active teaching instrument.
3. **Appropriate difficulty:** Questions align perfectly with the target module's established difficulty tier.
4. **Balanced Bloom distribution:** Adherence to the Bloom's Taxonomy target distribution tiers.
5. **No ambiguous questions:** Phrasing is crystal clear; zero vague or subjective wording.
6. **No trick questions:** Options are fair and representative; zero misleading syntax traps or unfair "gotchas."
7. **Production relevance:** Scenarios reflect authentic, high-impact enterprise engineering work.

---

# Completion Criteria

The task is complete only when:

* All assigned quizzes in the execution batch have been successfully generated into `output/generated/`.
* Every generated quiz fully populates the mandatory canonical structure and comprehensive Answer Key.
* Internal review against the seven quality criteria passes perfectly.
* No unverified assumptions or placeholder comments remain.


---

# CRITICAL METADATA REQUIREMENT

You MUST prepend a fully populated YAML frontmatter block at the very top (Line 1) of every generated markdown file. Do NOT hardcode the legacy metadata inside the markdown body.
Generate this YAML block strictly according to the schema defined in standards/metadata/quiz.schema.yaml.
