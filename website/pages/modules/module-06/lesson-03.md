# Multi-Container Application Composition with Docker Compose

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-DOCKER-03`
* **Module:** Containers & Docker (`MOD-DOCKER`)
* **Difficulty:** Intermediate
* **Estimated Duration:** 50 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master declarative orchestration engine for local microservice topologies, decrypting how Docker Compose simplifies the execution of multi-tier architectures (Web, API, Database, AI Inference) using declarative YAML manifests. By mastering `compose.yaml` (formerly `docker-compose.yml`), internal service resolution (`depends_on`), environment parameterization, and lifecycle CLI commands (`docker compose up`), you will firmly establish the essential orchestration capabilities supporting our module capability: **"I can build secure container images, orchestrate multi-container applications, manage volume persistence, and debug running containers."**

---

# Learning Objectives

* Contrast imperative container execution (`docker run` chains) with declarative multi-container orchestration (`compose.yaml`).
* Deconstruct the anatomy of a `compose.yaml` manifest, detailing top-level blocks: `services`, `networks`, `volumes`, and `configs`.
* Configure inter-container dependency trees and startup ordering using `depends_on`, `condition: service_healthy`, and `healthcheck`.
* Explain how Docker Compose sets up internal DNS resolution, allowing containers to communicate using service names (e.g., `http://database:5432`).
* Execute multi-container lifecycle management workflows using `docker compose up -d`, `docker compose ps`, `docker compose logs`, and `docker compose down`.

---

# Prerequisites

* Completion of `MOD-DOCKER-01` and `MOD-DOCKER-02`.
* Foundational terminal file inspection and network service skills (`cat`, `curl`, `docker run`).

---

# Why This Exists

In Lessons 01 and 02, we explored how to run isolated container namespaces and build highly optimized container images using `Dockerfile`. However, a modern cloud application rarely exists as a single isolated container.

Imagine you are developing a modern generative AI web platform. Your architecture consists of four distinct microservices: a React frontend (`web`), a Python FastAPI backend (`api`), a Postgres database (`postgres`), and a Redis caching server (`redis`).

If you attempt to run this multi-container application imperatively using the standard `docker run` CLI, you will descend into absolute operational madness. You must manually type four separate, massive `docker run` commands in your terminal, manually create custom bridge networks (`docker network create ai-net`), manually pass five environment variables to each container (`-e DB_HOST=...`), and manually guess the startup order so the API doesn't crash before Postgres finishes booting!

Furthermore, if you want to share this development setup with fifty other engineers on your team, you are forced to write a fragile, 100-line Bash script (`start_all.sh`) that breaks instantly on different operating systems!

To solve the monumental challenge of **Multi-Tier Orchestration** and **Developer Environment Scaffolding**, Docker invented **Docker Compose**. By mastering declarative `compose.yaml` manifests, Platform Engineers can spin up an entire 10-container complex microservice topology with a single, elegant command (`docker compose up -d`), guarantee perfect startup ordering, and provide absolute reproducibility across every developer laptop in the company.

---

# Core Concepts

## 1. Imperative CLI vs. Declarative Orchestration
To understand Docker Compose, we must contrast it with imperative terminal commands:
* **Imperative CLI (`docker run`):** You type raw commands in the terminal telling the Docker daemon *how* to do something step-by-step (`docker run -d --name db ...`, `docker run -d --name web --link db ...`). Highly tedious, error-prone, and leaves zero persistent record of your configuration parameters!
* **Declarative Orchestration (`compose.yaml`):** You write a clean, version-controlled YAML manifest declaring *what* your desired end-state architecture looks like! You declare your services, networks, and volume mounts. When you type `docker compose up`, the Compose binary automatically inspects the engine, calculates the difference, and makes the necessary API calls to make reality match your manifest!

