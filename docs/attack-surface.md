# Attack Surface Management

## What This Page Does

The Attack Surface page helps you see all the digital doors and windows into your organization that outsiders can access. Think of it like a security camera system that shows every entry point to your building - except this is for your web infrastructure.

## Main Features

### Visual Network Map
At the heart of this page is an interactive graph that shows how all your digital assets connect to each other. You'll see:

- **Domains**: Your main website addresses (like company.com)
- **Subdomains**: Specific sections under your main domain (like api.company.com or admin.company.com)
- **Ports**: The specific "gates" through which internet traffic flows
- **Services**: The applications running at each entry point (like web servers, databases, etc.)

The graph uses colors and lines to show relationships. If something is connected, you'll see a line between them. The graph updates in real-time based on what's happening with your infrastructure.

### Three-Panel Layout

#### Left Panel: Asset Inventory
This panel lists all your assets in an organized way. You can:
- Browse through all your domains, subdomains, ports, and services
- Click on any item to see its details
- Quickly identify what's exposed to the internet

The panel can be collapsed to give you more screen space for the graph.

#### Center Panel: Interactive Graph
The main visualization shows your attack surface as a living network:
- **Nodes** represent your assets (bigger nodes = more important)
- **Lines** show connections between assets
- **Colors** indicate risk levels (red = high risk, green = low risk, etc.)
- You can click and drag nodes to reorganize the view
- Clicking on any node selects it and shows detailed information

#### Right Panel: Asset Details
When you select an asset, this panel shows:
- **Basic Information**: Name, type, and when it was discovered
- **Risk Assessment**: Security score and vulnerability details
- **Associated Risks**: What could go wrong with this asset
- **Recommendations**: Plain-language suggestions for improving security

### Risk Monitoring

The page displays an overall **Risk Score** in the top bar. This number (0-100) represents how exposed your organization is to potential attacks. Higher numbers mean more risk.

### Time Filtering

At the bottom of the page, you can filter the view by time:
- **All History**: See everything ever discovered
- **Last 7 Days**: Focus on recent changes
- **Last 24 Hours**: See what's happened today

This helps you spot new assets that appeared recently, which might indicate unauthorized systems or new projects that need security review.

## How It Works

### Data Collection
The system continuously scans your internet-facing infrastructure to discover:
1. All domain names associated with your organization
2. All services running on those domains
3. What ports are open and accepting connections
4. What software is running at each endpoint

### Risk Calculation
For each asset, the system evaluates:
- **Exposure Level**: How easy is it for outsiders to find and access?
- **Known Vulnerabilities**: Are there published security flaws in the software being used?
- **Configuration Issues**: Is it set up securely?
- **Security Controls**: What protections are in place?

All of this information combines into a risk score that helps you prioritize what to fix first.

### Real-Time Updates
The page updates automatically as new information comes in. You can see when the last update happened in the bottom-right corner of the screen.

## Why This Matters

Every system you expose to the internet is a potential entry point for attackers. This page helps you:

1. **Discover Shadow IT**: Find systems that teams created without going through security review
2. **Prioritize Security Work**: Focus on the riskiest assets first
3. **Track Changes Over Time**: See when new services appear or old ones disappear
4. **Understand Dependencies**: See how your systems connect to each other

## Common Use Cases

### Finding Forgotten Assets
Organizations often have old test servers or staging environments that were forgotten but are still running. This page shows everything, helping you find and shut down unnecessary systems.

### Impact Analysis
If a vulnerability is announced in specific software, you can quickly search the asset list to see where you're using that software and what the impact would be.

### Compliance Audits
When auditors ask "what systems do you have exposed to the internet?", this page provides a comprehensive, up-to-date answer.

### New Hire Onboarding
New security team members can use this page to quickly understand the organization's infrastructure landscape.
