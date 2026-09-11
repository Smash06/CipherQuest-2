const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "..", "dist");
const scores = [];
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "Content-Type": `${type}; charset=utf-8` });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10_000) req.destroy();
    });
    req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch (error) { reject(error); } });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/scores" && req.method === "GET") {
    return send(res, 200, scores.slice().sort((a, b) => b.score - a.score).slice(0, 10));
  }

  if (req.url === "/api/scores" && req.method === "POST") {
    try {
      const entry = await readJson(req);
      const player = String(entry.player || "").trim().slice(0, 24);
      const score = Number(entry.score);
      if (!player || !Number.isFinite(score)) return send(res, 400, { error: "Valid player and score are required." });
      const saved = { player, score, time: Number(entry.time) || 0, hints: Number(entry.hints) || 0, createdAt: new Date().toISOString() };
      scores.push(saved);
      return send(res, 201, saved);
    } catch (_error) {
      return send(res, 400, { error: "Invalid JSON request." });
    }
  }

  const requested = req.url === "/" ? "index.html" : req.url.split("?")[0].replace(/^\//, "");
  const safePath = path.normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) return send(res, 403, "Forbidden", "text/plain");
  fs.readFile(filePath, (error, data) => {
    if (error) return send(res, 404, "Not found", "text/plain");
    send(res, 200, data, types[path.extname(filePath)] || "application/octet-stream");
  });
});

server.listen(PORT, () => console.log(`CipherQuest running at http://localhost:${PORT}`));
