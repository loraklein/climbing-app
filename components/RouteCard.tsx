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

interface RouteCardProps {
  route: ClimbingRoute
  isCompleted: boolean
  onToggleCompleted: (routeId: number) => void
}

export default function RouteCard({ route, isCompleted, onToggleCompleted }: RouteCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">{route.name}</h2>
        <button
          onClick={() => onToggleCompleted(route.id)}
          className={`px-3 py-1 rounded text-sm font-medium ${
            isCompleted
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          {isCompleted ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
      <p className="text-gray-600">{route.grade} • {route.type}</p>
      <p className="text-sm text-gray-500 mb-2">{route.location}</p>
      <p className="text-gray-700">{route.description}</p>
      <div className="mt-2 text-sm text-gray-600">
        Length: {route.length} • Rating: {route.rating}/5 ({route.totalRatings} reviews)
      </div>
    </div>
  )
}