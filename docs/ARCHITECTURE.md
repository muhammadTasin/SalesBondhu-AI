# Architecture

This page describes how SalesBondhu is built at a high level. The production code is private; this
repository is a showcase prototype that mirrors the product's screens and AI flow with mock data.

## System overview

```mermaid
flowchart TB
    subgraph Field["Field officer (Android)"]
        APP["SalesBondhu app<br/>Flutter"]
        Q["Offline queues<br/>location pings, visit drafts"]
        APP --- Q
    end
    subgraph Office["Manager"]
        WEB["Manager web console<br/>React + TypeScript"]
        MAPP["Manager screens<br/>in the same app"]
    end
    API["REST API<br/>FastAPI"]
    DB[("PostgreSQL")]
    FILES[("Photo storage")]
    subgraph AI["AI coach service"]
        ROUTER["Intent router"]
        CALC["Paint calculator<br/>rule-based"]
        RET["Retriever<br/>multilingual embeddings + vector store"]
        LLM["Local open-weight LLM"]
        CHECK["Grounding check"]
        ROUTER --> CALC
        ROUTER --> RET --> LLM --> CHECK
    end
    APP -- "HTTPS + token" --> API
    MAPP -- "HTTPS + token" --> API
    WEB -- "HTTPS + token" --> API
    API --> DB
    API --> FILES
    API --> ROUTER
```

## Design principles

- **Bangla first.** Every screen is written in Bangla with an English toggle, and the coach accepts
  Bangla, English and Banglish.
- **Works with poor signal.** The field app queues location pings and visit drafts on the device
  and sends them when the network returns.
- **Location only on duty.** Tracking starts and stops with the officer's duty toggle, after
  explicit consent.
- **Evidence a manager can trust.** Each visit photo is locked to where and when it was taken and
  fingerprinted, so a reviewer can see if anything was changed.
- **AI that shows its work.** Quantities come from a calculator, product answers cite the document
  page, and an answer that can't be grounded is not shown as fact.
- **Safety is never silently closed.** An SOS stays open, with location sharing on, until a
  manager closes it.

## What this showcase contains

| Layer | Showcase implementation |
|---|---|
| UI | React 19 + Vite + Tailwind; officer and manager screens inside a phone frame |
| Data | Hard-coded mock data; an offline visit queue in `localStorage` |
| AI coach | `src/ai/`: normaliser, router, calculator and keyword retrieval over invented documents, with unit tests |
| Visit proof | `src/lib/photoProof.ts`: SHA-256 via Web Crypto, browser geolocation with a demo fallback |
| Backend | None. `src/lib/supabase.ts` is an optional stub from the first prototype and is off by default |
