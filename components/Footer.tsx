"use client";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} José Gomes. Built with Next.js &
          Tailwind.
        </p>

        <div className="flex gap-8">
          <a
            href="https://github.com/JoseGomes6"
            target="_blank"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            LinkedIn
          </a>
          <a
            href="mailto:teu-email@gmail.com"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
