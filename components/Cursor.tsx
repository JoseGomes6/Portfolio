"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);

  // Mola para o ponto central (super rápida)
  const dotX = useSpring(0, { stiffness: 800, damping: 50 });
  const dotY = useSpring(0, { stiffness: 800, damping: 50 });

  // Mola para o anel/rasto (mais lenta para criar o efeito de perseguição)
  const ringX = useSpring(0, { stiffness: 300, damping: 30 });
  const ringY = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleHover = () => {
      const elements = document.querySelectorAll("a, button, .group");
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", moveMouse);
    handleHover();
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [dotX, dotY, ringX, ringY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* 1. O Anel Exterior (O que persegue com rasto) */}
      <motion.div
        className="absolute border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{
          width: isHovering ? 90 : 40,
          height: isHovering ? 90 : 40,
          backgroundColor: isHovering
            ? "rgba(59, 130, 246, 0.15)"
            : "transparent",
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Glow interno do anel quando fazes hover */}
        {isHovering && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse" />
        )}
      </motion.div>

      {/* 2. O Ponto Central (O que guia) */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
