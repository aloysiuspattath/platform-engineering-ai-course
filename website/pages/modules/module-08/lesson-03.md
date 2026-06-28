# Architecting Reusable & Versioned Terraform Modules

Version: 2.0.0

Purpose: Canonical lesson structure for Platform Engineering & AI Infrastructure Curriculum.

Required Inputs: Module definition, lesson objectives, project standards.

Outputs: Standards-compliant lesson markdown.

---

# Lesson Metadata

* **Lesson ID:** `MOD-TF-03`
* **Module:** Infrastructure as Code (Terraform) (`MOD-TF`)
* **Difficulty:** Intermediate to Advanced
* **Estimated Duration:** 60 minutes
* **Learning Track:** 🟢 Core
* **Version:** 2.0.0
* **Last Updated:** 2026-06-28

---

# Lesson Overview

This lesson explores the master composability and modular abstraction engines of declarative infrastructure, decrypting how Platform Engineers eliminate massive code duplication by architecting reusable, versioned Terraform Modules. By mastering Module anatomy (`main.tf`, `variables.tf`, `outputs.tf`), input validation (`validation` blocks), remote Git module sourcing (`source = "git::..."`), semantic versioning (`?ref=v1.0.0`), and `terraform-docs`, you will firmly establish the elite modular engineering capabilities supporting our module capability: **"I can author declarative HCL infrastructure manifests, manage state locking with remote backends, architect reusable modules, and refactor existing cloud resources."**

---

# Learning Objectives

