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
  password: {
    type: String,
    required: true,
    minlength: 6
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
  
  
  // System Information
  role: {
    type: String,
    enum: ['User', 'Doctor', 'Admin'],
    default: 'User'
  },
  
  // Doctor-specific fields
  specialization: {
    type: String,
    required: function() { return this.role === 'Doctor'; },
    default: ''
  },
  experience: {
    type: String,
    required: function() { return this.role === 'Doctor'; },
    default: ''
  },
  department: {
    type: String,
    required: function() { return this.role === 'Doctor'; },
    default: ''
  },
  
  assignedDoctor: {
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