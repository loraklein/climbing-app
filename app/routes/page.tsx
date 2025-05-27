import Navbar from '../../components/Navbar'

export default function Routes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Climbing Routes
          </h1>
          <p className="text-gray-600">
            This is where we'll show all the climbing routes with filters.
          </p>
        </div>
      </div>
    </div>
  )
}