export default function Home() {
  return (
    <div className="min-h-screen">


      {/* Our Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to MediCare Hospital
          </h1>
          <p className="text-xl mb-8">
            Providing exceptional healthcare services with compassion and
            expertise
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Appointment
          </button>
        </div>
      </section>


      {/* Our Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Emergency Care</h3>
              <p className="text-gray-600">
                24/7 emergency medical services with experienced staff.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Surgery</h3>
              <p className="text-gray-600">
                Advanced surgical procedures with skilled surgeons and modern
                equipment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Pediatrics</h3>
              <p className="text-gray-600">
                Specialized care for children with experienced pediatricians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-lg text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>


      {/* Contact Us Section */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div>
                  <strong>Address:</strong>
                  <p className="text-gray-600">123 Medical Center Drive, Health City, HC 12345</p>
                </div>
                <div>
                  <strong>Phone:</strong>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <strong>Email:</strong>
                  <p className="text-gray-600">info@medicare-hospital.com</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Emergency Hours</h3>
              <div className="space-y-2">
                <p><strong>24/7 Emergency Services</strong></p>
                <p className="text-gray-600">Monday - Sunday: 24 hours</p>
                <p className="text-gray-600">General Consultations: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}


