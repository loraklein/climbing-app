import Navbar from '../components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Local Crag Explorer
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover climbing routes in your area
            </p>
            
            {/* Hero Image */}
            <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
              <Image
                src="/climbing-hero.jpg"
                alt="Rock climbing scene"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-2">Find Routes</h3>
                <p className="text-gray-600">Search and filter climbing routes by grade, type, and location.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-gray-600">Mark routes as completed and track your climbing journey.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold mb-2">Share Beta</h3>
                <p className="text-gray-600">Read and share route information with the climbing community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}