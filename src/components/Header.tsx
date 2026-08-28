export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Lumen OCR home">
        <span className="brand-mark">L</span>
        <span>LUMEN <b>OCR</b></span>
      </a>
      <div className="model-pill"><i /> Powered by Mistral AI</div>
    </header>
  );
}
