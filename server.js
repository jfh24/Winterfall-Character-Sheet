const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
]);

const server = http.createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, {
      Allow: "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end("Method not allowed");
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  if (url.pathname === "/healthz") {
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end("ok");
    return;
  }

  let requestedPath;
  try {
    requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const absolutePath = path.resolve(root, `.${requestedPath}`);
  const relativePath = path.relative(root, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(absolutePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes.get(path.extname(absolutePath).toLowerCase()) || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }

    fs.createReadStream(absolutePath).pipe(response);
  });
});

server.listen(port, host, () => {
  console.log(`Winterfall sheet app running on ${host}:${port}`);
});
