'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RouteFilters from '../../components/RouteFilters'
import RouteList from '../../components/RouteList'

interface ClimbingRoute {
  id: number
  route_name: string
  grade: string
  route_type: string
  location: string
  description: string | null
  length_feet: number | null
  first_ascent_year: number | null
  rating: number | null
}

export default function Routes() {
  const [routes, setRoutes] = useState<ClimbingRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [completedRoutes, setCompletedRoutes] = useState<number[]>([])

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
    fetchRoutes()
  }

  const handleRouteUpdated = () => {
    fetchRoutes(typeFilter, searchTerm)
  }

  const fetchRoutes = async (routeType = '', location = '', isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true)
      } else {
        setSearching(true)
      }
      setError(null)
      
      const params = new URLSearchParams()
      if (routeType) params.append('route_type', routeType)
      if (location) params.append('location', location)
      
      const url = `http://localhost:3000/api/climbing-routes${params.toString() ? '?' + params.toString() : ''}`
      console.log('Fetching from:', url)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Fetched routes:', data)
      
      setRoutes(data.routes || [])
    } catch (error) {
      console.error('Error fetching routes:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch routes')
    } finally {
      if (isInitialLoad) {
        setLoading(false)
      } else {
        setSearching(false)
      }
    }
  }

  const handleTypeFilterChange = (newType: string) => {
    setTypeFilter(newType)
    fetchRoutes(newType, searchTerm)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch)
  }

  useEffect(() => {
    fetchRoutes('', '', true) 
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRoutes(typeFilter, searchTerm)
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, typeFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="ml-2">Loading routes...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p><strong>Error:</strong> {error}</p>
              <p className="text-sm mt-2">Make sure your backend server is running on http://localhost:3000</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Climbing Routes
            </h1>
            <Link
              href="/routes/new"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Route
            </Link>
          </div>
          
          <RouteFilters
            searchTerm={searchTerm}
            typeFilter={typeFilter}
            onSearchChange={handleSearchChange}
            onTypeFilterChange={handleTypeFilterChange}
            onClearFilters={clearFilters}
          />

          <div className="mb-4 text-gray-600 flex items-center">
            <span>
              Showing {routes.length} routes
              {(typeFilter || searchTerm) && (
                <span className="text-blue-600">
                  {' '}(filtered by: {[
                    typeFilter && `type: ${typeFilter}`, 
                    searchTerm && `location: ${searchTerm}`
                  ].filter(Boolean).join(', ')})
                </span>
              )}
            </span>
            {searching && (
              <div className="ml-3 flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="ml-1 text-sm">Searching...</span>
              </div>
            )}
          </div>
          
          <RouteList
            routes={routes}
            completedRoutes={completedRoutes}
            onToggleCompleted={toggleCompleted}
            onRouteUpdated={handleRouteUpdated}
          />
        </div>
      </div>
    </div>
  )
}