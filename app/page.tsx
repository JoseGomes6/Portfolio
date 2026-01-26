import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar"; // Importa aqui

export default function Home() {
  return (
    <main className="bg-zinc-950">
      <Navbar />
      <Hero />
      {/* Próximo passo: Grid de Projetos */}
    </main>
  );
}
