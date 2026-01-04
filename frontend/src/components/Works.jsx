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

  // Create different speeds for columns (Parallax)
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative z-20 bg-[#121212] py-32 px-4 md:px-12 overflow-hidden min-h-screen"
    >
      {/* --- SECTION HEADER --- */}
      <div className="max-w-7xl mx-auto mb-24 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4"
        >
          Selected Works
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-serif text-slate-200"
        >
          Visual <span className="italic text-slate-500">Chronicle</span>
        </motion.h3>
      </div>

      {/* --- PARALLAX GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* COLUMN 1 (Moves Upwards) */}
        <motion.div
          style={{ y: yLeft }}
          className="flex flex-col gap-12 md:gap-32"
        >
          {projects
            .filter((_, i) => i % 2 === 0)
            .map((project) => (
              <WorkItem key={project.id} project={project} />
            ))}
        </motion.div>

        {/* COLUMN 2 (Moves Downwards/Slower) */}
        <motion.div
          style={{ y: yRight }}
          className="flex flex-col gap-12 md:gap-32 md:pt-32"
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-10%" }}
      className="group relative cursor-pointer"
    >
      {/* Image Container with Overflow Hidden */}
      <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5]">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

        <motion.img
          src={project.src}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
        />

        {/* Hover Overlay Text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-xs text-slate-400 uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.category}
          </span>
          <h4 className="text-3xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Mobile-Only Visible Title (Hidden on Desktop hover state) */}
      <div className="mt-4 md:hidden">
        <h4 className="text-2xl font-serif text-slate-200">{project.title}</h4>
        <span className="text-xs text-slate-500 uppercase tracking-widest">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
};

export default Works;
