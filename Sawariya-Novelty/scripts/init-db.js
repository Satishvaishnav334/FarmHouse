const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://SawariyaNovelty:Vikram334@sawariyanovelty.631oh8e.mongodb.net/?retryWrites=true&w=majority&appName=SawariyaNovelty";

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  phoneVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true, enum: ['cosmetics', 'novelty', 'skincare', 'accessories'] },
  image: { type: String, default: '/api/placeholder/300/300' },
  rating: { type: Number, default: 0 },
  badge: { type: String },
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

async function initializeDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      ssl: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    // Check if users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Creating demo users...');
      const hashedPassword = await bcrypt.hash('password', 12);
      
      await User.insertMany([
        {
          email: 'admin@sawariya.com',
          password: hashedPassword,
          name: 'Admin User',
          phone: '1234567890',
          phoneVerified: true,
          role: 'admin',
        },
        {
          email: 'user@sawariya.com',
          password: hashedPassword,
          name: 'Regular User',
          phone: '9876543210',
          phoneVerified: true,
          role: 'user',
        }
      ]);
      console.log('Demo users created');
    } else {
      console.log('Users already exist');
    }

    // Check if products exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Creating demo products...');
      await Product.insertMany([
        {
          name: "Luxury Lipstick Collection",
          price: 299,
          originalPrice: 399,
          description: "Premium lipstick collection with long-lasting formula",
          category: "cosmetics",
          rating: 4.8,
          badge: "Bestseller",
          inStock: true,
          stock: 50,
        },
        {
          name: "Glitter Nail Art Set",
          price: 199,
          originalPrice: 249,
          description: "Complete nail art set with glitter and accessories",
          category: "novelty",
          rating: 4.6,
          badge: "New",
          inStock: true,
          stock: 30,
        },
        {
          name: "Face Serum Premium",
          price: 599,
          originalPrice: 799,
          description: "Anti-aging face serum with natural ingredients",
          category: "cosmetics",
          rating: 4.9,
          badge: "Sale",
          inStock: true,
          stock: 25,
        },
        {
          name: "LED Makeup Mirror",
          price: 899,
          originalPrice: 1199,
          description: "Professional LED makeup mirror with adjustable lighting",
          category: "novelty",
          rating: 4.7,
          badge: "Hot",
          inStock: true,
          stock: 15,
        }
      ]);
      console.log('Demo products created');
    } else {
      console.log('Products already exist');
    }

    console.log('Database initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
