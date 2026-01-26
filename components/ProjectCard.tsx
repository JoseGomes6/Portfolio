"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

interface ProjectProps {
  title: string;
  category: string;
}

export default function ProjectCard({ title, category }: ProjectProps) {
  // Valores para a posição do rato
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden h-[450px] cursor-pointer"
    >
      {/* O Efeito de Brilho (Spotlight) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Conteúdo do Card */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />

      {/* Espaço para Imagem (Placeholder) */}
      <div className="h-full w-full bg-zinc-800/50 group-hover:scale-105 transition-transform duration-700 ease-out" />

      <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
        <motion.p
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          className="text-blue-400 text-xs font-mono mb-3 uppercase tracking-[0.2em]"
        >
          {category}
        </motion.p>
        <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-50 transition-colors">
          {title}
        </h3>

        {/* Detalhe extra que aparece no hover */}
        <div className="mt-6 overflow-hidden">
          <p className="text-zinc-400 text-sm transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
            View Project Details →
          </p>
        </div>
      </div>
    </motion.div>
  );
}
