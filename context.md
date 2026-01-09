# Spyder - AI-Powered Cybersecurity Platform

## Overview

Spyder is an advanced cybersecurity platform that combines AI-powered threat detection, real-time attack visualization, and intelligent security automation. Built for security teams who need to stay ahead of sophisticated cyber threats, Spyder provides comprehensive tools for monitoring, analyzing, and responding to security incidents.

## Vision & Purpose

Traditional security tools show you what happened. Spyder shows you what's happening right now and what's about to happen next. By combining AI-driven prediction with intuitive visualizations, we make complex security operations accessible to teams of all sizes.

The platform emphasizes:
- **Proactive Defense**: Predict and prevent attacks before they succeed
- **Visual Understanding**: Turn complex security data into clear, actionable insights
- **AI Assistance**: Augment human expertise with machine intelligence
- **Unified View**: One platform for all security operations

## Key Capabilities

### 🛡️ Attack Surface Management
Discover and monitor all internet-facing assets, visualize their relationships, and prioritize security risks based on real-world threat intelligence.

[→ Learn more about Attack Surface Management](docs/attack-surface.md)

### 🔍 Security Audits (CORS, CSP, SSRF)
Automated testing and visualization of security policies. Find misconfigurations that could lead to data breaches or cross-site attacks.

[→ Learn more about Security Audits](docs/audits.md)

### 💻 Code Security (PR-Level SAST)
AI-powered code scanning that detects vulnerabilities, leaked secrets, and malicious intent in Pull Requests before they reach production.

[→ Learn more about Code Security](docs/code-security.md)

### 🔥 Adaptive AI Firewall
Watch in real-time as AI learns from attacks and evolves defenses automatically. See the difference between static rules and intelligent defense.

[→ Learn more about the Adaptive Firewall](docs/firewall.md)

### 🎯 Incident Response & Attack Replay
Visual timeline reconstruction of security incidents. See exactly how attacks happened, which code was exploited, and what data was at risk.

[→ Learn more about Incident Response](docs/incidents.md)

### ⚠️ Vulnerability Intelligence (CVE Prediction)
AI-powered threat forecasting that predicts which vulnerabilities will be exploited before attackers strike. Focus your patching on what actually matters.

[→ Learn more about Vulnerability Intelligence](docs/vulnerabilities.md)

### 🔔 Alert Center
Unified feed of security alerts from all systems. AI-powered correlation reduces noise and highlights coordinated attacks.

[→ Learn more about the Alert Center](docs/notifications.md)

## Technology Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router for modern web applications
- **TypeScript** - Type-safe development for complex security logic
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first styling for responsive, professional UI

### Visualization Libraries
- **d3-geo** - Geographic mapping for attack surface visualization
- **react-simple-maps** - Interactive world maps showing threat distribution
- **react-force-graph-2d/3d** - Network topology and relationship graphs
- **three.js** - 3D rendering for advanced visualizations
- **framer-motion** - Smooth animations for timeline and graph interactions

### UI Components
- **Lucide React** - Modern icon library
- **Phosphor Icons** - Additional iconography
- **Tabler Icons** - Comprehensive icon set
- **Custom Components** - Purpose-built security UI components

### Development Tools
- **Bun / NPM** - Package management (both supported)
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing

## Project Structure

```
spyder/
├── app/
│   ├── (dashboard)/           # Main application (authenticated)
│   │   ├── attack-surface/    # Asset discovery & network mapping
│   │   ├── audits/            # CORS/CSP/SSRF testing
│   │   ├── code-security/     # PR-level vulnerability scanning
│   │   ├── firewall/          # AI firewall evolution demo
│   │   ├── incidents/         # Attack timeline replay
│   │   ├── vulnerabilities/   # CVE intelligence & prediction
│   │   ├── notifications/     # Unified alert center
│   │   ├── home/              # Dashboard home
│   │   ├── profile/           # User profile
│   │   ├── settings/          # Application settings
│   │   └── layout.tsx         # Shared dashboard layout with sidebar
│   ├── components/            # App-level components
│   ├── data/                  # Mock data & visualization datasets
│   ├── lib/                   # App-level utilities
│   ├── globals.css            # Global styles & design tokens
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   └── ui/                    # Shared UI component library
├── lib/
│   └── utils.ts               # Utility functions (e.g., cn helper)
├── types/
│   └── react-simple-maps.d.ts # Type definitions
├── docs/                      # Detailed documentation for each feature
├── public/                    # Static assets
└── context.md                 # This file - project overview
```

## Getting Started

### Prerequisites
- **Node.js** 20+ or **Bun** 1.0+
- **Git** for version control

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd spyder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or if using Bun:
   bun install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Architecture Principles

### App Router Structure
Spyder uses Next.js App Router with route groups for clean organization:
- `(dashboard)` route group contains all authenticated pages
- Shared layout in `app/(dashboard)/layout.tsx` provides sidebar navigation
- Landing page at `app/page.tsx` has no sidebar

### Data Visualization Strategy
All complex visualizations (graphs, maps, timelines) use client-side rendering:
- `"use client"` directive for interactive components
- Optimized data serialization for performance
- Progressive enhancement principles

