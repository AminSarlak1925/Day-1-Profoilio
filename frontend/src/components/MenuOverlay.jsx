import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MenuOverlay = ({ setIsOpen }) => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const links = [
    {
      title: "Works",
      id: "works",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Studio",
      id: "studio",
      src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Journal",
      id: "journal",
      src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Contact",
      id: "contact",
      src: "https://images.unsplash.com/photo-1505544747201-9293153b925c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 800); // Wait for exit animation
  };

  const menuVariants = {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-40 bg-[#0f0f0f] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* BACKGROUND IMAGE REVEAL */}
      <div className="absolute inset-0 opacity-20 pointer-events-none filter grayscale contrast-125 transition-opacity duration-500">
        <AnimatePresence mode="wait">
          {hoveredImage && (
            <motion.img
              key={hoveredImage}
              src={hoveredImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* MENU LINKS */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-8 mix-blend-difference">
        {links.map((link, i) => (
          <div
            key={i}
            className="group relative overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredImage(link.src)}
            onMouseLeave={() => setHoveredImage(null)}
            onClick={() => handleLinkClick(link.id)}
          >
            <motion.h2
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="text-6xl md:text-6xl font-serif text-slate-400 group-hover:text-white transition-colors duration-500 italic"
            >
              {link.title}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* FOOTER INFO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="absolute bottom-12 w-full px-12 flex justify-between text-xs uppercase tracking-widest text-slate-500 mix-blend-difference"
      >
        <span>Vaasa, Finland</span>
        <span>Est. 2026</span>
      </motion.div>
    </motion.div>
  );
};

export default MenuOverlay;
