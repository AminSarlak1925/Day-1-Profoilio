import React from "react";
import { motion } from "framer-motion";

const MenuOverlay = ({ setIsOpen }) => {
  const links = [
    { title: "Works", subtitle: "Selected Projects", id: "works" }, // Linked to ID
    { title: "Studio", subtitle: "Our Philosophy", id: "studio" },
    { title: "Journal", subtitle: "Thoughts & News", id: "journal" },
    { title: "Contact", subtitle: "Get in touch", id: "contact" },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false); // Close menu
    if (id) {
      // Small timeout to allow menu to close before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const menuVariants = {
    initial: { opacity: 0, y: "-100%" },
    animate: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVars = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-40 bg-[#121212] text-slate-200 flex flex-col md:flex-row"
    >
      {/* Decorative Noise Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- COLUMN 1: NAVIGATION --- */}
      <motion.div
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="flex-1 flex flex-col justify-center items-start md:items-center px-12 md:px-0 py-20"
      >
        <div className="space-y-8 md:space-y-12">
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden group relative">
              <motion.div
                variants={itemVars}
                className="flex items-start gap-6 cursor-pointer"
                onClick={() => handleLinkClick(link.id)}
              >
                {/* SIZE ADJUSTED: 
                   text-3xl (Mobile) -> Big enough to tap, small enough to fit.
                   text-5xl (Desktop) -> Elegant editorial size.
                */}
                <h2 className="text-3xl md:text-5xl font-serif text-slate-400 group-hover:text-white transition-colors duration-500 leading-none">
                  {link.title}
                </h2>

                {/* Number Indicator */}
                <span className="text-xs font-light uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors duration-500 mt-1.5">
                  0{i + 1}
                </span>
              </motion.div>

              {/* Optional: Subtitle Reveal on Hover (Desktop) */}
              <div className="hidden md:block h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-out">
                <p className="text-sm text-slate-600 font-light tracking-wider mt-2 pl-1">
                  {link.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- COLUMN 2: INFO --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.7, duration: 1 } }}
        className="p-12 md:p-24 flex flex-col justify-end md:items-end border-t md:border-t-0 md:border-l border-white/5 bg-white/[0.01]"
      >
        <div className="space-y-12 text-left md:text-right">
          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500 mb-4 font-medium">
              Location
            </h3>
            <p className="font-serif text-xl text-slate-300 leading-relaxed">
              Vaasa, Finland
              <br />
              Ostrobothnia
            </p>
          </div>
          <div>
            <h3 className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500 mb-4 font-medium">
              Socials
            </h3>
            <div className="flex gap-6 md:justify-end text-slate-400 text-sm font-light tracking-wider">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 pb-1 border-b border-transparent hover:border-white/30"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 pb-1 border-b border-transparent hover:border-white/30"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuOverlay;
