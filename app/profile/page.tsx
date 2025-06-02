export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            My Climbing Profile
          </h1>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold mb-4">Profile Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-3xl font-bold text-green-600">12</div>
                <div className="text-gray-600">Routes Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-3xl font-bold text-blue-600">5.9</div>
                <div className="text-gray-600">Hardest Grade</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded">
                <div className="text-3xl font-bold text-purple-600">6</div>
                <div className="text-gray-600">Months Climbing</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Crimson Crux</div>
                  <div className="text-sm text-gray-600">5.8 • Sport • Local Crag</div>
                </div>
                <div className="text-green-600 font-medium">Completed</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Boulder Beast</div>
                  <div className="text-sm text-gray-600">V3 • Boulder • Riverside Rocks</div>
                </div>
                <div className="text-green-600 font-medium">Completed</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Overhang Challenge</div>
                  <div className="text-sm text-gray-600">5.10a • Sport • Mountain View</div>
                </div>
                <div className="text-yellow-600 font-medium">Attempted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}