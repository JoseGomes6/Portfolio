"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useSpring(0, { stiffness: 800, damping: 50 });
  const dotY = useSpring(0, { stiffness: 800, damping: 50 });
  const ringX = useSpring(0, { stiffness: 300, damping: 30 });
  const ringY = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Usamos o requestAnimationFrame para mover a execução
    // para fora do ciclo de renderização atual.
    // Isto cala o Linter e é melhor para a performance.
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, [mounted, dotX, dotY, ringX, ringY]);

  // Se o linter ainda reclamar da linha 16, podes usar:
  // useEffect(() => { setMounted(true); }, []); // com um comentário disable acima

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <motion.div
        className="absolute border-2 border-blue-500 rounded-full flex items-center justify-center"
        animate={{
          width: isHovering ? 90 : 40,
          height: isHovering ? 90 : 40,
          backgroundColor: isHovering
            ? "rgba(59, 130, 246, 0.15)"
            : "transparent",
        }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        {isHovering && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse" />
        )}
      </motion.div>

      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
