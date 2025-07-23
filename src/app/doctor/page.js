"use client";
import { useState, useEffect } from "react";
import { useToast } from '@/components/Toast';
import { Calendar, Users, Clock, RefreshCw, FileText, Stethoscope, Heart } from 'lucide-react';


// Get the real doctor ID from localStorage (set on login)
let CURRENT_DOCTOR_ID = "";
if (typeof window !== "undefined") {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role === "Doctor" && user.id) {
        CURRENT_DOCTOR_ID = user.id;
      }
    } catch (e) {
      CURRENT_DOCTOR_ID = "";
    }
  }
}

export default function DoctorPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        if (data.success) {
          // Only show appointments for this doctor
          const filtered = data.appointments.filter(
            (apt) => String(apt.doctorId) === String(CURRENT_DOCTOR_ID)
          );
          setAppointments(filtered);
          console.log(`Appointments loaded for doctor ${CURRENT_DOCTOR_ID}: ${filtered.length}`);
        } else {
          toast.error('Failed to load appointments. Please refresh the page.');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Network error while loading appointments. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data.success) {
        const filtered = data.appointments.filter(
          (apt) => String(apt.doctorId) === String(CURRENT_DOCTOR_ID)
        );
        setAppointments(filtered);
        toast.success('Appointments refreshed successfully!', {
          duration: 2000
        });
      } else {
        toast.error('Failed to refresh appointments. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Network error while refreshing appointments. Please check your connection.');
    }
  };

  const handleViewSchedule = () => {
    const todayAppts = appointments
      .filter(apt => new Date(apt.appointmentDate).toDateString() === new Date().toDateString());
    
    if (todayAppts.length === 0) {
      toast.info("Great news! No appointments scheduled for today. Enjoy your day off!", {
        duration: 4000
      });
    } else {
      toast.info(`Today's Schedule: ${todayAppts.length} appointment${todayAppts.length > 1 ? 's' : ''} scheduled. Check the appointments section below for details.`, {
        duration: 5000
      });
    }
  };

  const handlePatientRecords = () => {
    toast.info("Patient records management feature is coming soon! This will include comprehensive patient history, medical notes, and treatment plans.", {
      duration: 4000
    });
  };


  // Appointments for today
  const todayAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-2">
            <Stethoscope className="w-8 h-8 text-green-200" />
            <h1 className="text-4xl font-light">
              Doctor <span className="font-bold">Dashboard</span>
            </h1>
          </div>
          <p className="text-green-100 text-lg">Manage your appointments and patient care</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <Calendar className="w-7 h-7 text-green-600 group-hover:text-white" />
              </div>
              <span className="text-4xl font-bold text-green-600">{todayAppointments.length}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Today&#39;s Appointments</h3>
            <p className="text-gray-600">Scheduled for today</p>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <span className="text-4xl font-bold text-blue-600">{appointments.length}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Patients</h3>
            <p className="text-gray-600">Total appointments</p>
          </div>
        </div>

        {/* Today's Schedule */}
        {todayAppointments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Today&#39;s <span className="font-bold">Schedule</span>
            </h3>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.patientName || 'Unknown Patient'}</p>
                      <p className="text-gray-600">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{appointment.appointmentTime}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Dashboard: Show all appointments for this doctor */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            All <span className="font-bold">Appointments</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Here you can view and manage all your patient appointments, access schedules, and review patient information.
          </p>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button 
              onClick={handleViewSchedule}
              className="group flex items-center justify-center space-x-3 bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg"
            >
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">View Schedule</span>
            </button>
            <button 
              onClick={handlePatientRecords}
              className="group flex items-center justify-center space-x-3 bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
            >
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Patient Records</span>
            </button>
            <button 
              onClick={fetchAppointments}
              disabled={loading}
              className="group flex items-center justify-center space-x-3 bg-gray-600 text-white p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:shadow-lg disabled:bg-gray-400"
            >
              <RefreshCw className={`w-6 h-6 group-hover:scale-110 transition-transform ${loading ? 'animate-spin' : ''}`} />
              <span className="font-medium">{loading ? 'Refreshing...' : 'Refresh Appointments'}</span>
            </button>
          </div>

          {/* Empty State or Loading */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <p className="text-gray-600 text-lg">Loading your appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</p>
              <p className="text-gray-600">Your appointments will appear here when patients book with you.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.patientName || 'Unknown Patient'}</p>
                      <p className="text-gray-600">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{appointment.appointmentTime}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}