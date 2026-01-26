"use client";
import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Sparkles } from "lucide-react";

export default function About() {
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
    <section id="about" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo: Texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white text-4xl font-bold mb-6 tracking-tighter flex items-center gap-2">
              <Sparkles className="text-blue-400" /> About Me
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              I&apos;m a passionate developer based in Portugal, dedicated to
              building digital products that combine clean code with exceptional
              user experience.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              My journey in tech started with a curiosity for how things work on
              the web, which evolved into a career focused on modern full-stack
              development.
            </p>

            <div className="flex gap-4">
              <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl">
                <span className="block text-2xl font-bold text-white">2+</span>
                <span className="text-zinc-500 text-sm">Years Exp.</span>
              </div>
              <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl">
                <span className="block text-2xl font-bold text-white">15+</span>
                <span className="text-zinc-500 text-sm">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Skills Cards */}
          <div className="grid gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-2 text-blue-400">
                  {skill.icon}
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                </div>
                <p className="text-zinc-500 text-sm ml-9">{skill.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
