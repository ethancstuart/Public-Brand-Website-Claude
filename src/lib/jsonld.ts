import { siteConfig } from "./constants";
import type { PortfolioProject } from "./constants";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Senior Manager, Data & AI Products and BI Engineering",
    worksFor: {
      "@type": "Organization",
      name: "The Walt Disney Company",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Loyola Marymount University",
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.substack,
    ],
  };
}

export function getSoftwareApplicationJsonLd(project: PortfolioProject) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.liveUrl,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

export function getArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}
