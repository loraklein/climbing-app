import Link from 'next/link'
import InlineRating from './InlineRating'

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

interface RouteCardProps {
  route: ClimbingRoute
  isCompleted: boolean
  onToggleCompleted: (routeId: number) => void
  onRouteUpdated: () => void
}

export default function RouteCard({ route, isCompleted, onToggleCompleted, onRouteUpdated }: RouteCardProps) {
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

  const typeStyle = getRouteTypeStyle(route.route_type)

  const renderStars = (rating: number | null) => {
    if (!rating || rating === 0) {
      return <span className="text-gray-400 text-sm">No rating</span>
    }
    
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }
    
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>)
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm text-gray-600">({Number(rating).toFixed(1)})</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <Link href={`/routes/${route.id}`}>
        <div className="p-6 cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight hover:text-green-600 transition-colors">
              {route.route_name}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleCompleted(route.id)
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isCompleted
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              {isCompleted ? '✓ Sent' : 'Mark Sent'}
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-bold text-gray-900">{route.grade}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${typeStyle.bgColor} ${typeStyle.textColor} ${typeStyle.borderColor}`}>
              <span className="mr-1">{typeStyle.icon}</span>
              {route.route_type.charAt(0).toUpperCase() + route.route_type.slice(1)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {route.location}
          </div>

          {route.description && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {route.description}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {route.length_feet && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>{route.length_feet} ft</span>
                </div>
              )}
              
              {route.first_ascent_year && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{route.first_ascent_year}</span>
                </div>
              )}
            </div>

            <div 
              onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
              onMouseEnter={(e) => { e.stopPropagation() }}
              onMouseLeave={(e) => { e.stopPropagation() }}
            >
              <InlineRating
                routeId={route.id}
                currentRating={route.rating ?? 0}
                onRatingUpdated={onRouteUpdated}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}