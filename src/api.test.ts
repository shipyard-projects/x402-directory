import { describe, expect, it } from "vitest";
import { getListingById, listCategories, listListings } from "./api.js";
import { handleApiRequest } from "./http.js";

describe("x402 listing API", () => {
  it("returns categories for API consumers", () => {
    expect(listCategories()).toEqual(["AI", "Content", "Infrastructure", "Search", "Storage", "Weather"]);
  });

  it("searches listing text case-insensitively", () => {
    const result = listListings({ q: "WEATHER" });

    expect(result.total).toBe(1);
    expect(result.items[0].id).toBe("padelmaps-weather-current");
  });

  it("filters by category and paginates results", () => {
    const result = listListings({ category: "storage", limit: 1, offset: 1 });

    expect(result.limit).toBe(1);
    expect(result.offset).toBe(1);
    expect(result.total).toBe(2);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].category).toBe("Storage");
  });

  it("clamps invalid pagination values", () => {
    const result = listListings({ limit: 500, offset: -10 });

    expect(result.limit).toBe(100);
    expect(result.offset).toBe(0);
  });

  it("finds a listing by id", () => {
    expect(getListingById("x402-direct-services")?.name).toBe("x402.direct Services");
  });

  it("serves list, detail, category, and not-found JSON responses", () => {
    expect(handleApiRequest("GET", "/api/categories")).toEqual({
      status: 200,
      body: { items: ["AI", "Content", "Infrastructure", "Search", "Storage", "Weather"] }
    });

    const listResponse = handleApiRequest("GET", "/api/listings?q=services&limit=1");
    expect(listResponse.status).toBe(200);
    expect((listResponse.body as { total: number }).total).toBe(1);

    const detailResponse = handleApiRequest("GET", "/api/listings/x402-direct-services");
    expect(detailResponse.status).toBe(200);
    expect((detailResponse.body as { item: { id: string } }).item.id).toBe("x402-direct-services");

    expect(handleApiRequest("GET", "/api/listings/missing")).toEqual({
      status: 404,
      body: { error: "listing_not_found" }
    });
  });

  it("returns JSON for malformed encoded listing ids", () => {
    expect(handleApiRequest("GET", "/api/listings/%E0%A4%A")).toEqual({
      status: 400,
      body: { error: "invalid_listing_id" }
    });
  });

  it("rejects unsupported methods", () => {
    expect(handleApiRequest("POST", "/api/listings")).toEqual({
      status: 405,
      body: { error: "method_not_allowed" },
      headers: { Allow: "GET" }
    });
  });
});
