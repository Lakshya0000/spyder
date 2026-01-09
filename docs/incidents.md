# Incident Response & Attack Replay

## What This Page Does

The Incident Response page helps you understand exactly how a security attack happened by visually replaying it step-by-step. It's like having a security camera recording that you can watch in slow motion, seeing each move the attacker made from the first probe to the final exploitation.

Unlike traditional security logs that give you raw technical data, this page tells the **story** of an attack with explanations anyone can understand.

## Main Features

### Incident Header

At the top, you see a summary of the security incident:
- **Incident Type**: What kind of attack (e.g., "Authentication Bypass", "Data Breach", "Privilege Escalation")
- **Severity Level**: How serious it is (Critical, High, Medium, Low)
- **Incident ID**: Unique identifier for tracking and reporting
- **Description**: Plain-language summary of what happened
- **Time Detected**: When the system first noticed the attack

You can switch between different incidents using the scenario selector to investigate multiple security events.

### Attack Path Timeline (Middle Section)

This is the heart of the page - a horizontal timeline showing every step of the attack:

#### Timeline Nodes
Each step appears as a node on the timeline:
- **Runtime Node**: Attack actions at the network/server level (marked with a server icon)
- **Code Node**: Where the attack exploited application code (marked with a code icon)
- **Data Node**: Points where data was accessed or stolen (marked with a database icon)

The timeline automatically plays through the attack, pausing at each step so you can see what happened.

#### Visual Flow
- Nodes light up in sequence as the attack progresses
- Lines connect the nodes showing attack flow
- Color coding indicates severity (red = critical step, orange = important, gray = informational)
- Pulsing animations show the active step

You can click any node to jump directly to that point in the attack sequence.

### AI Root Cause Analysis (Left Panel)

The AI explains the attack in plain language:

#### Main Explanation
A clear, jargon-free description of:
- What the attacker did
- How they did it
- Why it worked
- What the impact is

#### Blast Radius
Shows what could be affected:
- Which systems are vulnerable
- How many users impacted
- What data is at risk
- Potential for further exploitation

#### Pattern Detection
Indicates if this attack has been seen before:
- Similar incidents in your history
- Which security rules detected it
- Whether it matched known attack patterns

#### Recommendations
Clear guidance on:
- **Why It Happened**: Root cause explanation
- **Recommended Fix**: Specific steps to prevent recurrence

### Code Impact View (Right Panel)

When the attack reaches application code, this panel shows:

#### Source Code Display
- **Syntax Highlighted Code**: Easy-to-read code view
- **Vulnerable Line Highlighted**: The exact line exploited is marked in red
- **Context Code**: Surrounding lines to understand what's happening
- **File & Function Name**: Where in your codebase this exists

#### Vulnerability Marker
A label showing:
- "Vulnerable Entry Point" badge
- File name and function name
- Line number in the code

This helps developers quickly locate and fix the problem.

## How It Works

### Attack Reconstruction

When a security incident is detected, the system:

1. **Collects Evidence**: Gathers logs from all systems involved
2. **Correlates Events**: Connects related activities into a timeline
3. **Identifies Code Paths**: Traces which code was executed
4. **Maps Data Flow**: Shows what data was accessed
5. **Builds Narrative**: Creates a human-readable story

### AI Analysis

The AI examines:
- **Attack Techniques**: What methods did the attacker use?
- **Vulnerability Type**: What weakness did they exploit?
- **Attacker Intent**: What were they trying to achieve?
- **Impact Scope**: How much damage could they do?
- **Similar Incidents**: Have we seen this before?

### Real-Time Replay

The timeline animation shows:
- Each step the attacker took in chronological order
- How quickly they moved through your system
- Where they encountered security controls
- Which controls failed to stop them

The replay helps you **see** the attack rather than just read about it, making it easier to understand and explain to others.

## Why This Matters

### Understanding Attack Mechanics
Reading raw logs like:
```
2024-01-04 14:32:17 - Request to /api/auth with header X-Debug-Root
2024-01-04 14:32:18 - Auth middleware bypassed
2024-01-04 14:32:19 - Admin panel accessed
```

