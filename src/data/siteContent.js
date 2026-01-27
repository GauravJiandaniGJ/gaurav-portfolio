// src/data/siteContent.js
// Central content file for all site copy - easy to update without touching components

export const siteContent = {
  // META
  meta: {
    title: "Gaurav Jiandani | Principal Architect & Technical Partner",
    description: "Principal-level architecture and technical leadership for SaaS platforms and commerce systems where reliability directly impacts revenue."
  },

  // HERO SECTION
  hero: {
    headline: "Your backend shouldn't be a liability.",
    headlineAccent: "Let's make it a competitive advantage.",
    subheadline: "Principal-level architecture and technical leadership for SaaS platforms and commerce systems where reliability directly impacts revenue.",
    credibilityLine: "I've architected systems handling 1M+ daily requests. Now I help founders build platforms that scale without technical debt compounding.",
    primaryCTA: {
      text: "See If We're a Fit",
      link: "#contact"
    },
    secondaryCTA: {
      text: "View Case Studies",
      link: "#case-studies"
    }
  },

  // ABOUT/PROFILE (replaces sidebar)
  profile: {
    name: "Gaurav Jiandani",
    title: "Principal Architect & Technical Partner",
    location: "India • Working with global clients",
    credentials: [
      "10+ years architecting production systems",
      "Systems processing 1M+ requests/day",
      "Claude Code Certified (Anthropic)",
      "Laravel, Vue.js, Python specialist"
    ]
  },

  // FIT ASSESSMENT SECTION
  fitAssessment: {
    sectionTitle: "Is this engagement right for you?",
    goodFit: {
      title: "This is a good fit if:",
      items: [
        "Your platform is post-MVP and revenue is now tied to reliability",
        "You need architectural decisions made with long-term cost implications in mind",
        "Your team needs senior technical direction—not more junior execution",
        "You want a technical partner who thinks about your P&L, not just your codebase"
      ]
    },
    notFit: {
      title: "This is not a good fit if:",
      items: [
        "You're optimizing for the lowest hourly rate",
        "You need a developer to execute tasks without understanding context",
        "Your timeline doesn't allow for doing things properly"
      ]
    }
  },

  // PROBLEMS SECTION
  problems: {
    sectionTitle: "Technical challenges I specialize in",
    items: [
      {
        title: "Scale-induced fragility",
        description: "Systems that worked at 10K users but break at 100K"
      },
      {
        title: "Capacity management complexity",
        description: "Booking, reservation, and inventory systems with real-time correctness requirements"
      },
      {
        title: "Architecture ossification",
        description: "Codebases that have become expensive to change safely"
      },
      {
        title: "Commerce platform performance",
        description: "E-commerce apps and integrations that need to handle traffic spikes without degradation"
      },
      {
        title: "Technical leadership vacuum",
        description: "Teams shipping features without architectural coherence"
      }
    ]
  },

  // HOW I WORK SECTION
  engagement: {
    sectionTitle: "My engagement model",
    intro: "I take ownership of technical outcomes—not just deliverables.",
    items: [
      {
        title: "Architectural ownership",
        description: "I design the system structure and own the technical decisions that shape it"
      },
      {
        title: "Stakeholder integration",
        description: "I work directly with founders, CTOs, and product leaders—not through layers"
      },
      {
        title: "Execution leverage",
        description: "For implementation-heavy phases, I bring in vetted engineers from my team—while maintaining architectural oversight"
      },
      {
        title: "Transparent reasoning",
        description: "You'll understand why decisions were made, not just what was built"
      }
    ]
  },

  // PROOF/RESULTS SECTION
  proof: {
    sectionTitle: "What I've built and maintained",
    stats: [
      { value: "1M+", label: "Daily requests handled by systems I've architected" },
      { value: "100K+", label: "Daily booking requests in capacity management systems" },
      { value: "600K+", label: "Users on platforms I've scaled" },
      { value: "12K+", label: "merchants on commerce platforms I've scaled" }
    ],
    achievements: [
      "Laravel migrations across major versions (7→11) without service interruption",
      "SR&ED-qualifying technical R&D (distributed systems, real-time reconciliation)",
      "Microservices transformations maintaining backward compatibility"
    ],
    // Anthropic Claude Code Certification - SEO optimized
    certification: {
      title: "Claude Code in Action",
      issuer: "Anthropic",
      issuerDescription: "The AI safety company behind Claude, the leading AI assistant for enterprise and development workflows",
      description: "Certified in AI-augmented software development using Claude Code, Anthropic's advanced AI coding assistant. This certification validates expertise in leveraging large language models (LLMs) for production-grade software architecture, code generation, and intelligent development workflows.",
      skills: [
        "AI-Augmented Development",
        "Claude Code CLI Mastery",
        "LLM-Powered Code Generation",
        "Agentic Software Development",
        "AI Pair Programming"
      ],
      issuedDate: "January 24, 2026",
      certificateId: "u5q8tip8rsh7",
      verifyUrl: "https://verify.skilljar.com/c/u5q8tip8rsh7",
      image: "/static/ccAction.png",
      altText: "Claude Code in Action Certificate - Anthropic Certified Developer - Gaurav Jiandani"
    }
  },

  // OPEN SOURCE & WRITING SECTION
  openSource: {
    sectionTitle: "Open Source & Writing",
    sectionSubtitle: "Tools I've built and shared with the community",
    projects: [
      {
        title: "Mac Rephraser",
        description: "A Mac-wide text rephrasing tool powered by OpenAI. Select text anywhere, press Ctrl+Option+R, get it rephrased instantly.",
        stats: "13+ GitHub stars",
        tech: ["Python", "OpenAI API", "macOS"],
        links: {
          github: "https://github.com/GauravJiandaniGJ/mac-rephraser",
          article: "https://medium.com/@jiandanigaurav/saved-16-hours-a-month-by-building-a-tiny-ai-tool-on-my-mac"
        }
      },
      {
        title: "iPhone Expense Logger",
        description: "A simple, free expense tracking system using iPhone Shortcuts + Google Sheets. Log expenses in under 5 seconds — no app needed.",
        stats: "116 claps on Medium",
        tech: ["iOS Shortcuts", "Google Apps Script", "Google Sheets"],
        links: {
          github: "https://github.com/GauravJiandaniGJ/iphone-cash-logger-shortcut",
          article: "https://medium.com/@jiandanigaurav/no-app-no-subscription-just-an-iphone-shortcut-that-tracks-expenses-in-5-seconds"
        }
      },
      {
        title: "iPhone Rephraser",
        description: "iOS Shortcut that rephrases text instantly using OpenAI API, triggered via iPhone Action Button.",
        stats: "109 claps on Medium",
        tech: ["iOS Shortcuts", "OpenAI API"],
        links: {
          article: "https://medium.com/@jiandanigaurav/rephraser-on-iphone-now-i-save-time-everywhere"
        }
      }
    ],
    writing: {
      title: "Writing & Insights",
      description: "I write about productivity, automation, and engineering practices.",
      mediumUrl: "https://medium.com/@jiandanigaurav"
    }
  },

  // SERVICES SECTION
  services: {
    sectionTitle: "How we can work together",
    tiers: [
      {
        name: "Architecture Assessment",
        description: "Code review, architecture analysis, risk identification, prioritized recommendations",
        ideal: "Starting point for new engagements",
        price: "Fixed scope"
      },
      {
        name: "Technical Leadership Retainer",
        description: "Ongoing architectural guidance, code reviews, team mentoring, stakeholder alignment",
        ideal: "Teams needing senior technical direction",
        price: "Monthly engagement"
      },
      {
        name: "Project Implementation",
        description: "Full delivery ownership—I architect, my team executes under my oversight",
        ideal: "Specific initiatives with defined outcomes",
        price: "Milestone-based"
      }
    ]
  },

  // FINAL CTA
  finalCTA: {
    title: "Let's determine if there's a fit",
    description: "I take on a limited number of engagements to ensure each gets proper attention. If you're dealing with architectural uncertainty, scaling challenges, or need senior technical judgment—let's have a focused conversation about your situation.",
    buttonText: "Request an Introduction",
    calendlyUrl: "https://calendly.com/gauravjiandani/30min",
    email: "jiandanigaurav@gmail.com"
  },

  // FOOTER
  footer: {
    copyright: `© ${new Date().getFullYear()} Gaurav Jiandani`,
    tagline: "Principal Architect & Technical Partner",
    bio: "Gaurav Jiandani is a senior software engineer with 9+ years building high-scale backend systems in Laravel, Python, and Vue.js. He specializes in architecture for applications handling millions of daily requests, performance optimization, and turning complex business logic into reliable software. When not building for clients, he creates practical automation tools that solve everyday friction."
  }
};

export default siteContent;
