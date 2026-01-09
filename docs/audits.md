# Security Audits

## What This Page Does

The Security Audits page performs specialized security checks on your web applications. It focuses on two critical areas where developers commonly make mistakes that create security holes:

1. **CORS & CSP Policies** - Controls that determine who can access your application and what they can do
2. **SSRF Vulnerabilities** - Testing whether attackers can trick your server into making malicious requests

## CORS & CSP Visualizer

### What Are CORS and CSP?

**CORS (Cross-Origin Resource Sharing)**: These are rules that control which other websites can read data from your application. Think of it like a guest list at a party - CORS decides who gets in.

**CSP (Content Security Policy)**: These rules control what resources (scripts, images, styles) your website can load. It's like having a security guard who checks every package before it enters your building.

### How the Visualizer Works

The visualizer shows you:

#### Policy Overview
- Current security policies configured for your application
- Whether they're too strict (blocking legitimate traffic) or too loose (allowing potential attacks)
- Visual indicators of policy strength (color-coded: green = good, yellow = needs attention, red = dangerous)#

#### Request Flow Diagram
An animated diagram that shows:
1. A browser making a request to your application
2. Whether the request is allowed or blocked
3. Why it was allowed or blocked (which policy rule applied)

This helps you understand what's actually happening when users try to access your app from different websites.

#### Security Issues Found
A list of problems detected in your policies, such as:
- **Wildcard Permissions**: Allowing access from any website (very risky)
- **Missing Headers**: Security controls that aren't configured
- **Outdated Configurations**: Policies using old, insecure patterns

Each issue includes:
- **Severity Level**: How dangerous this problem is
- **Location**: Where in your code the issue exists
- **Impact**: What could happen if exploited
- **Fix Recommendation**: Plain-language instructions on how to fix it

## SSRF Pentester

### What is SSRF?

SSRF (Server-Side Request Forgery) is an attack where hackers trick your server into accessing things it shouldn't. Imagine if someone called your office and convinced your receptionist to open the safe and read confidential documents over the phone - that's similar to what SSRF does to servers.

## How the Pentester Works

This tool simulates attacks to test if your application is vulnerable:

#### Attack Scenarios
The tool tries various attack patterns:
- **Internal Network Access**: Can an attacker make your server access internal systems?
- **Cloud Metadata Theft**: Can they steal sensitive cloud configuration data?
- **File System Access**: Can they read files from your server's hard drive?

#### Real-Time Testing
You can:
1. Select different attack scenarios from a dropdown
2. Click "Run Test" to execute the simulation
3. Watch as the tool tries to exploit your application
4. See results showing whether the attack succeeded or was blocked

#### Results Dashboard
For each test, you'll see:
- **Status**: Pass (blocked) or Fail (vulnerable)
- **Evidence**: Proof of what happened during the test
- **Risk Level**: How serious this vulnerability is
- **Remediation**: Step-by-step fix instructions

## Why This Matters

### CORS/CSP Issues
Misconfigured CORS or CSP policies can:
- Allow attackers to steal user data from other websites
- Enable malicious scripts to run on your site
- Bypass security controls you've put in place

### SSRF Vulnerabilities
SSRF attacks can:
- Give attackers access to internal systems not meant for public access
- Steal cloud credentials and configuration data
- Be used as a stepping stone to launch further attacks

## How to Use This Page

### For Developers
1. Select your application from the environment selector
2. Review the policy visualization to understand current security settings
3. Check the issues list for problems that need fixing
4. Run SSRF tests before deploying new features that make external requests

### For Security Teams
1. Use CORS/CSP visualizations in security reviews to explain policies to non-technical stakeholders
2. Run regular SSRF scans to catch vulnerabilities before attackers do
3. Track policy improvements over time
4. Generate audit reports showing security posture

### For Managers
1. Review the "Total Issues" count to understand security health
2. Check severity levels to prioritize development work
3. Use visualizations in presentations to explain security to executives
4. Track remediation progress over time

## Common Scenarios

### Deploying a New API
Before launch, use this page to:
1. Verify CORS policies only allow your legitimate frontend domains
2. Confirm CSP blocks untrusted scripts
3. Run SSRF tests on all endpoints that accept URLs as input

### Security Incident Response
If you suspect an attack:
1. Check CORS/CSP logs to see if unauthorized domains accessed your API
2. Review SSRF test results to see if that could be the attack vector
3. Immediately tighten policies if issues are found

### Compliance Audits
Auditors often ask about access controls. Use this page to:
1. Demonstrate you have CORS/CSP policies in place
2. Show you actively test for SSRF vulnerabilities
3. Provide evidence of remediation for found issues
