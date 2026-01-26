"use client";
import { Github, Instagram, Palette, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Lado Esquerdo: Copyright */}
        <p className="text-zinc-500 text-sm order-2 md:order-1">
          © {new Date().getFullYear()} José Gomes.
        </p>

        {/* Lado Direito: Icons Sociais com Links */}
        <div className="flex items-center gap-6 order-1 md:order-2">
          <a
            href="https://github.com/JoseGomes6"
            target="_blank"
            className="text-zinc-400 hover:text-white transition-colors group"
            title="GitHub"
          >
            <Github
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </a>

          <a
            href="https://instagram.com/teu-user"
            target="_blank"
            className="text-zinc-400 hover:text-pink-500 transition-colors group"
            title="Instagram"
          >
            <Instagram
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </a>

          <a
            href="https://behance.net/teu-user"
            target="_blank"
            className="text-zinc-400 hover:text-blue-600 transition-colors group"
            title="Behance"
          >
            <Palette
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </a>

          <a
            href="mailto:teu-email@gmail.com"
            className="text-zinc-400 hover:text-blue-400 transition-colors group"
            title="Email"
          >
            <Mail
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
