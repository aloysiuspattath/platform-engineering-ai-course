# Networking Fundamentals: Professional Quick Reference

## Core Command Matrix

| Task | Command Syntax |
| ---- | -------------- |
| **List Established TCP Sockets** | `ss -atn \| grep ESTAB` |
| **Kernel Protocol Stats** | `netstat -s` |
| **Add Static Route** | `sudo ip route add 10.0.2.0/24 via 192.168.1.1 dev eth0` |
| **Trace DNS Delegation** | `dig +trace [domain]` |
| **Reverse DNS Lookup** | `dig -x [IP] +short` |
| **Check Live Cert Chain** | `openssl s_client -connect [domain]:443 -showcerts` |

## Nginx Reverse Proxy Snippet
````nginx
server {
    listen 80;
    server_name api.ai-platform.internal;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
````

## SSH Hardening (`sshd_config`)
````text
PasswordAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
````

## Advanced Packet Capture (tcpdump & BPF)
> [!TIP]
> Always use `-nn` to prevent DNS lookup storms and `-c` to limit capture file sizes.

| Goal | Command |
| ---- | ------- |
| **Capture HTTP to PCAP** | `sudo tcpdump -i eth0 -c 100 -nn -w capture.pcap 'port 80 or port 443'` |
| **Filter by TCP SYN** | `sudo tcpdump -i eth0 -nn 'tcp[tcpflags] & tcp-syn != 0'` |
| **Avoid SSH Feedback Loop** | `sudo tcpdump -i eth0 -nn 'not port 22'` |

> [!CAUTION]
> **Modifying Default Routes**
> Deleting the default route (`ip route del default`) instantly severs all external internet connectivity. Use `ip route replace default` or ensure out-of-band management console access is available.

## Troubleshooting Decision Tree

````mermaid
flowchart TD
    A[Connection Failure] --> B{Ping Works?}
    B -->|Yes| C{Curl -I returns 200?}
    C -->|Yes| D[App-Level Issue / Data Payload]
    C -->|502 Bad Gateway| E[Backend App Dead / Connection Refused]
    C -->|504 Timeout| F[Backend App Slow / Stuck]
    B -->|Destination Unreachable| G[ARP Failure / Host Offline]
    B -->|Network Unreachable| H[Missing Routing Table Entry]
    B -->|Timeout / No Response| I[Firewall / Layer 3 Drop]
````

## Production Diagnostics
* **Connection refused (Layer 7):** TCP 3-Way handshakes hit the server, but the kernel bounces back a `RST` because no daemon is listening. Start the app.
* **Connection timed out (Layer 4/3):** The `SYN` packet was fired, but vanished into a black hole. Check cloud Security Groups, VPC routing, or iptables.
* **NXDOMAIN vs SERVFAIL (DNS):** `NXDOMAIN` = Subdomain genuinely doesn't exist. `SERVFAIL` = Upstream resolver crashed or DNSSEC failed.
* **502 vs 504 (Nginx):** 502 = Nginx tried to connect to upstream and got Connection Refused. 504 = Nginx connected, but upstream timed out.
