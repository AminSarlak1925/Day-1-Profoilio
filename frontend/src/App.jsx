import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Studio from "./components/Studio";
import Works from "./components/Works";
import Journal from "./components/Journal";
import Contact from "./components/Contact"; // <-- Import Contact

const App = () => {
  return (
    <div className="bg-[#1a1a1a] text-slate-200 font-sans selection:bg-slate-600 selection:text-white overflow-x-hidden">
      {/* Global Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      <main>
        <Hero />
        <Studio />
        <Works />
        <Journal />
        <Contact /> {/* <-- The Grand Finale */}
      </main>

      {/* Minimal Footer (Since Contact holds the heavy info) */}
      <div className="py-8 bg-[#0f0f0f] flex items-center justify-center relative z-10 border-t border-slate-900/50">
        <p className="text-slate-700 text-[10px] tracking-widest uppercase font-semibold">
          © 2026 The Monolith. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default App;