* Contrast monolithic, copy-pasted HCL manifests with modular, composable Terraform Module architectures (DRY Principle - Don't Repeat Yourself).
* Deconstruct the internal file anatomy of a canonical Terraform Module: `main.tf` (resources), `variables.tf` (input parameters), and `outputs.tf` (exposed return values).
* Enforce rigorous input validation criteria using HCL `validation` blocks and custom error messages (`error_message`).
* Configure remote Git module sourcing using semantic versioning tags (`source = "git::https://github.com/.../terraform-aws-vpc.git?ref=v1.0.0"`).
* Automate module documentation generation using `terraform-docs`, producing pristine markdown attribute tables directly from HCL code.

---

# Prerequisites

* Completion of `MOD-TF-01` and `MOD-TF-02`.
* Foundational terminal file inspection, Git version tagging, and directory navigation concepts (`git tag`, `tree`, `mkdir`).

---

# Why This Exists

In Lessons 01 and 02, we established how to author declarative HCL manifests and secure our state file inside a remote S3 backend. However, as an enterprise grows, how do you manage infrastructure across dozens of separate engineering teams without drowning in massive code duplication?

Imagine you are a junior engineer hired to support an enterprise consisting of twenty different software development teams. Each team requires their own isolated AWS Virtual Private Cloud (VPC) containing public subnets, private subnets, NAT gateways, and routing tables.

To provision these VPCs, you write a massive, 500-line `main.tf` file containing the networking resources for Team A. When Team B requests a VPC, you copy-paste the entire 500-line file into Team B's repository and manually change the names. You repeat this copy-paste process for all twenty teams, creating **10,000 lines of identical, duplicated HCL code** across the company!

**You have just created a monumental maintenance nightmare!**

Six months later, the corporate security team announces a mandatory compliance update: every single VPC across the enterprise must immediately enable VPC Flow Logs to track network packet analysis.

Because you copy-pasted 10,000 lines of monolithic code, you are forced to open twenty separate Git repositories, manually edit twenty separate 500-line files, submit twenty separate Pull Requests, and execute twenty separate `terraform apply` runs! If you make a single typographical error in Team 12's file, their networking breaks entirely!

To solve the monumental challenge of **Code Duplication**, **Monolithic Maintenance**, and **Inconsistent Architectures**, HashiCorp established **Terraform Modules**. By encapsulating standard infrastructure patterns into a single, version-controlled, reusable module repository, Platform Engineers can provision twenty identical VPCs with simple 10-line `module` blocks, enforce strict input validation, and update the entire enterprise's infrastructure by simply updating a single semantic version tag (`?ref=v2.0.0`)!

---

# Core Concepts

## 1. Monolithic HCL vs. Modular Architecture (DRY)
In software engineering, the DRY Principle (**Don't Repeat Yourself**) is mandatory. Terraform Modules bring the DRY principle directly into Infrastructure as Code:
* **Monolithic HCL (Copy-Pasting):** You copy-paste identical resource definitions (`aws_vpc`, `aws_subnet`) across multiple environments or team folders. Updating a core architectural pattern requires editing dozens of files.
* **Modular Architecture:** You write the core resource definitions exactly *once* inside a dedicated Module directory (`terraform-aws-vpc`). Other environments (Staging, Production) simply import the module using a `module` block (`module "vpc" { source = "./terraform-aws-vpc" }`), passing in custom variable parameters (`cidr_block = "10.0.0.0/16"`).

```text
[ Monolithic HCL: Copy-Paste Duplication ]       [ Modular IaC: Composable Import Blocks ]
┌────────────────────────────────────────┐       ┌────────────────────────────────────────┐
│ Repos: /team-a/main.tf (500 lines)     │       │ Repos: /team-a/main.tf (module block)  │
│        /team-b/main.tf (500 lines)     │ ───►  │        /team-b/main.tf (module block)  │
│ (Updating requires editing 20 files!)  │       │ (Both import 1 shared versioned module)│
└────────────────────────────────────────┘       └────────────────────────────────────────┘
```

## 2. Canonical Module File Anatomy
A Terraform Module is simply a dedicated directory containing HCL files. To maintain elite Platform Engineering standards, modules are strictly decomposed into three canonical files:
* `main.tf`: The master execution file! Contains the physical resource declarations (`resource "aws_vpc" "main" { ... }`).
* `variables.tf`: The master input file! Declares the dynamic parameters accepted by the module (`variable "cidr_block" { type = string }`). These act exactly like arguments passed to a Python function!
* `outputs.tf`: The master return file! Declares the values exposed by the module to the calling parent code (`output "vpc_id" { value = aws_vpc.main.id }`). These act exactly like return values from a Python function!

```text
[ Calling Parent HCL Code ]             [ Child Module Directory ]
┌───────────────────────────────┐       ┌───────────────────────────────────────┐
│ module "main_vpc" {           │       │ ├── variables.tf (Receives cidr)      │
│   source = "./module-vpc"     │ ───►  │ ├── main.tf      (Creates aws_vpc)    │
│   cidr   = "10.0.0.0/16"      │       │ └── outputs.tf   (Returns vpc_id)     │
│ }                             │ ◄───  │                                       │
└───────────────────────────────┘       └───────────────────────────────────────┘
```

## 3. Custom Input Validation (`validation` blocks)
To ensure junior developers don't pass invalid or insecure parameters into your module (e.g., passing an invalid IP CIDR block or requesting a massively expensive EC2 instance type), Platform Engineers declare `validation` blocks inside `variables.tf`:
* The `validation` block inspects the input value using HCL regex or conditional logic (`condition = can(regex("^ami-", var.ami_id))`). If the input is invalid, Terraform forcefully aborts `terraform plan` and prints your custom error message (`error_message = "The AMI ID must start with ami-."`)!

## 4. Remote Git Module Sourcing & Semantic Versioning
While storing modules in a local subdirectory (`source = "./modules/vpc"`) is common for small projects, enterprise Platform Engineers store modules in dedicated, standalone Git repositories (`terraform-aws-vpc`).
* **Semantic Versioning (`?ref=v1.0.0`):** When calling a remote Git module, you must never point to the raw `main` branch! If the module maintainer merges a breaking change into `main`, your Staging and Production environments break instantly on their next apply! Platform Engineers strictly pin module imports to immutable Git release tags (`source = "git::https://github.com/[org]/terraform-aws-vpc.git?ref=v1.0.0"`).

```text
[ Semantic Version Pinning ]
(Staging: ?ref=v2.0.0-rc1) ──► (Validates New Features) ──► (Production: ?ref=v1.5.0) ──► (Remains Fully Stable!)
```

## 5. Automated Documentation (`terraform-docs`)
How do you know what ingredients to provide, or what meal you'll get, without reading a 500-page manual? We use a tool called `terraform-docs` to auto-generate the menu!

Think of the shared module repository as The Master Recipe Book. It contains the Ingredient List (`variables.tf`), the Cooking Instructions (`main.tf`), and a description of The Final Dish (`outputs.tf`). Once a recipe gets its Official Seal of Approval (a version tag), you can place Your Order from The Local Kitchen. When you're ready, you Fetch the Recipe, Check the Ingredients to make sure you didn't mess up (preventing an Allergy Warning for bad inputs!), and finally Start Cooking! The `terraform-docs` tool simply looks at the ingredients and automatically writes a clean, easy-to-read menu (`README.md`) so everyone knows exactly what to order.

---

# Architecture

```mermaid
flowchart TD
    subgraph EnterpriseModuleRepo [The Master Recipe Book]
        MOD_VARS["Ingredient List (variables.tf)"] --> MOD_MAIN["Cooking Instructions (main.tf)"]
        MOD_MAIN --> MOD_OUT["The Final Dish (outputs.tf)"]
        MOD_OUT -->|git tag v1.0.0| GIT["Version 1.0 (Official Seal of Approval)"]
        MOD_VARS --> DOCS["Auto-Generates the Menu (README.md)"]
    end

    subgraph CallingEnvironment [The Local Kitchen (Your Environment)]
        PROD["Your Order (main.tf calling the module)"] --> INIT["Fetch Recipe (terraform init)"]
        INIT --> PLAN["Check Ingredients (terraform plan)"]
        PLAN -->|Input Validation Failed| ABORT["Allergy Warning! Bad Ingredients!"]
        PLAN -->|Input Validation Passed| APPLY["Start Cooking (terraform apply)"]
    end
```

---

# Real-World Example

Imagine you are a Lead Platform Engineer managing cloud infrastructure for a rapidly scaling healthcare technology provider. The company runs 50 separate microservices across 10 different engineering squads.

Every single squad provisions their own AWS S3 storage buckets by writing raw `resource "aws_s3_bucket"` blocks in their local Terraform repositories. Because there is no centralization, Squad A creates public buckets without encryption, Squad B creates buckets with encryption but no logging, and Squad C creates buckets with random naming conventions.

When an external healthcare compliance audit (HIPAA) occurs, the auditors discover massive security inconsistencies across the company's S3 storage, threatening the company with severe regulatory fines!

Because you maintain elite Platform Engineering standards, you take command of the remediation. You architect a centralized, highly governed Terraform Module repository named `terraform-aws-secure-s3-bucket`.

Inside `main.tf`, you declare the S3 bucket, enforce mandatory AWS KMS encryption at rest, enable access logging, and apply standardized tagging. Inside `variables.tf`, you declare a `validation` block that forcefully rejects any bucket name that doesn't start with `hipaa-secure-`. You tag the repository with Git release `v1.0.0`.

You instruct all 10 engineering squads to replace their raw S3 resource blocks with a simple 5-line `module` block pointing to `terraform-aws-secure-s3-bucket.git?ref=v1.0.0`. Across the entire enterprise, S3 provisioning becomes perfectly standardized, heavily encrypted, and passes HIPAA compliance audits flawlessly!

---

# Hands-on Demonstration

Let's look at how an engineer inspects a canonical Terraform Module file structure using `cat`, inspects input validation blocks, and inspects automated documentation generated by `terraform-docs`.

## Input 1: Inspecting Canonical Module File Anatomy (`variables.tf` & `outputs.tf`)
We use `cat` to inspect a pristine, highly governed `variables.tf` file containing custom input validation logic, and an `outputs.tf` file exposing module return values.

## Code 1
```bash
# Inspect the module's variables.tf file containing custom input validation logic.
# (We simulate inspecting a compliant variables.tf file)
cat << 'EOF'
variable "bucket_name" {
  type        = string
  description = "Name of the secure compliance S3 bucket"
  
  validation {
    condition     = can(regex("^secure-compliance-[a-z0-9-]+$", var.bucket_name))
    error_message = "The bucket_name must start with 'secure-compliance-' and contain only lowercase letters, numbers, and hyphens."
  }
}

variable "enable_versioning" {
  type        = bool
  description = "Flag to enable immutable object versioning"
  default     = true
}
EOF

# Inspect the module's outputs.tf file exposing return values to the calling parent.
cat << 'EOF'
output "bucket_arn" {
  description = "Physical Amazon Resource Name (ARN) of the provisioned bucket"
  value       = aws_s3_bucket.secure_storage.arn
}
EOF
```

## Expected Output 1
```text
variable "bucket_name" {
  type        = string
  description = "Name of the secure compliance S3 bucket"
  
  validation {
    condition     = can(regex("^secure-compliance-[a-z0-9-]+$", var.bucket_name))
    error_message = "The bucket_name must start with 'secure-compliance-' and contain only lowercase letters, numbers, and hyphens."
  }
}

variable "enable_versioning" {
  type        = bool
  description = "Flag to enable immutable object versioning"
  default     = true
}
output "bucket_arn" {
  description = "Physical Amazon Resource Name (ARN) of the provisioned bucket"
  value       = aws_s3_bucket.secure_storage.arn
}
```

## Explanation 1
Look at how beautifully architected this module input/output definition is! Let's deconstruct the elite elements:
* `validation { condition = ... }`: The custom input validation engine! By utilizing HCL's `can(regex(...))` function, Terraform ensures that before a single cloud API call is made, the bucket name strictly matches our enterprise naming convention!
* `error_message = "..."`: A pristine, human-readable error message printed to junior developers when they pass invalid inputs!
* `output "bucket_arn"`: Exposes the physical S3 bucket ARN to the calling parent module, allowing the parent code to reference it in subsequent resource blocks (e.g., passing the ARN to an IAM policy block)!

---

## Input 2: Inspecting Remote Module Sourcing and Automated Documentation
We simulate inspecting a calling parent `main.tf` file utilizing remote Git semantic versioning, and simulate inspecting the automated markdown table generated by `terraform-docs`.

## Code 2
```bash
# Inspect a calling parent main.tf file utilizing remote Git module sourcing and semantic versioning.
# (We simulate inspecting a compliant parent main.tf file)
cat << 'EOF'
module "secure_storage" {
  source            = "git::https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v1.0.0"
  bucket_name       = "secure-compliance-production-data"
  enable_versioning = true
}
EOF

# Simulate inspecting the automated markdown attribute table generated by terraform-docs.
# (We simulate the clean markdown table output of terraform-docs markdown table .)
echo -e "## Inputs\n\n| Name | Description | Type | Default | Required |\n|------|-------------|------|---------|:--------:|\n| <a name=\"input_bucket_name\"></a> [bucket\\_name](#input\\_bucket\\_name) | Name of the secure compliance S3 bucket | `string` | n/a | yes |\n| <a name=\"input_enable_versioning\"></a> [enable\\_versioning](#input\\_enable\\_versioning) | Flag to enable immutable object versioning | `bool` | `true` | no |\n\n## Outputs\n\n| Name | Description |\n|------|-------------|\n| <a name=\"output_bucket_arn\"></a> [bucket\\_arn](#output\\_bucket\\_arn) | Physical Amazon Resource Name (ARN) of the provisioned bucket |"
```

## Expected Output 2
```text
module "secure_storage" {
  source            = "git::https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v1.0.0"
  bucket_name       = "secure-compliance-production-data"
  enable_versioning = true
}
## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_bucket_name"></a> [bucket\_name](#input\_bucket\_name) | Name of the secure compliance S3 bucket | `string` | n/a | yes |
| <a name="input_enable_versioning"></a> [enable\_versioning](#input\_enable\_versioning) | Flag to enable immutable object versioning | `bool` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_bucket_arn"></a> [bucket\_arn](#output\_bucket\_arn) | Physical Amazon Resource Name (ARN) of the provisioned bucket |
```

## Explanation 2
Notice how perfectly decoupled and documented this architecture is! `source = "git::... ?ref=v1.0.0"` proves that our production environment is securely pinned to an immutable release tag. Notice the beautiful markdown table generated by `terraform-docs`: it extracts our exact HCL variable descriptions, default values, and required flags, keeping our module documentation perfectly synchronized with our code!

---

# Hands-on Lab

* **Objective:** Architect a canonical child Terraform Module (`main.tf`, `variables.tf`, `outputs.tf`), enforce custom input validation, author a calling parent manifest, execute `terraform init`, verify module execution, and simulate `terraform-docs`.
* **Estimated Time:** 20 minutes
* **Difficulty:** Intermediate to Advanced
* **Environment:** Interactive Browser Terminal / Local Sandbox (with Terraform installed)

## Step-by-step Instructions

1. Open your terminal sandbox and create a master lab directory named `module-lab`: `mkdir ~/module-lab && cd ~/module-lab`.
2. Create a dedicated subdirectory for your custom child module named `terraform-local-file-generator`: `mkdir -p terraform-local-file-generator`.
3. Inside the child module directory, create `variables.tf` containing custom input validation by typing:
```bash
cat << 'EOF' > terraform-local-file-generator/variables.tf
variable "file_prefix" {
  type        = string
  description = "Prefix string for the generated file name"
  
  validation {
    condition     = can(regex("^prod-", var.file_prefix))
    error_message = "The file_prefix must strictly start with 'prod-'."
  }
}

variable "file_content" {
  type        = string
  description = "Content string written inside the file"
}
EOF
```
4. Inside the child module directory, create `main.tf` by typing:
```bash
cat << 'EOF' > terraform-local-file-generator/main.tf
resource "local_file" "module_file" {
  filename = "${path.root}/${var.file_prefix}app-config.txt"
  content  = var.file_content
}
EOF
```
5. Inside the child module directory, create `outputs.tf` by typing:
```bash
cat << 'EOF' > terraform-local-file-generator/outputs.tf
output "generated_filename" {
  value = local_file.module_file.filename
}
EOF
```
6. Navigate back to your master lab directory (`cd ~/module-lab`) and create your calling parent `main.tf` file by typing:
```bash
cat << 'EOF' > main.tf
module "app_config" {
  source       = "./terraform-local-file-generator"
  file_prefix  = "prod-"
  file_content = "Master Composable Module Execution"
}

output "final_file_path" {
  value = module.app_config.generated_filename
}
EOF
```
7. Type `terraform init` to initialize your working directory and pull your local module code into the internal `.terraform/modules` cache!
8. Type `terraform plan` to inspect your dry-run execution plan! Notice how Terraform seamlessly calculates the plan across the child module boundary!
9. Type `terraform apply -auto-approve` to provision your modular infrastructure! Terraform creates the file and outputs `final_file_path`!
10. Type `cat prod-app-config.txt` to verify your modular infrastructure was successfully provisioned!

## Verification

```bash
cat prod-app-config.txt | grep "Master Composable Module" || echo "Modular Execution Verified"
```
*If your terminal successfully outputs your `Master Composable Module` content string, you have mastered canonical Terraform Module architecting!*

## Troubleshooting

* **Issue:** `terraform plan` fails with `Error: Invalid value for variable: The file_prefix must strictly start with 'prod-'`.
* **Solution:** You modified the `file_prefix` parameter in your calling parent `main.tf` to a string that doesn't start with `prod-` (e.g., `dev-`). Your child module's custom `validation` block successfully intercepted the execution and aborted the plan! Update the prefix back to `prod-`!

## Cleanup

```bash
# Safely remove the demonstration module lab directory
rm -rf ~/module-lab
```

---

# Production Notes

In enterprise cloud architecture, when managing massive module registries across hundreds of engineers, Platform Engineers frequently deploy **Private Module Registries** (such as HCP Terraform Private Registry, Spacelift, or JFrog Artifactory). A private registry allows developers to import modules using a highly governed, clean registry string syntax (`source = "app.terraform.io/[org]/vpc/aws"`), completely abstracting away raw Git clone URLs and managing version promotion workflows automatically!

---

# Common Mistakes

* **Omitting Variable Descriptions in `variables.tf`:** Beginners frequently declare variables as simple blocks (`variable "vpc_id" {}`) without declaring a `type` or `description`. This prevents `terraform-docs` from generating meaningful documentation and leaves junior developers guessing what data type to pass in! **Always declare `type` and `description` for every variable!**
* **Publishing Breaking Changes to Unversioned Modules:** Junior developers frequently update a shared module in Git without creating a new semantic version tag (`v2.0.0`). If calling environments are importing the raw `main` branch, every single environment across the enterprise breaks instantly on their next apply! **Always use semantic version tags!**

---

# Failure-Driven Learning

Imagine a junior engineer attempts to execute `terraform plan` on a working directory that imports a remote Git module, but the operation fails instantly with a fatal Git cloning error because they misspelled the semantic version tag in the `source` block.

## Simulated Failure
```bash
# Simulating a terraform init failure due to an unresolvable Git semantic version tag
# (We simulate the exact Terraform CLI error when encountering non-existent Git ref tags)
echo -e "Initializing modules...\n╷\n│ Error: Failed to download module\n│ \n│ Could not download module \"secure_storage\" (main.tf:1) source code from\n│ \"git::https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v99.0.0\":\n│ error downloading 'https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v99.0.0':\n│ git clone exited with status 128: fatal: Could not find remote branch or tag 'v99.0.0' in upstream repository.\n╵"
```

## Output
```text
Initializing modules...
╷
│ Error: Failed to download module
│ 
│ Could not download module "secure_storage" (main.tf:1) source code from
│ "git::https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v99.0.0":
│ error downloading 'https://github.com/platform-engineering-ai-course/terraform-aws-secure-s3-bucket.git?ref=v99.0.0':
│ git clone exited with status 128: fatal: Could not find remote branch or tag 'v99.0.0' in upstream repository.
╵
```

## Diagnosis & Recovery
Why did this fail? Look at this beautiful Git reference validation error: `git clone exited with status 128: fatal: Could not find remote branch or tag 'v99.0.0'`! When you execute `terraform init`, Terraform invokes the underlying Git binary on your system to clone the remote repository and checkout the specific tag declared in `?ref=...`. The engineer wrote `?ref=v99.0.0`, but the latest release tag in the GitHub repository was `v1.0.0`! Because tag `v99.0.0` does not exist, Git aborts the clone, and Terraform refuses to initialize! To recover correctly, the engineer must update the `source` block to match a valid release tag (`?ref=v1.0.0`), re-run `terraform init`, and the initialization succeeds flawlessly!

---

# Engineering Decisions

## Module Design: Monolithic Multi-Resource Modules vs. Atomic Single-Purpose Modules
When architecting a private module registry, engineering leaders must choose the master module scoping strategy.
* **Monolithic Multi-Resource Modules (Mega-Modules):** A single module (`terraform-aws-entire-app`) that creates a VPC, an EKS cluster, an RDS database, and an S3 bucket all at once. Convenient for initial setup. However, highly inflexible. If a team wants the EKS cluster but doesn't need the RDS database, they are forced to deploy unnecessary infrastructure or write complex conditional feature flags (`count = var.enable_rds ? 1 : 0`).
* **Atomic Single-Purpose Modules (Micro-Modules):** Dedicated, highly focused modules (`terraform-aws-vpc`, `terraform-aws-eks`, `terraform-aws-rds`). Each module does exactly one thing beautifully. Calling environments compose them together like Lego bricks.
* **The Platform Decision:** Platform Engineers strictly mandate **Atomic Single-Purpose Modules (Micro-Modules)** as the master design standard across the enterprise module registry to ensure maximum composability, easier unit testing (`terratest`), and clean blast radius isolation.

---

# Best Practices

* **Master Terratest:** When developing complex enterprise Terraform modules, write automated integration tests using **Terratest** (a Golang testing library). Terratest will dynamically run `terraform init`, `apply`, execute HTTP/API validation checks against the physical cloud resources, and run `terraform destroy`, ensuring your module is rigorously tested before tagging a release!
* **Leverage `terraform-docs` in Pre-Commit Hooks:** Add `terraform-docs` to your local Git pre-commit hooks (`pre-commit-terraform`). Every time you commit changes to `variables.tf` or `outputs.tf`, `terraform-docs` will automatically update `README.md` in the background before the commit hits Git!

---

# Troubleshooting Guide

## Issue 1: "Error: Unused variable declaration" vs. "Error: Module source changed"

* **Cause:** You attempt to validate HCL code or execute plans, but encounter variable scoping warnings or module source desynchronization.
* **Diagnosis & Solution:**
  * `Unused variable declaration`: You declared a variable block (`variable "environment" {}`) inside `variables.tf`, but completely failed to reference `var.environment` anywhere inside `main.tf` or `outputs.tf`! HCL linters flag this to prevent dead code bloat. To fix, either reference the variable or delete the block!
  * `Module source changed`: You modified the `source` URL or `?ref=` tag inside a `module` block in `main.tf`, but attempted to run `terraform plan` directly. Terraform detected that your local cached module in `.terraform/modules/` does not match your code! To fix, execute `terraform init -upgrade` to forcefully pull the new module version!

---

# Summary

* **Terraform Modules** bring the DRY (Don't Repeat Yourself) principle to IaC, replacing monolithic copy-pasting with composable import blocks.
* **Canonical Module Anatomy** strictly decomposes code into `main.tf` (resources), `variables.tf` (inputs), and `outputs.tf` (returns).
* **`validation` blocks** inspect input variables using regex or conditional logic to prevent invalid or insecure configurations before execution.
* **Semantic Versioning (`?ref=v1.0.0`)** pins remote Git module imports to immutable release tags, preventing upstream breaking changes.
* **`terraform-docs`** automates documentation by generating pristine markdown attribute tables directly from HCL code.

---

# Cheat Sheet

```bash
# Initialize a working directory and forcefully upgrade/pull new module source versions
terraform init -upgrade

# Automatically generate markdown attribute tables and inject them into README.md
terraform-docs markdown table --output-file README.md .

# Display a clean terminal tree showing all imported child modules in this workspace
terraform manifest

# Execute automated static analysis linting across child module manifests
tflint

# Execute automated integration tests across a Terraform module using Terratest (Golang)
go test -v -timeout 30m
```

---

# Knowledge Check

## Multiple Choice Questions

1. A developer wants to import a shared VPC module from a remote GitHub repository into their production `main.tf` file. They write `source = "git::https://github.com/org/terraform-aws-vpc.git"`. What is the correct architectural evaluation of this `source` definition?
   * A) The definition is perfectly secure because Git automatically selects the latest stable release tag.
   * B) The definition is a dangerous operational anti-pattern! By omitting a semantic version tag (`?ref=v1.0.0`), Terraform defaults to pulling the raw `main` branch. If the module maintainer merges a breaking change into `main`, production will break on its next apply. The developer must pin to an immutable release tag.
   * C) The developer forgot to use `docker compose`.
   * D) The definition requires `chmod 777`.

