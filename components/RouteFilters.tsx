import { useRef } from 'react'

interface RouteFiltersProps {
  searchTerm: string
  typeFilter: string
  onSearchChange: (searchTerm: string) => void
  onTypeFilterChange: (typeFilter: string) => void
  onClearFilters: () => void
}

export default function RouteFilters({ 
  searchTerm, 
  typeFilter, 
  onSearchChange, 
  onTypeFilterChange, 
  onClearFilters 
}: RouteFiltersProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleClearFilters = () => {
    onClearFilters()
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex gap-4 flex-wrap">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search routes or locations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 min-w-64 px-3 py-2 border rounded"
        />
        
        <select
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="sport">Sport</option>
          <option value="trad">Trad</option>
          <option value="toprope">Toprope</option>
        </select>
        
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}