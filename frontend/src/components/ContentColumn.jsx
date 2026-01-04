import React from 'react';
import { motion } from 'framer-motion';

const ContentColumn = ({ scrollYProgress, setVariant, ySlow, yFast }) => {
  
  // Helper for interactive text
  const InteractiveSpan = ({ variant, children }) => (
    <span 
      onMouseEnter={() => setVariant(variant)}
      onMouseLeave={() => setVariant("default")}
      className="cursor-pointer border-b border-transparent hover:border-white transition-all duration-300 text-slate-100 hover:text-white"
    >
      {children}
    </span>
  );

  return (
    <div className="px-8 pt-40 pb-20 lg:px-24 flex flex-col justify-center relative z-10">
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-serif text-5xl lg:text-8xl mb-12 leading-tight text-[#e2e8f0]"
      >
        The <br />
        <span className="italic text-slate-400">Monolith.</span>
      </motion.h1>

      <motion.div style={{ y: ySlow }} className="max-w-md space-y-8">
        <h2 className="text-xs tracking-[0.3em] uppercase text-slate-500 border-b border-slate-700 pb-4">
          Architecture & Design
        </h2>
        <p className="font-light text-slate-300 text-lg leading-relaxed">
          We build <InteractiveSpan variant="sanctuary">digital sanctuaries</InteractiveSpan>. 
          Stripping away the non-essential to reveal the <InteractiveSpan variant="structure">absolute structure</InteractiveSpan> of your brand.
        </p>
      </motion.div>

      <motion.div style={{ y: yFast }} className="mt-24 max-w-sm ml-auto lg:mr-12">
        <p className="font-serif italic text-2xl text-slate-400 mb-4">
          "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
        </p>
        <p className="text-xs uppercase tracking-widest text-slate-600">— Antoine de Saint-Exupéry</p>
      </motion.div>
    </div>
  );
};

export default ContentColumn;