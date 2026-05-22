export type ListingCategory =
  | "AI"
  | "Content"
  | "Infrastructure"
  | "Search"
  | "Storage"
  | "Weather";

export type X402Listing = {
  id: string;
  name: string;
  provider: string;
  category: ListingCategory;
  description: string;
  endpointUrl: string;
  pricing: {
    amount: string;
    usd: string;
    asset: "USDC";
    unit: string;
    network: "base-mainnet" | "solana";
  };
  tags: string[];
  x402Version: string;
  status: "indexed";
  source: string;
  updatedAt: string;
};

export const listings: X402Listing[] = [
  {
    id: "padelmaps-weather-current",
    name: "Padelmaps Weather Current",
    provider: "padelmaps.org",
    category: "Weather",
    description: "Current weather data for a requested location.",
    endpointUrl: "https://padelmaps.org/api/x402-tools/weather/current",
    pricing: { amount: "10000", usd: "$0.01", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["weather", "forecast", "location"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "otaku-research-jobs",
    name: "Otaku Research Jobs",
    provider: "otaku.so",
    category: "Search",
    description: "Research, news summarization, trend analysis, and synthesis jobs for agents.",
    endpointUrl: "https://otaku.so/api/messaging/jobs",
    pricing: { amount: "15000", usd: "$0.015", asset: "USDC", unit: "job", network: "base-mainnet" },
    tags: ["research", "news", "summaries"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "x402-direct-services",
    name: "x402.direct Services",
    provider: "x402.direct",
    category: "Infrastructure",
    description: "Programmatic service directory endpoint for browsing indexed x402 services.",
    endpointUrl: "https://x402.direct/api/services",
    pricing: { amount: "0", usd: "$0.00", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["directory", "discovery", "services"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-05-22"
  },
  {
    id: "weblens-memory-list",
    name: "Weblens Memory List",
    provider: "weblens.dev",
    category: "Storage",
    description: "List active keys in a persistent storage namespace for an agent wallet.",
    endpointUrl: "https://api.weblens.dev/memory/list",
    pricing: { amount: "500", usd: "$0.0005", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["memory", "storage", "keys"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "weblens-memory-set",
    name: "Weblens Memory Set",
    provider: "weblens.dev",
    category: "Storage",
    description: "Store JSON values in persistent key-value memory with configurable TTL.",
    endpointUrl: "https://api.weblens.dev/memory/set",
    pricing: { amount: "1000", usd: "$0.001", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["memory", "storage", "json"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "asksurf-chat",
    name: "Ask Surf Chat",
    provider: "asksurf.ai",
    category: "AI",
    description: "Agent-facing chat endpoint indexed as an x402 paid service.",
    endpointUrl: "https://x402.asksurf.ai/x402/tools/ask_surf_chat",
    pricing: { amount: "200000", usd: "$0.20", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["chat", "assistant", "ai"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "aimo-chat-completions",
    name: "AiMo Chat Completions",
    provider: "aimo.network",
    category: "AI",
    description: "LLM generation endpoint exposed as an x402 service.",
    endpointUrl: "https://devnet.aimo.network/api/v1/chat/completions",
    pricing: { amount: "60", usd: "$0.00006", asset: "USDC", unit: "request", network: "base-mainnet" },
    tags: ["llm", "generation", "chat"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  },
  {
    id: "x402factory-speech-to-text",
    name: "x402factory Speech To Text",
    provider: "x402factory.ai",
    category: "Content",
    description: "Speech-to-text endpoint for audio sources with x402 payment discovery.",
    endpointUrl: "https://x402factory.ai/solana/stt",
    pricing: { amount: "230000", usd: "$0.23", asset: "USDC", unit: "request", network: "solana" },
    tags: ["speech-to-text", "audio", "transcription"],
    x402Version: "0.2",
    status: "indexed",
    source: "x402.direct",
    updatedAt: "2026-02-12"
  }
];

export const categories = Array.from(new Set(listings.map((listing) => listing.category))).sort();
