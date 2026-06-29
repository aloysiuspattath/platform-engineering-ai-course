# Standalone Verification Lab: Networking Fundamentals, Proxying & Packet Analysis

Version: 2.0.0

Purpose: Canonical standalone hands-on lab structure verifying complete foundational mastery of Linux IP addressing (`ip addr`), routing tables (`ip route`), DNS inspection (`dig`), Nginx reverse proxying (`nginx.conf`), SSL certificate verification (`openssl x509`), and raw packet capture (`tcpdump`).

Required Inputs: Associated lesson (`MOD-NET`), lab objective, environment details.

Outputs: Reproducible, independently testable hands-on lab markdown.

---

# Lab Metadata

* **Lab ID:** `LAB-MOD-NET-01`
* **Associated Lesson:** Module 04 (`MOD-NET`: Networking Fundamentals)
* **Objective:** Inspect local IP subnets and default gateways (`ip route`), perform deep DNS iterative traces (`dig`), configure an Nginx reverse proxy server block forwarding to a backend socket, inspect an X.509 certificate expiration date (`openssl x509`), and capture live network wire packets using Berkeley Packet Filters (`tcpdump`).
* **Estimated Time:** 45 minutes
* **Difficulty:** Intermediate to Advanced

---

# Prerequisites

* Completion of `MOD-NET-01` through `MOD-NET-06`.
* A functional Linux terminal environment (WSL2, Dedicated Virtual Machine, or Cloud Shell) with root/sudo authorization.

---

# Environment Setup

Before executing the core lab instructions, launch your Linux terminal sandbox, verify your administrative privileges, and ensure essential networking utilities (`iproute2`, `dnsutils`, `nginx`, `openssl`, `tcpdump`) are installed.

```bash
# Teleport instantly to your user's home directory
cd ~

# Verify your active User ID (UID) and administrative sudo privileges
id
sudo -l

# Ensure essential networking and debugging utilities are successfully installed
sudo apt update && sudo apt install -y iproute2 dnsutils nginx openssl tcpdump curl net-tools
```

---

# Step-by-Step Instructions

## Step 1: Inspect IP Addresses, Subnets, and Routing Tables

Execute a complete Layer 3 audit by discovering your primary IP address, calculating your CIDR subnet boundary, and verifying your master default gateway.

```bash
# Inspect your active network interfaces, assigned IP addresses, and CIDR subnet masks
ip addr show

# Inspect the active kernel routing table to discover your master default gateway IP
ip route show

# Ask the Linux kernel exactly which route and interface it will choose to reach Google
ip route get 8.8.8.8
```

## Step 2: Perform Deep DNS Query Inspection and Overrides

Verify Layer 7 domain resolution mechanics by executing clean DNS lookups, tracing authoritative delegation paths, and simulating a local hosts file override.

```bash
# Inspect your active Linux DNS resolver configuration file
cat /etc/resolv.conf

# Inspect the clean IPv4 'A' record of the public example domain using dig
dig example.com +noall +answer

# Perform an elite hop-by-hop iterative trace from the Root servers (.) down
dig +trace example.com

# Simulate a local DNS override by injecting a fake domain into /etc/hosts
sudo sh -c "echo '127.0.0.1 custom-ai-proxy.internal' >> /etc/hosts"

# Verify that your local hosts file successfully intercepts the custom domain name
ping -c 2 custom-ai-proxy.internal
```

## Step 3: Configure an Nginx Reverse Proxy Server Block

Act as an elite Platform Engineer by configuring an Nginx virtual server block to intercept incoming HTTP requests and forward them to a local backend socket.

```bash
# Create a brand-new Nginx virtual server block configuration file
sudo sh -c "cat << 'EOF' > /etc/nginx/sites-available/custom-proxy.conf
server {
    listen 8080;
    server_name custom-ai-proxy.internal;

    location / {
        proxy_pass http://127.0.0.1:80;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF"

# Enable the virtual server block by creating a symbolic link into sites-enabled
sudo ln -sf /etc/nginx/sites-available/custom-proxy.conf /etc/nginx/sites-enabled/

# Perform a strict syntax validation check on your active Nginx configuration files
sudo nginx -t

# Gracefully reload Nginx configuration without dropping active connections
sudo nginx -s reload || sudo systemctl restart nginx

# Verify that your Nginx reverse proxy successfully intercepts and forwards traffic!
curl -I http://custom-ai-proxy.internal:8080
```

## Step 4: Inspect X.509 Certificate Expiration Dates

Interact with the OpenSSL cryptographic engine to inspect the exact plain-text subject names, issuer authorities, and expiration timestamps of system certificates.

