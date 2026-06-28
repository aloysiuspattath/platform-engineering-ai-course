# Cheat Sheet Generator — Examples

Version: 2.0.0

---

# Example 1: Dense Command Table (Professional Reference)

*Notice the absolute lack of conversational filler. The Pro reference optimizes entirely for speed and syntax.*

## Container Lifecycle Management

| Operation | Command Syntax | Production Context |
| :--- | :--- | :--- |
| **Start Detached** | `docker run -d --name <name> -p <host>:<container> <image>` | Run application workloads in background |
| **Interactive Shell** | `docker exec -it <container_id> /bin/bash` | Live debugging (Ensure shell exists in image) |
| **View Live Logs** | `docker logs -f --tail 100 <container_id>` | Stream latest 100 lines for quick triage |
| **Inspect Metadata** | `docker inspect <container_id> \| grep IPAddress` | Isolate specific container network bindings |

---

# Example 2: Safety Warnings & Alternatives (Both Variants)

*Notice how destructive commands are heavily gated with GitHub callout boxes, dry-run alternatives, and rollback advice.*

## Resource Destruction

> [!CAUTION]
> **Data Loss Risk:** The `terraform destroy` command permanently wipes all cloud infrastructure tracked in the state file. This action is irreversible.

**Safety Workflow:**
1. **Always Dry-Run:** `terraform plan -destroy` (Review exactly what will be deleted)
2. **Execute:** `terraform destroy -auto-approve` (Only use `-auto-approve` in CI/CD pipelines)
3. **Rollback:** If triggered accidentally, you must run `terraform apply` to rebuild, but lost database data must be restored from volume snapshots.

---

# Example 3: Learner vs. Pro Content Formatting

*Notice how the Learner variant includes memory aids and cross-links, while the Pro variant relies purely on structural syntax.*

### Learner Artifact snippet: `linux-permissions-learner-cheatsheet.md`

## Understanding `chmod` (Change Mode)
Use `chmod` to change who can Read (r), Write (w), or Execute (x) a file.

**The Mnemonic (UGO):**
* **U** = User (Owner)
* **G** = Group
* **O** = Others (Everyone else)

**Example:**
```bash
chmod u+x script.sh  # Adds eXecute permission for the User
```
*Struggling with octal numbers (e.g., 755)? Review [MOD-LINUX-BEG-07: File Permissions](../../modules/module-01/lesson-07.md).*

### Professional Artifact snippet: `linux-permissions-pro-reference.md`

## `chmod` Octal Matrix
| Octal | Binary | Permissions | Common Use Case |
| :---: | :---: | :--- | :--- |
| `777` | 111 | `rwx` | **DANGER:** World-writable. Never use in production. |
| `755` | 111 101 101 | `rwxr-xr-x` | Web server directories; Executable bash scripts. |
| `644` | 110 100 100 | `rw-r--r--` | Standard configuration files (e.g., `.env`, `.conf`). |
| `600` | 110 000 000 | `rw-------` | SSH Private Keys (`~/.ssh/id_rsa`). |

> [!IMPORTANT]
> SSH daemon will actively reject connections if your private key is not strictly `600`.
