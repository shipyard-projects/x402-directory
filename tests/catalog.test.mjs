import test from "node:test";
import assert from "node:assert/strict";
import {
  categories,
  getCategory,
  getCategoryCounts,
  getListingsByCategory,
  listings,
  validateCatalog
} from "../src/catalog.js";

test("catalog defines the expected starter taxonomy", () => {
  assert.equal(categories.length, 7);
  assert.deepEqual(
    categories.map((category) => category.slug),
    [
      "ai-ml-apis",
      "data-feeds",
      "compute",
      "storage",
      "content",
      "developer-tools",
      "identity-auth"
    ]
  );
});

test("every listing maps to a valid category", () => {
  const result = validateCatalog();

  assert.equal(result.valid, true);
  assert.deepEqual(result.duplicateSlugs, []);
  assert.deepEqual(result.invalidListings, []);
});

test("category pages can filter listings by slug", () => {
  assert.equal(getCategory("compute").name, "Compute");
  assert.deepEqual(
    getListingsByCategory("compute").map((listing) => listing.id),
    ["micro-render"]
  );
});

test("category counts reflect the listing data", () => {
  const totalFromCounts = getCategoryCounts().reduce((sum, category) => sum + category.count, 0);

  assert.equal(totalFromCounts, listings.length);
});
