"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from '../favicon.ico'
const navItems = ["Home", "Shop", "About", "Contact"];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex gap-5">
            <Image src={logo} height={35} alt="logo" className="rounded-xl"></Image>
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Sawariya Novelty
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors"
              >
                {item}
              </Link>
              <motion.div
                className="h-[2px] bg-indigo-600 absolute left-0 bottom-[-4px] w-0 group-hover:w-full transition-all duration-300"
                layout
              />
            </motion.div>
          ))}
        </nav>

        {/* Icons + Mobile Toggle */}
        <div className="flex items-center space-x-4 md:space-x-5 text-gray-700 text-xl">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Link href="/cart">
              <FiShoppingCart />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Link href="/account">
              <FiUser />
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md"
          >
            <ul className="flex flex-col space-y-4 py-4 px-6">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 font-medium hover:text-indigo-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
