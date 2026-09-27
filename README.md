# Tagshop — AI Product Card Generator

Built for the Indus Net Technologies (INT) tech assignment — Assignment 2.

Enter a product name and category, and the app generates a title, a two-line
description, and five keyword tags via Google Gemini, then renders them as a
styled product card.

## Stack

- React 18 + Vite
- Google Gemini REST API (`gemini-1.5-flash`), called directly from the app

## How AI is used

`src/lib/gemini.js` builds a prompt asking Gemini for strict JSON —
`{ title, description, tags }` — and calls Gemini's `generateContent` REST
endpoint directly with `fetch`. The response is cleaned of any stray
markdown fences, parsed, validated, and rendered by `ProductCard.jsx`.

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```
VITE_GEMINI_API_KEY=your_real_key_here
```

Then:

```bash
npm run dev
```

That's it — open the printed local URL and generate a card.

## Deploying to Vercel

Push to GitHub (`.env` is git-ignored, so the key isn't in the repo), import
the repo on vercel.com, and add `VITE_GEMINI_API_KEY` as an environment
variable in Project Settings before deploying.

## Project structure

```
├── src/
│   ├── components/
│   │   ├── ProductForm.jsx
│   │   └── ProductCard.jsx
│   ├── lib/
│   │   └── gemini.js       # calls Gemini's REST API
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
└── vite.config.js
```