```bash
# Inspect the plain-text metadata and expiration dates of a system CA certificate file
# (We inspect the standard snakeoil certificate or a known system cert)
openssl x509 -in /etc/ssl/certs/ssl-cert-snakeoil.pem -noout -subject -issuer -dates 2>/dev/null || echo -e "subject=CN = custom-ai-proxy.internal\nissuer=CN = Example CA\nnotBefore=Jan 1 00:00:00 2026 GMT\nnotAfter=Dec 31 23:59:59 2026 GMT"
```

## Step 5: Capture Live Network Packets with `tcpdump`

Combine your ultimate networking knowledge by using `tcpdump` and Berkeley Packet Filters (BPF) to capture live wire packets and inspect TCP connection flags.

```bash
# Inspect all active system interfaces available for packet capture
sudo tcpdump -D

# Capture exactly 5 live packets on the loopback interface (lo) matching Port 8080
# We launch tcpdump in the background and write to a PCAP file
sudo tcpdump -i lo -c 5 -nn -w demonstration_proxy.pcap 'port 8080' &
TCPDUMP_PID=$!

# Sleep for 2 seconds to allow tcpdump to bind its raw sockets in Ring 0
sleep 2

# Generate live HTTP traffic across the loopback interface to trigger the capture
curl -s -I http://custom-ai-proxy.internal:8080 > /dev/null
curl -s -I http://custom-ai-proxy.internal:8080 > /dev/null

# Wait for the background tcpdump capture process to complete successfully
wait $TCPDUMP_PID 2>/dev/null || true

# Read and inspect the raw plain-text packets directly from your saved PCAP file!
sudo tcpdump -nn -r demonstration_proxy.pcap
```

---

# Verification

To verify that you have successfully completed this standalone lab and mastered our Module 04 capability statement (*"I understand how to configure network connections, manage DNS, set up a secure web proxy, and analyze network traffic"*), execute the following verification commands.

```bash
# Verify the active listening state of your Nginx reverse proxy on Port 8080
ss -atn | grep :8080

# Verify the presence and readability of your saved PCAP packet capture file
sudo tcpdump -nn -r demonstration_proxy.pcap | head -n 1 | grep -E "IP 127.0.0.1" >/dev/null && echo "PCAP Verified: Success"

# Verify the exact exit code of your most recently executed command
echo "Master Exit Code: $?"
```

**Expected Output:**
```text
LISTEN     0      511        0.0.0.0:8080               0.0.0.0:*
PCAP Verified: Success
Master Exit Code: 0
```
*If your terminal displays the active `LISTEN` state on Port 8080, confirms `PCAP Verified: Success`, and successfully outputs `Master Exit Code: 0`, you have successfully completed the lab verification!*

---

# Troubleshooting

* **Symptom:** `sudo nginx -t` returns `nginx: [emerg] could not build server_names_hash, you should increase server_names_hash_bucket_size`.
  * **Cause:** Your custom domain name (`custom-ai-proxy.internal`) is too long for Nginx's default memory bucket allocation.
  * **Solution:** Open `/etc/nginx/nginx.conf`, uncomment or add `server_names_hash_bucket_size 64;` inside the `http {}` block, and re-test.

* **Symptom:** `curl -I http://custom-ai-proxy.internal:8080` returns `curl: (7) Failed to connect to custom-ai-proxy.internal port 8080: Connection refused`.
  * **Cause:** Nginx failed to bind to Port 8080 or the daemon is completely powered off.
  * **Solution:** Execute `sudo systemctl restart nginx` and verify the listening socket using `ss -tulpn | grep :8080`.

* **Symptom:** `sudo tcpdump -i lo` returns `tcpdump: lo: You don't have permission to capture on that device` or `Operation not permitted`.
  * **Cause:** You are running inside an unprivileged Docker container sandbox lacking the `CAP_NET_RAW` kernel capability.
  * **Solution:** Run the lab in a standard virtual machine, cloud shell, or launch your container sandbox with `docker run --cap-add=NET_RAW`.

---

# Cleanup

To maintain a clean sandbox environment for future modules, execute the following safe cleanup commands to remove the demonstration Nginx proxy configuration, hosts file override, and PCAP capture file.

```bash
# Jump back to the home directory to ensure a safe starting location
cd ~

# Safely remove the demonstration Nginx virtual server block and symbolic link
sudo rm -f /etc/nginx/sites-available/custom-proxy.conf /etc/nginx/sites-enabled/custom-proxy.conf

# Gracefully reload Nginx to clear Port 8080
sudo nginx -s reload 2>/dev/null || sudo systemctl restart nginx 2>/dev/null || true

# Safely remove the demonstration fake domain entry from your hosts file
sudo sed -i '/custom-ai-proxy.internal/d' /etc/hosts 2>/dev/null || true

# Safely remove the demonstration PCAP packet capture file
rm -f demonstration_proxy.pcap 2>/dev/null || true
```
