"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";

const bgParticles = [...Array(12)].map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 15 + 10,
}));

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#030303] min-h-screen selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      {/* Secção 1: Hero */}
      <Hero />

      {/* Secção 2: About */}
      <About />

      {/* TechStack - Envolvida para não quebrar a lógica do observer */}
      <div id="tech-stack" className="bg-[#030303]">
        <TechStack />
      </div>

      {/* Secção 3: Projects - O ID está aqui, garantimos que o padding ajuda a deteção */}
      <section
        id="projects"
        className="relative py-40 px-6 overflow-hidden bg-[#030303]"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:45px_45px] opacity-40" />
          {bgParticles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-white rounded-full opacity-10 blur-[1px]"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{ y: [0, -80, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_95%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                Featured <br className="md:hidden" />
                <span className="text-reveal-auto">Work</span>
              </h2>
            </motion.div>
            <p className="text-zinc-500 max-w-xs font-light leading-relaxed border-l border-white/10 pl-6 mb-2 hidden md:block text-sm">
              A selection of my recent projects, focusing on high-end design and
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProjectCard
              title="Digital & Print Magazine"
              category="Editorial / Hybrid"
              isLatest={true}
              image="/MagazinePaper.png"
              description="A fusion of tactile and digital. I developed the interactive reading platform and provided visual curation for the limited print edition."
              link="https://josegomes6.github.io/NEXUS-WEB/"
            />
            <ProjectCard
              title="Digital & Print Magazine"
              category="Editorial / Hybrid"
              isLatest={true}
              image="/MagazinePaper.png"
              description="A fusion of tactile and digital. I developed the interactive reading platform and provided visual curation for the limited print edition."
              link="https://josegomes6.github.io/NEXUS-WEB/"
            />
            <ProjectCard
              title="Digital & Print Magazine"
              category="Editorial / Hybrid"
              isLatest={true}
              image="/MagazinePaper.png"
              description="A fusion of tactile and digital. I developed the interactive reading platform and provided visual curation for the limited print edition."
              link="https://josegomes6.github.io/NEXUS-WEB/"
            />
            <ProjectCard
              title="Digital & Print Magazine"
              category="Editorial / Hybrid"
              isLatest={true}
              image="/MagazinePaper.png"
              description="A fusion of tactile and digital. I developed the interactive reading platform and provided visual curation for the limited print edition."
              link="https://josegomes6.github.io/NEXUS-WEB/"
            />
          </div>
        </div>
      </section>

      {/* Secção 4: Contact */}
      <CTA />

      <Footer />

      <style jsx global>{`
        .text-reveal-auto {
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
          animation: gradient-flow 4s linear infinite;
          display: inline-block;
          padding: 0 0.1em;
        }
        @keyframes gradient-flow {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </main>
  );
}