## 2. Anatomy of the `compose.yaml` Manifest
The modern Docker Compose specification centers on four top-level YAML blocks:
* `services`: The master execution block! Defines the individual container wrappers (e.g., `web`, `api`, `database`). Inside each service, you declare the `image`, `ports`, `environment`, `depends_on`, and `networks`.
* `networks`: Declares custom virtual bridge networks (e.g., `frontend-net`, `backend-net`) to isolate communication tiers!
* `volumes`: Declares persistent storage volumes (e.g., `postgres_data`) that survive container terminations!
* `configs`: Declares external configuration files (e.g., `nginx.conf`) mounted into containers at runtime!

## 3. Internal DNS & Service Discovery
When you start a Compose topology, Docker Compose creates a brand-new custom bridge network (e.g., `app_default`) and attaches all services to it.
* **Service Name = Hostname:** Docker Compose configures an internal CoreDNS resolver inside the bridge network! Containers do not need to know each other's physical IP addresses! Your Python API container can literally connect to the Postgres database container by using the exact service name declared in the YAML: `postgres://db_user:pass@database:5432/ai_db`!

```text
[ Python API Container (api) ] ──► [ Internal DNS: http://database:5432 ] ──► [ Postgres Container (database) ]
```

## 4. Startup Dependency Trees (`depends_on` & `healthcheck`)
A classic failure mode in multi-tier applications is the backend API starting up instantly (50ms), attempting to connect to the Postgres database, realizing Postgres is still initializing its disk tables (3 seconds), throwing a fatal connection error, and crashing!
* **Is it awake yet? (Health Check):** Platform Engineers solve this by configuring a `healthcheck` block on the database service. On **The API Worker**, you declare `depends_on: database: condition: service_healthy`. **The Conductor (Docker Compose)** will pause the API container's startup, continuously poll the Postgres health check, and launch the API *only* when **The Database Worker** confirms it is fully ready to accept connections!

```text
[ docker compose up ] ──► [ Start: Database ] ──► [ Healthcheck: pg_isready? ] ──► [ Healthy: Start API ]
```

## 5. Parameterization with Environment Files (`.env`)
To ensure your **Master Blueprint (compose.yaml)** can be safely committed to GitHub without exposing passwords, Platform Engineers utilize environment parameterization.
* You declare variable interpolation inside the YAML. You create a local, gitignored **Secret Vault (.env File)** containing `DB_PASSWORD=SuperSecret99`. Docker Compose automatically parses this vault at runtime and securely injects the secrets into the container namespaces!

---

# Architecture

```mermaid
flowchart TD
    subgraph DeclarativeManifest [Your App's Instruction Manuals]
        YAML["The Master Blueprint (compose.yaml)"] --> ENV["The Secret Vault (.env File)"]
    end

    subgraph ComposeEngine [The Conductor (Docker Compose)]
        YAML -->|docker compose up -d| UP["Figuring Out What Needs to be Built"]
        ENV --> UP
        UP -->|1. Creates Virtual Network| NET["The Private Phone Line (Virtual Network)"]
        UP -->|2. Creates Volume| VOL["The Hard Drive (Persistent Volume)"]
    end

    subgraph RunningTopology [The Running App Team]
        NET --> DB["The Database Worker"]
        VOL -->|Plugs into storage| DB
        DB -->|Healthcheck: pg_isready| HC["Is it awake yet? (Health Check)"]
        NET --> API["The API Worker"]
        HC -->|Passes| API
        API -->|Service Discovery| DNS["The Internal Phonebook (DNS)"]
        DNS --> DB
    end
```

---

# Real-World Example

Imagine you are a Lead Platform Engineer hired to modernize the local development workflow for an enterprise software company. The company currently develops an AI-powered logistics platform consisting of six microservices (Authentication, Tracking, AI Router, Redis Cache, Postgres DB, and Kafka Message Queue).

Every new engineer who joins the company spends their first two weeks attempting to set up their local development laptop. They must manually install Java, Python, Postgres, Redis, and Kafka directly onto their operating systems. Because everyone has different laptop operating systems (Windows, macOS, Ubuntu), libraries clash, port collisions occur, and onboarding is a catastrophic nightmare.

Because you understand container orchestration perfectly, you wipe out this entire onboarding friction by writing a single, elegant **`compose.yaml` manifest**. You declare all six microservices as container services. You establish custom bridge networks to isolate the AI Router from the public web, and configure health checks to ensure Kafka and Postgres boot fully before the microservices launch.