### Styling Approach
- **Global Design System**: Core design tokens in `globals.css`
- **Utility-First**: TailwindCSS for component styling
- **Consistency**: `cn()` helper merges class names intelligently
- **Dark Mode**: Full dark mode support using `next-themes`
- **Custom Font**: IBM Plex Sans for professional appearance

### State Management
- **React useState/useEffect**: For local component state
- **Client-side only**: No server-side state management currently
- **Mock Data**: All security data is currently mocked in `data/` folders

## Development Guidelines

### Adding New Features

1. **Create feature route** in `app/(dashboard)/[feature-name]/`
2. **Add page component** as `page.tsx`
3. **Create subcomponents** in `components/` subdirectory
4. **Add mock data** in `data.ts` or `data/` folder
5. **Update sidebar navigation** in `app/(dashboard)/layout.tsx`
6. **Create documentation** in `docs/[feature-name].md`

### Component Organization

- **Feature-specific components**: `app/(dashboard)/[feature]/components/`
- **Shared UI components**: `components/ui/`
- **Global utilities**: `lib/utils.ts`

### Naming Conventions

- **Components**: PascalCase (e.g., `AssetList.tsx`)
- **Utilities**: camelCase (e.g., `calculateRisk.ts`)
- **CSS classes**: kebab-case or Tailwind utilities
- **Data files**: kebab-case (e.g., `mock-cve-data.ts`)

### Code Style

- **TypeScript**: Always use types, avoid `any` unless absolutely necessary
- **Imports**: Absolute imports preferred
- **Comments**: Explain "why", not "what"
- **Client Components**: Clearly mark with `"use client"` directive

## Key Concepts

### Mock Data Philosophy
All security data is currently simulated to demonstrate functionality:
- Realistic attack scenarios
- Representative CVE data
- Plausible network topologies

In production, these would connect to:
- Real security scanning tools
- Actual vulnerability databases
- Live network monitoring
- Production code repositories

### AI Features (Conceptual)
AI capabilities shown in the platform are demonstrations of what such a system could do:
- **Intent Detection**: Showing how AI could spot malicious code patterns
- **Threat Prediction**: Demonstrating CVE exploitation forecasting
- **Adaptive Defense**: Illustrating how AI firewalls could evolve
- **Root Cause Analysis**: Explaining incidents in plain language

### Design Priorities

1. **Clarity Over Complexity**: Security is complex enough - the UI should be clear
2. **Visual Over Textual**: Show relationships with graphs, not tables
3. **Proactive Over Reactive**: Predict threats, don't just report them
4. **Context Over Raw Data**: Explain what numbers mean, not just display them

## Documentation

Each major feature has detailed documentation explaining:
- **What it does** - Purpose and capabilities
- **How it works** - Underlying concepts and processes
- **Why it matters** - Real-world security value
- **How to use it** - Workflows and best practices
- **Common scenarios** - Example use cases

See the `docs/` directory for feature-specific guides.

## Contributing

### For Developers
1. Read feature documentation in `docs/`
2. Understand the data flow in existing pages
3. Follow established patterns for new features
4. Test responsive design (mobile, tablet, desktop)
5. Ensure dark mode works correctly

### For Designers
1. Maintain consistent spacing and typography
2. Use existing color palette from globals.css
3. Design for dark mode from the start
4. Consider accessibility (contrast, font sizes)

### For Security Experts
1. Validate authenticity of security concepts
2. Suggest realistic attack scenarios
3. Review explanations for accuracy
4. Propose additional threat models

## Deployment Considerations

### Production Readiness
Current state is a **demonstration platform**. For production use, you would need:
- Authentication/authorization system
- Database for persistence
- API integrations with real security tools
- Data encryption and compliance measures
- Rate limiting and DDoS protection
- Comprehensive logging and monitoring

### Performance Optimization
- Code splitting for large visualizations
- Lazy loading of heavy components
- Image optimization
- CDN for static assets
- Server-side rendering for initial page loads

## Support & Resources

### Internal Documentation
- [Attack Surface Management](docs/attack-surface.md)
- [Security Audits](docs/audits.md)
- [Code Security](docs/code-security.md)
- [Adaptive Firewall](docs/firewall.md)
- [Incident Response](docs/incidents.md)
- [Vulnerability Intelligence](docs/vulnerabilities.md)
- [Alert Center](docs/notifications.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Project Philosophy

**Security should be accessible.** Complex security concepts shouldn't require a PhD to understand. Every feature in Spyder emphasizes clear communication, visual understanding, and actionable insights. We believe the best security tools are the ones people actually use - and people use tools they understand.

**AI should augment, not replace.** Security professionals have irreplaceable expertise. AI should handle the tedious pattern matching and data analysis, freeing humans to make strategic decisions and handle sophisticated threats that require judgment.

**Defense should evolve.** Static security measures fail against adaptive attacks. Security systems must learn, predict, and evolve just like the threats they defend against.

---

For detailed information about any specific feature, see the linked documentation files in the `docs/` directory.
