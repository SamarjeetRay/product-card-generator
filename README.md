# Tagshop — AI Product Card Generator

Built for the Indus Net Technologies (INT) tech assignment — Assignment 2:
AI Content Generator for Product Cards.

Enter a product name and category, and the app generates a title, a short
description, and five keyword tags via Google Gemini, then renders them as
a printed receipt.

## Stack

- React 18 + Vite
- Google Gemini REST API (`gemini-flash-latest`), called directly from the
  browser with `fetch` — no backend, per the assignment's scope

## How AI is used

`src/lib/gemini.js` builds a prompt asking Gemini for strict JSON —
`{ title, description, tags }` — and calls Gemini's `generateContent` REST
endpoint directly. The response is:

1. Checked for a `MAX_TOKENS` finish reason (truncated output)
2. Stripped of any stray markdown fences the model adds
3. Parsed as JSON and validated for the expected fields
4. Rendered by `ProductCard.jsx`

Thinking mode is explicitly turned off (`thinkingConfig.thinkingBudget: 0`)
since this is a short copywriting task that doesn't need it, and it was
eating the output budget before the model could write the actual answer.

## Design choices

The brief asks for a styled product card, not a specific look, so the UI
is built around one concrete idea instead of a generic dashboard layout:
the app is framed as a **receipt printer** — you fill in a product at the
top, and the generated listing prints out below as an actual receipt
(monospace type, dashed tear rules, a torn perforated edge, a barcode).

This was a deliberate choice over a typical card/dashboard UI:
- One consistent metaphor carried through typography, layout, and copy
  ("PRINT CARD", "Printing…", "Jammed") instead of decoration added on top
- Monospace throughout (IBM Plex Mono) instead of a display font + body
  font pairing, to match the "printed" feel
- Minimal color — ink black, paper, and a single stamp-red accent — rather
  than a gradient or multi-color palette

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

VITE_GEMINI_API_KEY=your_real_key_here


Then:

```bash
npm run dev
```

Open the printed local URL and generate a card.

## Deploying to Vercel

Push to GitHub (`.env` is git-ignored, so the key isn't in the repo), import
the repo on vercel.com, and add `VITE_GEMINI_API_KEY` as an environment
variable in Project Settings before deploying.

## Project structure

├── src/
│ ├── components/
│ │ ├── ProductForm.jsx
│ │ └── ProductCard.jsx
│ ├── lib/
│ │ └── gemini.js # calls Gemini's REST API
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── index.html
└── vite.config.js