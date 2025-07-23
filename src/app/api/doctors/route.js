import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    

    const doctors = await User.find({ role: 'Doctor' }).select(
      'firstName lastName email phone specialization experience department'
    );
    
    const formattedDoctors = doctors.map(doctor => ({
      id: doctor._id.toString(),
      name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      specialization: doctor.specialization || 'General Medicine',
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience || 'New Doctor',
      department: doctor.department || 'General Medicine'
    }));

    return Response.json({ 
      success: true, 
      doctors: formattedDoctors 
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch doctors' 
    }, { status: 500 });
  }
}
