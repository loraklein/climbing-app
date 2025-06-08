import { useState } from 'react'

interface InlineRatingProps {
  routeId: string | number
  currentRating: number
  onRatingUpdated: () => void
}

export default function InlineRating({ routeId, currentRating, onRatingUpdated }: InlineRatingProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [updating, setUpdating] = useState(false)

  const updateRating = async (newRating: number) => {
    setUpdating(true)
    
    try {
      const response = await fetch(`http://localhost:3000/api/climbing-routes/${routeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: newRating })
      })

      if (!response.ok) {
        throw new Error('Failed to update rating')
      }

      onRatingUpdated()
      setIsEditing(false)
      alert('Rating updated!')
    } catch (error) {
      console.error('Error updating rating:', error)
      alert('Failed to update rating')
    } finally {
      setUpdating(false)
    }
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`text-sm ${
                (currentRating && i < currentRating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        {currentRating && (
          <span className="text-xs text-gray-600">({Number(currentRating).toFixed(1)})</span>
        )}
        
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Rate
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-600">Click to rate:</span>
      <div className="flex items-center gap-1">
        {/* Star Rating Options */}
        {[1, 2, 3, 4, 5].map(rating => (
          <button
            key={rating}
            onClick={() => updateRating(rating)}
            disabled={updating}
            className="px-1 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
          >
            {rating}
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsEditing(false)}
        className="text-xs text-gray-500 self-start"
      >
        Cancel
      </button>
    </div>
  )
}