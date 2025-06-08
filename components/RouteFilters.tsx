interface RouteFiltersProps {
  searchTerm: string
  typeFilter: string
  onSearchChange: (value: string) => void
  onTypeFilterChange: (value: string) => void
  onClearFilters: () => void
}

export default function RouteFilters({
  searchTerm,
  typeFilter,
  onSearchChange,
  onTypeFilterChange,
  onClearFilters
}: RouteFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Routes
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by route location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="w-full sm:w-48">
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Route Type
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Types</option>
            <option value="sport">Sport</option>
            <option value="trad">Trad</option>
            <option value="boulder">Boulder</option>
            <option value="toprope">Top Rope</option>
          </select>
        </div>

        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {(searchTerm || typeFilter) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 text-green-600 hover:text-green-800"
                  aria-label="Clear search"
                >
                  ×
                </button>
              </span>
            )}
            {typeFilter && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Type: {typeFilter}
                <button
                  onClick={() => onTypeFilterChange('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                  aria-label="Clear type filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}