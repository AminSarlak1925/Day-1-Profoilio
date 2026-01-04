import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

const philosophy = [
  {
    id: 1,
    title: "Reduction",
    subtitle: "The Art of Less",
    text: "We strip away the non-essential. In a world of infinite noise, we design silence. Every pixel exists for a specific purpose, or it is removed entirely.",
    images: {
      main: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1000&auto=format&fit=crop", // Architectural
      detail:
        "https://images.unsplash.com/photo-1506720199538-4b712c9a9d7b?q=80&w=800&auto=format&fit=crop", // Texture
      abstract:
        "https://plus.unsplash.com/premium_photo-1675802562557-4a004b32b918?q=80&w=800&auto=format&fit=crop", // Abstract
    },
  },
  {
    id: 2,
    title: "Timelessness",
    subtitle: "Beyond Trends",
    text: "Trends are temporary. We build digital structures designed to last. Grounded in grid systems, Swiss typography, and mathematical precision that defies time.",
    images: {
      main: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=1000&auto=format&fit=crop", // Stone
      detail:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // Light/Shadow
      abstract:
        "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=800&auto=format&fit=crop", // Geometry
    },
  },
  {
    id: 3,
    title: "Immersion",
    subtitle: "Digital Depth",
    text: "A website should not be viewed; it should be felt. We create atmospheric depth through motion, grain, and fluidity. A complete sensory experience.",
    images: {
      main: "https://images.unsplash.com/photo-1617170321151-244498328c7d?q=80&w=1000&auto=format&fit=crop", // Fluid
      detail:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Abstract Fluid
      abstract:
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Light
    },
  },
];

const Studio = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="studio"
      className="relative bg-[#080808] min-h-screen py-32 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* --- LEFT COLUMN: DYNAMIC COLLAGE (Sticky) --- */}
        <div className="hidden lg:block h-[120vh] -mt-20 sticky top-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="relative w-full h-[80vh] flex items-center justify-center perspective-1000"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 1. ABSTRACT LAYER (Background Shape) */}
              <motion.div
                initial={{ x: -100, opacity: 0, rotate: -10 }}
                animate={{ x: 0, opacity: 0.4, rotate: 0 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-[10%] top-[10%] w-[25vw] h-[35vw] bg-cover bg-center grayscale mix-blend-soft-light z-0"
                style={{
                  backgroundImage: `url(${philosophy[activeTab].images.abstract})`,
                }}
              />

              {/* 2. MAIN IMAGE (Center Focus) */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-[30vw] h-[40vw] overflow-hidden shadow-2xl z-10"
              >
                <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply z-10" />
                <img
                  src={philosophy[activeTab].images.main}
                  alt="Main"
                  className="w-full h-full object-cover grayscale-[20%] contrast-110"
                />
                {/* Thin border detail */}
                <div className="absolute inset-2 border border-white/20 z-20" />
              </motion.div>

              {/* 3. DETAIL IMAGE (Foreground Floating) */}
              <motion.div
                initial={{ x: 100, opacity: 0, y: 100 }}
                animate={{ x: 40, opacity: 1, y: 80 }}
                exit={{ x: 150, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute right-[10%] bottom-[15%] w-[12vw] h-[15vw] z-20 shadow-xl"
              >
                <img
                  src={philosophy[activeTab].images.detail}
                  alt="Detail"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </motion.div>

              {/* DECORATIVE ELEMENTS */}
              <div className="absolute inset-0 z-30 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- RIGHT COLUMN: EDITORIAL TEXT --- */}
        <div className="flex flex-col py-20 gap-40 lg:gap-[60vh] relative z-10">
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-8 border-l-2 border-white/20 pl-4"
            >
              Studio Manifesto
            </motion.h2>
          </div>

          {philosophy.map((item, index) => (
            <PhilosophyBlock
              key={item.id}
              item={item}
              index={index}
              setActiveTab={setActiveTab}
            />
          ))}

          {/* Spacer for bottom */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </section>
  );
};

// --- SCROLL TRIGGER BLOCK ---
const PhilosophyBlock = ({ item, index, setActiveTab }) => {
  const ref = useRef(null);
  // Margin adjusts when the "active" switch happens.
  // "-50% 0px -50% 0px" means "Trigger when the element is in the exact center of the viewport"
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveTab(index);
    }
  }, [isInView, index, setActiveTab]);

  return (
    <motion.div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView
          ? "opacity-100 translate-x-0"
          : "opacity-20 translate-x-4 grayscale"
      }`}
    >
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-sm font-mono text-slate-500">0{item.id}</span>
        <div className="h-[1px] w-12 bg-slate-700" />
        <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
          {item.subtitle}
        </span>
      </div>

      <h3 className="text-6xl md:text-8xl font-serif text-slate-200 mb-10 leading-[0.9]">
        {/* Visual split for the title */}
        {item.title.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block hover:text-white transition-colors duration-300"
          >
            {char}
          </span>
        ))}
      </h3>

      <p className="text-xl md:text-2xl font-light text-slate-400 leading-relaxed max-w-lg">
        {item.text}
      </p>
    </motion.div>
  );
};

export default Studio;
