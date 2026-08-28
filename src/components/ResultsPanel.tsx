import type { OcrResult } from "../types/ocr";

type ResultsPanelProps = {
  result: OcrResult;
  activePage: number;
  onPageChange: (page: number) => void;
};

export function ResultsPanel({ result, activePage, onPageChange }: ResultsPanelProps) {
  const currentPage = result.pages[activePage];
  return (
    <div className="results">
      <aside className="page-list">
        <p className="aside-label">DOCUMENT PAGES</p>
        {result.pages.map((page, index) => (
          <button key={page.index} className={index === activePage ? "active" : ""} onClick={() => onPageChange(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span> Page {index + 1}
          </button>
        ))}
      </aside>
      <article className="output">
        <div className="output-top">
          <span>PAGE {activePage + 1} OF {result.pages.length}</span>
          <button onClick={() => navigator.clipboard.writeText(currentPage?.markdown || "")}>Copy text</button>
        </div>
        <pre>{currentPage?.markdown}</pre>
      </article>
    </div>
  );
}
