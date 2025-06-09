'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ClimberList from '../../components/ClimberList'

interface Climber {
  id: number
  climber_name: string
  email: string
  experience_level: string
  home_crag: string | null
  created_at: string
}

export default function Climbers() {
  const [climbers, setClimbers] = useState<Climber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClimbers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:3000/api/climbers')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setClimbers(data.climbers || [])
    } catch (error) {
      console.error('Error fetching climbers:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch climbers')
    } finally {
      setLoading(false)
    }
  }

  const handleClimberUpdated = () => {
    fetchClimbers()
  }

  useEffect(() => {
    fetchClimbers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="ml-2">Loading climbers...</p>
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
              Climbers
            </h1>
            <Link
              href="/climbers/new"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Climber
            </Link>
          </div>

          <div className="mb-4 text-gray-600 flex items-center">
            <span>
              Showing {climbers.length} climbers
            </span>
          </div>

          <ClimberList
            climbers={climbers}
            onClimberUpdated={handleClimberUpdated}
          />
        </div>
      </div>
    </div>
  )
} 