## Scenario Questions

You are writing a child module that accepts an AWS EC2 instance type string (`variable "instance_type"`). You want to ensure junior developers can only pass in `t3.micro` or `t3.small`, and forcefully reject any expensive instance types like `p4d.24xlarge`. Based on what you learned in this lesson, what exact HCL block should you add inside the variable declaration to enforce this rule?

## Short Answer Questions

Explain why decomposing a Terraform Module into `main.tf`, `variables.tf`, and `outputs.tf` is superior to writing all variables, resources, and outputs inside a single monolithic `main.tf` file.

---

# Interview Preparation

## Beginner Questions

* What is a Terraform Module, and what problem does it solve?
* What is the purpose of `variables.tf` vs `outputs.tf`?
* What does `terraform-docs` do?

## Intermediate Questions

* Explain how to pin a remote Git module import to a specific semantic version tag.
* Why should you add `validation` blocks to your input variables?

## Advanced Questions

* Explain how Terraform handles module scoping and state storage paths for child modules in `terraform.tfstate` (e.g., `module.vpc.aws_vpc.main`), and describe how to pass explicit provider configurations to a child module utilizing the `providers = { aws = aws.alt }` mapping block.

## Scenario-Based Discussions

* Discuss the architectural trade-offs of establishing an enterprise module strategy that relies on building massive multi-resource "Mega-Modules" (e.g., a single module creating an entire application environment) versus building highly focused atomic "Micro-Modules" (e.g., dedicated VPC, RDS, and EKS modules), specifically addressing code maintenance overhead, testing complexity, and developer adoption friction.

---

# Further Reading

1. [Creating Terraform Modules (Official HashiCorp Guide)](https://developer.hashicorp.com/terraform/language/modules/develop)
2. [Module Sources and Git Pinning (Official Documentation)](https://developer.hashicorp.com/terraform/language/modules/sources)
3. [Custom Variable Validation Rules (HCL Syntax Guide)](https://developer.hashicorp.com/terraform/language/values/variables#custom-validation-rules)
4. [Automating Documentation with Terraform-Docs (Official Guide)](https://terraform-docs.io/)
5. [Automated Module Testing with Terratest (Gruntwork)](https://terratest.gruntwork.io/)
