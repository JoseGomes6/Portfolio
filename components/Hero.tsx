"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

const GLITCH_CHARS = "01{}/<>[]_-+=*#%!@";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [displayText, setDisplayText] = useState("José Gomes");
  const [isMounted, setIsMounted] = useState(false);
  const [clientParticles, setClientParticles] = useState<Particle[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shadowX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const shadowY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsMounted(true);

    const generated = [...Array(25)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
    setClientParticles(generated);

    const targetText = "José Gomes";
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText((prev) =>
          targetText
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return targetText[index];
              return GLITCH_CHARS[
                Math.floor(Math.random() * GLITCH_CHARS.length)
              ];
            })
            .join(""),
        );
        if (iteration >= targetText.length) {
          clearInterval(interval);
          setTimeout(startScramble, 4000);
        }
        iteration += 1 / 3;
      }, 40);
    };

    startScramble();
    return () => clearInterval(interval);
  }, []);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(
    650px circle at ${shadowX}px ${shadowY}px, 
    rgba(59, 130, 246, 0.12) 0%, 
    rgba(139, 92, 246, 0.05) 45%,
    transparent 80%
  )`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="home"
      // SOLUÇÃO: suppressHydrationWarning ignora o atributo webcrx injetado por extensões
      suppressHydrationWarning
      className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden px-6"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: spotlightBg }}
        suppressHydrationWarning
      />

      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none"
        suppressHydrationWarning
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Só renderiza as partículas após o mount para garantir 0 erros de Math.random */}
        {isMounted &&
          clientParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                filter: "blur(1px)",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_90%)]" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 text-center pt-32"
        suppressHydrationWarning
      >
        <h1 className="font-[var(--font-space-mono)] text-[12vw] md:text-[9vw] font-bold leading-[1] tracking-tighter uppercase text-white selection:bg-blue-500">
          Hey, I´m <br />
          <motion.span
            className="text-reveal-crazy mt-4 md:mt-2 cursor-default inline-block"
            // Se não estiver montado, mostra o texto estático "José Gomes" para o SSR
            // Se estiver montado, ativa o displayText (que tem o efeito glitch)
            suppressHydrationWarning
            whileHover={{
              scale: 1.03,
              filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.6))",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isMounted ? displayText : "José Gomes"}
          </motion.span>
        </h1>

        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.6em] uppercase opacity-60">
            Creative Developer & Designer
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-blue-600 via-purple-500 to-transparent"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-20 pointer-events-none" />

      <style jsx>{`
        .text-reveal-crazy {
          background: linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-move 3s linear infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
