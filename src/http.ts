import { getListingById, listCategories, listListings } from "./api.js";

export type ApiResponse = {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
};

export function handleApiRequest(method: string, requestUrl: string): ApiResponse {
  if (method.toUpperCase() !== "GET") {
    return json(405, { error: "method_not_allowed" }, { Allow: "GET" });
  }

  const url = new URL(requestUrl, "http://localhost");
  const pathname = trimTrailingSlash(url.pathname);

  if (pathname === "/api/categories") {
    return json(200, { items: listCategories() });
  }

  if (pathname === "/api/listings") {
    return json(200, {
      ...listListings({
        q: url.searchParams.get("q") || undefined,
        category: url.searchParams.get("category") || undefined,
        limit: parseNumber(url.searchParams.get("limit")),
        offset: parseNumber(url.searchParams.get("offset"))
      })
    });
  }

  const listingMatch = pathname.match(/^\/api\/listings\/([^/]+)$/);
  if (listingMatch) {
    const listingId = safeDecodeURIComponent(listingMatch[1]);

    if (!listingId) {
      return json(400, { error: "invalid_listing_id" });
    }

    const listing = getListingById(listingId);

    if (!listing) {
      return json(404, { error: "listing_not_found" });
    }

    return json(200, { item: listing });
  }

  return json(404, { error: "not_found" });
}

function json(status: number, body: unknown, headers?: Record<string, string>): ApiResponse {
  return { status, body, headers };
}

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function trimTrailingSlash(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function safeDecodeURIComponent(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}
