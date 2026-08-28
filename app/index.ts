import "dotenv/config";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ocrRouter } from "./routes/ocr.js";

const app = express();
const port = Number(process.env.PORT || 8787);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");

app.use("/api/ocr", ocrRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(root));
  app.use((_request, response) => response.sendFile(path.join(root, "index.html")));
}

app.listen(port, () => console.log(`Lumen OCR server listening on http://localhost:${port}`));
