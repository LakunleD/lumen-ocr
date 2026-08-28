export type MistralOcrResponse = {
  model?: string;
  pages?: Array<{ index: number; markdown: string }>;
  usage_info?: { pages_processed?: number };
  message?: string;
};

export async function runMistralOcr(file: Express.Multer.File) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error("MISTRAL_API_KEY is not configured.");

  const documentUrl = `data:application/pdf;base64,${file.buffer.toString("base64")}`;
  const response = await fetch("https://api.mistral.ai/v1/ocr", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral-ocr-latest",
      document: { type: "document_url", document_url: documentUrl },
      table_format: "markdown",
    }),
  });
  const payload = (await response.json()) as MistralOcrResponse;
  if (!response.ok) throw new Error(payload.message || "Mistral could not process this document.");
  return {
    pages: payload.pages || [],
    model: payload.model || "mistral-ocr-latest",
    usage: { pagesProcessed: payload.usage_info?.pages_processed },
  };
}
