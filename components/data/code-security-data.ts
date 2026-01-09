export interface SecurityIssue {
  id: string;
  type: 'Vulnerability' | 'Secret Exposure' | 'Suspicious Intent';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  file: string;
  line: number;
  status: 'Open' | 'Resolved' | 'Ignored';
  intent_risk: 'Low' | 'Medium' | 'High';
  ai_reasoning: string;
  code_snippet: string;
  intent_analysis?: string; // Specific for "Suspicious Intent"
  remediation_suggestion: string;
}

export interface PRContext {
  repository: string;
  pr_number: number;
  branch: string;
  status: 'Secure' | 'Issues Detected' | 'Blocked';
  commit_hash: string;
  author: {
    name: string;
    avatar_url: string; // url string
  };
  stats: {
    total_issues: number;
    critical_issues: number;
    intent_risks: number;
  }
}

export interface PRScenario {
    id: string;
    label: string;
    context: PRContext;
    issues: SecurityIssue[];
}

export const prScenarios: PRScenario[] = [
    {
        id: "pr-128",
        label: "Feature: Login Refactor",
        context: {
          repository: "acme/auth-service",
          pr_number: 128,
          branch: "feature/login-refactor",
          status: "Blocked",
          commit_hash: "a1b2c3d",
          author: {
            name: "Sarah Dev",
            avatar_url: "https://github.com/shadcn.png"
          },
          stats: {
            total_issues: 3,
            critical_issues: 1,
            intent_risks: 1
          }
        },
        issues: [
          {
            id: "ISS-01",
            type: "Vulnerability",
            severity: "High",
            title: "Unsanitized input in login handler",
            file: "authController.js",
            line: 87,
            status: "Open",
            intent_risk: "Low",
            ai_reasoning: "User input is passed directly to a database query without validation, which may allow SQL injection.",
            code_snippet: `85:   const { username, password } = req.body;
        86:   // VULNERABILITY: Raw query
        87:   const query = "SELECT * FROM users WHERE username = '" + username + "'";
        88:   const user = await db.execute(query);
        89:   if (!user) return res.status(401).send("Invalid credentials");`,
            remediation_suggestion: "Use parameterized queries or an ORM to handle input sanitization automatically."
          },
          {
            id: "ISS-02",
            type: "Suspicious Intent",
            severity: "Critical",
            title: "Hidden conditional bypass in auth flow",
            file: "authMiddleware.js",
            line: 142,
            status: "Open",
            intent_risk: "High",
            ai_reasoning: "This conditional logic is triggered only for specific user IDs and bypasses standard authentication checks.",
            intent_analysis: "The pattern matches known backdoor signatures. The condition checks for a hardcoded request header 'X-Debug-Root' which allows skipping password validation. This is highly suspicious behavior for production code.",
            code_snippet: `140:   if (req.headers['x-api-key'] === VALID_API_KEY) {
        141:     next();
        142:   } else if (req.headers['x-debug-root'] === "super_secret_override") {
        143:     // SUSPICIOUS: Bypass auth
        144:     console.log("Root override accessing system...");
        145:     next();
        146:   } else {
        147:     res.status(403).json({ error: "Forbidden" });
        148:   }`,
            remediation_suggestion: "Remove the debug override immediately. If debug access is needed, use standard role-based access control (RBAC)."
          },
          {
            id: "ISS-03",
            type: "Secret Exposure",
            severity: "Medium",
            title: "AWS Access Key hardcoded",
            file: "config/aws.js",
            line: 12,
            status: "Resolved",
            intent_risk: "Low",
            ai_reasoning: "A pattern resembling an AWS Access Key ID was detected in the source code.",
            code_snippet: `10: const s3Config = {
        11:   bucket: "acme-uploads",
        12:   accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        13:   region: "us-east-1"
        14: };`,
            remediation_suggestion: "Move secrets to environment variables or a secrets manager like AWS Secrets Manager or Vault."
          }
        ]
    },
    {
        id: "pr-142",
        label: "Hotfix: Payment Gateway",
        context: {
          repository: "acme/payment-service",
          pr_number: 142,
          branch: "hotfix/stripe-webhook",
          status: "Issues Detected",
          commit_hash: "f9e8d7c",
          author: {
            name: "Mike Operations",
            avatar_url: "https://github.com/shadcn.png"
          },
          stats: {
            total_issues: 2,
            critical_issues: 0,
            intent_risks: 0
          }
        },
        issues: [
            {
                id: "ISS-04",
                type: "Vulnerability",
                severity: "Medium",
                title: "Missing Signature Verification",
                file: "webhookController.ts",
                line: 24,
                status: "Open",
                intent_risk: "Low",
                ai_reasoning: "The webhook endpoint processes events without verifying the Stripe signature header, allowing potential replay attacks or forged events.",
                code_snippet: `22: export const handleWebhook = async (req, res) => {
23:   const sig = req.headers['stripe-signature'];
24:   // TODO: Verify signature
25:   const event = req.body;
26:   
27:   switch (event.type) {`,
                remediation_suggestion: "Implement `stripe.webhooks.constructEvent` to validate the request signature before processing."
            },
            {
                id: "ISS-05",
                type: "Secret Exposure",
                severity: "Low",
                title: "Test Stripe Key in comments",
                file: "webhookController.ts",
                line: 5,
                status: "Ignored",
                intent_risk: "Low",
                ai_reasoning: "A potential API key was found in a comment block.",
                code_snippet: `4: // Using test key for local dev:
5: // sk_test_4eC39HqLyjWDarjtT1zdp7dc
6: 
7: import Stripe from 'stripe';`,
                remediation_suggestion: "Remove sensitive keys from comments even if they are test keys, or ensure they are revoked."
            }
        ]
    },
    {
        id: "pr-156",
        label: "Chore: Update Dependencies",
        context: {
          repository: "acme/frontend-dashboard",
          pr_number: 156,
          branch: "chore/deps-bump",
          status: "Blocked",
          commit_hash: "e4d3c2b",
          author: {
            name: "Dependabot Clone",
            avatar_url: "https://github.com/github.png"
          },
          stats: {
            total_issues: 1,
            critical_issues: 1,
            intent_risks: 1
          }
        },
        issues: [
            {
                id: "ISS-06",
                type: "Suspicious Intent",
                severity: "Critical",
                title: "Typosquatting Package Detected",
                file: "package.json",
                line: 42,
                status: "Open",
                intent_risk: "High",
                ai_reasoning: "The package `reaact-dom` appears to be a typosquatting attempt targeting `react-dom`. This is a high-confidence supply chain attack vector.",
                intent_analysis: "The package name deviates by one character from a popular library. The author of the package has no other reputation. The timeline of release follows a recent CVE in the official package, suggesting an opportunistic attack.",
                code_snippet: `40:   "dependencies": {
41:     "react": "^18.2.0",
42:     "reaact-dom": "^18.2.0",
43:     "lucide-react": "^0.263.1"
44:   },`,
                remediation_suggestion: "Reject this PR immediately and investigate the source of this dependency addition. Ensure `react-dom` is used."
            }
        ]
    },
    {
        id: "pr-160",
        label: "Infra: Add Analytics Bucket",
        context: {
          repository: "acme/infrastructure",
          pr_number: 160,
          branch: "infra/analytics-storage",
          status: "Issues Detected",
          commit_hash: "b7a8901",
          author: {
            name: "Dave DevOps",
            avatar_url: "https://github.com/shadcn.png"
          },
          stats: {
            total_issues: 1,
            critical_issues: 0,
            intent_risks: 0
          }
        },
        issues: [
            {
                id: "ISS-07",
                type: "Vulnerability",
                severity: "High",
                title: "S3 Bucket Public Read Access",
                file: "terraform/analytics.tf",
                line: 15,
                status: "Open",
                intent_risk: "Low",
                ai_reasoning: "The S3 bucket ACL is set to 'public-read', exposing all analytics data to the public internet.",
                code_snippet: `12: resource "aws_s3_bucket" "analytics" {
13:   bucket = "acme-analytics-2024"
14:   
15:   acl    = "public-read"
16:   
17:   tags = {
18:     Environment = "Production"`,
                remediation_suggestion: "Change the ACL to 'private' and use CloudFront or signed URLs for access if needed."
            }
        ]
    }
];

// Backwards compatibility helpers
export const mockPRContext = prScenarios[0].context;
export const mockSecurityIssues = prScenarios[0].issues;
