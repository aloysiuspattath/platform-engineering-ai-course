# Linux Administration — Learner Cheat Sheet

## Topic Summary
Linux is a secure, multi-user operating system that uses permissions, systemd services, and process isolation to manage server resources. This cheat sheet covers the essential commands to manage users, file permissions, running processes, system services, networking, packages, and bash automation.

## Key Concepts
* **User & Group IDs (UID/GID):** Linux tracks users by ID numbers. `root` is UID 0 (master administrator). Standard users are UID 1000+.
* **sudo (Superuser Do):** Allows standard users to temporarily elevate their privileges to execute administrative commands securely and auditably.
* **Process (PID):** A running instance of a program, tracked by a Process ID. `systemd` is always PID 1.
* **Systemd (Daemon Manager):** The master init system that launches and manages background services (daemons).
* **Package Manager (apt/dnf):** Automates the installation, upgrading, and dependency resolution of software from centralized repositories.
* **Shebang (`#!/bin/bash`):** The first line of a bash script that tells the kernel which interpreter to use.

## Important Files & Directories
* `/etc/passwd`: Master list of all user accounts on the server.
* `/etc/shadow`: Encrypted password hash file (requires sudo).
* `/etc/sudoers`: Policy file defining which users/groups can use sudo (edit ONLY with `sudo visudo`).
* `/usr/lib/systemd/system/` (or `/etc/systemd/system/`): Directory containing systemd unit (`.service`) configuration files.

## User & Group Administration
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **View active identity** | `id [username]` | Prints your active UID, GID, and secondary groups. |
| **Create user** | `sudo useradd -m -s /bin/bash username` | `-m` makes the home dir; `-s` sets default shell. |
| **Add user to group** | `sudo usermod -aG groupname username` | `-aG` = **a**ppend to **G**roup. |
| **Delete user** | `sudo userdel -r username` | `-r` completely removes their home directory. |

*Related Lesson: [MOD-LINUX-ADM-01](../modules/module-02/lesson-01.md)*

## File Permissions & Ownership
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **Add execute permission**| `chmod u+x script.sh` | **u**ser **+** **x** (execute). |
| **Set standard directory** | `chmod 755 folder/` | `rwxr-xr-x` (User:7, Group:5, Others:5). |
| **Set secure secrets file**| `chmod 600 key.pem` | `rw-------` (User:6). Mandatory for SSH keys! |
| **Change owner & group** | `sudo chown user:group file` | Changes both owner and group simultaneously. |

> [!CAUTION]
> **Never use `chmod 777` to fix permission issues!** It grants read/write/execute to everyone in the world and destroys system security.

*Related Lesson: [MOD-LINUX-ADM-02](../modules/module-02/lesson-02.md)*

## Process & Job Management
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **Find running process** | `ps aux \| grep process_name` | Takes a static snapshot of all processes. |
| **View live resources** | `top` or `htop` | Real-time CPU/Memory monitor. (Press `q` to quit). |
| **Run in background** | `[command] &` | Adds job to background, returning your prompt. |
| **Polite shutdown** | `kill [PID]` | Sends `SIGTERM` to safely shut down a process. |

> [!CAUTION]
> Avoid using `kill -9 [PID]` (`SIGKILL`) unless a process is completely frozen. It forces instant termination without saving data or closing database connections cleanly.

*Related Lesson: [MOD-LINUX-ADM-03](../modules/module-02/lesson-03.md)*

## Service Management (systemctl)
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **Check service health** | `systemctl status [service]` | Displays active status and recent logs. |
| **Start / Stop service** | `sudo systemctl start\|stop [service]`| Powers the daemon on or off. |
| **Reload config safely** | `sudo systemctl reload [service]` | Re-reads configuration without dropping active users. |
| **Enable on boot** | `sudo systemctl enable [service]`| Service will start automatically when server turns on. |
| **View live logs** | `sudo journalctl -u [service] -f` | `-f` (**f**ollow) streams live log output to screen. |

*Related Lesson: [MOD-LINUX-ADM-04](../modules/module-02/lesson-04.md)*

## Networking Basics
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **View IP addresses** | `ip addr show` | Replaces the deprecated `ifconfig`. |
| **Test connectivity** | `ping -c 4 [hostname]` | `-c 4` sends exactly 4 packets (prevents infinite loop). |
| **View listening ports** | `sudo ss -tulpn` | **t**cp, **u**dp, **l**istening, **p**rocess, **n**umeric. |
| **Fetch HTTP headers** | `curl -I http://example.com` | `-I` fetches headers only (e.g., `HTTP 200 OK`). |

*Related Lesson: [MOD-LINUX-ADM-05](../modules/module-02/lesson-05.md)*

## Package Management (APT)
| Task | Command | Memory Aid / Note |
| :--- | :--- | :--- |
| **Update catalog cache** | `sudo apt update` | Do this *before* installing anything! |
| **Install non-interactive**| `sudo apt install -y [package]` | `-y` auto-answers "yes", crucial for scripts. |
| **Upgrade installed apps** | `sudo apt upgrade -y` | Upgrades software based on updated catalog. |

*Related Lesson: [MOD-LINUX-ADM-06](../modules/module-02/lesson-06.md)*

## Bash Scripting Automation
```bash
#!/bin/bash
set -euo pipefail # Strict safety: Abort on errors or undefined variables

BACKUP_DIR="/tmp/backup" # No spaces around equals sign!

if [ ! -d "$BACKUP_DIR" ]; then # Mandatory spaces inside brackets [ ]
    mkdir -p "$BACKUP_DIR"
fi

for SERVER in "app-01" "app-02"; do
    echo "Processing $SERVER..." # Double quotes interpolate variables
done

echo "Finished with exit code: $?" # $? holds the exit code of last command
```
*Don't forget to run `chmod +x script.sh` to make it executable!*

*Related Lesson: [MOD-LINUX-ADM-07](../modules/module-02/lesson-07.md)*
*Related Lab: [LAB-MOD-LINUX-ADM-01](../labs/linux-administration.md)*

## Common Beginner Mistakes
* **Using `chmod 777`:** Destroys file security. Use `chmod u+x` for scripts, `600` for keys, `755` for directories.
* **Forgetting `-y` in `apt install`:** Causes automated scripts (like Dockerfiles) to freeze indefinitely.
* **Spaces in Bash Variables:** `VAR = "hello"` fails. Must be `VAR="hello"`.
* **Missing `sudo` with `ss -tulpn`:** Running `ss -tulpn` without `sudo` will hide the process names/PIDs owning the ports.
* **Confusing `apt update` with `apt upgrade`:** `update` only refreshes the list of available software; `upgrade` actually updates the installed programs.
