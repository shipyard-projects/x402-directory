# x402 Directory

A programmatic directory of x402-enabled services, APIs, and tools. This implementation exposes the directory as JSON so agents and other tools can discover listings without scraping a web UI.

## API

Start the API locally:

```bash
npm install
npm run build
npm start
```

Requires Node.js 20 or newer.

Available endpoints:

```text
GET /api/listings
GET /api/listings?q=memory&category=Storage&limit=5&offset=0
GET /api/listings/:id
GET /api/categories
```

`GET /api/listings` returns pagination metadata, active filters, and matching listings. Category matching is case-insensitive and search scans name, description, provider, category, tags, network, payment asset, and source. Seed listings are static records from public x402.direct service metadata; this PR does not add a persistent database, live endpoint health checks, or payment execution.

## Development

```bash
npm test
npm run build
```
