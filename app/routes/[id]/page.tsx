'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

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

export default function RouteDetail() {
  const [route, setRoute] = useState<ClimbingRoute | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    async function fetchRoute() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`http://localhost:3000/api/climbing-routes/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Route not found')
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setRoute(data.route)
      } catch (error) {
        console.error('Error fetching route:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch route')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRoute()
    }
  }, [id])

  const handleDelete = async () => {
    if (!route) return
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${route.route_name}"? This action cannot be undone.`
    )
    
    if (!confirmed) return

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/climbing-routes/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete route')
      }

      router.push('/routes')
    } catch (error) {
      console.error('Error deleting route:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete route')
    } finally {
      setDeleting(false)
    }
  }

  const getRouteTypeStyle = (type: string) => {
    switch (type) {
      case 'sport':
        return { icon: '🧗', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' }
      case 'trad':
        return { icon: '⚙️', bgColor: 'bg-orange-50', textColor: 'text-orange-700', borderColor: 'border-orange-200' }
      case 'boulder':
        return { icon: '🪨', bgColor: 'bg-purple-50', textColor: 'text-purple-700', borderColor: 'border-purple-200' }
      case 'toprope':
        return { icon: '🔗', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' }
      default:
        return { icon: '🧗', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' }
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating || rating === 0) {
      return <span className="text-gray-400">No rating</span>
    }
    
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>)
    }
    
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300 text-xl">★</span>)
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-2 text-lg text-gray-600">({Number(rating).toFixed(1)})</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="ml-2">Loading route...</p>
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
            </div>
            <div className="mt-4">
              <Link 
                href="/routes"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                ← Back to routes
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <p>Route not found</p>
            <Link 
              href="/routes"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              ← Back to routes
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const typeStyle = getRouteTypeStyle(route.route_type)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/routes"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to routes
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {route.route_name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-900">{route.grade}</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${typeStyle.bgColor} ${typeStyle.textColor} ${typeStyle.borderColor}`}>
                      <span className="mr-1">{typeStyle.icon}</span>
                      {route.route_type.charAt(0).toUpperCase() + route.route_type.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                  <Link 
                    href={`/routes/${route.id}/edit`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Edit Route
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete Route'
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg">{route.location}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating</h3>
                {renderStars(route.rating)}
              </div>

              {route.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{route.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                {route.length_feet && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Length</h4>
                    <p className="text-lg font-semibold text-gray-900">{route.length_feet} feet</p>
                  </div>
                )}
                
                {route.first_ascent_year && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">First Ascent</h4>
                    <p className="text-lg font-semibold text-gray-900">{route.first_ascent_year}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Route ID</h4>
                  <p className="text-lg font-semibold text-gray-900">#{route.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}