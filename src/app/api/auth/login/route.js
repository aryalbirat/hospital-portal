import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return Response.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    // For demo purposes, accept any password
    // In production, you would verify the hashed password
    return Response.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return Response.json({ 
      success: false, 
      message: 'Login failed' 
    }, { status: 500 });
  }
}
