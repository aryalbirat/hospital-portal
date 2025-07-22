export default function DoctorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Doctor Portal</h1>
          <p className="text-green-100">Welcome to your Doctor Dashboard</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
          <p className="text-gray-600 mb-6">
            Here you can view and manage your patient appointments.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Today Appointments</h3>
              <p className="text-3xl font-bold text-green-800">12</p>
              <p className="text-green-600 text-sm">Scheduled for today</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Patients</h3>
              <p className="text-3xl font-bold text-blue-800">156</p>
              <p className="text-blue-600 text-sm">Under your care</p>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors mr-4">
              View Schedule
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Patient Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}