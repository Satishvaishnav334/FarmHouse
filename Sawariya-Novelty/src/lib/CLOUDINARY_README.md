# Cloudinary Utility Implementation

This document describes the implementation of Cloudinary utility helpers for the Sawariya Novelty project.

## Files Created

### 1. `src/lib/cloudinary.ts`
Main utility file containing:
- **`uploadImages(files: File[], folder?: string)`**: Uploads multiple images to Cloudinary
- **`deleteImage(publicId: string)`**: Deletes a single image from Cloudinary
- **`deleteImages(publicIds: string[])`**: Deletes multiple images from Cloudinary
- **`generateSignedUploadUrl(folder?: string)`**: Generates signed URLs for client-side uploads

### 2. `src/lib/cloudinary.example.ts`
Example usage file with practical implementations

### 3. `src/app/api/upload/route.ts`
Updated API route using the Cloudinary utility

### 4. `src/app/api/upload/delete/route.ts`
New API route for deleting images

### 5. `.env.example`
Environment variables template

## Features Implemented

✅ **File Type Validation**: Enforces `jpeg|png|webp|gif` file types only  
✅ **File Size Validation**: Enforces maximum file size of 3MB  
✅ **Signed Upload**: Secure uploads using Cloudinary's signed upload API  
✅ **Secure Deletion**: Secure deletion using public ID  
✅ **Multiple File Support**: Batch upload and delete operations  
✅ **Error Handling**: Comprehensive error handling with descriptive messages  
✅ **TypeScript Support**: Full TypeScript definitions and type safety  
✅ **Automatic Optimization**: Images are automatically optimized with quality and format settings

## Environment Variables Required

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Usage Examples

### Basic Upload
```typescript
import { uploadImages } from '@/lib/cloudinary';

const files: File[] = [/* your files */];
const results = await uploadImages(files);
// Returns: [{ url: string, publicId: string }]
```

### Basic Delete
```typescript
import { deleteImage } from '@/lib/cloudinary';

const result = await deleteImage('your-public-id');
// Returns: { success: boolean, message: string }
```

### API Route Usage
```typescript
// Upload
const formData = new FormData();
formData.append('file', file);
const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

// Delete
const response = await fetch('/api/upload/delete?publicId=your-public-id', {
  method: 'DELETE'
});
```

## Configuration

### File Restrictions
- **Allowed Types**: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- **Maximum Size**: 3MB (3,145,728 bytes)
- **Default Folder**: `sawariya-novelty/products`

### Cloudinary Settings
- **Quality**: Auto-optimization enabled
- **Format**: Auto-format selection
- **Resource Type**: Image only
- **Secure URLs**: All uploads return HTTPS URLs

## Error Handling

The utility provides comprehensive error handling for:
- Invalid file types
- File size exceeded
- Missing files
- Cloudinary API errors
- Network errors
- Invalid public IDs

## Security Features

1. **File Type Validation**: Prevents upload of non-image files
2. **File Size Limits**: Prevents large file uploads
3. **Signed Uploads**: Uses Cloudinary's signed upload API
4. **Admin Authorization**: API routes require admin authentication
5. **Secure Deletion**: Uses public ID verification

## Performance Optimizations

1. **Automatic Quality Optimization**: Images are automatically optimized
2. **Format Selection**: Best format is automatically selected
3. **Batch Operations**: Multiple files can be uploaded/deleted in parallel
4. **Buffer Processing**: Efficient file processing using Node.js buffers

## Dependencies

- `cloudinary`: ^1.40.0 (installed)
- `@types/node`: For TypeScript support

## Testing

The implementation includes:
- TypeScript compilation validation
- Working API routes
- Example usage files
- Comprehensive error handling

## Future Enhancements

Potential improvements that could be added:
1. Image transformation options (resize, crop, etc.)
2. Upload progress tracking
3. Image metadata extraction
4. Thumbnail generation
5. CDN optimization settings
6. Upload presets for different use cases
