# Networking Fundamentals: Learner Cheat Sheet

## Topic Summary
Networking enables data to traverse the world. From OSI models to reverse proxies, mastering networking means understanding how packets are routed, domains are resolved, traffic is secured, and requests are balanced.

## Memory Aids & Concepts
* **OSI 7 Layers:** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (Physical, Data Link, Network, Transport, Session, Presentation, Application).
* **TCP vs UDP:** TCP ensures delivery (3-Way Handshake: `SYN ──►`, `◄── SYN-ACK`, `ACK ──►`); UDP fires and forgets.
* **Subnet Masks (CIDR):** `/24` locks 24 bits for the network, leaving 256 IPs. Smaller slash = MORE hosts (`/16` = 65k IPs).
* **DNS Flow:** Check `/etc/hosts` first, then `/etc/resolv.conf`.
* **Reverse Proxy:** Client talks to proxy (e.g., Nginx), proxy talks to hidden backend (e.g., Python app).

## Essential Files & Configurations
| Path | Purpose | Related Lesson |
| ---- | ------- | -------------- |
| `/etc/resolv.conf` | DNS resolver config (Nameservers) | [MOD-NET-03](../output/approved/module-04/lesson-03.md) |
| `/etc/hosts` | Local DNS overrides (Bypasses external DNS) | [MOD-NET-03](../output/approved/module-04/lesson-03.md) |
| `/etc/ssh/sshd_config`| SSH Daemon hardening | [MOD-NET-05](../output/approved/module-04/lesson-05.md) |
| `/etc/nginx/nginx.conf`| Master Nginx configuration | [MOD-NET-04](../output/approved/module-04/lesson-04.md) |

## Command Reference

### Sockets & Routing
````bash
# View active listening TCP/UDP sockets
sudo ss -tulpn

# Show active network interfaces and IPs
ip addr show

# Show routing tables and default gateway (0.0.0.0/0)
ip route show

# Check which route Linux will use for an IP
ip route get 8.8.8.8
````

### DNS & HTTP
````bash
# Query the 'A' record (IP) cleanly
dig google.com +short

# View raw HTTP headers and status codes
curl -I https://example.com

# Test Nginx syntax (ALWAYS do this before reloading!)
sudo nginx -t
````

### Encryption & Packets
````bash
# Check SSL certificate expiration date
openssl x509 -in cert.pem -noout -enddate

# Generate secure ED25519 SSH keys
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519

# Capture live HTTP packets on eth0
sudo tcpdump -i eth0 -nn -A port 80
````

## Common Beginner Mistakes
* **Confusing Port & Protocol:** Port 80 doesn't have to be HTTP. You can run SSH on Port 80! ([MOD-NET-01](../output/approved/module-04/lesson-01.md))
* **Private IP on Public DNS:** Private IPs (`10.x`, `192.168.x`) cannot cross the internet. Don't put them in public DNS! ([MOD-NET-02](../output/approved/module-04/lesson-02.md))
* **Missing Nginx Semicolons:** Forgetting a `;` in `nginx.conf` crashes Nginx. Run `nginx -t` before restarting. ([MOD-NET-04](../output/approved/module-04/lesson-04.md))
* **tcpdump Without BPF/Numeric Flags:** Running `tcpdump` without `-nn` or omitting `not port 22` can cause massive DNS storms and infinite SSH feedback loops. ([MOD-NET-06](../output/approved/module-04/lesson-06.md))

## Related Curriculum
* **Lab:** [LAB-MOD-NET-01: Packet Analysis & Proxying](../labs/networking-fundamentals.md)
