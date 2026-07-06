import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { profile } from "@/data/portfolio";

const siteUrl = profile.portfolioUrl.replace(/\/$/, "");
const defaultImage = `${siteUrl}/favicon.png`;

const seoKeywords = [
  "Dagm Ayalew",
  "dagm ayalew",
  "Dagim",
  "dagim",
  "Dagem",
  "dagem",
  "Dagim Ayalew",
  "Dagem Ayalew",
  "software developer in Ethiopia",
  "mobile developer in Ethiopia",
  "React Native developer Ethiopia",
  "full stack developer Ethiopia",
  "frontend developer Ethiopia",
  "backend developer Ethiopia",
  "remote software developer",
  "mobile app developer worldwide",
  "React developer",
  "Next.js developer",
  "Go developer",
  "PostgreSQL developer",
];

const routeSeo = {
  "/": {
    title: "Dagm Ayalew | Software Developer in Ethiopia",
    description:
      "Dagm Ayalew is a mobile app and full stack software developer in Ethiopia building React Native, Next.js, Go, and PostgreSQL products for clients worldwide.",
  },
  "/about": {
    title: "About Dagm Ayalew | Mobile & Full Stack Developer",
    description:
      "Learn about Dagm Ayalew, a software developer in Ethiopia focused on clean UI, mobile apps, full stack products, APIs, and production-ready engineering.",
  },
  "/skills": {
    title: "Skills | React Native, Next.js, Go & PostgreSQL Developer",
    description:
      "Explore Dagm Ayalew's software development skills across React Native, React, Next.js, Go, NestJS, PostgreSQL, Prisma, APIs, and responsive UI.",
  },
  "/projects": {
    title: "Projects | Dagm Ayalew Software Developer Portfolio",
    description:
      "See portfolio projects by Dagm Ayalew, including mobile apps, full stack products, frontend experiences, backend APIs, and production-focused builds.",
  },
  "/experience": {
    title: "Experience | Dagm Ayalew Developer Background",
    description:
      "Review Dagm Ayalew's software development experience, product workflow, technical strengths, and practical engineering background.",
  },
  "/education": {
    title: "Education | Dagm Ayalew",
    description:
      "Explore Dagm Ayalew's education, learning path, and technical foundations as a mobile app and full stack software developer.",
  },
  "/contact": {
    title: "Contact Dagm Ayalew | Hire Software Developer in Ethiopia",
    description:
      "Contact Dagm Ayalew for remote software development, mobile app development, React Native, frontend, backend, and full stack product work.",
  },
};

function ensureMeta(selector, createElement) {
  const current = document.head.querySelector(selector);

  if (current) {
    return current;
  }

  const next = createElement();
  document.head.appendChild(next);
  return next;
}

function setMeta(name, content) {
  const element = ensureMeta(`meta[name="${name}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", name);
    return meta;
  });

  element.setAttribute("content", content);
}

function setProperty(property, content) {
  const element = ensureMeta(`meta[property="${property}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute("property", property);
    return meta;
  });

  element.setAttribute("content", content);
}

function setCanonical(href) {
  const element = ensureMeta('link[rel="canonical"]', () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    return link;
  });

  element.setAttribute("href", href);
}

export default function SeoManager() {
  const { pathname } = useLocation();
  const seo = routeSeo[pathname] || routeSeo["/"];
  const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;

  useEffect(() => {
    document.title = seo.title;
    setCanonical(canonicalUrl);
    setMeta("description", seo.description);
    setMeta("keywords", seoKeywords.join(", "));
    setMeta("author", profile.name);
    setMeta("robots", "index, follow, max-image-preview:large");
    setProperty("og:title", seo.title);
    setProperty("og:description", seo.description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:image", defaultImage);
    setProperty("og:site_name", `${profile.name} Portfolio`);
    setProperty("og:locale", "en_US");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", defaultImage);
  }, [canonicalUrl, seo.description, seo.title]);

  return null;
}
