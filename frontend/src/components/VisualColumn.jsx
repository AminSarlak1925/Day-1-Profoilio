import React from "react";
import { motion } from "framer-motion";
// Ensure this path matches your file structure
import heroImg from "../assets/002.png";

const VisualColumn = ({ activeVariant }) => {
  const imageVariants = {
    default: {
      filter: "grayscale(100%) contrast(100%) brightness(0.8)",
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    sanctuary: {
      filter: "grayscale(20%) contrast(110%) brightness(1.1) sepia(0.2)",
      scale: 1.05,
      transition: { duration: 0.5 },
    },
    structure: {
      filter: "grayscale(100%) contrast(150%) brightness(0.9)",
      scale: 1.02,
      transition: { duration: 0.4 },
    },
  };

  return (
    // Change h-[50vh] to h-[60vh] or h-[70vh] on mobile for more impact if desired
    <div className="h-[60vh] lg:h-screen sticky top-0 right-0 overflow-hidden bg-black">
      <div className="absolute inset-0 z-20 bg-slate-900/30 mix-blend-multiply pointer-events-none" />

      <motion.img
        variants={imageVariants}
        animate={activeVariant}
        initial="default"
        src={heroImg}
        alt="Luxury Suit"
        // --- THE FIX: Added 'object-top' ---
        className="w-full h-full object-cover object-top"
      />

      <div className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent z-30" />
    </div>
  );
};

export default VisualColumn;
