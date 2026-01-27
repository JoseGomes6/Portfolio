"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-[#030303]"
    >
      {/* Efeito de luz de fundo para destacar a secção */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="flex items-center justify-center gap-2 text-blue-400 font-mono text-sm mb-6 uppercase tracking-widest">
            <Sparkles size={16} /> Ready to start?
          </span>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
            Let&apos;s build something <br />
            {/* Aplicado o gradiente animado aqui */}
            <span className="text-reveal-crazy italic lowercase">
              legendary
            </span>{" "}
            together.
          </h2>

          <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
            I&apos;m currently available for new projects and collaborations. If
            you have an idea, let&apos;s make it a reality.
          </p>

          <motion.a
            href="mailto:josepedrogomes106@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all group"
          >
            Start a Conversation
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
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
