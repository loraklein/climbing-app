import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Local Crag Explorer
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-green-200">
            Home
          </Link>
          <Link href="/routes" className="hover:text-green-200">
            Routes
          </Link>
          <Link href="/climbers" className="hover:text-green-200">
            Climbers
          </Link>
          <Link href="/profile" className="hover:text-green-200">
            My Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}