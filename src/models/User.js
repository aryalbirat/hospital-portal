import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  
  // Address Information
  address: {
    type: String,
    required: true,
    default: ''
  },
  
  // Medical Information
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true, default: 'Family' }
  },
  
  // System Information
  role: {
    type: String,
    enum: ['User', 'Doctor', 'Admin'],
    default: 'User'
  },
  assignedDoctor: {
    type: String,  
    required: false,
    default: ''
  },
  appointmentTime: {
    type: String,
    required: false,
    default: ''
  },
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    notes: String
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);