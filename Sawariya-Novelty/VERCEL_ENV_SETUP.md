# Vercel Dashboard Environment Variables Setup

## Required Environment Variables

Add these environment variables to your Vercel project dashboard:

### 1. MongoDB Configuration
- **Name:** `MONGODB_URI`
- **Value:** `mongodb+srv://SawariyaNovelty:Vikram334@sawariyanovelty.631oh8e.mongodb.net/?retryWrites=true&w=majority&appName=SawariyaNovelty`

### 2. NextAuth Configuration
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `your-secret-key-here-replace-in-production` (⚠️ **IMPORTANT:** Generate a strong secret for production)
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://your-domain.vercel.app` (Replace with your actual domain)

### 3. Cloudinary Configuration
- **Name:** `CLOUDINARY_URL`
- **Value:** `cloudinary://your_api_key:your_api_secret@your_cloud_name`
- **Name:** `CLOUDINARY_CLOUD_NAME`
- **Value:** `your_cloud_name`
- **Name:** `CLOUDINARY_API_KEY`
- **Value:** `your_api_key`
- **Name:** `CLOUDINARY_API_SECRET`
- **Value:** `your_api_secret`

## How to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable with the corresponding value
4. Set the environment scope (Production, Preview, Development)
5. Save the configuration

## Security Notes:
- ⚠️ **Replace placeholder values** with your actual credentials
- 🔒 **Never commit sensitive credentials** to your repository
- 🔑 **Generate a strong NEXTAUTH_SECRET** for production (use `openssl rand -base64 32`)
- 🌐 **Update NEXTAUTH_URL** to match your production domain

## Cloudinary Setup:
1. Create a Cloudinary account at https://cloudinary.com
2. Get your credentials from the Cloudinary dashboard
3. Replace the placeholder values in the environment variables
