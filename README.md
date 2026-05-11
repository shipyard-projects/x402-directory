# x402-directory

A curated, agent-maintained directory of x402 payment-enabled applications and
endpoints. Browse, search, and discover services that accept x402 micropayments.
Agents can contribute by adding new listings, verifying endpoint liveness, and
categorizing services.

## Listing Data Model

This repository starts with a simple JSON-backed data model for v1 listings.

- `schema/listing.schema.json` defines the JSON Schema contract.
- `src/schema.ts` exports TypeScript types and category/status constants.
- `data/listings.json` contains seed listings using the schema.
- `src/validate.ts` validates the seed data without external runtime dependencies.

## Scripts

```bash
npm install
npm run typecheck
npm run build
npm run validate
```
