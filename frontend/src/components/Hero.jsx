import React, { useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ContentColumn from "./ContentColumn";
import VisualColumn from "./VisualColumn";

const Hero = () => {
  const containerRef = useRef(null);
  const [activeVariant, setActiveVariant] = useState("default");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bigATranslate = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bigAOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    [0, 0.05, 0]
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Background "A" */}
      <motion.div
        style={{ y: bigATranslate, opacity: bigAOpacity }}
        className="fixed top-1/4 left-[-10%] text-[40rem] leading-none font-serif text-slate-800 pointer-events-none z-0 select-none mix-blend-soft-light"
      >
        A
      </motion.div>

      {/* LAYOUT FIX: 
         - Mobile: Image first (order-1), Text second (order-2)
         - Desktop: Text first (lg:order-1), Image second (lg:order-2)
      */}

      {/* VISUALS (Image) */}
      <div className="order-1 lg:order-2">
        <VisualColumn activeVariant={activeVariant} />
      </div>

      {/* CONTENT (Text) */}
      <div className="order-2 lg:order-1">
        <ContentColumn
          scrollYProgress={scrollYProgress}
          ySlow={ySlow}
          yFast={yFast}
          setVariant={setActiveVariant}
        />
      </div>
    </div>
  );
};

export default Hero;
