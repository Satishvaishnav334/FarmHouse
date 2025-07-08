import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadImages } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload using Cloudinary utility
    const results = await uploadImages([file]);
    const result = results[0];

    return NextResponse.json({
      url: result.url,
      public_id: result.publicId,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
