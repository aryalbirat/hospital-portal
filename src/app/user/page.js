export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">User Portal</h1>
          <p className="text-purple-100">Welcome to your Patient Dashboard</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Health Information</h2>
          <p className="text-gray-600 mb-6">
            Here you can view your appointments and medical records.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Upcoming Appointments</h3>
              <p className="text-3xl font-bold text-purple-800">3</p>
              <p className="text-purple-600 text-sm">Scheduled this month</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Medical Records</h3>
              <p className="text-3xl font-bold text-indigo-800">8</p>
              <p className="text-indigo-600 text-sm">Available documents</p>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors mr-4">
              Book Appointment
            </button>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              View Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}