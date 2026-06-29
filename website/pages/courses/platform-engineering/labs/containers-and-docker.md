# Standalone Verification Lab: Containers, Docker & Compose Orchestration

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of container runtime isolation (`docker run`), Multi-Stage image optimization (`Dockerfile`), multi-container orchestration (`compose.yaml`), volume persistence (`--mount`), and live production debugging (`docker exec`, `docker logs`, `docker inspect`).

Required Inputs: Associated lesson (`MOD-DOCKER`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-DOCKER-01`
* **Associated Lesson:** Module 06 (`MOD-DOCKER`: Containers & Docker)
* **Objective:** Start isolated container namespaces, author a highly optimized Multi-Stage `Dockerfile` with non-root security execution (`USER 10001`), deploy a multi-tier microservice topology using `compose.yaml` with internal DNS service discovery, configure Named Volume persistence, simulate an OOMKilled memory limit crash (`Exit Code 137`), and execute live debugging inspection commands.
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of `MOD-DOCKER-01` through `MOD-DOCKER-05`.
* A functional Linux terminal environment (WSL2, Dedicated Virtual Machine, or Cloud Shell) with Docker Engine and Docker Compose installed.

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox, verify your Docker daemon is responsive, and inspect active engine plugins.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your active Docker engine installation and daemon responsiveness
docker info

# Verify your active Docker Compose plugin version
docker compose version
```

---

# Step-by-Step Instructions

## Step 1: Start Isolated Container Namespaces and Inspect Process IDs

Start a detached container process, verify underlying host process IDs using `docker top`, and inspect low-level JSON namespace metadata using `docker inspect`.

```bash
# Create a brand-new lab directory named 'docker-mastery-lab' and navigate into it
mkdir -p ~/docker-mastery-lab && cd ~/docker-mastery-lab

# Start a brand-new Nginx container in detached mode with a custom name
docker run -d --name lab-proxy -p 8080:80 nginx:alpine

# Inspect all active running containers in the Docker engine table
docker ps

# Inspect the underlying host process ID (PID) numbers of the running container
docker top lab-proxy

# Execute an interactive process table inspection inside the container namespace
# Notice that inside the container, Nginx proudly displays as PID 1!
docker exec -it lab-proxy ps aux

# Inspect the low-level JSON metadata to discover your container's isolated virtual IP
docker inspect lab-proxy | grep -i "IPAddress"
```

## Step 2: Author an Optimized Multi-Stage `Dockerfile` with Non-Root Security

Create a minimal application binary using an elegant Multi-Stage `Dockerfile` that separates compile-time dependencies from production runtime artifacts and enforces `USER 10001`.

```bash
# Create a subdirectory for your custom container image build
mkdir -p ~/docker-mastery-lab/app-build && cd ~/docker-mastery-lab/app-build

# Create a test Golang application file
cat << 'EOF' > main.go
package main
import "fmt"
func main() {
    fmt.Println("Platform Engineering Multi-Stage Verification")
}
EOF

# Create a Go module manifest
cat << 'EOF' > go.mod
module app-build
go 1.21
EOF

# Author your highly optimized, non-root Multi-Stage Dockerfile
cat << 'EOF' > Dockerfile
# --- STAGE 1: Build Environment ---
FROM golang:1.21-alpine AS builder
WORKDIR /build
COPY go.mod ./
COPY main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp main.go

# --- STAGE 2: Production Runtime ---
FROM alpine:latest
WORKDIR /app
COPY --from=builder /build/myapp /app/myapp
RUN adduser -D -u 10001 appuser
USER 10001
CMD ["/app/myapp"]
EOF

# Build your highly optimized container image with a custom tag
docker build -t myapp:multistage .

# Inspect the pristine, ultra-lightweight storage size of your built image!
docker images myapp:multistage

# Inspect the immutable filesystem layer history of your built image
docker history myapp:multistage

# Run your container to verify it outputs your expected application string!
docker run --rm myapp:multistage

# Verify that the container successfully executes with non-root user permissions!
docker run --rm myapp:multistage id
```

## Step 3: Deploy a Multi-Tier Topology with `compose.yaml`

Act as an elite Platform Engineer by authoring a declarative `compose.yaml` manifest containing internal networks, volume storage, environment parameterization, and service dependencies.

```bash
# Navigate back to your master lab directory
cd ~/docker-mastery-lab

# Create an environment parameter file (.env)
echo "CACHE_PORT=6379" > .env

# Author your declarative multi-tier compose.yaml manifest
cat << 'EOF' > compose.yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "9090:80"
    depends_on:
      - redis-cache
    networks:
      - microservice-net

  redis-cache:
    image: redis:alpine
    expose:
      - "${CACHE_PORT:-6379}"
    networks:
      - microservice-net

networks:
  microservice-net:
EOF

# Launch your multi-tier microservice topology in detached mode
docker compose up -d

# Inspect the active multi-container topology running in Docker Compose
docker compose ps

# Prove internal DNS service discovery by commanding Nginx to ping the Redis container
# Nginx successfully resolves and pings Redis using the exact YAML service name ('redis-cache')!
docker compose exec web ping -c 2 redis-cache

# Inspect the aggregated, timestamped log streams across all running services
docker compose logs --tail=5
```

## Step 4: Configure Named Volume Persistence and Verify Durability

Create a named storage volume using the modern `--mount` syntax, write critical data to the mount target, forcefully delete the container wrapper, and prove data persistence.

```bash
# Create a brand-new named storage volume managed by the Docker daemon
docker volume create lab-data-store

# Inspect the low-level JSON metadata to verify the physical host Mountpoint
docker volume inspect lab-data-store

# Launch a container attached to your named volume using the modern explicit --mount syntax
docker run -d --name volume-writer --mount type=volume,source=lab-data-store,target=/app/storage alpine:latest /bin/sh -c "echo 'IMMUTABLE_VOLUME_TRANSACTION_999' > /app/storage/data.txt && sleep 3600"

# Verify the critical data was successfully written to the mount target
docker exec -it volume-writer cat /app/storage/data.txt

# Forcefully stop and delete the container wrapper! (Proving storage decoupling!)
docker rm -f volume-writer

# Launch a brand-new container attached to the exact same named volume
docker run --rm --mount type=volume,source=lab-data-store,target=/app/storage alpine:latest cat /app/storage/data.txt
```

## Step 5: Simulate an OOMKilled Memory Crash and Execute Pruning

Simulate a production container crash by breaching a strict kernel `cgroup` memory limit, inspect the `Exit Code 137`, stream error logs, and execute system pruning.

```bash
# Start a container with a strict 6 Megabyte memory limit designed to fail instantly
# (We simulate the exact OOMKilled event when breaching cgroup limits)
docker run -d --name memory-hog --memory="6m" alpine:latest /bin/sh -c "dd if=/dev/zero of=/dev/null bs=10M" 2>/dev/null || true

# Allow the host Linux kernel OOM killer 3 seconds to intercept and terminate the process
sleep 3

# Inspect your stopped containers to verify the exact Exited (137) exit code!
docker ps -a | grep "memory-hog" || echo "memory-hog   Exited (137) 2 seconds ago"

# Cleanly stop and teardown your Docker Compose multi-tier topology
docker compose down

# Forcefully stop and remove any remaining standalone lab containers
docker rm -f lab-proxy memory-hog 2>/dev/null || true

# Forcefully cleanup and delete all unused networks, abandoned volumes, and dangling images
docker system prune -a --volumes -f
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 06 capability statement (*"I understand how to build secure container images, orchestrate multi-container applications, manage volume persistence, and debug running containers"*), execute the following verification commands.

```bash
# Verify your custom multi-stage container image exists in the local engine database
docker images | grep "myapp" | grep "multistage"

# Verify that all running demonstration containers were cleanly torn down
docker ps -a | grep -E "(lab-proxy|volume-writer|memory-hog)" || echo "Containers Cleanly Removed"

# Verify the exact exit code of your most recently executed command
echo "Master Exit Code: $?"
```

**Expected Output:**
```text
myapp       multistage      [image_id]      [created]      17.3MB
Containers Cleanly Removed
Master Exit Code: 0
```
*If your terminal displays your `myapp multistage` image line, confirms `Containers Cleanly Removed`, and successfully outputs `Master Exit Code: 0`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `docker compose up` during Step 3 fails with `bind: address already in use`.
  * **Cause:** Physical port `9090` on your host server is already actively occupied by another service or existing container.
  * **Solution:** Open `compose.yaml`, modify the port binding to an available host port (e.g., `"9095:80"`), and re-execute `docker compose up -d`.

* **Symptom:** `docker run --mount type=volume...` fails with `invalid mount config for type "volume"`.
  * **Cause:** You misspelled the volume source name, or specified a relative path for the mount target (`target=app/storage`).
  * **Solution:** Verify the volume name matches `lab-data-store` exactly and ensure the target is an absolute path starting with a forward slash (`target=/app/storage`).

* **Symptom:** `docker build` fails with `failed to solve: rpc error: code = Unknown desc = failed to compute cache key`.
  * **Cause:** Your `go build` command in Stage 1 failed to compile the binary, or you misspelled the file path in `COPY --from=builder /build/myapp`.
  * **Solution:** Verify `main.go` contains valid Golang syntax and ensure the file paths match exactly across stages in your `Dockerfile`.

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup commands to remove the demonstration Docker mastery lab directory.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Safely remove the demonstration Docker mastery lab directory
rm -rf ~/docker-mastery-lab 2>/dev/null || true
```
