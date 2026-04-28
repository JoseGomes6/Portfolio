"use client";
import { motion } from "framer-motion";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Illustrator",
  "Photoshop",
  "Git",
  "Premiere",
  "Figma",
  "VS Code",
];

export default function TechStack() {
  return (
    <section className="py-20 bg-[#030303] overflow-hidden relative">
      {/* Sombras laterais para o efeito de "fade" */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-l from-[#030303] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#030303] to-transparent z-10" />

      <div className="flex flex-col gap-10">
        {/* Linha 1: Principal (Texto Dark Ghost) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center"
          >
            {[...technologies, ...technologies].map((tech, index) => (
              <div key={index} className="flex items-center gap-16 group">
                <span className="text-zinc-900 text-6xl md:text-8xl font-black tracking-tighter uppercase transition-colors duration-500 group-hover:text-white/80">
                  {tech}
                </span>
                <div className="w-3 h-3 rounded-full bg-zinc-900" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Linha 2: LIQUID GLASS (MAIS CLARO E VIBRANTE) */}
        <div className="flex whitespace-nowrap overflow-hidden py-4">
          <motion.div
            animate={{ x: ["-50%", "0%"] }} // Move da esquerda para a direita
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...technologies, ...technologies].reverse().map((tech, index) => (
              <div key={index} className="flex items-center gap-12 group">
                <span
                  data-text={tech}
                  className="liquid-glass text-4xl md:text-5xl font-black tracking-tighter uppercase relative"
                >
                  {tech}
                </span>
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .liquid-glass {
          /* GRADIENTE ANIMADO COM CORES MAIS VIVAS */
          background: linear-gradient(
            to right,
            #3b82f6,
            #a855f7,
            #f43f5e,
            #3b82f6
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-move 3s linear infinite;

          position: relative;
          display: inline-block;
          /* Drop shadow para destacar do fundo */
          filter: drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.3));
        }

        /* REFLEXO DE VIDRO (HIGHLIGHT SUPERIOR) */
        .liquid-glass::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          z-index: 1;
          /* Aumentei a opacidade do branco para ficar mais claro */
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1) 0%,
            /* Branco total no topo */ rgba(255, 255, 255, 0.4) 30%,
            /* Desce com brilho */ transparent 60%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          pointer-events: none;
        }

        /* BRILHO ESPECULAR ADICIONAL (OVERLAY) */
        .liquid-glass::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            135deg,
            transparent 45%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 55%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          /* Overlay faz o branco brilhar por cima das cores */
          mix-blend-mode: overlay;
        }

        @keyframes gradient-move {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .liquid-glass:hover {
          filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.4));
          transition: filter 0.3s ease;
        }
      `}</style>
    </section>
  );
}
