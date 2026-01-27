"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden px-6"
    >
      {/* --- OS QUADRADOS (BACKGROUND GRID) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Efeito de Spotlight que segue o rato nos quadrados */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 transition-duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.08),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-20 text-center">
        {/* O teu conteúdo do Hero (Portfolio José Gomes) aqui dentro */}
        <div className="flex flex-col items-center select-none group">
          <motion.h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase relative">
            Portfolio <br />
            <span className="relative inline-block">
              {/* ... lógica do José Gomes que já tens ... */}
              <span className="text-transparent outline-text opacity-30">
                José Gomes
              </span>
              <motion.span
                className="absolute left-0 top-0 w-full h-full text-reveal-crazy block pointer-events-none"
                // Mantém as tuas máscaras aqui
              >
                José Gomes
              </motion.span>
            </span>
          </motion.h1>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .text-reveal-crazy {
          background: linear-gradient(
            to right,
            #3b82f6,
            #8b5cf6,
            #ef4444,
            #3b82f6
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-move 3s linear infinite;
        }
        @keyframes gradient-move {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
