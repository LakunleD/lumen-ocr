import { Router } from "express";
import multer from "multer";
import { runMistralOcr } from "../services/mistral.js";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_FILE_SIZE } });

export const ocrRouter = Router();

ocrRouter.post("/", upload.single("file"), async (request, response) => {
  if (!request.file || request.file.mimetype !== "application/pdf") {
    response.status(400).json({ error: "Please upload a valid PDF file." });
    return;
  }
  try {
    response.json(await runMistralOcr(request.file));
  } catch (error) {
    const message = error instanceof Error ? error.message : "The document could not be analyzed.";
    response.status(message.includes("MISTRAL_API_KEY") ? 503 : 502).json({ error: message });
  }
});
