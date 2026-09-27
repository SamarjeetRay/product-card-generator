// Calls Google Gemini's REST API directly from the browser.
// Simple, matches the assignment's "React + AI REST API" scope —
// no backend. The key ships in the built bundle like any client-side
// API key does; that's expected for a front-end-only assignment.

// Using the rolling alias instead of a pinned version number (e.g.
// gemini-1.5-flash) — Google regularly retires dated model names, and
// this one always points at their current recommended flash model.
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'

export async function generateProduct(name, category) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY — add it to your .env file.')
  }

  const prompt = `You are a product copywriter for an online store.
Product name: "${name}"
Category: "${category}"

Respond with ONLY raw JSON (no markdown fences, no commentary, nothing before or after it) in exactly this shape:
{
  "title": "a punchy, specific product title, max 60 characters",
  "description": "ONE short sentence, max 120 characters — do not exceed this",
  "tags": ["five", "short", "lowercase", "keyword", "tags"]
}
Keep the whole JSON under 400 characters total.`

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
        // Current flash models "think" before answering by default, and
        // those thinking tokens count against maxOutputTokens — for a task
        // this small it can eat the whole budget before writing the actual
        // JSON. Turning it off for a plain copywriting task like this one.
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  })

  if (!response.ok) {
    const errBody = await response.text()
    console.error('Gemini API error:', response.status, errBody)
    throw new Error(`Gemini API error (${response.status}). Check the browser console for details.`)
  }

  const payload = await response.json()
  const candidate = payload?.candidates?.[0]
  const raw = candidate?.content?.parts?.[0]?.text || ''

  if (candidate?.finishReason === 'MAX_TOKENS') {
    console.error('Gemini response was cut off (hit MAX_TOKENS). Raw so far:', raw)
    throw new Error('The response got cut off before finishing. Try again.')
  }

  // Pull out just the {...} block in case the model still wraps it in
  // markdown fences or adds a stray sentence around it.
  const match = raw.match(/\{[\s\S]*\}/)

  let parsed
  try {
    parsed = JSON.parse(match ? match[0] : raw)
  } catch {
    console.error('Could not parse Gemini output:', raw)
    throw new Error('The AI response was not valid JSON. Check the console and try again.')
  }

  if (!parsed.title || !parsed.description || !Array.isArray(parsed.tags)) {
    throw new Error('The AI response was missing fields. Try again.')
  }

  return { ...parsed, tags: parsed.tags.slice(0, 6), category }
}