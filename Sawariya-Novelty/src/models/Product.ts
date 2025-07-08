import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['cosmetics', 'novelty', 'skincare', 'accessories'],
  },
  images: {
    type: [String],
    validate: [
      {
        validator: function(arr) {
          return arr.length >= 1 && arr.length <= 5;
        },
        message: '1-5 images required'
      },
      {
        validator: function(arr) {
          const urlRegex = /^(https?:\/\/|\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
          return arr.every(url => urlRegex.test(url));
        },
        message: 'All images must be valid URLs'
      }
    ],
    default: ['/api/placeholder/300/300'],
  },
  image: {
    type: String,
    default: '/api/placeholder/300/300',
  }, // keep for backward compatibility
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
  },
  badge: {
    type: String,
    trim: true,
    maxlength: [20, 'Badge cannot exceed 20 characters'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
