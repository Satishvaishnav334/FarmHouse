import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Supported file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

// Type definitions
interface UploadResult {
  url: string;
  publicId: string;
}

interface ValidationError {
  type: 'FILE_TYPE' | 'FILE_SIZE' | 'MISSING_FILE';
  message: string;
}

/**
 * Validates a file before upload
 * @param file - The file to validate
 * @returns ValidationError if invalid, null if valid
 */
function validateFile(file: File): ValidationError | null {
  // Check if file exists
  if (!file || !file.type || !file.size) {
    return {
      type: 'MISSING_FILE',
      message: 'No file provided or file is invalid'
    };
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      type: 'FILE_TYPE',
      message: `Invalid file type. Only ${ALLOWED_FILE_TYPES.join(', ')} are allowed.`
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      type: 'FILE_SIZE',
      message: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
    };
  }

  return null;
}

/**
 * Uploads a single file to Cloudinary
 * @param file - The file to upload
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with upload result
 */
async function uploadSingleFile(file: File, folder: string = 'sawariya-novelty/products'): Promise<UploadResult> {
  // Validate file
  const validationError = validateFile(file);
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload to Cloudinary
  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: folder,
        transformation: [
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}

/**
 * Uploads multiple files to Cloudinary
 * @param files - Array of files to upload
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with array of upload results
 */
export async function uploadImages(files: File[], folder?: string): Promise<UploadResult[]> {
  if (!files || files.length === 0) {
    throw new Error('No files provided for upload');
  }

  // Validate all files first
  const validationErrors: string[] = [];
  files.forEach((file, index) => {
    const error = validateFile(file);
    if (error) {
      validationErrors.push(`File ${index + 1}: ${error.message}`);
    }
  });

  if (validationErrors.length > 0) {
    throw new Error(`Validation errors:\n${validationErrors.join('\n')}`);
  }

  // Upload all files
  try {
    const uploadPromises = files.map(file => uploadSingleFile(file, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Deletes an image from Cloudinary using its public ID
 * @param publicId - The public ID of the image to delete
 * @returns Promise with deletion result
 */
export async function deleteImage(publicId: string): Promise<{ success: boolean; message: string }> {
  if (!publicId || typeof publicId !== 'string') {
    throw new Error('Invalid public ID provided');
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return {
        success: true,
        message: 'Image deleted successfully'
      };
    } else if (result.result === 'not found') {
      return {
        success: false,
        message: 'Image not found'
      };
    } else {
      return {
        success: false,
        message: `Deletion failed: ${result.result}`
      };
    }
  } catch (error) {
    throw new Error(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Deletes multiple images from Cloudinary
 * @param publicIds - Array of public IDs to delete
 * @returns Promise with array of deletion results
 */
export async function deleteImages(publicIds: string[]): Promise<{ success: boolean; message: string }[]> {
  if (!publicIds || publicIds.length === 0) {
    throw new Error('No public IDs provided for deletion');
  }

  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error(`Batch delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generates a signed upload URL for client-side uploads
 * @param folder - Optional folder path in Cloudinary
 * @returns Promise with signed upload parameters
 */
export async function generateSignedUploadUrl(folder: string = 'sawariya-novelty/products') {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const params = {
    timestamp,
    folder,
    resource_type: 'image',
    transformation: 'q_auto,f_auto'
  };

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET!);

  return {
    url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    params: {
      ...params,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY
    }
  };
}

// Export constants for use in other files
export const CLOUDINARY_CONFIG = {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB: MAX_FILE_SIZE / (1024 * 1024)
};