Doesn't tell you much. This page translates that into:
> "The attacker discovered that your authentication system has a debugging feature that can be triggered with a special header. They used this header to skip password verification entirely, gaining full administrator access to your system."

That's much easier to understand and act on.

### Faster Incident Response
When an attack is happening:
1. Security team opens this page
2. Sees exactly what the attacker is doing in real-time
3. Identifies the vulnerability being exploited
4. Implements a fix or blocks the attacker
5. All within minutes instead of hours

### Post-Incident Learning
After an incident:
1. Review the timeline to understand what happened
2. Identify where security failed
3. Implement fixes to prevent recurrence
4. Train team on the attack technique
5. Update security policies

### Communication with Stakeholders
When explaining an incident to:
- **Executives**: Show the timeline and AI summary - they'll understand immediately
- **Developers**: Show the code panel - they can fix the vulnerability
- **Legal/Compliance**: Provide the full timeline with timestamps for incident reports
- **Customers**: Use the AI explanation to draft clear, honest breach notifications

## How to Use This Page

### During an Active Incident
1. Select the ongoing incident from the dropdown
2. Watch the timeline to see current attack progression
3. Review the AI analysis for immediate context
4. Check the code panel to see vulnerable areas
5. Use recommendations to implement emergency fixes
6. Monitor if the attack evolves with new steps appearing

### After an Incident (Forensics)
1. Select the completed incident
2. Step through timeline slowly to examine each phase
3. Take screenshots for incident reports
4. Review the blast radius assessment
5. Follow fix recommendations
6. Document lessons learned

### For Team Training
1. Use as case studies in security training sessions
2. Show how attacks progress step-by-step
3. Demonstrate why certain coding practices are dangerous
4. Train new security team members on incident analysis
5. Create awareness of real threats faced by the organization

### For Compliance & Reporting
1. Export timeline for incident reports
2. Use AI analysis in root cause documentation
3. Show remediation steps taken
4. Prove rapid response time with timestamps
5. Demonstrate security posture to auditors

## Common Scenarios

### Authentication Bypass Attack
**What Happened**: Attacker bypassed login using a debug header

**Timeline Shows**:
1. T0: Attacker probes authentication endpoint
2. T1: Discovers X-Debug-Root header
3. T2: Sends request with special header
4. T3: Middleware grants access without password
5. T4: Attacker accesses admin panel

**Code Panel Shows**: The middleware function with the problematic debug logic highlighted

**AI Explains**: "The debugging feature left in production code created a security backdoor. Anyone who knows about this header can access the system without credentials."

**Fix**: Remove debug code, implement proper authentication always

### SQL Injection Attack
**What Happened**: Attacker stole database contents through vulnerable search feature

**Timeline Shows**:
1. T0: Normal search requests to test functionality
2. T1: Injection attempt with SQL code in search box
3. T2: Database executes malicious query
4. T3: Sensitive data extracted
5. T4: Data exfiltrated to attacker's server

**Code Panel Shows**: The vulnerable database query with unsanitized user input

**AI Explains**: "The search function directly inserted user input into SQL queries without validation. This allowed attackers to inject their own database commands."

**Fix**: Use parameterized queries, input validation

## Key Concepts Explained

### What is "Attack Path Reconstruction"?
It means tracing backward from the damage to figure out every step the attacker took. Like watching a crime scene investigation, but for cyber attacks.

### What are "Runtime vs. Code" nodes?
- **Runtime**: Things happening at the infrastructure level (network requests, server processes)
- **Code**: Things happening inside your application (functions being called, data being processed)

Seeing both gives you the complete picture.

### Why show the actual code?
Because that's where the fix needs to happen. Showing developers the exact vulnerable code line makes fixing it much faster.

## Key Takeaway

Traditional incident reports are like reading about a car accident in text. This page is like watching the dash 
cam footage with an expert explaining what went wrong at each moment. It transforms complex security incidents into understandable stories that teams can learn from and act on.
