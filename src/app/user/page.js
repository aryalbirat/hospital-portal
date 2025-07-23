"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from '@/components/Toast';
import { Calendar, Users, Clock, RefreshCw, FileText, Plus, X, Heart, User } from 'lucide-react';

export default function UserPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's appointments and doctors on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load appointments
        const appointmentsResponse = await fetch('/api/appointments');
        const appointmentsData = await appointmentsResponse.json();
        if (appointmentsData.success) {
          setUserAppointments(appointmentsData.appointments);
          console.log(`Appointments loaded successfully! Found ${appointmentsData.appointments.length} appointments.`);
        } else {
          toast.error('Failed to load your appointments. Please refresh the page.');
        }

        // Load doctors
        const doctorsResponse = await fetch('/api/doctors');
        const doctorsData = await doctorsResponse.json();
        if (doctorsData.success) {
          setDoctors(doctorsData.doctors);
          console.log(`Doctors loaded successfully! Found ${doctorsData.doctors.length} doctors.`);
        } else {
          toast.error('Failed to load doctors list. Please refresh the page.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Network error while loading data. Please check your connection.');
      }
    };

    loadData();
  }, []); // Remove toast dependency to prevent infinite loop

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data.success) {
        setUserAppointments(data.appointments);
        toast.success(`Appointments refreshed! You have ${data.appointments.length} appointment${data.appointments.length !== 1 ? 's' : ''}.`, {
          duration: 2000
        });
      } else {
        toast.error('Failed to refresh your appointments. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Network error while refreshing appointments. Please check your connection.');
    }
  };

  const handleBookAppointment = () => {
    toast.info("Opening appointment booking form. Please fill in all required fields.", {
      duration: 3000
    });
    setShowBookingModal(true);
  };

  const handleViewRecords = () => {
    toast.info("Medical records feature coming soon! Please contact your doctor.", { 
      duration: 4000 
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!bookingData.doctorId) {
      toast.error('Please select a doctor for your appointment.');
      setLoading(false);
      return;
    }

    if (!bookingData.appointmentDate) {
      toast.error('Please select an appointment date.');
      setLoading(false);
      return;
    }

    if (!bookingData.appointmentTime) {
      toast.error('Please select a preferred time slot.');
      setLoading(false);
      return;
    }

    if (!bookingData.reason.trim()) {
      toast.error('Please provide a reason for your visit.');
      setLoading(false);
      return;
    }

    // Date validation
    const selectedDate = new Date(bookingData.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Cannot book appointments for past dates. Please select a future date.');
      setLoading(false);
      return;
    }

    toast.info('Processing your appointment request...', {
      duration: 2000
    });

    try {
      // Get selected doctor details
      const selectedDoctor = doctors.find(d => d.id == bookingData.doctorId);

      // Get logged-in user info from localStorage (set on login)
      let user = null;
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            user = JSON.parse(userStr);
          } catch (e) {
            user = null;
          }
        }
      }

      // Fetch full user info (including phone) from backend
      let userPhone = '';
      if (user?.id) {
        const userRes = await fetch(`/api/users/${user.id}`);
        const userData = await userRes.json();
        if (userData.success && userData.user) {
          userPhone = userData.user.phone || '';
        }
      }

      const appointmentPayload = {
        patientId: user?.id || '',
        patientName: user ? `${user.firstName} ${user.lastName}` : '',
        patientEmail: user?.email || '',
        patientPhone: userPhone,
        doctorId: bookingData.doctorId,
        doctorName: selectedDoctor?.name || 'Unknown Doctor',
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        reason: bookingData.reason
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentPayload),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`🎉 Appointment booked successfully with ${selectedDoctor?.name}! You will receive a confirmation soon.`, {
          duration: 5000
        });
        setShowBookingModal(false);
        setBookingData({ doctorId: '', appointmentDate: '', appointmentTime: '', reason: '' });
        fetchAppointments(); // Refresh appointments
      } else {
        toast.error(`❌ Failed to book appointment: ${data.error}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('❌ Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = () => {
    if (bookingData.doctorId || bookingData.appointmentDate || bookingData.appointmentTime || bookingData.reason) {
      toast.warning('Booking cancelled. Your form data has been cleared.');
    } else {
      toast.info('Booking cancelled.');
    }
    setShowBookingModal(false);
    setBookingData({ doctorId: '', appointmentDate: '', appointmentTime: '', reason: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });

    // Provide real-time feedback for certain fields
    if (name === 'doctorId' && value) {
      const selectedDoctor = doctors.find(d => d.id == value);
      toast.info(`Selected: ${selectedDoctor?.name} (${selectedDoctor?.specialization})`, {
        duration: 2000
      });
    }

    if (name === 'appointmentDate' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        toast.warning('Please select a future date for your appointment.', {
          duration: 3000
        });
      } else {
        toast.success(`Date selected: ${selectedDate.toLocaleDateString()}`, {
          duration: 2000
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-8 h-8 text-purple-200" />
            <h1 className="text-4xl font-light">
              Patient <span className="font-bold">Dashboard</span>
            </h1>
          </div>
          <p className="text-purple-100 text-lg">Manage your appointments and health information</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Calendar className="w-7 h-7 text-purple-600 group-hover:text-white" />
              </div>
              <span className="text-4xl font-bold text-purple-600">{userAppointments.filter(apt => apt.status === 'Pending' || apt.status === 'Confirmed').length}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Appointments</h3>
            <p className="text-gray-600">Scheduled appointments</p>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <Users className="w-7 h-7 text-indigo-600 group-hover:text-white" />
              </div>
              <span className="text-4xl font-bold text-indigo-600">{userAppointments.length}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Appointments</h3>
            <p className="text-gray-600">All time appointments</p>
          </div>
        </div>

        {/* Recent Appointments */}
        {userAppointments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Recent <span className="font-bold">Appointments</span>
            </h3>
            <div className="space-y-4">
              {userAppointments.slice(0, 3).map((appointment, index) => (
                <div key={index} className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
                      <p className="text-gray-600">
                        {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Dashboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            Your Health <span className="font-bold">Information</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Here you can view your appointments, medical records, and manage your healthcare information with our medical professionals.
          </p>
          
          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button 
              onClick={handleBookAppointment}
              className="group flex items-center justify-center space-x-3 bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-all duration-300 hover:shadow-lg"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Book Appointment</span>
            </button>
            
            <button 
              onClick={handleViewRecords}
              className="group flex items-center justify-center space-x-3 bg-indigo-600 text-white p-6 rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg"
            >
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">View Records</span>
            </button>
            
            <button 
              onClick={fetchAppointments}
              className="group flex items-center justify-center space-x-3 bg-gray-600 text-white p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
            >
              <RefreshCw className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Refresh Appointments</span>
            </button>
          </div>

          {/* Empty State */}
          {userAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">No appointments yet</p>
              <p className="text-gray-600">Book your first appointment to get started with your healthcare journey.</p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-gray-900">
                  Book <span className="font-bold">Appointment</span>
                </h3>
                <button
                  onClick={handleCancelBooking}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Doctor *
                  </label>
                  <select
                    name="doctorId"
                    value={bookingData.doctorId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={bookingData.appointmentDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Time *
                  </label>
                  <select
                    name="appointmentTime"
                    value={bookingData.appointmentTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Reason for Visit *
                  </label>
                  <textarea
                    name="reason"
                    value={bookingData.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Brief description of your concern"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancelBooking}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>Book Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}