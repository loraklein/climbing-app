'use client'

import { useState, useEffect, useMemo } from 'react'
import RouteFilters from '../../components/RouteFilters'
import RouteList from '../../components/RouteList'

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
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [completedRoutes, setCompletedRoutes] = useState<number[]>([])

  // Compute filtered routes instead of storing in state
  const filteredRoutes = useMemo(() => {
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

    return filtered
  }, [routes, typeFilter, searchTerm])

  const toggleCompleted = (routeId: number) => {
    setCompletedRoutes(prev => 
      prev.includes(routeId) 
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  const clearFilters = () => {
    setTypeFilter('')
    setSearchTerm('')
  }

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await fetch('https://sd-6310-2025-summer-express-app.onrender.com/api/climbing-routes')
        const data = await response.json()
        setRoutes(data)
      } catch (error) {
        console.error('Error fetching routes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Climbing Routes
          </h1>
          
          <RouteFilters
            searchTerm={searchTerm}
            typeFilter={typeFilter}
            onSearchChange={setSearchTerm}
            onTypeFilterChange={setTypeFilter}
            onClearFilters={clearFilters}
          />

          <p className="mb-4 text-gray-600">
            Showing {filteredRoutes.length} of {routes.length} routes
          </p>
          
          <RouteList
            routes={filteredRoutes}
            completedRoutes={completedRoutes}
            onToggleCompleted={toggleCompleted}
          />
        </div>
      </div>
    </div>
  )
}