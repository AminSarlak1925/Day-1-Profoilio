import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Aicoding@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API delay
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0f0f0f] py-32 px-6 md:px-12 min-h-screen flex items-center border-t border-white/5 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-800/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 relative z-10">
        {/* --- LEFT: THE INVITATION --- */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-8"
            >
              Contact
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif text-slate-200 leading-[0.9] mb-8"
            >
              Let's build <br />
              <span className="italic text-slate-600">the future.</span>
            </motion.h3>
            <p className="text-slate-400 font-light text-lg max-w-md leading-relaxed">
              We are currently accepting new commissions for 2026. Tell us about
              your vision, and we will help you realize it.
            </p>
          </div>

          {/* Contact Details & Copy Interaction */}
          <div className="hidden lg:flex flex-col gap-12 mt-24">
            {/* Email with Copy Function */}
            <div
              onClick={handleCopyEmail}
              className="group cursor-pointer w-fit"
            >
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 flex items-center gap-2">
                Email
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-green-500 flex items-center gap-1"
                    >
                      <Check size={10} /> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Copy
                        size={10}
                        className="group-hover:text-white transition-colors"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
              <h4 className="text-3xl font-serif text-slate-300 group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white pb-1">
                Aicoding@gmail.com
              </h4>
            </div>

            {/* Studio Location */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2">
                Studio
              </p>
              <p className="text-3xl font-serif text-slate-300">
                Vaasa, Finland
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT: THE MINIMAL FORM --- */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Input Field Component (Reused below) */}
            <FloatingInput
              name="name"
              label="Your Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />

            <FloatingInput
              name="email"
              label="Email Address"
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />

            <FloatingInput
              name="message"
              label="Tell us about your project"
              isTextArea
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
            />

            {/* SUBMIT BUTTON */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status === "sending"
                    ? "Sending..."
                    : status === "success"
                    ? "Message Sent"
                    : "Send Message"}
                </span>
                {status === "idle" && (
                  <ArrowUpRight
                    size={16}
                    className="relative z-10 transition-transform duration-300 group-hover:rotate-45"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: FLOATING LABEL INPUT ---
const FloatingInput = ({
  name,
  label,
  type = "text",
  isTextArea = false,
  value,
  onChange,
}) => {
  return (
    <div className="group relative">
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder=" " // Required for CSS :placeholder-shown trick
          rows="1"
          className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl text-slate-200 focus:outline-none focus:border-white/50 transition-colors resize-none peer"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder=" "
          className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl text-slate-200 focus:outline-none focus:border-white/50 transition-colors peer"
        />
      )}

      {/* The Floating Label Logic */}
      <label
        className="absolute left-0 top-4 text-slate-500 text-lg md:text-xl transition-all duration-300 pointer-events-none 
                peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-slate-400
                peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:text-slate-400"
      >
        {label}
      </label>
    </div>
  );
};

export default Contact;
