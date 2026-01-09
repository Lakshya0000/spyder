# Code Security (PR-Level SAST)

## What This Page Does

The Code Security page acts like a security expert reviewing every code change before it gets merged into your main codebase. It scans Pull Requests (PRs) to find security vulnerabilities, leaked secrets, and suspicious code patterns that might indicate malicious intent.

Think of it as a security checkpoint at the airport - except instead of screening passengers, it's screening code changes.

## Main Features

### GitHub Pull Request Context

The top of the page shows:
- **Repository Name**: Which codebase is being reviewed
- **PR Number & Branch**: The specific code change being examined
- **Author**: Who wrote this code
- **Commit Hash**: The exact version of the code
- **Status Badge**: Whether the PR passed or failed security checks

You can switch between different Pull Requests using the dropdown selector to review multiple code changes.

### Security Gate System

When security issues are found, the page displays:
- **Merge Status**: "Blocked" (can't merge) or "Check Failed" (warning)
- **Critical Issues Count**: How many severe problems were found
- **Intent Risks**: How many suspicious patterns suggest malicious code

This prevents dangerous code from making it into production.

### Findings List (Left Panel)

All discovered issues are listed with:

#### Issue Cards
Each finding shows:
- **Title**: Short description of the problem
- **Severity Icon**: Visual indicator (red = critical, orange = high, yellow = medium)
- **Type Label**: Category (e.g., "Hardcoded Secret", "SQL Injection", "Malicious Intent")
- **File Location**: Where in the code the issue exists
- **AI Confidence Score**: How certain the AI is that this is a real issue (0-100%)

You can click on any issue to see detailed information.

#### Category Filtering
Issues are organized by type:
- **Vulnerabilities**: Security flaws that could be exploited
- **Secrets**: Passwords, API keys, or tokens leaked in code
- **Intent Risks**: Code patterns that suggest deliberate malicious behavior

### Code Context Panel (Right Panel)

When you select an issue, this panel shows:

#### Code Viewer
- **Syntax Highlighting**: Color-coded code for easy reading
- **Line Numbers**: Exact location of the problem
- **Highlighted Problematic Line**: The vulnerable code is marked in red
- **Surrounding Context**: Code before and after to understand what's happening

#### AI Explanation
In plain language, the system explains:
- **What's Wrong**: Why this code is dangerous
- **How It Could Be Exploited**: What an attacker could do with this vulnerability
- **Why It Matters**: The real-world impact of this issue

#### Fix Recommendation
Step-by-step instructions on how to fix the problem, written for developers:
- **Code Snippet**: The exact changes needed
- **Explanation**: Why this fix works
- **Best Practices**: How to avoid this problem in the future

### Statistics Dashboard

At the bottom left, you see:
- **Total Issues**: Overall count of problems found
- **Critical Issues**: Number of high-severity findings
- **Intent Risks**: Count of suspicious patterns

This gives you a quick health check of the code change.

## How It Works

### Scanning Process
When a PR is created or updated:
1. The system pulls all changed code files
2. Each line is analyzed for security patterns
3. AI models examine the code for:
   - Known vulnerability patterns (SQL injection, XSS, etc.)
   - Hardcoded credentials or secrets
   - Unusual patterns that don't match normal coding practices
4. Each finding gets an AI confidence score
5. Critical issues block the merge until fixed

### Intent Detection
This is a special feature that goes beyond traditional security scanning. It looks for:
- **Backdoors**: Hidden code that gives unauthorized access
- **Logic Bombs**: Code designed to cause harm at a specific time
- **Data Exfiltration**: Attempts to secretly send data to external servers
- **Obfuscated Code**: Deliberately hard-to-read code that hides malicious behavior

The AI compares code patterns against known malicious behaviors and flags anything suspicious.

### AI Confidence Scoring
Not all alerts are equally certain. The confidence score helps you prioritize:
- **90-100%**: Almost certainly a real issue - fix immediately
- **70-89%**: Likely a problem - investigate
- **50-69%**: Possibly an issue - review carefully
- **Below 50%**: May be a false positive - quick check

## Why This Matters

### Preventing Security Breaches
Most security vulnerabilities are introduced through code changes. Catching them during code review:
- Stops problems before they reach production
- Educates developers about secure coding
- Reduces the cost of fixing issues (fixing in PR is much cheaper than fixing in production)

### Insider Threat Detection
The intent detection feature protects against:
- **Malicious Insiders**: Employees or contractors trying to harm the organization
- **Compromised Accounts**: Attackers who gained access to developer credentials
- **Supply Chain Attacks**: Malicious code inserted by third-party contributors

### Compliance Requirements
Many industries require code security scanning (PCI-DSS, HIPAA, SOC 2). This page provides:
- Evidence that all code is scanned before deployment
- Audit trail of issues found and fixed
- Proof of security due diligence

## How to Use This Page

### For Developers
1. Click on your PR from the dropdown
2. Review all issues marked in the findings list
3. Click each issue to see the problematic code
4. Read the AI explanation to understand the risk
5. Follow fix recommendations to resolve the issue
6. Re-run the scan to verify fixes
7. Only merge when all critical issues are resolved

### For Code Reviewers
1. Open this page alongside GitHub PR reviews
2. Check if security gate is blocking the merge
3. Review high-confidence findings first
4. Provide context to the PR author using the AI explanations
5. Approve only when security is satisfied

### For Security Teams
1. Monitor critical issue counts across all PRs
2. Investigate intent risk findings immediately
3. Track patterns - are certain developers or teams introducing more issues?
4. Use findings to create team training on secure coding
5. Add custom detection rules for organization-specific risks

## Common Scenarios

### Pre-Merge Security Review
**Situation**: A developer submits a PR adding a new API endpoint.

**Process**:
1. System scans the PR automatically
2. Finds a SQL injection vulnerability in the database query
3. Blocks the merge with a critical finding
4. Developer sees the highlighted code and AI explanation
5. Developer fixes the issue using parameterized queries
6. Re-scan shows no issues
7. PR is allowed to merge

### Secret Leakage Prevention
**Situation**: A developer accidentally commits an API key.

**Process**:
1. System detects hardcoded secret in environment variable
2. Flags as critical issue with 98% confidence
3. Developer is notified immediately
4. Developer removes the secret and rotates the API key
5. System verifies the secret is gone
6. PR can proceed

### Insider Threat Detection
**Situation**: A contributor adds code that sends data to an external server.

**Process**:
1. Intent detection flags unusual network request pattern
2. Issue marked as "Intent Risk: Data Exfiltration"
3. Security team is automatically notified
4. Manual review confirms suspicious behavior
5. PR is rejected and contributor access is reviewed
6. Incident is logged for investigation
