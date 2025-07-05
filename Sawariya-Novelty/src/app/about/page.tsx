"use client";

import { motion } from "framer-motion";
import { FiAward, FiUsers, FiShield, FiHeart } from "react-icons/fi";

const stats = [
  { icon: FiUsers, number: "10K+", label: "Happy Customers" },
  { icon: FiAward, number: "500+", label: "Products" },
  { icon: FiShield, number: "100%", label: "Authentic" },
  { icon: FiHeart, number: "5+", label: "Years Experience" },
];

const values = [
  {
    title: "Quality First",
    description:
      "We source only the finest cosmetics and novelty items from trusted suppliers worldwide.",
    icon: FiAward,
  },
  {
    title: "Customer Satisfaction",
    description:
      "Your happiness is our priority. We ensure every purchase exceeds your expectations.",
    icon: FiHeart,
  },
  {
    title: "Authenticity Guaranteed",
    description:
      "All our products are 100% authentic with proper certifications and quality assurance.",
    icon: FiShield,
  },
  {
    title: "Community Focus",
    description:
      "We believe in building a community of beauty enthusiasts and novelty collectors.",
    icon: FiUsers,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About Sawariya Novelty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Your trusted destination for premium cosmetics and unique novelty
            items. We&rsquo;re passionate about bringing you the latest trends
            and timeless classics.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                Founded in 2019, Sawariya Novelty started as a small passion
                project by Vikram Vaishnav. What began as a love for unique
                beauty products and novelty items has grown into a trusted
                online destination for customers across India.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that everyone deserves access to high-quality
                cosmetics and fun novelty items that express their personality.
                Our carefully curated collection features both international
                brands and local favorites, ensuring there&rsquo;s something
                special for everyone.
              </p>
              <p className="text-gray-600">
                Today, we&rsquo;re proud to serve thousands of happy customers
                and continue to expand our collection with the latest trends and
                timeless classics in beauty and novelty items.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-600 text-lg">Company Image</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us serve our
              customers better every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <value.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed">
              To democratize access to high-quality cosmetics and unique novelty
              items while building a community where everyone can express their
              individuality and feel confident in their choices. We strive to
              make beauty and self-expression accessible, affordable, and
              enjoyable for all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Founder
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individual behind Sawariya Novelty&rsquo;s success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto bg-gray-50 rounded-lg p-8 text-center"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-gray-600">Photo</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Vikram Vaishnav
            </h3>
            <p className="text-purple-600 font-semibold mb-4">Founder & CEO</p>
            <p className="text-gray-600">
              Passionate about beauty and innovation, Vikram founded Sawariya
              Novelty with a vision to make quality cosmetics and unique novelty
              items accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
