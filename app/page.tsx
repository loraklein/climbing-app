import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Local Crag Explorer
          </h1>
          
          <div className="mb-8">
            <Image
              src="/climbing-hero.jpg"
              alt="Rock climbing at a local crag"
              width={800}
              height={400}
              className="rounded-lg shadow-lg mx-auto"
              priority
            />
          </div>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover amazing climbing routes in your area. Track your progress, 
            find new challenges, and connect with the local climbing community.
          </p>
          
          <div className="space-x-4">
            <Link 
              href="/routes"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Explore Routes
            </Link>
            <Link 
              href="/profile"
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}