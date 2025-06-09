'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Climber {
  id: number
  climber_name: string
  email: string
  experience_level: string
  home_crag: string | null
}

interface EditClimberFormProps {
  id: string
}

export default function EditClimberForm({ id }: EditClimberFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Climber>({
    id: 0,
    climber_name: '',
    email: '',
    experience_level: '',
    home_crag: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClimber = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/climbers/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch climber')
        }
        const data = await response.json()
        setFormData(data.climber)
      } catch (error) {
        console.error('Error fetching climber:', error)
        setError('Failed to load climber data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchClimber()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/climbers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to update climber')
      }

      router.push('/climbers')
    } catch (error) {
      console.error('Error updating climber:', error)
      setError(error instanceof Error ? error.message : 'Failed to update climber')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Climber</h1>
            <Link
              href="/climbers"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Climbers
            </Link>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="climber_name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="climber_name"
                  name="climber_name"
                  required
                  value={formData.climber_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700">
                  Experience Level
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  required
                  value={formData.experience_level}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="home_crag" className="block text-sm font-medium text-gray-700">
                  Home Crag (Optional)
                </label>
                <input
                  type="text"
                  id="home_crag"
                  name="home_crag"
                  value={formData.home_crag || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 