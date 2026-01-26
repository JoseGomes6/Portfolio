"use client";
import { motion } from "framer-motion";

interface ProjectProps {
  title: string;
  category: string;
  image?: string;
}

export default function ProjectCard({ title, category }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-[400px] cursor-pointer"
    >
      {/* Imagem de Placeholder (Substituirás por imagens reais depois) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
      <div className="h-full w-full bg-zinc-800 group-hover:scale-105 transition-transform duration-500" />

      <div className="absolute bottom-0 left-0 p-8 z-20">
        <p className="text-blue-400 text-xs font-mono mb-2 uppercase tracking-widest">
          {category}
        </p>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
