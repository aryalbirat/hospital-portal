"use client";
import { useState, useEffect } from "react";
import { doctors } from '@/data/doctors';
import { useToast } from '@/components/Toast';
import { Users, Calendar, UserCheck, Clock, Plus, X, Edit, Trash2, Shield, Stethoscope, Heart } from 'lucide-react';

export default function AdminPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  
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
    appointmentTime: '',
  });

  // Fetch users from API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
          // Only show toast on initial load, not on every re-render
          console.log(`Users loaded successfully! Found ${data.users.length} users.`);
        } else {
          toast.error('Failed to load users. Please refresh the page.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Network error while loading users. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    const loadAppointments = async () => {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        if (data.success) {
          setAppointments(data.appointments);
          // Only show toast on initial load, not on every re-render
          console.log(`Appointments loaded successfully! Found ${data.appointments.length} appointments.`);
        } else {
          toast.error('Failed to load appointments. Please refresh the page.');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Network error while loading appointments. Please check your connection.');
      }
    };

    loadUsers();
    loadAppointments();
  }, []); // Remove toast dependency to prevent infinite loop

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        toast.success(`👥 Users loaded successfully! Found ${data.users.length} user${data.users.length !== 1 ? 's' : ''}.`, {
          duration: 3000
        });
      } else {
        toast.error('Failed to load users. Please refresh okathe page.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Network error while loading users. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments);
        toast.success(`📅 Appointments loaded successfully! Found ${data.appointments.length} appointment${data.appointments.length !== 1 ? 's' : ''}.`, {
          duration: 3000
        });
      } else {
        toast.error('Failed to load appointments. Please refresh the page.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Network error while loading appointments. Please check your connection.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First name and last name are required.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Phone number is required.');
      return;
    }

    // Password validation for new users
    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      toast.error('Password is required and must be at least 6 characters long.');
      return;
    }

    // Password validation for existing users (only if password is provided)
    if (editingUser && formData.password && formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const action = editingUser ? 'Updating' : 'Creating';
    toast.info(`${action} user account... Please wait.`, {
      duration: 2000
    });

    try {
      const url = editingUser ? `/api/users/${editingUser._id}` : '/api/users';
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        const action = editingUser ? 'updated' : 'created';
        const userName = `${formData.firstName} ${formData.lastName}`;
        toast.success(`✅ ${userName} has been ${action} successfully! ${editingUser ? 'Changes saved.' : 'New user account is ready.'}`, {
          duration: 4000
        });
        setShowAddForm(false);
        setEditingUser(null);
        fetchUsers();
        resetForm();
      } else {
        toast.error(`❌ ${data.error || 'Failed to save user. Please try again.'}`);
      }
    } catch (error) {
      console.error('Admin form error:', error);
      toast.error('❌ Network error. Please check your connection and try again.');
    }
  };

  const resetForm = () => {
    setFormData({
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
      appointmentTime: ''
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: '', // Don't populate password for security
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      gender: user.gender,
      address: user.address || '',
      role: user.role,
      assignedDoctor: user.assignedDoctor || '',
      appointmentTime: user.appointmentTime || '',
      role: user.role,
      assignedDoctor: user.assignedDoctor || '',
      appointmentTime: user.appointmentTime || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (userId, userName) => {
    if (confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (data.success) {
          toast.success(`✅ ${userName} has been deleted successfully! User account removed from the system.`, {
            duration: 4000
          });
          fetchUsers();
        } else {
          toast.error(`❌ Failed to delete ${userName}: ${data.error}`);
        }
      } catch (error) {
        toast.error('Network error. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingUser(null);
    resetForm();
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(`✅ Appointment ${newStatus.toLowerCase()} successfully! Patient will be notified of the status change.`, {
          duration: 4000
        });
        fetchAppointments();
      } else {
        toast.error(`❌ Failed to update appointment: ${data.error}`);
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-blue-200" />
            <h1 className="text-4xl font-light">
              Admin <span className="font-bold">Dashboard</span>
            </h1>
          </div>
          <p className="text-blue-100 text-lg">Manage users, appointments, and system settings</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Users className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-600">{users.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Users</h3>
            <p className="text-gray-600 text-sm">Registered patients and staff</p>
          </div>
          
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <Stethoscope className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <span className="text-3xl font-bold text-green-600">6</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Doctors</h3>
            <p className="text-gray-600 text-sm">Medical professionals</p>
          </div>
          
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-yellow-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600 transition-colors">
                <Calendar className="w-6 h-6 text-yellow-600 group-hover:text-white" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">{appointments.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Appointments</h3>
            <p className="text-gray-600 text-sm">All scheduled visits</p>
          </div>
          
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Clock className="w-6 h-6 text-purple-600 group-hover:text-white" />
              </div>
              <span className="text-3xl font-bold text-purple-600">{appointments.filter(apt => apt.status === 'Pending').length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending Appointments</h3>
            <p className="text-gray-600 text-sm">Awaiting confirmation</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-8 py-4 font-medium transition-all duration-200 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>User Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-8 py-4 font-medium transition-all duration-200 ${
                activeTab === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </div>
            </button>
          </div>
        </div>

        {/* User Management Section */}
        {activeTab === 'users' && (
          <>
            {/* Add/Edit User Form */}
            {showAddForm && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-light text-gray-900">
                    {editingUser ? 'Edit' : 'Add New'} <span className="font-bold">User</span>
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Password {editingUser ? '(Leave blank to keep current password)' : '*'}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={editingUser ? "Enter new password (optional)" : "Enter password (minimum 6 characters)"}
                      required={!editingUser}
                      minLength={6}
                    />
                  </div>

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows="3"
                      placeholder="Enter full address"
                      required
                    />
                  </div>

                  {/* Appointment Time and Doctor */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Appointment Time
                      </label>
                      <input
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Assigned Doctor
                      </label>
                      <select
                        name="assignedDoctor"
                        value={formData.assignedDoctor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="User">User</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      {editingUser ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* User Management Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-light text-gray-900">
                  User <span className="font-bold">Management</span>
                </h2>
                <button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>{showAddForm ? 'Cancel' : 'Add New User'}</span>
                </button>
              </div>
              
              {/* Users Table */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                  <p className="text-gray-600">Loading users...</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Users className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium mb-2">No users found</p>
                            <p className="text-sm">Add your first user to get started!</p>
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                            <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                user.role === 'Doctor' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => handleEdit(user)}
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  <span className="text-sm">Edit</span>
                                </button>
                                <button 
                                  onClick={() => handleDelete(user._id, `${user.firstName} ${user.lastName}`)}
                                  className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm">Delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Appointments Management Section */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-light text-gray-900">
                Appointments <span className="font-bold">Management</span>
              </h2>
            </div>
            
            {/* Appointments Table */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Patient</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Doctor</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Reason</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-lg font-medium mb-2">No appointments found</p>
                          <p className="text-sm">Appointments will appear here when scheduled.</p>
                        </td>
                      </tr>
                    ) : (
                      appointments.map((appointment) => (
                        <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{appointment.patientName}</p>
                              <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{appointment.doctorName}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-gray-900">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-600">{appointment.appointmentTime}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => updateAppointmentStatus(appointment._id, 'Confirmed')}
                                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                disabled={appointment.status === 'Confirmed'}
                              >
                                <UserCheck className="w-3 h-3 inline mr-1" />
                                Confirm
                              </button>
                              <button 
                                onClick={() => updateAppointmentStatus(appointment._id, 'Cancelled')}
                                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                disabled={appointment.status === 'Cancelled'}
                              >
                                <X className="w-3 h-3 inline mr-1" />
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}