import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

// GET single user
export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const userData = await request.json();
    
    // Hash password if provided
    if (userData.password && userData.password.trim() !== '') {
      const saltRounds = 12;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    } else {
      // Remove password field if empty (don't update password)
      delete userData.password;
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, userData, { 
      new: true,
      runValidators: true 
    });
    
    if (!updatedUser) {
      return Response.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 });
    }
    
    return Response.json({ 
      success: true, 
      message: 'User updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message || 'Failed to update user' 
    }, { status: 400 });
  }
}

// DELETE user
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return Response.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 });
    }
    
    return Response.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to delete user' 
    }, { status: 500 });
  }
}
