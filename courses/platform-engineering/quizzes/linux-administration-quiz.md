# Linux Administration: Engineering Competence Assessment

## Quiz Metadata
* **Quiz ID:** QUIZ-MOD-LINUX-ADM
* **Associated Module/Lesson:** Module 02: Linux Administration
* **Passing Score:** 80%

---

## Section 1: Multiple Choice & Multiple Select Questions

### Question 1:
You are creating a highly restricted service account for a new background daemon and want to ensure the account cannot be logged into interactively by humans. Which of the following commands correctly creates a non-login service account?
* A) `sudo useradd -m -s /bin/bash daemon_user`
* B) `sudo useradd -r -s /usr/sbin/nologin daemon_user`
* C) `sudo usermod -aG root daemon_user`
* D) `sudo useradd -s /bin/false -m daemon_user`

### Question 2:
You are securing a sensitive private SSH key file (`id_rsa`) to authenticate with a production server. Which octal permission mode is required to ensure only the user owner can read and write the file, satisfying SSH's strict security requirements?
* A) `chmod 644 id_rsa`
* B) `chmod 755 id_rsa`
* C) `chmod 600 id_rsa`
* D) `chmod 777 id_rsa`

### Question 3:
You have launched a critical database migration script as a background job using `&`. Which of the following commands can be used to monitor its execution, find its Process ID (PID), or bring it back to the foreground? (Select all that apply)
* A) `jobs`
* B) `ps aux | grep migrate`
* C) `fg`
* D) `systemctl status migrate`

---

## Section 2: Command Interpretation & Log Analysis

### Question 4:
```text
bash: kill: (842) - Operation not permitted
```
**Question:** An engineer attempts to terminate a frozen system logging daemon using `kill 842`, but the terminal returns the error above. What is the precise underlying root cause of this failure, and what command should be executed to resolve it?
* A) The process `842` does not exist; execute `ps aux | grep 842` to find the correct PID.
* B) The engineer lacks administrative authorization to terminate a process owned by `root` or another user; execute `sudo kill 842` to elevate privileges.
* C) The process is completely frozen and ignoring `SIGTERM`; execute `kill -9 842` to force termination.
* D) The system logging daemon is masked by systemd; execute `sudo systemctl unmask 842`.

### Question 5:
```text
Job for nginx.service failed because the control process exited with error code.
See "systemctl status nginx.service" and "journalctl -xeu nginx.service" for details.
```
**Question:** You execute `sudo systemctl start nginx.service` and receive the output above. What is the most likely root cause, and what is the best immediate step to diagnose the issue?
* A) The Nginx service is masked; execute `sudo systemctl unmask nginx.service`.
* B) Nginx encountered a fatal error (e.g., a configuration typo) during startup; execute `sudo journalctl -u nginx.service` to inspect the exact log lines.
* C) The server is out of memory; execute `kill -9` on the `nginx` process.
* D) Nginx lacks execute permissions; execute `chmod 755 /etc/nginx`.

---

## Section 3: Scenario & Architectural Decisions

### Question 6:
An enterprise cloud environment relies heavily on a custom microservice that constantly processes payment transactions. During a recent automated cloud provider maintenance reboot, the virtual machine hosting the microservice restarted, but the microservice remained offline for three hours until an engineer manually logged in and started it.
**Question:** What is the most robust architectural solution to resolve this issue, and what trade-offs must be considered?
* A) Write a bash script with `nohup ./payment-service &` and tell engineers to run it whenever they reboot the server.
* B) Create a Systemd unit file (`payment.service`) with `Restart=on-failure` and execute `sudo systemctl enable payment.service` to configure automated boot startup.
* C) Use `chmod 777` on the payment service binary so it executes automatically.
* D) Launch the process using `tmux` so it stays alive after the terminal closes.

---

## Section 4: Short Answer & Reflection Questions

### Question 7:
Explain the architectural difference between sending a `SIGTERM` (Signal 15) to a process versus sending a `SIGKILL` (Signal 9) to a process, and describe why using `SIGKILL` as a first resort is dangerous in production environments.

---

## Answer Key & Explanations

<details>
<summary>Click to view answers and comprehensive engineering explanations</summary>

