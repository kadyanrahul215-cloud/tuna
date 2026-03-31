import { useState } from 'react'

export default function SearchBar({ placeholder = 'Search...', onSearch, className = '' }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  return (
    <div className={`relative group ${className}`}>
      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline">
        search
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-12 md:h-14 pl-14 pr-12 bg-surface-container-highest/80 backdrop-blur-xl border-none rounded-full text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
      />
      <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline cursor-pointer hover:text-primary transition-colors">
        filter_list
      </span>
    </div>
  )
}
