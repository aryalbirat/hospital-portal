import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET - Fetch all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, users });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch users' 
    }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request) {
  try {
    await connectDB();
    const userData = await request.json();
    
    const newUser = new User(userData);
    await newUser.save();
    
    return Response.json({ 
      success: true, 
      message: 'User created successfully',
      user: newUser 
    }, { status: 201 });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message || 'Failed to create user' 
    }, { status: 400 });
  }
}