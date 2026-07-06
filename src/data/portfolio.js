export const profile = {
  name: "Dagm Ayalew",
  role: "Mobile App & Full Stack Software Developer",
  location: "Addis Ababa, Ethiopia",
  email: "dagmayalew489@gmail.com",
  phone: "+251988280976",
  portfolioUrl: "https://dagi-portfolio-terminal-1uaa.vercel.app",
  cvPath: "/Dagm_Ayalew_CV.pdf",
  linkedIn: "https://www.linkedin.com",
  github: "https://github.com",
};

export const trustSignals = [
  "Mobile Apps",
  "Full Stack Products",
  "Production-Ready UI",
  "API Integration",
];

export const skillGroups = [
  {
    title: "Mobile Development",
    skills: [
      "React Native",
      "Mobile UI",
      "Navigation",
      "State management",
      "API integration",
      "Forms",
      "Validation",
      "Performance",
    ],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend",
    skills: ["Go", "NestJS", "REST APIs", "Authentication", "PostgreSQL", "Prisma"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Render", "Neon", "Supabase", "Figma"],
  },
  {
    title: "Product Skills",
    skills: ["UI/UX thinking", "Debugging", "QA", "Deployment", "Technical docs"],
  },
];

export const skillExplanations = {
  "React Native": "Mobile UI, navigation, API flows, app state, and production screens.",
  "Mobile UI": "Clean mobile layouts, touch-friendly controls, loading states, and empty states.",
  Navigation: "Screen stacks, tabs, protected routes, and deep user flows.",
  "State management": "Predictable app state for auth, carts, forms, sessions, and cached data.",
  "API integration": "REST calls, retries, error states, token handling, and backend contracts.",
  Forms: "Validated inputs, clear feedback, submission states, and reliable user data capture.",
  Validation: "Client-side checks, helpful errors, and safer form workflows.",
  Performance: "Faster screens, smoother interactions, and reduced unnecessary re-renders.",
  React: "Reusable components, product UI, dashboards, and frontend state.",
  "Next.js": "SEO-ready pages, full-stack routes, deployment, and product websites.",
  TypeScript: "Safer code, clearer data contracts, and fewer runtime surprises.",
  "Tailwind CSS": "Fast responsive UI, consistent spacing, and maintainable design systems.",
  "Responsive UI": "Layouts that work cleanly across mobile, tablet, and desktop.",
  Go: "Fast backend services, APIs, and simple production-oriented architecture.",
  NestJS: "Structured backend APIs with modules, services, validation, and auth flows.",
  "REST APIs": "Practical API design, integration, loading states, and error handling.",
  Authentication: "Login, JWT flows, protected screens, refresh logic, and secure sessions.",
  PostgreSQL: "Relational data modeling for products, marketplaces, and admin tools.",
  Prisma: "Typed database access, migrations, and cleaner backend data workflows.",
  Git: "Branching, commits, collaboration, and safe delivery workflows.",
  GitHub: "Pull requests, reviews, issues, and team code collaboration.",
  Vercel: "Frontend deployment, previews, production builds, and fast releases.",
  Render: "Backend deployment for APIs and services.",
  Neon: "Hosted PostgreSQL for production-ready database workflows.",
  Supabase: "Auth, database, storage, and admin-ready product foundations.",
  Figma: "Reading designs, UI decisions, spacing, and product handoff.",
  "UI/UX thinking": "User flows, usability, hierarchy, and product clarity.",
  Debugging: "Finding root causes across UI, API, state, and deployment issues.",
  QA: "Checking edge cases, loading, empty, error, and success states.",
  Deployment: "Moving features from local development to usable production environments.",
  "Technical docs": "Clear notes for setup, APIs, handoff, and team continuity.",
};

export const projects = [
  {
    name: "PSY / ሳይ",
    description: "A psychology and self-authorship platform built around privacy, consent, and guided personal journeys.",
    problem: "People need structured, trustworthy digital experiences for psychologist-led reflection and self-authorship work.",
    role: "Technology Lead",
    stack: ["Go", "PostgreSQL", "Next.js", "Neon", "Vercel", "Render/Fly/Railway"],
    features: ["Secure auth", "Consent flow", "Self-authorship journeys", "Admin dashboard", "Privacy-focused structure"],
    value: "Turns expert-led content into a dependable product flow with strong data boundaries and admin control.",
  },
  {
    name: "BetFind / BetFinder",
    description: "A local marketplace that starts with house rentals and can expand into furniture, services, and moving help.",
    problem: "Local rental discovery often lacks trust, clear owner/renter flows, and structured visit coordination.",
    role: "Product-minded full stack developer",
    stack: ["React Native", "Next.js", "REST APIs", "Marketplace UX"],
    features: ["Guest browsing", "Owner and renter flows", "Visit requests", "Admin approval", "Trust and safety patterns"],
    value: "Creates a scalable marketplace foundation with clear moderation and multi-category expansion paths.",
  },
  {
    name: "Order Ethiopia",
    description: "A React Native e-commerce app designed for mobile-first shopping and checkout.",
    problem: "Mobile shoppers need fast product discovery, clear checkout, and location-aware delivery flows.",
    role: "Mobile developer",
    stack: ["React Native", "TypeScript", "Zustand", "REST APIs"],
    features: ["Cart and checkout", "Product details", "Location flow", "Reviews", "Payment sheets", "Search and categories"],
    value: "Improves the shopping journey from browsing to checkout with reusable mobile UI patterns.",
  },
  {
    name: "Color Token Manager",
    description: "A VS Code extension that replaces hardcoded colors with design tokens.",
    problem: "Teams lose consistency when colors are duplicated across code instead of managed through tokens.",
    role: "Extension developer",
    stack: ["VS Code Extension API", "TypeScript", "Design tokens"],
    features: ["Published extension", "Color scanning", "Token replacement", "Design-system workflow"],
    value: "Saves developer time and helps teams keep product UI aligned with design systems.",
  },
  {
    name: "BookMe Addis",
    description: "A local service booking marketplace connecting providers and customers.",
    problem: "Service discovery and booking need clearer flows for providers, customers, reviews, and availability.",
    role: "Mobile and backend developer",
    stack: ["React Native", "NestJS", "PostgreSQL", "REST APIs"],
    features: ["Provider/customer flows", "Booking system", "Reviews", "Mobile app", "Backend API"],
    value: "Supports a complete local booking workflow instead of isolated listing pages.",
  },
  {
    name: "Golden Arabian Majlis",
    description: "A furniture and majlis website with product management, search visibility, and commerce flows.",
    problem: "Furniture businesses need product pages, admin control, and SEO foundations to sell online.",
    role: "Full stack developer",
    stack: ["Next.js", "Supabase", "Cloudflare", "Google Search Console"],
    features: ["Product pages", "Admin CRUD", "Cart", "SEO", "Sitemap", "Search Console setup"],
    value: "Gives the business a maintainable catalog and stronger discoverability for buyers.",
  },
];

export const experience = [
  {
    title: "Mobile App Developer",
    company: "Eagle Lion System Technologies",
    period: "Feb 2026 - Present",
    bullets: [
      "Build and maintain production mobile features for fintech products.",
      "Integrate authentication, API contracts, transaction flows, and local persistence.",
      "Improve loading, error, retry, and session handling for more reliable mobile UX.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "TBC Technologies",
    period: "Mar 2025 - Feb 2026",
    bullets: [
      "Delivered features across mobile, frontend, and backend-connected interfaces.",
      "Fixed production issues, improved reliability, and worked through GitHub-based team workflows.",
      "Integrated REST APIs with practical error handling and user-focused UI states.",
    ],
  },
  {
    title: "Frontend Developer / Early Experience",
    company: "TBC Technologies",
    period: "Jun 2024 - Feb 2025",
    bullets: [
      "Built responsive React and Next.js features with clean UI structure.",
      "Connected frontend components to backend APIs and shared state flows.",
      "Practiced delivery discipline through standups, branches, reviews, and bug fixes.",
    ],
  },
];

export const processSteps = [
  "Understand the product goal",
  "Define user flow and requirements",
  "Design clean UI/UX structure",
  "Build reusable frontend and mobile components",
  "Integrate APIs and state management",
  "Test loading, empty, error, and edge states",
  "Deploy, review, and improve",
];

export const recruiterReasons = [
  "I build complete product flows, not only screens.",
  "I understand both user experience and engineering structure.",
  "I can work across mobile, frontend, backend, and deployment.",
  "I care about maintainability, performance, and real business value.",
  "I communicate clearly and deliver step by step.",
];
