import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Onyx Interface",
    category: "Fintech App",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Aether Sanctuary",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Midnight Vogue",
    category: "Editorial",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Silent Motor",
    category: "Automotive",
    src: "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=1000&auto=format&fit=crop",
  },
];

const Works = () => {
  const containerRef = useRef(null);

  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // --- DRAMATIC PARALLAX SETTINGS ---
  // The left column moves UP much faster (-600px)
  // The right column moves DOWN (+200px)
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative z-20 bg-[#0f0f0f] py-32 px-4 md:px-12 min-h-[150vh] overflow-hidden"
    >
      {/* SECTION HEADER (Sticky Effect)
         We make this sticky so the title stays with us for a bit while the grid moves.
      */}
      <div className="max-w-[1400px] mx-auto mb-32 px-4 sticky top-12 z-0 mix-blend-difference">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-4"
        >
          Selected Works
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-6xl md:text-9xl font-serif text-slate-200 pb-20"
        >
          Visual <span className="italic text-slate-600">Chronicle</span>
        </motion.h3>
      </div>

      {/* --- PARALLAX GRID --- */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 relative z-10">
        {/* COLUMN 1 (Moves Upwards Rapidly) */}
        <motion.div
          style={{ y: yLeft }}
          className="flex flex-col gap-24 md:gap-48"
        >
          {projects
            .filter((_, i) => i % 2 === 0)
            .map((project) => (
              <WorkItem key={project.id} project={project} />
            ))}
        </motion.div>

        {/* COLUMN 2 (Moves Downwards / Starts lower) */}
        <motion.div
          style={{ y: yRight }}
          className="flex flex-col gap-24 md:gap-48 md:pt-[40vh]"
        >
          {projects
            .filter((_, i) => i % 2 !== 0)
            .map((project) => (
              <WorkItem key={project.id} project={project} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- INDIVIDUAL WORK ITEM COMPONENT ---
const WorkItem = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // "Cinematic" cubic bezier
      viewport={{ once: true, margin: "-10%" }}
      className="group relative cursor-pointer w-full"
    >
      {/* Image Container 
        Using clip-path for a "Curtain Reveal" effect 
      */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        viewport={{ once: true }}
        className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-slate-800"
      >
        {/* Dark overlay that disappears on hover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10" />

        <motion.img
          src={project.src}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
        />

        {/* HOVER INFO (Floating) 
           Moves slightly opposite to the mouse for a floaty feel (via CSS transform)
        */}
        <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">
            {project.category}
          </span>
          <h4 className="text-4xl font-serif text-white italic">
            {project.title}
          </h4>
        </div>
      </motion.div>

      {/* Visible Title (Mobile / Default State) */}
      <div className="mt-6 flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-white/50 transition-colors duration-500">
        <div>
          <h4 className="text-2xl font-serif text-slate-300 group-hover:text-white transition-colors">
            {project.title}
          </h4>
          <span className="text-xs text-slate-600 uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <div className="text-xs text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          View Case
        </div>
      </div>
    </motion.div>
  );
};

export default Works;