### Section 1: Multiple Choice & Multiple Select Answers
1. **B) `sudo useradd -r -s /usr/sbin/nologin daemon_user`**
   * **Explanation:** In Linux, service accounts (daemons) should be highly restricted. The `-r` flag creates a system account (UID 1-999), and `-s /usr/sbin/nologin` ensures that if an attacker compromises the account, they cannot launch an interactive bash shell.
   * **Why Alternatives are Incorrect:** A creates a standard user with a full bash shell. C adds a user to the root group, which is a massive security risk. D uses `/bin/false` and creates a home directory (`-m`), which is typically unnecessary for service accounts.
   * **Lesson Reference:** MOD-LINUX-ADM-01: User & Group Administration

2. **C) `chmod 600 id_rsa`**
   * **Explanation:** Octal mode `600` maps to `-rw-------`, meaning only the user owner has read and write permissions, and no one else has any access. SSH strictly enforces this for private keys to prevent other users on the system from reading your credentials.
   * **Why Alternatives are Incorrect:** A (`644`) allows read access to groups and others, causing SSH to abort with "UNPROTECTED PRIVATE KEY FILE". B (`755`) allows read/execute to others. D (`777`) grants full access to everyone, completely compromising the key.
   * **Lesson Reference:** MOD-LINUX-ADM-02: Linux Permission Mechanics

3. **A, B, C**
   * **Explanation:** `jobs` lists active background jobs in the current terminal. `ps aux | grep migrate` finds the exact Process ID globally. `fg` brings a background job back into the foreground.
   * **Why Alternatives are Incorrect:** D (`systemctl status`) checks the status of systemd services, not manual background jobs launched with `&`.
   * **Lesson Reference:** MOD-LINUX-ADM-03: Process Inspection & Control

### Section 2: Command Interpretation & Log Analysis Answers
4. **B) The engineer lacks administrative authorization to terminate a process owned by `root` or another user; execute `sudo kill 842` to elevate privileges.**
   * **Explanation:** Linux's multi-user security model prevents standard users from killing processes they do not own. A system daemon is likely owned by `root`. Therefore, the engineer must elevate privileges using `sudo`.
   * **Why Alternatives are Incorrect:** A is incorrect because "Operation not permitted" confirms the process exists but access is denied; if it didn't exist, the error would be "No such process". C is incorrect because `kill -9` will still fail with permission denied if run as a standard user. D is unrelated to process termination permissions.
   * **Lesson Reference:** MOD-LINUX-ADM-03: Process Inspection & Control

5. **B) Nginx encountered a fatal error (e.g., a configuration typo) during startup; execute `sudo journalctl -u nginx.service` to inspect the exact log lines.**
   * **Explanation:** `systemd` successfully attempted to start the service, but the control process (Nginx) crashed and returned an error code. `journalctl -u nginx.service` filters the centralized systemd journal to show the exact log lines from Nginx, which will reveal the specific configuration typo or error.
   * **Why Alternatives are Incorrect:** A is incorrect because masked services fail immediately with "Unit is masked", not an exit code. C is a blind assumption; investigating logs is the correct first step. D is unlikely for standard packages and doesn't align with the error message.
   * **Lesson Reference:** MOD-LINUX-ADM-04: Service Management with Systemd

### Section 3: Scenario & Architectural Decision Answers
6. **B) Create a Systemd unit file (`payment.service`) with `Restart=on-failure` and execute `sudo systemctl enable payment.service` to configure automated boot startup.**
   * **Explanation:** `systemd` (`PID 1`) is the master init system designed exactly for this. `systemctl enable` creates boot symlinks to launch the service automatically when the server powers on. `Restart=on-failure` provides automated self-healing if the process crashes.
   * **Why Alternatives are Incorrect:** A and D require manual human intervention after a reboot, which is unacceptable for a critical microservice. C (`chmod 777`) is a severe security violation and does not configure automated startup.
   * **Lesson Reference:** MOD-LINUX-ADM-04: Service Management with Systemd

### Section 4: Short Answer & Reflection Answers
7. **Expected Solution Criteria:**
   * **SIGTERM (Signal 15):** Requests a polite, graceful shutdown. The process is allowed to finish writing files, close database connections, and exit cleanly. This is the default signal sent by the `kill` command.
   * **SIGKILL (Signal 9):** Commands instant, brutal kernel termination. The process is killed immediately without any cleanup.
   * **Why SIGKILL is dangerous:** Using `kill -9` bypasses all graceful shutdown procedures. It can cause data corruption, leave database transactions in an inconsistent state, and orphan child processes. It should only be used as an absolute last resort when a process is completely frozen and ignoring `SIGTERM`.
   * **Lesson Reference:** MOD-LINUX-ADM-03: Process Inspection & Control

</details>
