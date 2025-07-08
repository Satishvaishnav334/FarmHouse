/**
 * Example usage of Cloudinary utilities
 * This file demonstrates how to use the uploadImages and deleteImage functions
 */

import { uploadImages, deleteImage, CLOUDINARY_CONFIG } from './cloudinary';

// Example 1: Upload single image
async function uploadSingleImage(file: File) {
  try {
    const results = await uploadImages([file]);
    const result = results[0];
    
    console.log('Upload successful:', {
      url: result.url,
      publicId: result.publicId
    });
    
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

// Example 2: Upload multiple images
async function uploadMultipleImages(files: File[]) {
  try {
    const results = await uploadImages(files);
    
    console.log(`Successfully uploaded ${results.length} images:`);
    results.forEach((result, index) => {
      console.log(`Image ${index + 1}:`, {
        url: result.url,
        publicId: result.publicId
      });
    });
    
    return results;
  } catch (error) {
    console.error('Multiple upload failed:', error);
    throw error;
  }
}

// Example 3: Delete image
async function deleteUploadedImage(publicId: string) {
  try {
    const result = await deleteImage(publicId);
    
    if (result.success) {
      console.log('Image deleted successfully:', result.message);
    } else {
      console.log('Delete failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
}

// Example 4: Upload with custom folder
async function uploadToCustomFolder(file: File, folderName: string) {
  try {
    const results = await uploadImages([file], folderName);
    const result = results[0];
    
    console.log('Upload to custom folder successful:', {
      url: result.url,
      publicId: result.publicId,
      folder: folderName
    });
    
    return result;
  } catch (error) {
    console.error('Custom folder upload failed:', error);
    throw error;
  }
}

// Example 5: File validation demonstration
function validateFileBeforeUpload(file: File): boolean {
  // Check file type
  if (!CLOUDINARY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    console.error(`Invalid file type: ${file.type}`);
    console.log('Allowed types:', CLOUDINARY_CONFIG.ALLOWED_FILE_TYPES);
    return false;
  }
  
  // Check file size
  if (file.size > CLOUDINARY_CONFIG.MAX_FILE_SIZE) {
    console.error(`File too large: ${file.size} bytes`);
    console.log(`Maximum size: ${CLOUDINARY_CONFIG.MAX_FILE_SIZE_MB}MB`);
    return false;
  }
  
  console.log('File validation passed');
  return true;
}

// Example usage in a React component or API route:
/*
// In a React component:
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  
  const fileArray = Array.from(files);
  
  // Validate files first
  const validFiles = fileArray.filter(validateFileBeforeUpload);
  if (validFiles.length === 0) {
    alert('No valid files selected');
    return;
  }
  
  try {
    const results = await uploadImages(validFiles);
    console.log('Upload results:', results);
    // Handle successful upload
  } catch (error) {
    console.error('Upload error:', error);
    // Handle error
  }
};

// In an API route:
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    
    const results = await uploadImages(files);
    
    return NextResponse.json({
      success: true,
      uploads: results
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
*/

export {
  uploadSingleImage,
  uploadMultipleImages,
  deleteUploadedImage,
  uploadToCustomFolder,
  validateFileBeforeUpload
};
