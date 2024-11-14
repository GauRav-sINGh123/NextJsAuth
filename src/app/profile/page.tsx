export default function Profile() {
 
  const user = {
    username: "JohnDoe",
    email: "john.doe@example.com"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">User Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Username</h3>
            <p className="mt-1 text-gray-700">{user.username}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Email</h3>
            <p className="mt-1 text-gray-700">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}