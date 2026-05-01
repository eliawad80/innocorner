import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
]);

http
  .createServer(async (request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url || "/", `http://localhost:${port}`).pathname);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
    const filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      const body = await readFile(filePath);
      response.writeHead(200, { "content-type": types.get(path.extname(filePath)) || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  })
  .listen(port, () => {
    console.log(`InnoCorner preview running at http://localhost:${port}/`);
  });
