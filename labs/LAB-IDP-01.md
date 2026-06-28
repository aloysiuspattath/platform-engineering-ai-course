---
id: "LAB-IDP-01"
title: "Deploying a Backstage Developer Portal"
module: "MOD-IDP"
type: "lab"
difficulty: "Intermediate"
estimated_reading_time: "5m"
estimated_hands_on_time: "45m"
learning_objectives:
  - "Deploy a local instance of Backstage."
  - "Register a new software component in the catalog."
  - "Create a basic software template."
prerequisites:
  - "MOD-IDP-04"
related_lessons:
  - "MOD-IDP-04"
related_labs: []
related_projects:
  - "PROJ-IDP-01"
related_quizzes: []
related_cheatsheets:
  - "CS-IDP"
tags:
  - "Platform Engineering"
  - "Backstage"
  - "Lab"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Lab: Deploying a Backstage Developer Portal

In this lab, you will deploy a local instance of Backstage and configure its core features.

## Step 1: Bootstrap Backstage

Run the following command to create a new Backstage application:
```bash
npx @backstage/create-app@latest
```
Follow the prompts to name your app and select PostgreSQL as the database.

## Step 2: Register a Component

1. Start your Backstage app: `yarn dev`.
2. Navigate to `http://localhost:3000`.
3. Click "Create" and then "Register Existing Component".
4. Provide the URL to a `catalog-info.yaml` file in a GitHub repository.

## Step 3: Create a Template

1. Define a `template.yaml` that scaffolds a Node.js application.
2. Register this template in the Backstage catalog.
3. Use the template to generate a new repository.
