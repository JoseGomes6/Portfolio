"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { MouseEvent, useState, useEffect } from "react";

interface ProjectProps {
  title: string;
  category: string;
  description: string;
  image?: string;
  isLatest?: boolean;
  link: string;
}

export default function ProjectCard({
  title,
  category,
  description,
  image,
  isLatest,
  link,
}: ProjectProps) {
  // Fix para Hydration Mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      450px circle at ${springX}px ${springY}px,
      rgba(59, 130, 246, 0.15),
      transparent 80%
    )
  `;

  // Se ainda não montou, renderizamos uma versão simplificada sem Framer Motion dinâmico
  if (!mounted) {
    return (
      <div className="relative block bg-[#0a0a0a] border border-white/5 rounded-4xl overflow-hidden h-137.5">
        {/* Placeholder estático aqui se necessário */}
      </div>
    );
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      className="group relative block bg-[#0a0a0a] border border-white/5 rounded-4xl overflow-hidden h-137.5 cursor-pointer"
    >
      {/* Badge */}
      {isLatest && (
        <div className="absolute top-8 right-8 z-30">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            Latest Project
          </span>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.2s] ease-out"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-liner-to-t from-black via-black/20 to-transparent z-10" />
      </div>

      {/* Spotlight - O culpado pela Hydration Mismatch se não fosse pelo 'mounted' */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlight }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-30 p-10 flex flex-col justify-end">
        <div className="relative">
          <p className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-3 opacity-80">
            {category}
          </p>

          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            {title}
          </h3>

          <div className="max-h-0 group-hover:max-h-60 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 overflow-hidden">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[85%] mb-8 border-l border-blue-500/30 pl-4">
              {description}
            </p>

            <div className="flex items-center gap-3 group/btn pb-2">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                Explore Case Study
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1.5 12.5L12.5 1.5M12.5 1.5H1.5M12.5 1.5V12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
