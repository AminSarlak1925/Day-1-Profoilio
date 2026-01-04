import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MenuOverlay from "./MenuOverlay";
import navIconImg from "../assets/light.png"; // Importing your icon back

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FIXED NAVBAR */}
      {/* 'justify-between' puts space between the Left Icon and the Right Button */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference text-slate-200 pointer-events-none">
        {/* --- LEFT: BRAND ICON --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-auto cursor-pointer"
        >
          <img
            src={navIconImg}
            alt="Brand Logo"
            className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] hover:opacity-100 opacity-80 transition-opacity duration-300"
          />
        </motion.div>

        {/* --- CENTER: MENU TRIGGER --- */}
        {/* Absolute positioning keeps this perfectly centered regardless of the other elements */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-1/2 top-8 -translate-x-1/2 pointer-events-auto cursor-pointer group p-2"
        >
          {/* The Glow Effect */}
          <div
            className={`absolute inset-0 bg-white blur-xl transition-all duration-500 rounded-full 
            ${
              isOpen
                ? "opacity-40 scale-150"
                : "opacity-0 group-hover:opacity-30"
            }`}
          />

          {/* Icon Rotation */}
          <div
            className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          {/* Hover Label */}
          <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light whitespace-nowrap">
            {isOpen ? "Close" : "Menu"}
          </span>
        </motion.div>

        {/* --- RIGHT: ACTION BUTTON --- */}
        <div className="pointer-events-auto hidden md:block">
          <button className="text-[10px] uppercase tracking-[0.2em] border border-slate-500/50 px-6 py-3 rounded-full hover:bg-slate-200 hover:text-black transition-all duration-500 font-light backdrop-blur-sm">
            Let's Talk
          </button>
        </div>
      </nav>

      {/* THE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && <MenuOverlay setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
