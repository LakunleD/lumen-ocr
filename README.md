# Lumen OCR

A React and TypeScript application that converts PDF documents into structured Markdown with Mistral OCR.

## Structure

```text
src/
  app/          Application shell and styles
  components/   Presentational UI components
  hooks/        OCR workflow state
  services/     Browser API client
  types/        Shared frontend contracts
server/
  routes/       HTTP route handlers
  services/     Mistral integration
  index.ts      Express application entry point
```

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Mistral API key.
3. Run `npm install`.
4. Run `npm run dev`.

The web app runs on `http://localhost:5173` and proxies API requests to the server on port `8787`.

## Production

Run `npm run build`, followed by `npm start`.