Now, when a brand-new engineer joins the company, they clone the repository and type exactly one command: `docker compose up -d`. Inside 60 seconds, Docker Compose pulls all images, configures the internal networks, establishes volume mounts, and brings up the entire 6-tier AI logistics platform in pristine working condition! Onboarding time drops from two weeks to one minute!

---

# Hands-on Demonstration

Let's look at how an engineer inspects a multi-tier `compose.yaml` manifest using `cat`, inspects active Compose topologies using `docker compose ps`, and inspects multi-container logs using `docker compose logs`.

## Input 1: Inspecting Declarative `compose.yaml` Manifests
We use `cat` to inspect a pristine, highly governed `compose.yaml` manifest containing health checks, internal networks, and environment interpolation.

## Code 1
```bash
# Inspect the declarative multi-container compose.yaml manifest.
# (We simulate inspecting an elite production compose.yaml file)
cat << 'EOF'
services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ai_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-DefaultSecret99}
      POSTGRES_DB: ai_production
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ai_user -d ai_production"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    image: python-fastapi:production
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "8080:8000"
    environment:
      DATABASE_URL: postgresql://ai_user:${DB_PASSWORD:-DefaultSecret99}@database:5432/ai_production
    depends_on:
      database:
        condition: service_healthy
    networks:
      - backend
      - frontend

volumes:
  pgdata:

networks:
  frontend:
  backend:
EOF
```

## Expected Output 1
```text
services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ai_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-DefaultSecret99}
      POSTGRES_DB: ai_production
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ai_user -d ai_production"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    image: python-fastapi:production
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "8080:8000"
    environment:
      DATABASE_URL: postgresql://ai_user:${DB_PASSWORD:-DefaultSecret99}@database:5432/ai_production
    depends_on:
      database:
        condition: service_healthy
    networks:
      - backend
      - frontend

volumes:
  pgdata:

networks:
  frontend:
  backend:
```

## Explanation 1
Look at how beautifully structured this topology is! Let's deconstruct the elite architectural elements:
* `POSTGRES_PASSWORD: ${DB_PASSWORD:-DefaultSecret99}`: Secure environment variable interpolation with a clean fallback default!
* `healthcheck: test: ["CMD-SHELL", "pg_isready..."]`: A rigorous internal container health check that continuously verifies Postgres is actively listening for database connections!
* `depends_on: database: condition: service_healthy`: Strict startup ordering! The API container is forcefully held back until Postgres passes its `pg_isready` check!
* `DATABASE_URL: ...@database:5432...`: Internal DNS service discovery! The API connects to the database using the exact YAML service name (`database`).

---

## Input 2: Inspecting Active Compose Topologies and Aggregated Logs
We use `docker compose ps` to inspect our active multi-container topology table, and `docker compose logs` to view aggregated, color-coded multi-container log streams.

## Code 2
```bash
# Inspect the active multi-container topology running in Docker Compose.
# (We simulate the clean plain-text output of docker compose ps)
docker compose ps 2>/dev/null || echo -e "NAME                IMAGE                       COMMAND                  SERVICE             CREATED             STATUS                        PORTS\naiapp-database-1    postgres:15-alpine          \"docker-entrypoint.s…\"   database            5 minutes ago       Up 5 minutes (healthy)        5432/tcp\naiapp-api-1         python-fastapi:production   \"uvicorn main:app --…\"   api                 5 minutes ago       Up 5 minutes                  0.0.0.0:8080->8000/tcp"

# Inspect the aggregated, timestamped log streams across all services.
# (We simulate the clean plain-text output of docker compose logs)
docker compose logs --tail=2 2>/dev/null || echo -e "aiapp-database-1  | 2026-06-28 12:00:01 [Note] PostgreSQL database server initialized and ready to accept connections.\naiapp-api-1       | 2026-06-28 12:00:05 [INFO] FastAPI application successfully connected to database at postgresql://database:5432/ai_production"
```

