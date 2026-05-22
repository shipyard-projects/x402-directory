import { categories, listings, type X402Listing } from "./listings.js";

export type ListingFilters = {
  q?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

export type ListingsResponse = {
  items: X402Listing[];
  total: number;
  limit: number;
  offset: number;
  filters: {
    q: string | null;
    category: string | null;
  };
};

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function listCategories(): string[] {
  return categories;
}

export function getListingById(id: string): X402Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

export function listListings(filters: ListingFilters = {}): ListingsResponse {
  const query = normalize(filters.q);
  const category = normalize(filters.category);
  const limit = clampInteger(filters.limit, DEFAULT_LIMIT, 1, MAX_LIMIT);
  const offset = clampInteger(filters.offset, 0, 0, Number.MAX_SAFE_INTEGER);

  const filtered = listings.filter((listing) => {
    if (category && normalize(listing.category) !== category) {
      return false;
    }

    if (!query) {
      return true;
    }

    return searchableText(listing).includes(query);
  });

  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    limit,
    offset,
    filters: {
      q: query || null,
      category: category || null
    }
  };
}

function searchableText(listing: X402Listing): string {
  return normalize(
    [
      listing.id,
      listing.name,
      listing.provider,
      listing.category,
      listing.description,
      listing.endpointUrl,
      listing.pricing.asset,
      listing.pricing.network,
      listing.pricing.usd,
      listing.pricing.unit,
      listing.source,
      listing.status,
      ...listing.tags
    ].join(" ")
  );
}

function normalize(value: string | undefined): string {
  return (value || "").trim().toLowerCase();
}

function clampInteger(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(value), min), max);
}
