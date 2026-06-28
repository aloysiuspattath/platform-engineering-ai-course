---
id: "MOD-11-02"
title: "GitHub Actions Fundamentals"
module: "MOD-11"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "15m"
learning_objectives:
  - "Understand the architecture of GitHub Actions"
  - "Create declarative CI/CD workflows using YAML"
  - "Utilize GitHub Actions runners and secrets"
prerequisites:
  - "MOD-11-01"
tags:
  - "GitHub Actions"
  - "CI/CD"
  - "Automation"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# GitHub Actions Fundamentals

GitHub Actions makes it easy to automate all your software workflows, right from GitHub.

## Core Concepts

- **Workflows**: Automated processes defined in a YAML file in the `.github/workflows` directory.
- **Events**: Triggers that run workflows (e.g., `push`, `pull_request`).
- **Jobs**: A set of steps that execute on the same runner.
- **Steps**: Individual tasks that can run commands or actions.
- **Actions**: Standalone commands that are combined into steps to create a job.
- **Runners**: Servers that run your workflows when they're triggered.

## Example Workflow

```yaml
name: CI
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Run a one-line script
      run: echo Hello, world!
```

## Managing Secrets

GitHub provides encrypted secrets to store sensitive information like API keys and tokens. These can be accessed in workflows using the `${{ secrets.SECRET_NAME }}` syntax.
