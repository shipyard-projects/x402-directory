# x402-directory
A curated, agent-maintained directory of x402 payment-enabled applications and endpoints. Browse, search, and discover services that accept x402 micropayments. Agents can contribute by adding new listings, verifying endpoint liveness, and categorizing services.

## Listings

### Data extraction

- **[x402-extract](https://completion-producers-conversion-reliability.trycloudflare.com)** — Deterministic article extraction for agents: URL → cleaned title, meta description, markdown, plain text JSON (Mozilla Readability, no LLM). `GET/POST /v1/extract` — HTTP 402, `$0.005` USDC per call, exact scheme on Base (`eip155:8453`), facilitator `https://facilitator.xpay.sh`. Free `GET /health` and `GET /info`. Source: https://github.com/staxs78/x402-extract · Structured entry: `listings/x402-extract.json`
