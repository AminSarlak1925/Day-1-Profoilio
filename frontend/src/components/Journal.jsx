import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const articles = [
  {
    id: 1,
    date: "OCT 12",
    title: "The Silence of Architecture",
    category: "Philosophy",
    src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    date: "SEP 28",
    title: "Digital Brutalism",
    category: "Design Trend",
    src: "https://images.unsplash.com/photo-1518005052357-e98719a29e66?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    date: "AUG 15",
    title: "Typography as Voice",
    category: "Typography",
    src: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    date: "JUL 09",
    title: "Monochrome Ethics",
    category: "Essay",
    src: "https://images.unsplash.com/photo-1505544747201-9293153b925c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    date: "JUN 22",
    title: "Designing for Void",
    category: "Spatial",
    src: "https://images.unsplash.com/photo-1465409042654-5314e9d17fa4?q=80&w=1200&auto=format&fit=crop",
  },
];

const Journal = () => {
  return (
    <section
      id="journal"
      className="relative bg-[#0f0f0f] py-32 px-6 md:px-12 min-h-screen border-t border-white/5"
    >
      {/* --- SECTION HEADER --- */}
      <div className="max-w-[1400px] mx-auto mb-24 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-6 pl-1">
            The Journal
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif text-slate-200">
            Thought <span className="italic text-slate-600">&</span> Process
          </h3>
        </div>
        <div className="hidden md:block">
          <button className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white">
            View Archive
          </button>
        </div>
      </div>

      {/* --- ARTICLE LIST --- */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        {articles.map((article) => (
          <JournalRow key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

// --- ROW COMPONENT WITH INTERNAL IMAGE REVEAL ---
const JournalRow = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout // <--- THIS MAGIC PROP MAKES SIBLINGS SLIDE SMOOTHLY
      className="border-t border-white/10 hover:border-white/30 transition-colors duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* TEXT ROW */}
      <motion.div
        layout="position"
        className="flex flex-col md:flex-row items-baseline md:items-center py-8 cursor-pointer group"
      >
        {/* DATE */}
        <div className="w-32 text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors duration-300 mb-2 md:mb-0">
          {article.date}
        </div>

        {/* TITLE */}
        <div className="flex-1">
          <h4 className="text-3xl md:text-5xl font-serif text-slate-300 group-hover:text-white transition-colors duration-500">
            {article.title}
          </h4>
        </div>

        {/* CATEGORY */}
        <div className="w-48 text-right hidden md:block">
          <span className="text-[10px] uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full text-slate-500 group-hover:border-white/30 group-hover:text-slate-300 transition-all duration-300">
            {article.category}
          </span>
        </div>
      </motion.div>

      {/* EXPANDING IMAGE BOX */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "400px", opacity: 1 }} // Adjust height as preferred
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // "Cinematic" easing
            className="w-full relative overflow-hidden bg-slate-900/50"
          >
            {/* THE IMAGE */}
            <motion.img
              src={article.src}
              alt={article.title}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover grayscale-[30%] contrast-125 opacity-80"
            />

            {/* DECORATIVE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-80" />

            {/* OPTIONAL CAPTION INSIDE THE IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-8 md:left-32 text-slate-300 max-w-lg"
            >
              <p className="font-light text-lg">
                Read the full case study regarding {article.title.toLowerCase()}
                .
              </p>
              <div className="mt-4 flex gap-2 items-center text-xs uppercase tracking-widest text-white">
                <span>Read Article</span>
                <span>→</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Journal;
