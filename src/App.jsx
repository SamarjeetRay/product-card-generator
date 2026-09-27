import { useState } from 'react'
import ProductForm from './components/ProductForm.jsx'
import ProductCard from './components/ProductCard.jsx'
import { generateProduct } from './lib/gemini.js'

export default function App() {
  const [card, setCard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGenerate(name, category) {
    setIsLoading(true)
    setError(null)
    try {
      const result = await generateProduct(name, category)
      setCard(result)
    } catch (err) {
      setError(err.message)
      setCard(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="masthead">
        <span className="mark">TAGSHOP</span>
        <span className="tag">// product receipt printer</span>
      </div>
      <p className="subhead">
        Enter a product and a category. Gemini writes the listing copy and it prints
        out below as a receipt.
      </p>

      <div className="machine">
        <div className="tray">
          <ProductForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        <div className="perforation" />

        <div className="slot">
          {isLoading && (
            <div className="state-message">
              <strong>Printing</strong>
              <span className="printing">
                <span /><span /><span />
              </span>
            </div>
          )}

          {!isLoading && error && (
            <div className="state-message error">
              <strong>Jammed</strong>
              {error}
            </div>
          )}

          {!isLoading && !error && !card && (
            <div className="state-message">
              <strong>Nothing printed yet</strong>
              Fill in the form above and hit print.
            </div>
          )}

          {!isLoading && !error && card && <ProductCard data={card} />}
        </div>
      </div>
    </div>
  )
}
