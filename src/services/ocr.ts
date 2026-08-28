import type { OcrResult } from "../types/ocr";

type ErrorResponse = { error?: string };

export async function analyzePdf(file: File): Promise<OcrResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/ocr", { method: "POST", body: formData });
  const data = (await response.json()) as OcrResult & ErrorResponse;

  if (!response.ok) {
    throw new Error(data.error || "The document could not be analyzed.");
  }

  return data;
}