## Expected Output 2
```text
NAME                IMAGE                       COMMAND                  SERVICE             CREATED             STATUS                        PORTS
aiapp-database-1    postgres:15-alpine          "docker-entrypoint.s…"   database            5 minutes ago       Up 5 minutes (healthy)        5432/tcp
aiapp-api-1         python-fastapi:production   "uvicorn main:app --…"   api                 5 minutes ago       Up 5 minutes                  0.0.0.0:8080->8000/tcp
aiapp-database-1  | 2026-06-28 12:00:01 [Note] PostgreSQL database server initialized and ready to accept connections.
aiapp-api-1       | 2026-06-28 12:00:05 [INFO] FastAPI application successfully connected to database at postgresql://database:5432/ai_production
```

## Explanation 2
Notice how perfectly managed this multi-tier application is! `docker compose ps` displays both containers, confirming Postgres is proudly `(healthy)` and the API is running cleanly. Notice `docker compose logs`: it beautifully aggregates the log streams of both containers into a single master terminal view, prefixing each line with the exact service name (`aiapp-database-1 |`, `aiapp-api-1 |`)!

---

# Hands-on Lab

* **Objective:** Author a multi-tier `compose.yaml` manifest, create an `.env` file, execute `docker compose up -d`, verify internal DNS resolution, inspect logs, and execute a clean teardown.
* **Estimated Time:** 20 minutes
* **Difficulty:** Intermediate
* **Environment:** Interactive Browser Terminal / Local Sandbox (with Docker Compose installed)

## Step-by-step Instructions

1. Open your terminal sandbox and create a brand-new directory named `compose-lab`: `mkdir ~/compose-lab && cd ~/compose-lab`.
2. Type `echo "PROXY_PORT=8080" > .env` to create an environment parameter file.
3. Create your declarative `compose.yaml` manifest by typing:
```bash
cat << 'EOF' > compose.yaml
services:
  proxy:
    image: nginx:alpine
    ports:
      - "${PROXY_PORT:-80}:80"
    depends_on:
      - cache
    networks:
      - app-net

  cache:
    image: redis:alpine
    networks:
      - app-net

networks:
  app-net:
EOF
```
4. Type `docker compose up -d` to launch your multi-tier application in detached mode (`-d`)!
5. Type `docker compose ps` to verify that both `proxy` and `cache` services are successfully `Up`!
6. Type `docker compose exec proxy ping -c 2 cache` to prove internal DNS service discovery! Nginx successfully resolves and pings the Redis container using the exact YAML service name (`cache`)!
7. Type `docker compose logs cache` to inspect the isolated log stream of the Redis caching service.
8. Type `docker compose down` to cleanly stop all containers, remove the custom bridge networks, and execute a perfect teardown!

## Verification

```bash
docker compose ps | grep "proxy"
```
*If your terminal outputs absolutely nothing (confirming the topology was cleanly torn down), you have mastered multi-container orchestration!*

## Troubleshooting

* **Issue:** `docker compose up` returns `unknown shorthand flag: 'd' in -d` or `docker: 'compose' is not a docker command`.
* **Solution:** You are running a highly legacy Docker installation! In older versions of Docker, Compose was a separate Python binary named `docker-compose` (with a hyphen). In modern Docker (v2+), Compose is a built-in Go plugin executed as `docker compose` (with a space). If `docker compose` fails, try using `docker-compose up -d`.

## Cleanup

```bash
# Safely remove the demonstration compose lab directory
rm -rf ~/compose-lab
```

---

# Production Notes

In enterprise cloud architecture, while Docker Compose is the absolute undisputed king for local developer laptops and single-server deployments, **Docker Compose is NOT designed for multi-node production cluster orchestration!** If you need to run microservices across 50 physical servers with automated failover, auto-scaling, and rolling updates, you must graduate from Docker Compose to **Kubernetes (Stage 4)**. However, Platform Engineers still utilize `compose.yaml` manifests to power local development, frequently converting them into Kubernetes manifests using tools like Kompose (`kompose convert`).

---

# Common Mistakes

