import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import { handleApiRequest } from "./http.js";

const DEFAULT_PORT = 3000;

export function createApiServer() {
  return createServer((request, response) => {
    const result = handleApiRequest(request.method || "GET", request.url || "/");
    const payload = JSON.stringify(result.body, null, 2);

    response.writeHead(result.status, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
      ...(result.headers || {})
    });
    response.end(`${payload}\n`);
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  const port = Number(process.env.PORT || DEFAULT_PORT);

  createApiServer().listen(port, () => {
    console.log(`x402 directory API listening on http://127.0.0.1:${port}`);
  });
}
