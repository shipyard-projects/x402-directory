export const listings = [
  {
    slug: 'weather-meter',
    name: 'Weather Meter',
    url: 'https://weather.example/x402',
    tryUrl: 'https://weather.example/demo',
    description:
      'A small x402 endpoint for current weather summaries by city. Useful for testing wallet-gated API calls and pay-per-request UX.',
    category: 'Data APIs',
    pricing: { amount: 0.02, currency: 'USDC', unit: 'request' },
    verificationStatus: 'verified',
    lastChecked: '2026-05-28',
    maintainer: 'Weather Meter Labs'
  },
  {
    slug: 'receipt-lens',
    name: 'Receipt Lens',
    url: 'https://receiptlens.example/pay',
    tryUrl: 'https://receiptlens.example',
    description:
      'Transforms uploaded receipt images into structured JSON after x402 payment. Listed here as a reference flow for AI-agent commerce demos.',
    category: 'AI tools',
    pricing: { amount: 0.15, currency: 'USDC', unit: 'image' },
    verificationStatus: 'pending',
    lastChecked: '2026-05-26',
    maintainer: 'Receipt Lens'
  },
  {
    slug: 'dataset-postage',
    name: 'Dataset Postage',
    url: 'https://datasetpostage.example/x402/download',
    tryUrl: 'https://datasetpostage.example/catalog',
    description:
      'A pay-per-download endpoint for small public-domain CSV bundles. Good for testing listing detail pages with richer pricing and verification metadata.',
    category: 'Datasets',
    pricing: { amount: 0.50, currency: 'USDC', unit: 'download' },
    verificationStatus: 'verified',
    lastChecked: '2026-05-29',
    maintainer: 'Open Data Desk'
  }
];
