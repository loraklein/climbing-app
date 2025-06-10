'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Climber {
  id: number
  climber_name: string
  email: string
  experience_level: string
  home_crag: string | null
  created_at: string
}

export default function ClimberDetail() {
  const [climber, setClimber] = useState<Climber | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    async function fetchClimber() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`http://localhost:3000/api/climbers/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Climber not found')
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setClimber(data.climber)
      } catch (error) {
        console.error('Error fetching climber:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch climber')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchClimber()
    }
  }, [id])

  const handleDelete = async () => {
    if (!climber) return
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${climber.climber_name}"? This action cannot be undone.`
    )
    
    if (!confirmed) return

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/climbers/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete climber')
      }

      router.push('/climbers')
    } catch (error) {
      console.error('Error deleting climber:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete climber')
    } finally {
      setDeleting(false)
    }
  }

  const getExperienceBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return { color: 'bg-green-100 text-green-800', icon: '🌱' }
      case 'intermediate':
        return { color: 'bg-blue-100 text-blue-800', icon: '⚡' }
      case 'advanced':
        return { color: 'bg-purple-100 text-purple-800', icon: '🏆' }
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: '👤' }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="ml-2">Loading climber...</p>
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
                href="/climbers"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                ← Back to climbers
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!climber) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <p>Climber not found</p>
            <Link 
              href="/climbers"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              ← Back to climbers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const experienceBadge = getExperienceBadge(climber.experience_level)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/climbers"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to climbers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {climber.climber_name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{climber.email}</p>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${experienceBadge.color}`}>
                      <span className="mr-1">{experienceBadge.icon}</span>
                      {climber.experience_level.charAt(0).toUpperCase() + climber.experience_level.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                  <Link 
                    href={`/climbers/${climber.id}/edit`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Edit Climber
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
                      'Delete Climber'
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Home Crag</h4>
                  <p className="text-lg text-gray-900">
                    {climber.home_crag || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Member Since</h4>
                  <p className="text-lg text-gray-900">
                    {new Date(climber.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Climber ID</h4>
                  <p className="text-lg text-gray-900">#{climber.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}