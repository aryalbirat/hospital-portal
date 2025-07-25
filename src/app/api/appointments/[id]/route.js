import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

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


// GET single appointment
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return Response.json({ 
        success: false, 
        error: 'Appointment not found' 
      }, { status: 404 });
    }
    
    return Response.json({ success: true, appointment });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch appointment' 
    }, { status: 500 });
  }
}

// PUT - Update appointment
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const appointmentData = await request.json();
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointmentData, { 
      new: true,
      runValidators: true 
    });
    
    if (!updatedAppointment) {
      return Response.json({ 
        success: false, 
        error: 'Appointment not found' 
      }, { status: 404 });
    }
    
    return Response.json({ 
      success: true, 
      message: 'Appointment updated successfully',
      appointment: updatedAppointment 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message || 'Failed to update appointment' 
    }, { status: 400 });
  }
}

// DELETE appointment
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    
    if (!deletedAppointment) {
      return Response.json({ 
        success: false, 
        error: 'Appointment not found' 
      }, { status: 404 });
    }
    
    return Response.json({ 
      success: true, 
      message: 'Appointment cancelled successfully' 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to cancel appointment' 
    }, { status: 500 });
  }
}
