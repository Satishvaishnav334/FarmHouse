import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import OTP from '@/models/OTP';

// Generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();

    // Delete any existing OTPs for this phone number
    await OTP.deleteMany({ phone });

    // Create new OTP record
    const newOTP = new OTP({
      phone,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await newOTP.save();

    // In a real application, you would send the OTP via SMS
    // For demo purposes, we'll just log it and return success
    console.log(`OTP for ${phone}: ${otpCode}`);

    // For demo purposes, we'll include the OTP in development
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        message: 'OTP sent successfully',
        ...(isDevelopment && { otp: otpCode }), // Include OTP in development mode
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
