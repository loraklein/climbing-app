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

interface FormData {
  route_name: string
  grade: string
  route_type: string
  location: string
  description: string
  length_feet: string
  first_ascent_year: string
  rating: string
}

export default function EditRoute() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [route, setRoute] = useState<ClimbingRoute | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    route_name: '',
    grade: '',
    route_type: '',
    location: '',
    description: '',
    length_feet: '',
    first_ascent_year: '',
    rating: ''
  })

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
        const routeData = data.route
        setRoute(routeData)
        
        setFormData({
          route_name: routeData.route_name,
          grade: routeData.grade,
          route_type: routeData.route_type,
          location: routeData.location,
          description: routeData.description || '',
          length_feet: routeData.length_feet ? routeData.length_feet.toString() : '',
          first_ascent_year: routeData.first_ascent_year ? routeData.first_ascent_year.toString() : '',
          rating: routeData.rating ? routeData.rating.toString() : ''
        })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const apiData = {
        route_name: formData.route_name,
        grade: formData.grade,
        route_type: formData.route_type,
        location: formData.location,
        description: formData.description || null,
        length_feet: formData.length_feet ? parseInt(formData.length_feet) : null,
        first_ascent_year: formData.first_ascent_year ? parseInt(formData.first_ascent_year) : null,
        rating: formData.rating ? parseFloat(formData.rating) : null
      }

      const response = await fetch(`http://localhost:3000/api/climbing-routes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update route')
      }

      router.push(`/routes`)
    } catch (error) {
      console.error('Error updating route:', error)
      setError(error instanceof Error ? error.message : 'Failed to update route')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="ml-2">Loading route...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !route) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
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
          <div className="max-w-2xl mx-auto">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link 
              href={`/routes/${id}`}
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to route details
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Route</h1>
            <p className="text-gray-600 mt-2">{`Update "${route.route_name}"`}</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Required Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="route_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Route Name *
                    </label>
                    <input
                      type="text"
                      id="route_name"
                      name="route_name"
                      required
                      value={formData.route_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter route name"
                    />
                  </div>

                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                      Grade *
                    </label>
                    <input
                      type="text"
                      id="grade"
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 5.10a, V4"
                    />
                  </div>

                  <div>
                    <label htmlFor="route_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Route Type *
                    </label>
                    <select
                      id="route_type"
                      name="route_type"
                      required
                      value={formData.route_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select type</option>
                      <option value="sport">Sport</option>
                      <option value="trad">Trad</option>
                      <option value="boulder">Boulder</option>
                      <option value="toprope">Top Rope</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Red Rock Canyon, Joshua Tree"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe the route, beta, or any special considerations..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="length_feet" className="block text-sm font-medium text-gray-700 mb-2">
                        Length (feet)
                      </label>
                      <input
                        type="number"
                        id="length_feet"
                        name="length_feet"
                        min="0"
                        value={formData.length_feet}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 80"
                      />
                    </div>

                    <div>
                      <label htmlFor="first_ascent_year" className="block text-sm font-medium text-gray-700 mb-2">
                        First Ascent Year
                      </label>
                      <input
                        type="number"
                        id="first_ascent_year"
                        name="first_ascent_year"
                        min="1800"
                        max={new Date().getFullYear()}
                        value={formData.first_ascent_year}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 1995"
                      />
                    </div>

                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 4.2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-4">
                  <Link
                    href={`/routes/${id}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}