import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const user = await User.findById((session.user as any).id).select('-password');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    
    const userId = (session.user as any).id;
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date()
    };

    // Update basic info
    if (body.name) updateData.name = body.name.trim();
    if (body.email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email: body.email.toLowerCase(), 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
      updateData.email = body.email.toLowerCase();
    }

    if (body.phone) {
      // Check if phone is already taken by another user
      const existingUser = await User.findOne({ 
        phone: body.phone.trim(), 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Phone number is already taken' },
          { status: 400 }
        );
      }
      updateData.phone = body.phone.trim();
      // Reset phone verification if phone number changed
      if (user.phone !== body.phone.trim()) {
        updateData.phoneVerified = false;
      }
    }

    // Update address
    if (body.address) {
      const address: any = {};
      if (body.address.street) address.street = body.address.street.trim();
      if (body.address.city) address.city = body.address.city.trim();
      if (body.address.state) address.state = body.address.state.trim();
      if (body.address.pinCode) {
        // Validate pin code format
        if (!/^\d{6}$/.test(body.address.pinCode)) {
          return NextResponse.json(
            { error: 'Pin code must be 6 digits' },
            { status: 400 }
          );
        }
        address.pinCode = body.address.pinCode.trim();
      }
      
      // Merge with existing address
      updateData.address = {
        ...user.address?.toObject(),
        ...address
      };
    }

    // Update password if provided
    if (body.currentPassword && body.newPassword) {
      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(body.currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      // Validate new password
      if (body.newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }

      // Hash new password
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(body.newPassword, saltRounds);
    }

    // Update profile image if provided
    if (body.profileImage !== undefined) {
      updateData.profileImage = body.profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true, select: '-password' }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
