# Sawariya Novelty - E-commerce Store

A modern e-commerce platform for cosmetics and novelty items built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login system with NextAuth.js
- **Admin Panel**: Full product management system for administrators
- **Product Management**: CRUD operations for products
- **Modern UI**: Beautiful, responsive design with Framer Motion animations
- **Vercel Optimized**: Built specifically for Vercel deployment

## Demo Credentials

### Admin Access
- Email: `admin@sawariya.com`
- Password: `password`

### Regular User
- Email: `user@sawariya.com`
- Password: `password`

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=your-mongodb-connection-string
   ```

3. **Initialize the database** (Optional - will auto-seed on first run)
   ```bash
   npm run init-db
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `NEXTAUTH_SECRET`: Generate a secure random string
     - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
     - `MONGODB_URI`: Your MongoDB Atlas connection string

3. **Deploy**
   Vercel will automatically deploy your application.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Icons**: React Icons (Feather)
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Admin Features

- Dashboard with statistics
- Product management (Add, Edit, Delete)
- User role-based access control
- Responsive admin interface

## Notes

- This application uses MongoDB Atlas for data storage
- The database is automatically seeded with demo data on first run
- The demo credentials are for testing purposes only
- For production, ensure proper security measures for your MongoDB instance
