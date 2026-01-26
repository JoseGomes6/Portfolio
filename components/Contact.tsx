"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-white mb-4 tracking-tighter"
        >
          Let´s work together.
        </motion.h2>
        <p className="text-zinc-400 mb-12">
          Want to start a project or just say hi? My inbox is always open.
        </p>

        <form className="grid grid-cols-1 gap-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-zinc-900 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-zinc-900 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            className="bg-zinc-900 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
          ></textarea>

          <button className="bg-white text-black font-bold py-4 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
