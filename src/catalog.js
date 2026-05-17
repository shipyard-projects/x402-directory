export const categories = [
  {
    slug: "ai-ml-apis",
    name: "AI/ML APIs",
    description: "Inference, embeddings, agents, and model-powered services."
  },
  {
    slug: "data-feeds",
    name: "Data feeds",
    description: "Paid access to live, historical, or specialized data streams."
  },
  {
    slug: "compute",
    name: "Compute",
    description: "On-demand execution, jobs, inference workers, and serverless tasks."
  },
  {
    slug: "storage",
    name: "Storage",
    description: "Files, blobs, retrieval endpoints, backups, and archival services."
  },
  {
    slug: "content",
    name: "Content",
    description: "Articles, media, reports, documents, and gated creative assets."
  },
  {
    slug: "developer-tools",
    name: "Developer tools",
    description: "APIs, SDKs, testing tools, monitoring, and automation utilities."
  },
  {
    slug: "identity-auth",
    name: "Identity and auth",
    description: "Verification, profiles, credentials, sessions, and access control."
  }
];

export const listings = [
  {
    id: "model-meter",
    name: "Model Meter",
    url: "https://example.com/model-meter",
    category: "ai-ml-apis",
    description: "x402-gated token usage estimates for common model providers.",
    pricing: "$0.002 per request",
    verified: true,
    lastChecked: "2026-05-10"
  },
  {
    id: "chain-snapshot-feed",
    name: "Chain Snapshot Feed",
    url: "https://example.com/chain-snapshot",
    category: "data-feeds",
    description: "Fresh chain metadata snapshots for agent workflows.",
    pricing: "$0.01 per snapshot",
    verified: true,
    lastChecked: "2026-05-12"
  },
  {
    id: "micro-render",
    name: "Micro Render",
    url: "https://example.com/micro-render",
    category: "compute",
    description: "Short-lived browser render jobs paid through x402.",
    pricing: "$0.05 per render",
    verified: false,
    lastChecked: "2026-05-08"
  },
  {
    id: "agent-archive",
    name: "Agent Archive",
    url: "https://example.com/agent-archive",
    category: "storage",
    description: "Pay-per-upload object storage for agent-generated artifacts.",
    pricing: "$0.001 per MB",
    verified: true,
    lastChecked: "2026-05-11"
  },
  {
    id: "research-briefs",
    name: "Research Briefs",
    url: "https://example.com/research-briefs",
    category: "content",
    description: "Gated market and technical briefs with x402 payment access.",
    pricing: "$0.25 per brief",
    verified: false,
    lastChecked: "2026-05-05"
  },
  {
    id: "x402-probe",
    name: "x402 Probe",
    url: "https://example.com/x402-probe",
    category: "developer-tools",
    description: "Endpoint liveness checks and payment handshake diagnostics.",
    pricing: "$0.003 per check",
    verified: true,
    lastChecked: "2026-05-13"
  },
  {
    id: "wallet-pass",
    name: "Wallet Pass",
    url: "https://example.com/wallet-pass",
    category: "identity-auth",
    description: "Wallet-bound access tokens for paid agent sessions.",
    pricing: "$0.01 per session",
    verified: false,
    lastChecked: "2026-05-09"
  }
];

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getListingsByCategory(slug) {
  return listings.filter((listing) => listing.category === slug);
}

export function getCategoryCounts() {
  return categories.map((category) => ({
    ...category,
    count: getListingsByCategory(category.slug).length
  }));
}

export function validateCatalog() {
  const categorySlugs = new Set(categories.map((category) => category.slug));
  const duplicateSlugs = categories
    .map((category) => category.slug)
    .filter((slug, index, allSlugs) => allSlugs.indexOf(slug) !== index);
  const invalidListings = listings.filter((listing) => !categorySlugs.has(listing.category));

  return {
    valid: duplicateSlugs.length === 0 && invalidListings.length === 0,
    duplicateSlugs,
    invalidListings
  };
}
