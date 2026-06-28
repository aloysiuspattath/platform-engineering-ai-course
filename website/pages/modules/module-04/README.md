# Module 04: Networking Fundamentals (`MOD-NET`)

Version: 2.0.0

---

# Module Syllabus & Overview

Welcome to **Module 04: Networking Fundamentals**!

In Modules 01 through 03, you mastered the internal execution engine of a standalone Linux server—navigating the terminal, governing permissions, monitoring daemons, writing automation scripts, and exploring the deepest layers of kernel system calls, cgroups, and namespaces.

However, a highly optimized Linux server or container operating in total isolation cannot serve customers. Modern enterprise cloud platforms are massive, interconnected nervous systems of microservices, cloud databases, AI model inference endpoints, and edge proxies communicating continuously across global computer networks.

This module bridges your standalone server knowledge directly into the distributed cloud ecosystem. We maintain our Version 2.0 educational philosophy: building deep conceptual intuition, demystifying abstract networking models with crystal-clear real-world analogies, and ensuring you develop elite, verifiable network diagnostic abilities.

---

# Capability Statement

> **"I can configure network connections, manage DNS, set up a secure web proxy, and analyze network traffic."**

By the end of this module, you will establish the essential connectivity engineering capabilities required to configure Cloud VPCs, architect load balancers, harden SSH access, and perform deep packet analysis (`tcpdump`, Wireshark) across distributed enterprise environments.

---

# Essential Module Anchors

* **Why am I learning this?** Distributed systems communicate over the network. If you cannot calculate IP subnets, route packets, resolve DNS domains, or intercept failing HTTP requests, your cloud platform cannot function.
* **How will I use it?** You will use these exact skills to calculate VPC CIDR blocks, configure Linux routing tables (`ip route`), debug CoreDNS in Kubernetes, deploy Nginx reverse proxies, manage TLS/SSL certificates, and capture live wire packets (`tcpdump`).
* **Where does this fit into Platform Engineering?** Networking is the fundamental nervous system of Cloud Infrastructure (Stage 3) and Kubernetes Orchestration (Stage 4). You cannot configure an Ingress Controller or Service Mesh without this foundational knowledge.
* **What problem does it solve?** Network timeouts, DNS propagation delays, SSL handshake failures, and asymmetric routing anomalies are the most notoriously difficult problems to troubleshoot in distributed microservices. Networking fundamentals provide absolute visibility into wire-level communications.
* **Where will I use it later?** You will use these skills directly in Module 06 (Docker Networking), Module 08 (Terraform VPC Creation), Module 10 (Kubernetes Ingress & Gateway API), Module 14 (AI Endpoint Exposing), and Module 17 (Multi-Region Topologies).

---

# Lesson Directory

This module consists of six progressive, highly instructional lessons:

1. **[MOD-NET-01: The OSI Model, TCP/IP Suite & Socket Mechanics](lesson-01.md)**
2. **[MOD-NET-02: IP Addressing, Subnetting & Routing Tables](lesson-02.md)**
3. **[MOD-NET-03: DNS Architecture, CoreDNS & Service Discovery Fundamentals](lesson-03.md)**
4. **[MOD-NET-04: HTTP/S, Load Balancing, and Reverse Proxy Architectures (Nginx/Envoy)](lesson-04.md)**
5. **[MOD-NET-05: TLS/SSL Certificates, PKI & Secure Shell (SSH) Hardening](lesson-05.md)**
6. **[MOD-NET-06: Network Packet Analysis & Connectivity Troubleshooting (`tcpdump`, Wireshark)](lesson-06.md)**

---

# Progression & Difficulty Scope

* **Beginner:** 50%
* **Intermediate:** 35%
* **Advanced:** 15%

*Note: In accordance with our Version 2.0 mastery learning progression model, this module establishes foundational wire-level mechanics and protocol intuition before advancing into cloud-scale load balancing and packet sniffing.*
