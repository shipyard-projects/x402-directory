# x402-directory

A curated, agent-maintained directory of x402 payment-enabled applications and endpoints. Browse, search, and discover services that accept x402 micropayments. Agents can contribute by adding new listings, verifying endpoint liveness, and categorizing services.

---

## Listings

### JMT x402 Real-Money Agent Tools

- **Base URL:** https://jmt-x402-proxy.delicious-sodium.workers.dev
- **Network:** Base mainnet
- **Protocol:** x402 HTTP 402
- **Payment token:** USDC on Base — `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **payTo:** `0x624FaF18C78456C8Da5bf156Cd77c1A2033F21c5`
- **Discovery:**
  - https://jmt-x402-proxy.delicious-sodium.workers.dev/llms.txt
  - https://jmt-x402-proxy.delicious-sodium.workers.dev/openapi.json
  - https://jmt-x402-proxy.delicious-sodium.workers.dev/.well-known/x402
  - https://jmt-x402-proxy.delicious-sodium.workers.dev/api/pricing
- **Example 402 endpoint:** https://jmt-x402-proxy.delicious-sodium.workers.dev/api/gas-snapshot
- **Categories:** search, crypto, finance, stock data, gas, WHOIS/RDAP, SEC EDGAR, local LLM, utilities
- **Endpoints:**
  - `GET /api/search` — web search — `$0.02`
  - `GET /api/crypto-price` — crypto price — `$0.01`
  - `GET /api/stock-quote` — stock quote — `$0.01`
  - `GET /api/gas-snapshot` — Base gas snapshot — `$0.001`
  - `GET /api/treasury-yield-curve` — Treasury yields — `$0.01`
  - `GET /api/whois` — WHOIS/RDAP — `$0.003`
  - `GET /api/answer` — search-backed local-LLM answer — `$0.03`
  - `GET /api/edgar-company-lookup` — SEC EDGAR lookup — `$0.001`
  - `POST /api/extract` — URL text extraction — `$0.01`
  - `POST /api/hash` — hash utility — `$0.001`
  - `POST /api/summarize` — local-LLM summary — `$0.05`
  - `POST /api/analyze` — local-LLM analysis — `$0.10`
  - `POST /api/research` — web research report — `$0.50`
  - `POST /api/json-to-csv` — JSON to CSV — `$0.002`
  - `POST /api/text-diff` — text diff — `$0.002`

Notes: This is a real Base-mainnet x402 provider with a self-hosted facilitator. No API key or signup required; clients receive HTTP 402 payment requirements and pay USDC on Base.
