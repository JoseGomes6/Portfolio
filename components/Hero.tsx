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

const particles = [...Array(20)].map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

const GLITCH_CHARS = "01{}/<>[]_-+=*#%!@";

export default function Hero() {
  const sectionRef = useRef(null);
  const [displayText, setDisplayText] = useState("José Gomes");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shadowX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const shadowY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${shadowX}px ${shadowY}px, rgba(59, 130, 246, 0.15), transparent 80%)`;

  useEffect(() => {
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
          setTimeout(startScramble, 3000);
        }
        iteration += 1 / 3;
      }, 50);
    };
    startScramble();
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden px-6"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: spotlightBg }}
      />

      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:45px_45px]" />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{ y: [0, -60, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_85%)]" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 text-center pt-32"
      >
        <h1 className="font-[var(--font-space-mono)] text-[13vw] md:text-[10vw] font-bold leading-[1.1] tracking-[-0.04em] uppercase text-white">
          Hey, I´m <br />
          <span className="text-reveal-crazy mt-4 md:mt-6">{displayText}</span>
        </h1>
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.5em] uppercase">
            Creative Developer & Designer
          </p>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </motion.div>

      {/* Máscara de transição para o About */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#030303] to-transparent z-20 pointer-events-none" />

      <style jsx>{`
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
          animation: gradient-move 4s linear infinite;
          display: inline-block;
          padding: 0 0.1em;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
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
