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
    <section className="py-12 bg-black overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 items-center"
        >
          {/* Duplicamos a lista para o scroll ser infinito e sem saltos */}
          {[...technologies, ...technologies].map((tech, index) => (
            <span
              key={index}
              className="text-zinc-700 text-4xl md:text-6xl font-bold tracking-tighter hover:text-blue-500 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
