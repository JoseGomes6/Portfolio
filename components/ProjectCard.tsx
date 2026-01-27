"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image"; // Importação necessária
import { MouseEvent } from "react";

interface ProjectProps {
  title: string;
  category: string;
  image?: string;
}

export default function ProjectCard({ title, category, image }: ProjectProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      400px circle at ${springX}px ${springY}px,
      rgba(59, 130, 246, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative bg-zinc-900/30 border border-white/5 rounded-[2rem] overflow-hidden h-[500px] cursor-pointer backdrop-blur-sm"
    >
      {/* Spotlight do Card */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlight }}
      />

      {/* Contentor da Imagem Otimizada */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill // Ocupa todo o espaço do pai
            className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw" // Ajuda o Next a escolher o tamanho certo
            priority={false} // Mantém como lazy load
          />
        ) : (
          <div className="h-full w-full bg-zinc-900/40" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-transparent z-[1]" />
      </div>

      {/* Conteúdo */}
      <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
        <div className="space-y-3">
          <span className="inline-block text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {category}
          </span>
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">
            {title}
          </h3>
          <div className="flex justify-between items-center pt-4 overflow-hidden text-zinc-500">
            <p className="text-xs font-mono tracking-widest uppercase transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              View Project
            </p>
            <span className="text-white text-xl transform translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
              ↗
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
