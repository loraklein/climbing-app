import Link from 'next/link'
import { useState } from 'react'

interface Climber {
  id: number
  climber_name: string
  email: string
  experience_level: string
  home_crag: string | null
  created_at: string
}

interface ClimberListProps {
  climbers: Climber[]
  onClimberUpdated: () => void
}

export default function ClimberList({ climbers, onClimberUpdated }: ClimberListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this climber?')) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/climbers/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete climber')
      }

      onClimberUpdated()
    } catch (error) {
      console.error('Error deleting climber:', error)
      alert('Failed to delete climber')
    }
  }

  const handleEditClick = (climber: Climber) => {
    setEditingId(climber.id)
    setEditValue(climber.home_crag || '')
  }

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/climbers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ home_crag: editValue }),
      })

      if (!response.ok) {
        throw new Error('Failed to update climber')
      }

      setEditingId(null)
      onClimberUpdated()
    } catch (error) {
      console.error('Error updating climber:', error)
      alert('Failed to update climber')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  if (climbers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No climbers found
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="divide-y divide-gray-200">
        {climbers.map((climber) => (
          <div key={climber.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {climber.climber_name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{climber.email}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {climber.experience_level}
                  </span>
                  {editingId === climber.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="Enter home crag"
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      />
                      <button
                        onClick={() => handleSave(climber.id)}
                        className="text-sm text-green-600 hover:text-green-900 cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        Home Crag: {climber.home_crag || 'Not set'}
                      </span>
                      <button
                        onClick={() => handleEditClick(climber)}
                        className="text-gray-400 hover:text-blue-600 cursor-pointer"
                        title="Edit home crag"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/climbers/${climber.id}/edit`}
                  className="text-sm text-blue-600 hover:text-blue-900 cursor-pointer"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(climber.id)}
                  className="text-sm text-red-600 hover:text-red-900 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 