import RouteCard from './RouteCard'

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

interface RouteListProps {
  routes: ClimbingRoute[]
  completedRoutes: number[]
  onToggleCompleted: (routeId: number) => void
  onRouteUpdated: () => void
}

export default function RouteList({ routes, completedRoutes, onToggleCompleted, onRouteUpdated }: RouteListProps) {
  if (routes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
        <p className="text-gray-500">
          No climbing routes match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {routes.map(route => (
        <RouteCard
          key={route.id}
          route={route}
          isCompleted={completedRoutes.includes(route.id)}
          onToggleCompleted={onToggleCompleted}
          onRouteUpdated={onRouteUpdated}
        />
      ))}
    </div>
  )
}