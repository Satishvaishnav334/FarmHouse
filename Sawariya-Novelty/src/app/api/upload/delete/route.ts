import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { deleteImage } from '@/lib/cloudinary';

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }

    // Delete using Cloudinary utility
    const result = await deleteImage(publicId);

    return NextResponse.json({
      success: result.success,
      message: result.message
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}
