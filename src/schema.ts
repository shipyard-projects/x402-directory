export const listingCategories = [
  "ai-ml-apis",
  "data-feeds",
  "compute",
  "storage",
  "content",
  "developer-tools",
  "identity",
  "other"
] as const;

export const listingStatuses = ["verified", "unverified"] as const;

export type ListingCategory = (typeof listingCategories)[number];
export type ListingStatus = (typeof listingStatuses)[number];

export type PricingInfo = {
  amount: string;
  currency: string;
  unit: string;
  network: string;
  details?: string;
};

export type X402Listing = {
  id: `x402_${string}`;
  name: string;
  url: string;
  description: string;
  category: ListingCategory;
  pricing: PricingInfo;
  status: ListingStatus;
  createdAt: string;
  updatedAt: string;
  lastCheckedAt?: string;
};

export function isListingCategory(value: string): value is ListingCategory {
  return listingCategories.includes(value as ListingCategory);
}

export function isListingStatus(value: string): value is ListingStatus {
  return listingStatuses.includes(value as ListingStatus);
}
