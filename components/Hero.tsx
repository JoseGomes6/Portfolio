"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4 block"
        >
          Available for new opportunities
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          Building <br />
          <motion.span
            animate={{ color: ["#3b82f6", "#a855f7", "#3b82f6"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-blue-500"
          >
            experiences.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-10"
        >
          I&apos;m José Gomes, a Full-stack Developer focused on creating
          high-end web applications with modern technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#projects"
            className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
