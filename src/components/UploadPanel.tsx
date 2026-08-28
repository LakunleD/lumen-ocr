import { useState, type ChangeEvent, type DragEvent, type RefObject } from "react";

type UploadPanelProps = {
  file: File | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onSelect: (file?: File) => void;
  onReset: () => void;
};

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadPanel({ file, inputRef, onSelect, onReset }: UploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    onSelect(event.dataTransfer.files[0]);
  }

  return (
    <div
      className={`dropzone ${isDragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(event: ChangeEvent<HTMLInputElement>) => onSelect(event.target.files?.[0])} />
      {!file ? (
        <>
          <div className="file-glyph"><span>PDF</span></div>
          <h3>Drop your PDF here</h3>
          <p>or choose a file from your computer</p>
          <button className="secondary" onClick={() => inputRef.current?.click()}>Browse files <span>↗</span></button>
        </>
      ) : (
        <div className="selected-file">
          <div className="mini-file">PDF</div>
          <div className="file-meta"><strong>{file.name}</strong><span>{formatBytes(file.size)} · Ready to analyze</span></div>
          <button className="icon-button" onClick={onReset} aria-label="Remove file">×</button>
        </div>
      )}
    </div>
  );
}
