import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useAnimation,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down 100px
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 mix-blend-difference"
        >
          <button
            onClick={scrollToTop}
            className="relative group w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-transparent hover:bg-white transition-colors duration-500"
          >
            {/* PROGRESS CIRCLE */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 100 100"
            >
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-700 opacity-20"
              />
              {/* Animated Progress Line */}
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white group-hover:text-black transition-colors duration-500"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>

            {/* ARROW ICON */}
            <ArrowUp
              size={20}
              className="text-slate-200 group-hover:text-black transition-colors duration-500 group-hover:-translate-y-1 transition-transform"
            />

            {/* Optional Glow on Hover */}
            <div className="absolute inset-0 rounded-full blur-md bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
