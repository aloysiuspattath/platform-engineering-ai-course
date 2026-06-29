---
id: "MOD-11-03"
title: "Automated Container Builds and Scanning"
module: "MOD-11"
type: "lesson"
difficulty: "Intermediate"
estimated_reading_time: "20m"
estimated_hands_on_time: "20m"
learning_objectives:
  - "Automate Docker image building in CI"
  - "Implement container vulnerability scanning"
  - "Publish container images to a registry securely"
prerequisites:
  - "MOD-11-02"
tags:
  - "Docker"
  - "Security"
  - "Trivy"
version: "1.0.0"
status: "approved"
last_updated: "2026-06-28"
---

# Automated Container Builds and Scanning

Modern CI pipelines must not only build software but also ensure its security. Building container images and scanning them for vulnerabilities before deployment is a critical best practice.

## Building and Pushing Container Images

Using GitHub Actions, you can automate the process of building a Docker image and pushing it to a container registry like Docker Hub, GitHub Container Registry (GHCR), or AWS ECR.

## Vulnerability Scanning with Trivy

Trivy is a comprehensive security scanner. It is highly suitable for CI/CD pipelines due to its speed and ease of use.

### Example Integration

```yaml
steps:
  - name: Build an image from Dockerfile
    run: docker build -t my-app:${{ github.sha }} .
    
  - name: Run Trivy vulnerability scanner
    uses: aquasecurity/trivy-action@master
    with:
      image-ref: 'my-app:${{ github.sha }}'
      format: 'table'
      exit-code: '1'
      ignore-unfixed: true
      vuln-type: 'os,library'
      severity: 'CRITICAL,HIGH'
```

By setting `exit-code: '1'`, the CI pipeline will fail if critical or high vulnerabilities are detected, preventing insecure code from reaching production.
