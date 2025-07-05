"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiArrowLeft
} from "react-icons/fi";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Luxury Lipstick Collection",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/100/100",
    quantity: 2,
    category: "cosmetics"
  },
  {
    id: 2,
    name: "Glitter Nail Art Set",
    price: 199,
    originalPrice: 249,
    image: "/api/placeholder/100/100",
    quantity: 1,
    category: "novelty"
  },
  {
    id: 3,
    name: "Face Serum Premium",
    price: 599,
    originalPrice: 799,
    image: "/api/placeholder/100/100",
    quantity: 1,
    category: "skincare"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const applyPromoCode = () => {
    alert("Promo code applied!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <FiShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/shop"
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <FiShoppingBag />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Cart Header */}
        <div className="mb-10">
          <Link href="/shop" className="text-purple-600 hover:text-purple-700 inline-flex items-center gap-2 mb-4">
            <FiArrowLeft />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center rounded-lg">
                  <span className="text-sm text-gray-500">Image</span>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600 font-bold text-lg">₹{item.price}</span>
                    <span className="line-through text-sm text-gray-400">₹{item.originalPrice}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-3 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <FiPlus />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm sticky top-24 h-fit"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>

            {/* Promo Input */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={applyPromoCode}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>You Save</span>
                <span>-₹{savings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-purple-600">₹{total}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-yellow-50 p-3 rounded text-sm mb-4 text-yellow-700 border border-yellow-200">
                Add ₹{500 - subtotal} more to get free shipping!
              </div>
            )}

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Proceed to Checkout
            </button>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiShield className="text-green-500" />
                Secure checkout
              </div>
              <div className="flex items-center gap-2">
                <FiTruck className="text-blue-500" />
                Free shipping over ₹500
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
