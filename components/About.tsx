"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Code2, Cpu, Globe, Sparkles } from "lucide-react";

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 800, damping: 50 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.1), transparent 80%)`;

  const skills = [
    {
      name: "Frontend",
      tech: "React, Next.js, Tailwind",
      icon: <Globe size={20} />,
    },
    {
      name: "Backend",
      tech: "Node.js, PostgreSQL, Prisma",
      icon: <Cpu size={20} />,
    },
    { name: "Tools", tech: "Git, Docker, Figma", icon: <Code2 size={20} /> },
  ];

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className="relative py-32 px-6 bg-[#030303] overflow-hidden"
    >
      {/* BACKGROUND CONSISTENTE */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: spotlight }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-6">
              <Sparkles size={14} /> 01 // Background
            </div>

            <h2 className="text-white text-5xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
              About <span className="text-reveal-crazy">Me</span>
            </h2>

            <p className="text-zinc-400 text-xl leading-relaxed mb-6 font-light">
              I&apos;m a passionate{" "}
              <span className="text-white font-medium">Creative Developer</span>{" "}
              based in Portugal, dedicated to building digital products that
              combine clean code with exceptional user experience.
            </p>

            <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-light">
              My journey in tech started with a curiosity for how things work on
              the web, which evolved into a career focused on modern full-stack
              development.
            </p>

            <div className="flex gap-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-zinc-900/50 border border-white/5 p-5 rounded-2xl">
                  <span className="block text-3xl font-bold text-white tracking-tighter">
                    2+
                  </span>
                  <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                    Years Exp.
                  </span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-zinc-900/50 border border-white/5 p-5 rounded-2xl">
                  <span className="block text-3xl font-bold text-white tracking-tighter">
                    15+
                  </span>
                  <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                    Projects
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-zinc-900/20 border border-white/5 rounded-3xl hover:border-blue-500/40 hover:bg-zinc-900/40 transition-all duration-500 group"
              >
                <div className="flex items-center gap-5 mb-4">
                  <div className="p-3 rounded-xl bg-zinc-800 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    {skill.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold tracking-tight">
                    {skill.name}
                  </h3>
                </div>
                <div className="h-px w-full bg-zinc-800/50 mb-4 group-hover:bg-blue-500/20 transition-colors" />
                <p className="text-zinc-500 font-mono text-sm leading-relaxed uppercase tracking-wider">
                  {skill.tech}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
