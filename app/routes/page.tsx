'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'

interface ClimbingRoute {
  id: number
  name: string
  grade: string
  type: string
  location: string
  description: string
  length: string
  bolts: number
  difficulty: string
  rating: number
  totalRatings: number
}

export default function Routes() {
  const [routes, setRoutes] = useState<ClimbingRoute[]>([])
  const [filteredRoutes, setFilteredRoutes] = useState<ClimbingRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [completedRoutes, setCompletedRoutes] = useState<number[]>([])
  
  const searchInputRef = useRef<HTMLInputElement>(null)

  const toggleCompleted = (routeId: number) => {
    setCompletedRoutes(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch('https://sd-6310-2025-summer-express-app.onrender.com/api/climbing-routes')
        const data = await response.json()
        setRoutes(data)
        setFilteredRoutes(data)
      } catch (error) {
        console.error('Error fetching routes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  useEffect(() => {
    let filtered = routes

    if (typeFilter) {
      filtered = filtered.filter(route => route.type === typeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(route => 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRoutes(filtered)
  }, [routes, typeFilter, searchTerm])

  const clearFilters = () => {
    setTypeFilter('')
    setSearchTerm('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <p>Loading routes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Climbing Routes
          </h1>
          
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex gap-4 flex-wrap">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search routes or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-64 px-3 py-2 border rounded"
              />
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="">All Types</option>
                <option value="sport">Sport</option>
                <option value="trad">Trad</option>
                <option value="toprope">Toprope</option>
              </select>
              
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <p className="mb-4 text-gray-600">
            Showing {filteredRoutes.length} of {routes.length} routes
          </p>
          
          <div className="grid gap-4">
            {filteredRoutes.map(route => (
              <div key={route.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{route.name}</h2>
                  <button
                    onClick={() => toggleCompleted(route.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      completedRoutes.includes(route.id)
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {completedRoutes.includes(route.id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
                <p className="text-gray-600">{route.grade} • {route.type}</p>
                <p className="text-sm text-gray-500 mb-2">{route.location}</p>
                <p className="text-gray-700">{route.description}</p>
                <div className="mt-2 text-sm text-gray-600">
                  Length: {route.length} • Rating: {route.rating}/5 ({route.totalRatings} reviews)
                </div>
              </div>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No routes found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}