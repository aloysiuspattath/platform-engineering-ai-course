# Linux Administration — Pro Reference

## System Service & Daemon Management
| Action | `systemctl` Command | `journalctl` Command |
| :--- | :--- | :--- |
| **Status / PID** | `systemctl status <svc>` | `journalctl -u <svc> -n 50` |
| **Start / Stop** | `systemctl start\|stop <svc>` | `journalctl -u <svc> -S "1 hour ago"` |
| **Graceful Reload**| `systemctl reload <svc>` | `journalctl -u <svc> -f` (Live tail) |
| **Boot Startup** | `systemctl enable\|disable <svc>`| `journalctl -b` (Current boot logs) |
| **Config Update** | `systemctl daemon-reload` | (Run after modifying `.service` files) |

## Process Control & Signals
| Task | Command | Description |
| :--- | :--- | :--- |
| **Static Snapshot**| `ps aux \| grep -v grep \| grep <name>` | Find PID across all users. |
| **Find PID Fast** | `pgrep <name>` | Returns only the PID number. |
| **Live Monitor** | `top` / `htop` | Interactive resource consumption. |
| **Polite Term** | `kill <PID>` / `pkill <name>` | Sends `SIGTERM` (15). Graceful exit. |

> [!CAUTION]
> **SIGKILL (`kill -9`) Execution:**
> `kill -9 <PID>` completely bypasses the application and drops a kernel-level termination. It causes database corruption if active transactions exist. Only use if `SIGTERM` fails after 30 seconds.

## Permission Hardening & Octals
| Target | Octal | Symbolic | Description |
| :--- | :--- | :--- | :--- |
| **Scripts / Dirs** | `755` | `u=rwx,go=rx` | Owner can read/write/exec. Everyone can read/exec. |
| **Config / Text** | `644` | `u=rw,go=r` | Owner can read/write. Everyone can read. |
| **SSH / Secrets** | `600` | `u=rw,go=` | Owner read/write only. Fails SSH checks if open. |
| **Recursion** | `-R` | `chmod -R 755 dir/`| Applies to all files and subdirectories. |

**Ownership Updates:**
`sudo chown user:group file`
`sudo chown -R user:group directory/`

> [!CAUTION]
> **Avoid `chmod -R` when possible.** 
> Use `find` to surgically target files vs directories.
> Files: `find /path -type f -exec chmod 644 {} \+`
> Dirs: `find /path -type d -exec chmod 755 {} \+`

## Network Diagnostics
| Scope | Command | Purpose |
| :--- | :--- | :--- |
| **Interfaces/IPs** | `ip addr show` | Identify local network interfaces and assigned IPs. |
| **Routes** | `ip route show` | Identify default gateway and static routes. |
| **Listening Sockets**| `sudo ss -tulpn` | Crucial: Requires `sudo` to display owning Process IDs. |
| **Specific Port** | `sudo ss -tulpn \| grep :<port>` | Isolates active socket binding (e.g., `grep :80`). |
| **HTTP Headers** | `curl -I <url>` | Fetch response headers only (HTTP 200, 500). |
| **Health Check** | `curl -f <url>` | Fails silently with exit code > 0 on HTTP errors. |

## Package Automation
| Action | Debian/Ubuntu (`apt`) | RHEL/Fedora (`dnf`) |
| :--- | :--- | :--- |
| **Update Cache** | `sudo apt update` | `sudo dnf check-update` |
| **Install** | `sudo apt install -y <pkg>` | `sudo dnf install -y <pkg>` |
| **Remove** | `sudo apt remove -y <pkg>` | `sudo dnf remove -y <pkg>` |
| **Clean Orphans**| `sudo apt autoremove -y` | `sudo dnf autoremove -y` |

> [!TIP]
> **Container Optimization:** Always clean the package cache in the same RUN layer:
> `RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*`

## Production Bash Snippets
**Strict Mode Header:**
```bash
#!/bin/bash
set -euo pipefail
# -e: Abort on non-zero exit code
# -u: Abort on unbound (undefined) variable
# -o pipefail: Abort if any command in a pipeline fails
```

**Systemd Unit Template (`/etc/systemd/system/myapp.service`):**
```ini
[Unit]
Description=My Custom Microservice
After=network.target

[Service]
ExecStart=/usr/bin/python3 /opt/myapp/app.py
Restart=on-failure
RestartSec=5s
User=appuser

[Install]
WantedBy=multi-user.target
```
