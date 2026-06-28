# Networking Fundamentals: Engineering Competence Assessment

## Quiz Metadata
* **Quiz ID:** QUIZ-MOD-NET-01
* **Associated Module/Lesson:** Module 04 (Networking Fundamentals)
* **Passing Score:** 80%

---

## Section 1: Multiple Choice & Multiple Select Questions

### Question 1: 
Which of the following OSI layers is primarily responsible for logical addressing, subnetting, and determining the optimal path for packets to travel across distinct network boundaries?
* A) Layer 2 (Data Link)
* B) Layer 3 (Network)
* C) Layer 4 (Transport)
* D) Layer 7 (Application)

### Question 2:
When architecting a high-throughput, real-time metrics pipeline (e.g., streaming telemetry to StatsD), why would an engineer explicitly select UDP over TCP as the transport layer protocol?
* A) UDP provides built-in cryptographic encryption for telemetry data.
* B) UDP ensures guaranteed delivery and automatic retransmission of lost packets.
* C) UDP establishes a persistent stateful connection, preventing firewall timeouts.
* D) UDP avoids the overhead of connection establishment (three-way handshake) and packet acknowledgment, prioritizing raw throughput over guaranteed delivery.

### Question 3:
An engineer needs to audit a Linux server's network configuration. Which of the following commands are modern, standard tools (from the `iproute2` or standard network suites) used to inspect active sockets, routing tables, and interface IP allocations? (Select all that apply)
* A) `ip addr show`
* B) `ip route show`
* C) `ss -atn`
* D) `dig +trace example.com`

---

## Section 2: Command Interpretation & Log Analysis

### Question 4: 
During the deployment of a new reverse proxy, an engineer executes a syntax check on their configuration and receives the following terminal output:

```text
$ sudo nginx -t
nginx: [emerg] could not build server_names_hash, you should increase server_names_hash_bucket_size
nginx: configuration file /etc/nginx/nginx.conf test failed
```
**Question:** What is the exact underlying root cause of this failure, and what is the remediation step?
* A) The server block is missing a `listen` directive; the engineer must add `listen 80;`.
* B) The SSL certificate has expired; the engineer must renew it using `openssl x509`.
* C) The custom domain name (`server_name`) is too long for the default memory bucket allocation; the engineer must increase `server_names_hash_bucket_size` in the `http {}` block.
* D) The Nginx daemon lacks root privileges to bind to port 80; the engineer must run `sudo systemctl restart nginx`.

### Question 5:
An engineer attempts to test a newly configured Nginx reverse proxy using curl, but encounters the following fatal error:

```text
$ curl -I http://custom-ai-proxy.internal:8080
curl: (7) Failed to connect to custom-ai-proxy.internal port 8080: Connection refused
```
**Question:** Based on the specific error code `Connection refused`, what is the precise state of the system?
* A) The DNS resolver cannot find an 'A' record for `custom-ai-proxy.internal`.
* B) The backend API server is timing out, causing Nginx to return a `504 Gateway Timeout`.
* C) The OS kernel rejected the TCP SYN packet because no active daemon (like Nginx) is currently listening on port 8080 at that IP address.
* D) The X.509 SSL certificate provided by the proxy is expired or untrusted.

---

## Section 3: Scenario & Architectural Decisions

### Question 6: 
An enterprise platform team needs to expose an internal API to external clients. The API requires strict inspection of HTTP headers (specifically injecting the `X-Forwarded-For` header to log original client IPs) and URL path-based routing to direct traffic to different microservices. 

**Question:** What is the most robust architectural solution to resolve this issue, and what trade-offs must be considered?
* A) Deploy a Layer 4 (TCP) reverse proxy, which provides maximum throughput by routing packets blindly without inspecting or modifying the HTTP payload.
* B) Deploy a Layer 7 (HTTP) reverse proxy (such as Nginx), which terminates the TCP connection, inspects the HTTP payload to inject headers, and routes based on URL paths, at the cost of slight processing overhead.
* C) Modify the enterprise DNS zone to include multiple 'A' records, relying on DNS Round Robin to route paths and headers to the correct microservice.
* D) Deploy a Berkeley Packet Filter (eBPF) script to rewrite the HTTP headers directly at the kernel level without using any proxy daemon.

---

## Section 4: Short Answer & Reflection Questions

### Question 7: 
Explain the fundamental difference between an **authoritative DNS server** and a **recursive DNS resolver**. Detail the role each plays when a user types `example.com` into their browser.

---

## Answer Key & Explanations

<details>
<summary>Click to view answers and comprehensive engineering explanations</summary>

### Section 1: Multiple Choice & Multiple Select Answers
1. **B) Layer 3 (Network)**
   * **Explanation:** The Network layer (Layer 3) of the OSI model is responsible for packet forwarding, routing, and logical addressing (IP addresses). It allows traffic to traverse different physical networks (subnets) using routers.
   * **Why Alternatives are Incorrect:** 
     * *Layer 2 (Data Link)* handles MAC addressing and local switching within the same broadcast domain.
     * *Layer 4 (Transport)* handles port numbers, TCP/UDP protocols, and connection states.
     * *Layer 7 (Application)* handles high-level application protocols like HTTP and DNS.
   * **Lesson Reference:** Module 04, Lesson 01: The OSI Model, TCP/IP Suite & Socket Mechanics.

