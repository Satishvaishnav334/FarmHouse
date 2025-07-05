"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Luxury Lipstick Collection",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/300",
    rating: 4.8,
    category: "cosmetics",
    badge: "Bestseller",
    description: "Premium quality lipstick collection with 12 vibrant shades",
  },
  {
    id: 2,
    name: "Glitter Nail Art Set",
    price: 199,
    originalPrice: 249,
    image: "/api/placeholder/300/300",
    rating: 4.6,
    category: "novelty",
    badge: "New",
    description: "Complete nail art set with glitters and tools",
  },
  {
    id: 3,
    name: "Face Serum Premium",
    price: 599,
    originalPrice: 799,
    image: "/api/placeholder/300/300",
    rating: 4.9,
    category: "skincare",
    badge: "Sale",
    description: "Anti-aging serum with hyaluronic acid and vitamin C",
  },
  {
    id: 4,
    name: "LED Makeup Mirror",
    price: 899,
    originalPrice: 1199,
    image: "/api/placeholder/300/300",
    rating: 4.7,
    category: "accessories",
    badge: "Hot",
    description: "Professional LED makeup mirror with adjustable brightness",
  },
  {
    id: 5,
    name: "Eyeshadow Palette",
    price: 349,
    originalPrice: 449,
    image: "/api/placeholder/300/300",
    rating: 4.5,
    category: "cosmetics",
    badge: "",
    description: "18-color eyeshadow palette with shimmer and matte finishes",
  },
  {
    id: 6,
    name: "Cute Phone Case",
    price: 149,
    originalPrice: 199,
    image: "/api/placeholder/300/300",
    rating: 4.3,
    category: "novelty",
    badge: "New",
    description: "Adorable phone case with cartoon characters",
  },
  {
    id: 7,
    name: "Moisturizer Cream",
    price: 399,
    originalPrice: 499,
    image: "/api/placeholder/300/300",
    rating: 4.6,
    category: "skincare",
    badge: "",
    description: "Hydrating moisturizer for all skin types",
  },
  {
    id: 8,
    name: "Makeup Brush Set",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/300",
    rating: 4.8,
    category: "accessories",
    badge: "Bestseller",
    description: "Professional makeup brush set with 12 brushes",
  },
];

const categories = ["all", "cosmetics", "novelty", "skincare", "accessories"];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop</h1>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <FiList />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FiFilter />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48" : ""}`}>
                    <div
                      className={`bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center ${
                        viewMode === "list" ? "h-48" : "h-48"
                      }`}
                    >
                      <span className="text-gray-500">Product Image</span>
                    </div>
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400 mr-2">
                        <FiStar className="fill-current" />
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-purple-600">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      <button className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                        <FiShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
