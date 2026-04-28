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
  const smoothX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 800, damping: 50 });

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

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.1), transparent 80%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden px-6"
    >
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: spotlight }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {isMounted &&
          clientParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-white rounded-full"
              style={{
                width: p.size + 1,
                height: p.size + 1,
                left: `${p.x}%`,
                top: `${p.y}%`,
                filter: "blur(0.5px)",
                boxShadow: `0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)`,
              }}
              animate={{ y: [0, -80, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: p.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-30 text-center pt-32"
      >
        <h1 className="font-[var(--font-space-mono)] text-[12vw] md:text-[9vw] font-bold leading-[1.1] tracking-tighter uppercase flex flex-col items-center">
          <span data-text="Hey, I'm" className="liquid">
            Hey, I&apos;m
          </span>
          <span
            data-text={isMounted ? displayText : "José Gomes"}
            className="liquid-color"
          >
            {isMounted ? displayText : "José Gomes"}
          </span>
        </h1>
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.6em] uppercase">
            Creative Developer & Designer
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-blue-600 via-purple-500 to-transparent"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#030303] to-transparent z-40 pointer-events-none" />

      <style jsx>{`
        .liquid,
        .liquid-color {
          position: relative;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
        }

        .liquid {
          background-image: linear-gradient(
            to bottom,
            #ffffff 40%,
            #52525b 100%
          );
        }

        .liquid-color {
          background-image: linear-gradient(
            to right,
            #3b82f6,
            #8b5cf6,
            #ef4444,
            #3b82f6
          );
          background-size: 200% auto;
          animation: gradient-move 4s linear infinite;
        }

        .liquid::before,
        .liquid-color::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0) 45%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          pointer-events: none;
          z-index: 1;
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
