import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Local Crag Explorer
          </h1>
          <p className="text-lg text-center text-gray-600">
            Discover climbing routes in your area
          </p>
        </div>
      </div>
    </div>
  )
}