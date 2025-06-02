import RouteCard from './RouteCard'

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

interface RouteListProps {
  routes: ClimbingRoute[]
  completedRoutes: number[]
  onToggleCompleted: (routeId: number) => void
}

export default function RouteList({ routes, completedRoutes, onToggleCompleted }: RouteListProps) {
  if (routes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No routes found matching your filters.
      </p>
    )
  }

  return (
    <div className="grid gap-4">
      {routes.map(route => (
        <RouteCard
          key={route.id}
          route={route}
          isCompleted={completedRoutes.includes(route.id)}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </div>
  )
}