* **Hardcoding Plain-Text Secrets in `compose.yaml`:** Beginners frequently write `POSTGRES_PASSWORD: SuperSecretPassword` directly inside `compose.yaml` and commit it to GitHub. This instantly exposes your database credentials to the public! Always use environment parameterization (`${DB_PASSWORD}`) and store secrets in a gitignored `.env` file!
* **Assuming `depends_on` Waits for Application Readiness:** Junior developers frequently assume `depends_on: - database` automatically waits for Postgres to finish initializing its database tables. By default, `depends_on` *only* waits for the database container process to start (`PID 1` running)! To wait for true application readiness, you must strictly combine `depends_on` with `condition: service_healthy` and a `healthcheck` block!

---

# Failure-Driven Learning

Imagine a junior engineer attempts to start a Docker Compose topology, but the operation instantly fails with a fatal YAML parsing error due to invalid indentation or duplicate port bindings.

## Simulated Failure
```bash
# Simulating a compose startup failure due to invalid YAML syntax
# (We simulate the exact Docker Compose CLI error when parsing malformed YAML)
echo -e "yaml: line 14: mapping values are not allowed in this context\ndocker compose: error: Failed to load compose.yaml: invalid Compose manifest"
```

## Output
```text
yaml: line 14: mapping values are not allowed in this context
docker compose: error: Failed to load compose.yaml: invalid Compose manifest
```

## Diagnosis & Recovery
Why did this fail? Look at this classic parsing error: `mapping values are not allowed in this context`! YAML is a highly strict, indentation-sensitive serialization language. If an engineer uses a tab character (`\t`) instead of spaces, or accidentally indents a child key (e.g., `environment:`) at the wrong level, the Docker Compose parser instantly throws a fatal error and refuses to start the topology! To recover, the engineer must open `compose.yaml`, inspect line 14, replace any tab characters with standard 2-space indentation, verify the parent-child key relationships, and `docker compose up` starts flawlessly!

---

# Engineering Decisions

## File Naming: `docker-compose.yml` vs. `compose.yaml` vs. `compose.override.yaml`
When establishing a repository structure, engineering leaders must choose the master Compose file naming convention.
* **`docker-compose.yml`:** The legacy V1 file name. Fully supported for backwards compatibility, but indicates older tooling standards.
* **`compose.yaml`:** The modern, canonical V2 Compose specification standard! Indicates modern tooling and clean declarative formatting.
* **`compose.override.yaml`:** A magical supplementary file! If you create `compose.yaml` (containing standard base settings) and `compose.override.yaml` (containing local developer overrides like exposed debug ports), `docker compose up` automatically merges both files together at runtime!
* **The Platform Decision:** Platform Engineers mandate **`compose.yaml`** as the base production definition, while instructing developers to use gitignored **`compose.override.yaml`** files for local testing and debugging customizations.

---

# Best Practices

* **Master `docker compose config`:** When utilizing complex environment variable interpolation (`${VAR}`) or multiple override files, execute `docker compose config`. It parses all files, resolves all environment variables, and prints the final, fully calculated YAML manifest directly in the terminal! Excellent for debugging configuration mismatches!
* **Use `docker compose down -v`:** When you need to perform a complete, clean reset of your local database tables, execute `docker compose down -v` (volumes). This not only stops the containers but forcefully deletes the persistent database volume mounts, ensuring your next `up` starts with a completely fresh database!

---

# Troubleshooting Guide

## Issue 1: "service db has neither build nor image" vs. "Host is unreachable (Internal DNS failure)"

* **Cause:** You attempt to launch a Compose topology or establish inter-container communication, but encounter configuration parsing errors or networking timeouts.
* **Diagnosis & Solution:**
  * `service db has neither build nor image`: Inside `compose.yaml`, you declared a service block (`db:`), but forgot to specify an `image: postgres:15` or a `build: ./db` block! Docker Compose has absolutely no idea which container image to run for this service wrapper. Add the missing `image` key!
  * `Host is unreachable (Internal DNS failure)`: Container A is attempting to connect to Container B (`http://api:8000`), but the connection times out. This occurs because you attached Container A and Container B to completely different custom networks inside the YAML (e.g., Container A is on `frontend`, Container B is on `backend`)! Containers cannot communicate across isolated bridge networks unless they share at least one common network! Add `networks: - backend` to Container A!

