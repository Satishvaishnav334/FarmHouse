import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return NextResponse.json({ message: 'Users already exist' }, { status: 200 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('password', 12);

    // Create demo users
    const users = [
      {
        email: 'admin@sawariya.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      },
      {
        email: 'user@sawariya.com',
        password: hashedPassword,
        name: 'Regular User',
        role: 'user',
      },
    ];

    await User.insertMany(users);

    return NextResponse.json({ 
      message: 'Demo users created successfully',
      users: users.map(u => ({ email: u.email, name: u.name, role: u.role }))
    }, { status: 201 });

  } catch (error) {
    console.error('Error seeding users:', error);
    return NextResponse.json(
      { error: 'Failed to seed users' },
      { status: 500 }
    );
  }
}
