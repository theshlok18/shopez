import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">My Profile</h1>

      <div className="card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-3xl sm:text-4xl font-bold">
              {user?.fullName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold truncate">{user?.fullName}</h2>
            <p className="text-gray-600 text-sm sm:text-base truncate">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Full Name
            </label>
            <p className="text-base sm:text-lg">{user?.fullName}</p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Email
            </label>
            <p className="text-base sm:text-lg truncate">{user?.email}</p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Phone
            </label>
            <p className="text-base sm:text-lg">{user?.phone || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Role
            </label>
            <p className="text-base sm:text-lg">
              {user?.roles?.includes('ROLE_ADMIN') ? 'Admin' : 'Customer'}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Address
            </label>
            <p className="text-base sm:text-lg">{user?.address || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