2. **D) UDP avoids the overhead of connection establishment (three-way handshake) and packet acknowledgment, prioritizing raw throughput over guaranteed delivery.**
   * **Explanation:** UDP is a connectionless protocol. For high-volume, real-time metrics (like StatsD), dropping a single data point is less detrimental than the latency and overhead introduced by TCP's three-way handshake, sequence tracking, and acknowledgments.
   * **Why Alternatives are Incorrect:** 
     * UDP does not provide built-in cryptographic encryption (that requires TLS/DTLS).
     * UDP explicitly does *not* guarantee delivery or retransmission (that is TCP's role).
     * UDP is stateless, not stateful.
   * **Lesson Reference:** Module 04, Lesson 01: The OSI Model, TCP/IP Suite & Socket Mechanics.

3. **A) `ip addr show`, B) `ip route show`, C) `ss -atn`**
   * **Explanation:** These are the canonical `iproute2` utilities for managing modern Linux networking. `ip addr show` displays interfaces/IPs, `ip route show` displays the routing table, and `ss -atn` displays active TCP sockets.
   * **Why Alternatives are Incorrect:** 
     * `dig +trace example.com` is a DNS diagnostic tool from `dnsutils`, not used for inspecting local sockets, routing tables, or interface IP configurations.
   * **Lesson Reference:** Module 04, Lab: Networking Fundamentals, Proxying & Packet Analysis.

### Section 2: Command Interpretation & Log Analysis Answers
4. **C) The custom domain name (`server_name`) is too long for the default memory bucket allocation; the engineer must increase `server_names_hash_bucket_size` in the `http {}` block.**
   * **Explanation:** Nginx allocates memory in hash buckets for server names. If a domain name (like `custom-ai-proxy.internal`) exceeds the default bucket size, Nginx fails validation. Increasing the `server_names_hash_bucket_size` (typically to 64) resolves the memory allocation issue.
   * **Why Alternatives are Incorrect:** 
     * Missing a `listen` directive triggers a different error or falls back to port 80 silently.
     * Expired SSL certificates do not cause memory bucket hash errors.
     * Lack of root privileges to bind port 80 triggers a `Permission denied (13)` error.
   * **Lesson Reference:** Module 04, Lab: Networking Fundamentals (Troubleshooting Section).

5. **C) The OS kernel rejected the TCP SYN packet because no active daemon (like Nginx) is currently listening on port 8080 at that IP address.**
   * **Explanation:** `Connection refused` (ECONNREFUSED) is a specific TCP/IP state indicating that the target host was reached, but the operating system explicitly rejected the connection because no process has a bound listening socket on the requested port. 
   * **Why Alternatives are Incorrect:** 
     * DNS resolution failure outputs `Could not resolve host`.
     * API timeout results in HTTP `504 Gateway Timeout` or `curl (28) Connection timed out`.
     * SSL issues result in a TLS handshake failure (e.g., `curl (60) SSL certificate problem`), not a TCP connection refusal.
   * **Lesson Reference:** Module 04, Lab: Networking Fundamentals (Troubleshooting Section).

### Section 3: Scenario & Architectural Decision Answers
6. **B) Deploy a Layer 7 (HTTP) reverse proxy (such as Nginx), which terminates the TCP connection, inspects the HTTP payload to inject headers, and routes based on URL paths, at the cost of slight processing overhead.**
   * **Explanation:** Layer 7 proxies understand HTTP semantics. To inject an `X-Forwarded-For` header and route based on URLs (e.g., `/api/v1/`), the proxy must terminate the TCP stream and inspect the HTTP payload.
   * **Why Alternatives are Incorrect:** 
     * Layer 4 proxies cannot read or modify HTTP headers because they operate at the transport layer (TCP), routing raw packets.
     * DNS Round Robin cannot perform URL path routing or modify HTTP headers.
     * eBPF is exceptionally powerful for kernel-level packet manipulation but is profoundly over-engineered and inappropriate for simple HTTP header injection, which is a solved problem for reverse proxies.
   * **Lesson Reference:** Module 04, Lesson 01: Layer 4 (TCP) vs. Layer 7 (HTTP) Load Balancing.

### Section 4: Short Answer & Reflection Answers
7. **Expected Solution Criteria:**
   * **Recursive Resolver:** Acts as the client's agent (the "middleman"). It receives the initial query from the user's browser, checks its local cache, and if the record is missing, recursively traverses the DNS hierarchy (Root -> TLD -> Authoritative) on the client's behalf.
   * **Authoritative Server:** The definitive source of truth for a specific domain (e.g., `example.com`). It holds the actual DNS records (A, CNAME, TXT) and responds to the recursive resolver with the final IP address.
   * **Flow Context:** The user asks the recursive resolver, the recursive resolver asks the authoritative server, and the authoritative server replies to the recursive resolver, which forwards the answer to the user.
   * **Lesson Reference:** Module 04, Lab: Networking Fundamentals (Step 2: Deep DNS Query Inspection).

</details>
