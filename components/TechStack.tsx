"use client";
import { motion } from "framer-motion";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Framer Motion",
  "Git",
  "Docker",
  "Figma",
  "Firebase",
];

export default function TechStack() {
  return (
    <section className="py-20 bg-[#030303] overflow-hidden relative">
      {/* Sombras laterais para o efeito de "fade" nas bordas */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />

      <div className="flex flex-col gap-8">
        {/* Linha 1: Move para a esquerda */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-16 items-center"
          >
            {[...technologies, ...technologies].map((tech, index) => (
              <div key={index} className="flex items-center gap-16 group">
                <span className="text-zinc-800 text-6xl md:text-8xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:text-white group-hover:scale-105">
                  {tech}
                </span>
                {/* Separador visual entre tecnologias */}
                <div className="w-3 h-3 rounded-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Linha 2 (Opcional): Move para a direita para contraste visual */}
        <div className="flex whitespace-nowrap overflow-hidden opacity-50">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-16 items-center"
          >
            {[...technologies, ...technologies].reverse().map((tech, index) => (
              <div key={index} className="flex items-center gap-16 group">
                <span className="text-transparent outline-text text-5xl md:text-7xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:text-blue-500">
                  {tech}
                </span>
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}