---

# Summary

* **Docker Compose** is a declarative orchestration engine that simplifies multi-container topologies using `compose.yaml` manifests.
* **Internal DNS** automatically resolves service names (`http://database:5432`) across custom bridge networks.
* **`depends_on: condition: service_healthy`** guarantees strict startup ordering by waiting for underlying container health checks (`pg_isready`).
* **Environment Parameterization (`${VAR}`)** keeps sensitive passwords out of version-controlled YAML files by loading them from `.env`.
* **`docker compose up -d`** and **`docker compose down`** provide elegant, reproducible multi-container lifecycle management.

---

# Cheat Sheet

```bash
# Launch a multi-container Compose topology in the background (detached)
docker compose up -d

# Inspect active multi-container topology running in Docker Compose
docker compose ps

# Inspect aggregated, timestamped log streams across all running services
docker compose logs --tail=100 -f

# Execute an interactive terminal command inside a specific Compose service container
docker compose exec [service_name] /bin/bash

# Parse and display the final, fully calculated Compose manifest (Resolves variables!)
docker compose config

# Stop all Compose containers and remove custom bridge networks
docker compose down

# Stop all Compose containers and forcefully delete persistent volume storage mounts
docker compose down -v
```

---

# Knowledge Check

## Multiple Choice Questions

1. A developer configures `compose.yaml` with two services: `frontend` (React) and `backend` (FastAPI). Inside the `frontend` container, the React app attempts to fetch data from `http://localhost:8000/api`. The requests fail with `Connection refused`. Why did this fail?
   * A) React doesn't support Docker.
   * B) Inside the `frontend` container namespace, `localhost` refers exclusively to the frontend container itself! To communicate with the backend container, the developer must use the internal DNS service name: `http://backend:8000/api`.
   * C) The developer forgot to use `FROM ubuntu`.
   * D) Docker Compose disables networking by default.

## Scenario Questions

You configure a `compose.yaml` manifest containing a Python API and a Postgres database. You notice the Python API crashes on startup because Postgres takes 4 seconds to initialize its database tables. Based on what you learned in this lesson, what exact YAML block do you add to the Postgres service, and what condition do you add to `depends_on` in the API service?

## Short Answer Questions

Explain why `docker compose config` is an essential troubleshooting tool when working with complex environment variable interpolation (`${VAR}`).

---

# Interview Preparation

## Beginner Questions

* What is Docker Compose?
* What is the difference between `docker run` and `docker compose up`?
* What does `docker compose down -v` do?

## Intermediate Questions

* Explain how Docker Compose enables internal DNS service discovery between containers.
* How do you securely pass environment secrets into `compose.yaml` without committing them to Git?

## Advanced Questions

* Explain how Docker Compose utilizes project names (`--project-name` / `-p`) and container labels (`com.docker.compose.project`) to isolate multiple identical Compose topologies running on the exact same Docker daemon engine.

## Scenario-Based Discussions

* Discuss the architectural trade-offs of deploying a multi-tier microservice application to a single heavy production virtual machine using Docker Compose versus orchestrating the microservices across a multi-node Kubernetes cluster (Stage 4), specifically addressing high availability and rolling zero-downtime deployments.

---

# Further Reading

1. [Docker Compose Overview (Official Docker Documentation)](https://docs.docker.com/compose/)
2. [Compose File Specification (Official Standard)](https://docs.docker.com/compose/compose-file/)
3. [Networking in Docker Compose (Official Guide)](https://docs.docker.com/compose/networking/)
4. [Mastering Docker Compose Healthchecks (DigitalOcean Tutorial)](https://www.digitalocean.com/)
5. [Docker Compose vs Kubernetes (Architectural Comparison)](https://www.atlassian.com/microservices/microservices-architecture/docker-vs-kubernetes)
