"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Usamos uma função de scroll manual como plano B se o Observer falhar
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 200; // Offset para detetar mais cedo

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // Se estiver no topo
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 top-0 py-6 px-10 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5"
    >
      <a href="#home" className="text-white font-bold text-xl tracking-tighter">
        JG.
      </a>

      <div className="flex gap-8 text-zinc-400 text-sm font-medium relative">
        {navLinks.map((link) => {
          const sectionId = link.href.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <a
              key={link.name}
              href={link.href}
              className={`relative py-1 transition-colors duration-300 ${
                isActive ? "text-white" : "hover:text-zinc-200"
              }`}
            >
              {link.name}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
