"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 top-0 py-6 px-10 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5"
    >
      <span className="text-white font-bold text-xl tracking-tighter">JG.</span>

      <div className="flex gap-8 text-zinc-400 text-sm font-medium">
        <a href="#about" className="hover:text-white transition-colors">
          About
        </a>
        <a href="#projects" className="hover:text-white transition-colors">
          Projects
        </a>
        <a href="#contact" className="hover:text-white transition-colors">
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
