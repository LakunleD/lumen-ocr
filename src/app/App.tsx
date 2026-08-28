import { Header } from "../components/Header";
import { HowItWorks } from "../components/HowItWorks";
import { ResultsPanel } from "../components/ResultsPanel";
import { UploadPanel } from "../components/UploadPanel";
import { useOcr } from "../hooks/useOcr";

export function App() {
  const ocr = useOcr();
  return (
    <main>
      <Header />
      <section id="top" className="hero">
        <p className="eyebrow">DOCUMENT INTELLIGENCE, SIMPLIFIED</p>
        <h1>Turn dense PDFs into<br /><em>clear, usable text.</em></h1>
        <p className="intro">Upload any PDF and let Mistral’s OCR model recover its text, tables, and structure in seconds.</p>
      </section>

      <section className="workspace" aria-label="PDF analysis workspace">
        <div className="workspace-heading">
          <div><span>01</span><h2>Upload your document</h2></div>
          <p>PDF only · Up to 25 MB</p>
        </div>

        {ocr.result ? (
          <ResultsPanel result={ocr.result} activePage={ocr.activePage} onPageChange={ocr.setActivePage} />
        ) : (
          <UploadPanel file={ocr.file} inputRef={ocr.inputRef} onSelect={ocr.selectFile} onReset={ocr.reset} />
        )}

        {ocr.error && <p className="error-message" role="alert">{ocr.error}</p>}
        <div className="action-row">
          <p><span className="shield">✓</span> Your document is processed securely and never stored.</p>
          {ocr.result ? (
            <button className="primary" onClick={ocr.reset}>Analyze another PDF <span>↗</span></button>
          ) : (
            <button className="primary" disabled={!ocr.file || ocr.status === "processing"} onClick={ocr.analyze}>
              {ocr.status === "processing" ? <><i className="spinner" /> Reading document…</> : <>Analyze document <span>↗</span></>}
            </button>
          )}
        </div>
      </section>

      <HowItWorks />
      <footer><span>LUMEN OCR</span><p>From paper to possibility.</p><small>Built with Mistral AI</small></footer>
    </main>
  );
}
