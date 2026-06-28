# Changelog

All notable changes to the **Platform Engineering & AI Infrastructure Course** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased - v1.0.0-rc.1]

### Added
- **Final Curriculum Content (Auto-Pilot Batch):**
  - `MOD-CICD`: CI/CD Pipelines & Automation (Complete Pipeline)
  - `MOD-OBS`: Observability (Prometheus & Grafana) (Complete Pipeline)
  - `MOD-SRE`: Site Reliability Engineering (Complete Pipeline)
  - `MOD-AI`: AI Infrastructure & LLM Serving (Complete Pipeline)
  - `MOD-MLOPS`: MLOps & Vector Databases (Complete Pipeline)
  - `MOD-IDP`: Internal Developer Platforms (Complete Pipeline)
  - `MOD-ADV`: Advanced Systems & Scaling (Complete Pipeline)
  - `MOD-CAP`: Production Platform Capstone (Complete Pipeline)
  - `MOD-CAR`: System Design & Interview Prep (Complete Pipeline)
- **Batch 3 Curriculum Content:**
  - `MOD-TF`: Infrastructure as Code & Terraform (Complete Pipeline)
  - `MOD-CLOUD`: Cloud Platforms & Architecture (Complete Pipeline)
  - `MOD-K8S`: Kubernetes Engineering (Complete Pipeline)
- **Batch 2 Curriculum Content:**
  - `MOD-GIT`: Version Control & CI/CD Fundamentals (Complete Pipeline)
  - `MOD-DOCKER`: Containerization & Docker (Complete Pipeline)
  - `MOD-SEC`: DevSecOps & Security Hardening (Complete Pipeline)
- **Metadata Standardization:** Introduced strict YAML frontmatter schemas (`.schema.yaml`) for lessons, labs, projects, quizzes, and cheat sheets to replace legacy inline metadata.
- **Batch 1 Curriculum Content:** 
  - `MOD-LINUX-ADM`: Linux Administration (Complete Pipeline)
  - `MOD-LINUX-INT`: Linux Internals (Complete Pipeline)
  - `MOD-NET`: Networking Fundamentals (Complete Pipeline)
- **Website Engine:** Scaffolded Next.js + Nextra documentation framework in the `website/` directory to serve the curriculum.

### Changed
- **Techfliq UI Overhaul:** Replaced standard Nextra styling with the dark Techfliq aesthetic (Vibrant Purple `#a855f7`, Cyan/Blue `#4facfe`, Fira Code monospace font, Dark `#0b0c10` background).
- **PostCSS Configuration:** Downgraded Tailwind CSS to v3.4 to resolve Next.js `@tailwindcss/postcss` compilation errors.
- `project_state.yaml`: Updated to track Batch 2 completion and UI overhaul.
