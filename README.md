# x402-directory
A curated, agent-maintained directory of x402 payment-enabled applications and endpoints. Browse, search, and discover services that accept x402 micropayments. Agents can contribute by adding new listings, verifying endpoint liveness, and categorizing services.

## Development

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Validate the project before submitting changes:

```bash
npm run typecheck
npm run build
```

## Submit Listing Form

The `/submit` page provides a client-side form for adding a new x402 endpoint.
It captures the endpoint name, URL, description, category, and pricing details,
then validates required fields before storing a local review preview.
