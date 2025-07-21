export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to MediCare Hospital
          </h1>
          <p className="text-xl mb-8">
            Providing exceptional healthcare services with compassion and expertise
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}