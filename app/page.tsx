import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Instagram, Github, Palette } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />

      {/* Section: Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-white text-4xl font-bold mb-4 tracking-tighter">
                Featured Work
              </h2>
              <p className="text-zinc-400 max-w-md">
                A selection of my recent projects, focusing on design and
                performance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="E-commerce Platform"
              category="Full-stack / Next.js"
            />
            <ProjectCard title="AI Dashboard" category="UI/UX Design" />
            <ProjectCard title="SaaS Landing Page" category="Frontend" />
            <ProjectCard title="Mobile App" category="React Native" />
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
