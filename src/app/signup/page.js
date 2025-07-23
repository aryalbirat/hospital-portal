"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from '@/components/Toast';
import { Heart, User, Mail, Phone, Calendar, MapPin, Users, Clock, ArrowRight, Shield, UserCheck } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    role: 'User',
    assignedDoctor: '',
    // Doctor-specific fields
    specialization: '',
    experience: '',
    department: ''
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Provide real-time feedback for certain fields
    if (name === 'email' && value) {
      if (!value.includes('@')) {
        toast.warning('Please enter a valid email address with @ symbol.', {
          duration: 2000
        });
      }
    }

    if (name === 'role' && value) {
      const roleDescriptions = {
        'User': 'Patient account - Book appointments and view medical records',
        'Doctor': 'Medical professional - Manage patient appointments and schedules'
      };
      toast.info(`Selected: ${roleDescriptions[value]}`, {
        duration: 3000
      });
    }

    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 0) {
        toast.warning('Please select a valid birth date.');
      } else if (age < 18) {
        toast.info(`Age: ${age} years. Guardian consent may be required.`, {
          duration: 3000
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!formData.firstName.trim()) {
      toast.error('Please enter your first name.');
      setLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      toast.error('Please enter your last name.');
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number.');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Please enter a password.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (!formData.dateOfBirth) {
      toast.error('Please select your date of birth.');
      setLoading(false);
      return;
    }

    if (!formData.gender) {
      toast.error('Please select your gender.');
      setLoading(false);
      return;
    }

    if (!formData.address.trim()) {
      toast.error('Please enter your address.');
      setLoading(false);
      return;
    }

    // Doctor-specific validation
    if (formData.role === 'Doctor') {
      if (!formData.specialization.trim()) {
        toast.error('Please enter your medical specialization.');
        setLoading(false);
        return;
      }

      if (!formData.experience.trim()) {
        toast.error('Please enter your years of experience.');
        setLoading(false);
        return;
      }

      if (!formData.department.trim()) {
        toast.error('Please enter your department.');
        setLoading(false);
        return;
      }
    }

    toast.info('Creating your account... Please wait.', {
      duration: 2000
    });

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`🎉 Welcome to Carelink, ${formData.firstName}! Your account has been created successfully. Redirecting to login page...`, {
          duration: 4000
        });
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        toast.error(`❌ ${data.error || 'Failed to create account. Please try again.'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('❌ Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Carelink</h1>
                <p className="text-sm text-gray-500">Hospital Portal</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-light text-gray-900">
              Create Your <span className="font-bold">Account</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join Carelink Hospital Portal to book appointments, manage your health records, 
              and connect with our medical professionals
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Role Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Account Type</h3>
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="User">Patient - Book appointments and manage health records</option>
                <option value="Doctor">Doctor - Manage patients and appointments</option>
              </select>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter a secure password (minimum 6 characters)"
                  minLength={6}
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Personal Details</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700">
                    Date of Birth *
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Address Information</h3>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                  Full Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Enter your complete address including street, city, state, and postal code"
                />
              </div>
            </div>


            {/* Doctor-specific fields */}
            {formData.role === 'Doctor' && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Medical Professional Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="specialization" className="block text-sm font-semibold text-gray-700">
                      Medical Specialization *
                    </label>
                    <input
                      id="specialization"
                      name="specialization"
                      type="text"
                      required={formData.role === 'Doctor'}
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="e.g., Cardiology, Pediatrics, Surgery"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-sm font-semibold text-gray-700">
                      Years of Experience *
                    </label>
                    <input
                      id="experience"
                      name="experience"
                      type="text"
                      required={formData.role === 'Doctor'}
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="e.g., 5 years, 10+ years"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mt-6">
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    required={formData.role === 'Doctor'}
                    value={formData.department}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-4 text-base border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Radiology">Radiology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 space-y-4 sm:space-y-0">
              <Link 
                href="/login"
                className="text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Already have an account? Sign in here
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex justify-center items-center py-4 px-8 border border-transparent text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5" />
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Secure healthcare portal • Protected by Carelink Hospital
          </p>
        </div>
      </div>
    </div>
  );
}