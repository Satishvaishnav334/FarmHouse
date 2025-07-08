"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiTruck, FiPhone, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Thank you for your order. We ve received your order and will process it soon.
          </motion.p>

          {/* Order Number */}
          {orderNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6"
            >
              <h2 className="text-lg font-semibold text-purple-900 mb-2">Order Number</h2>
              <p className="text-2xl font-bold text-purple-600">{orderNumber}</p>
              <p className="text-sm text-purple-700 mt-1">
                Save this number for tracking your order
              </p>
            </motion.div>
          )}

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiTruck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
              <p className="text-sm text-gray-600">Pay when you receive</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiPhone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Order Updates</h3>
              <p className="text-sm text-gray-600">Via SMS & Email</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <FiMail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Support</h3>
              <p className="text-sm text-gray-600">24/7 Customer Care</p>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-left bg-gray-50 rounded-lg p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>We ll confirm your order and prepare it for delivery</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>You ll receive SMS/Email updates about your order status</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Our delivery partner will contact you before delivery</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Pay cash when you receive your order</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/account"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/shop"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600">
              Need help? Contact us at{' '}
              <a href="mailto:support@sawariyanovelty.com" className="text-purple-600 hover:underline">
                support@sawariyanovelty.com
              </a>{' '}
              or call{' '}
              <a href="tel:+911234567890" className="text-purple-600 hover:underline">
                +91 12345 67890
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
