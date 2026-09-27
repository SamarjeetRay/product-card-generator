# Tagshop — AI Product Card Generator

AI-powered product card generator built for the **Indus Net Technologies (INT) Tech Assignment — Assignment 2**.

Enter a product name and category, and Tagshop uses **Google Gemini** to generate a product title, short description, and five keyword tags, displayed as a receipt-style product card.

## Tech Stack

* React 18 + Vite
* Google Gemini REST API
* JavaScript
* CSS

## How It Works

```text
Product Name + Category
          ↓
      Gemini API
          ↓
 Title + Description + 5 Tags
          ↓
    Receipt-style Card
```

The Gemini response is validated as JSON before being rendered. The app also handles truncated or malformed responses.

## Design

The UI is inspired by a **receipt printer** rather than a traditional product card:

* Monospace typography
* Receipt-style layout
* Dashed separators and torn edge
* Minimal black, paper, and red color palette

## Setup

```bash
npm install
```

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_real_key_here
```

Run the app:

```bash
npm run dev
```

## Project Structure

```text
src/
├── components/
│   ├── ProductForm.jsx
│   └── ProductCard.jsx
├── lib/
│   └── gemini.js
├── App.jsx
├── index.css
└── main.jsx
```

## Deployment

The project can be deployed to **Vercel** by adding `VITE_GEMINI_API_KEY` to the project's environment variables.

---

**Built for the Indus Net Technologies Tech Assignment.**
