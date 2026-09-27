import { useState } from 'react'

export default function ProductForm({ onGenerate, isLoading }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !category.trim()) return
    onGenerate(name.trim(), category.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Product name</label>
        <input
          id="name"
          type="text"
          placeholder="Ridgeline Trail Backpack"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          placeholder="Outdoor & camping gear"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'PRINTING…' : 'PRINT CARD'}
      </button>
    </form>
  )
}
