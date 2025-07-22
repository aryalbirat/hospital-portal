import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

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

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return Response.json({ 
        success: false, 
        message: 'Invalid password' 
      }, { status: 401 });
    }

    // Login successful
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
