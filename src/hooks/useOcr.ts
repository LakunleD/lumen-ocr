import { useRef, useState } from "react";
import { analyzePdf } from "../services/ocr";
import type { OcrResult, OcrStatus } from "../types/ocr";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function useOcr() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<OcrStatus>("idle");
  const [result, setResult] = useState<OcrResult | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [error, setError] = useState("");

  function selectFile(next?: File) {
    setError("");
    setResult(null);
    if (!next) return;
    if (next.type !== "application/pdf") {
      setError("Please choose a PDF document.");
      setStatus("error");
      return;
    }
    if (next.size > MAX_FILE_SIZE) {
      setError("This PDF is larger than the 25 MB limit.");
      setStatus("error");
      return;
    }
    setFile(next);
    setStatus("ready");
  }

  async function analyze() {
    if (!file) return;
    setStatus("processing");
    setError("");
    try {
      const data = await analyzePdf(file);
      setResult(data);
      setActivePage(0);
      setStatus("done");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setResult(null);
    setStatus("idle");
    setError("");
    setActivePage(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  return { inputRef, file, status, result, activePage, error, selectFile, analyze, reset, setActivePage };
}
