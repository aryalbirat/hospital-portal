import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

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
    
    // Hash password if provided, otherwise use default password
    if (userData.password) {
      const saltRounds = 12;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    } else {
      // Default password for demo purposes
      const saltRounds = 12;
      userData.password = await bcrypt.hash('password123', saltRounds);
    }
    
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