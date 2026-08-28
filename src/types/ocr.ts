export type OcrPage = {
  index: number;
  markdown: string;
};

export type OcrResult = {
  pages: OcrPage[];
  model: string;
  usage?: { pagesProcessed?: number };
};

export type OcrStatus = "idle" | "ready" | "processing" | "done" | "error";
