import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  isListingCategory,
  isListingStatus,
  type X402Listing
} from "./schema.js";

type ValidationError = {
  id: string;
  field: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isHttpUrl(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validateListing(value: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!isRecord(value)) {
    return [{ id: "unknown", field: "listing", message: "Listing must be an object." }];
  }

  const listing = value as Partial<X402Listing>;
  const id = typeof listing.id === "string" ? listing.id : "unknown";

  if (typeof listing.id !== "string" || !/^x402_[a-z0-9_]+$/.test(listing.id)) {
    errors.push({ id, field: "id", message: "ID must match x402_[a-z0-9_]+." });
  }

  if (typeof listing.name !== "string" || listing.name.trim().length < 2) {
    errors.push({ id, field: "name", message: "Name must be at least 2 characters." });
  }

  if (!isHttpUrl(listing.url)) {
    errors.push({ id, field: "url", message: "URL must be a valid HTTP(S) URL." });
  }

  if (
    typeof listing.description !== "string" ||
    listing.description.trim().length < 20
  ) {
    errors.push({
      id,
      field: "description",
      message: "Description must be at least 20 characters."
    });
  }

  if (typeof listing.category !== "string" || !isListingCategory(listing.category)) {
    errors.push({ id, field: "category", message: "Category is not supported." });
  }

  if (typeof listing.status !== "string" || !isListingStatus(listing.status)) {
    errors.push({ id, field: "status", message: "Status must be verified or unverified." });
  }

  if (!isRecord(listing.pricing)) {
    errors.push({ id, field: "pricing", message: "Pricing must be an object." });
  } else {
    const amount = listing.pricing.amount;
    if (typeof amount !== "string" || !/^[0-9]+(\.[0-9]+)?$/.test(amount)) {
      errors.push({ id, field: "pricing.amount", message: "Amount must be numeric text." });
    }

    for (const field of ["currency", "unit", "network"] as const) {
      if (typeof listing.pricing[field] !== "string" || !listing.pricing[field]) {
        errors.push({
          id,
          field: `pricing.${field}`,
          message: `${field} is required.`
        });
      }
    }
  }

  for (const field of ["createdAt", "updatedAt"] as const) {
    if (!isIsoDate(listing[field])) {
      errors.push({ id, field, message: `${field} must be an ISO date.` });
    }
  }

  if (listing.lastCheckedAt !== undefined && !isIsoDate(listing.lastCheckedAt)) {
    errors.push({ id, field: "lastCheckedAt", message: "lastCheckedAt must be an ISO date." });
  }

  return errors;
}

const listingPath = join(process.cwd(), "data", "listings.json");
const listingData = JSON.parse(readFileSync(listingPath, "utf8")) as unknown[];
const errors = listingData.flatMap(validateListing);
const ids = new Set<string>();

for (const listing of listingData) {
  if (isRecord(listing) && typeof listing.id === "string") {
    if (ids.has(listing.id)) {
      errors.push({ id: listing.id, field: "id", message: "ID must be unique." });
    }
    ids.add(listing.id);
  }
}

if (errors.length > 0) {
  console.error(JSON.stringify(errors, null, 2));
  process.exit(1);
}

console.log(`Validated ${listingData.length} x402 listings.`);
