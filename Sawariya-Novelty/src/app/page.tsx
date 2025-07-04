"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiShoppingCart, FiStar, FiTruck, FiShield, FiHeadphones } from "react-icons/fi";

const featuredProducts = [
  {
    id: 1,
    name: "Luxury Lipstick Collection",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/300",
    rating: 4.8,
    category: "cosmetics",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Glitter Nail Art Set",
    price: 199,
    originalPrice: 249,
    image: "/api/placeholder/300/300",
    rating: 4.6,
    category: "novelty",
    badge: "New"
  },
  {
    id: 3,
    name: "Face Serum Premium",
    price: 599,
    originalPrice: 799,
    image: "/api/placeholder/300/300",
    rating: 4.9,
    category: "cosmetics",
    badge: "Sale"
  },
  {
    id: 4,
    name: "LED Makeup Mirror",
    price: 899,
    originalPrice: 1199,
    image: "/api/placeholder/300/300",
    rating: 4.7,
    category: "novelty",
    badge: "Hot"
  }
];

const categories = [
  { name: "Cosmetics", image: "/api/placeholder/200/200", href: "/shop/cosmetics" },
  { name: "Novelty Items", image: "/api/placeholder/200/200", href: "/shop/novelty" },
  { name: "Skincare", image: "/api/placeholder/200/200", href: "/shop/skincare" },
  { name: "Accessories", image: "/api/placeholder/200/200", href: "/shop/accessories" }
];

const features = [
  { icon: FiTruck, title: "Free Shipping", description: "On orders over ₹500" },
  { icon: FiShield, title: "Quality Guarantee", description: "100% authentic products" },
  { icon: FiHeadphones, title: "24/7 Support", description: "Customer service" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Beauty & Novelty Store
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover premium cosmetics and unique novelty items at unbeatable prices
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/shop" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={category.href} className="block">
                  <div className="h-40 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">{category.name}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-center">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {product.badge}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-400 mr-2">
                      <FiStar className="fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                    <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                      <FiShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Subscribe to get special offers and new arrivals</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-r-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
