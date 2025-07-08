# Product Images Migration

This migration script moves existing `image` field values into the new `images` array field for all products.

## What it does

1. Finds all products that have an `image` field but no `images` array
2. Creates an `images` array with the existing `image` value as the first element
3. Keeps the original `image` field for backward compatibility

## How to run

```bash
node scripts/migrate-product-images.js
```

## Prerequisites

- Node.js installed
- MongoDB connection available
- The script uses the same MongoDB connection string as other migration scripts

## Safety

- The script only adds the `images` field; it doesn't remove or modify the existing `image` field
- Products that already have an `images` field are skipped
- The migration is idempotent - safe to run multiple times

## Schema Changes

The Product schema now includes:

- `images`: Array of 1-5 image URLs with validation
- `image`: String field kept for backward compatibility

## URL Validation

The new `images` field validates that each URL:
- Starts with `http://`, `https://`, or `/`
- Follows proper URL format
- Array must contain 1-5 images

## Default Values

- New products get `images: ['/api/placeholder/300/300']` by default
- Existing products without images get the same placeholder
