import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

// Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

// GET - Fetch all appointments
export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find({}).sort({ appointmentDate: 1, appointmentTime: 1 });
    return Response.json({ success: true, appointments });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch appointments' 
    }, { status: 500 });
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    await connectDB();
    const appointmentData = await request.json();
    
    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      doctorId: appointmentData.doctorId,
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (conflictingAppointment) {
      return Response.json({ 
        success: false, 
        error: 'This time slot is already booked for the selected doctor' 
      }, { status: 409 });
    }

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    
    return Response.json({ 
      success: true, 
      message: 'Appointment booked successfully!',
      appointment: newAppointment 
    }, { status: 201 });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message || 'Failed to book appointment' 
    }, { status: 400 });
  }
}
