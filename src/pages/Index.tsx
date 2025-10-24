import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
const heroBanner = "/assets/hero-banner.jpg";

const Index = () => {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="text-primary">FLAMI</span>
              <span className="text-foreground">NENSE</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-semibold">
              Equipe de Rocket League
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Unidos pela paixão, dominando as arenas. O encontro da tradição do futebol brasileiro com a velocidade e precisão do Rocket League.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/elenco">Ver Elenco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Sobre o Time</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O Flaminense é a união perfeita entre a paixão de dois gigantes do futebol brasileiro e a adrenalina do Rocket League competitivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Títulos Conquistados</h3>
              <p className="text-muted-foreground">
                Campeões de múltiplos torneios nacionais do Rocket League, sempre buscando a excelência competitiva.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Elenco Profissional</h3>
              <p className="text-muted-foreground">
                Jogadores de elite com mecânicas avançadas e trabalho em equipe impecável.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Objetivos</h3>
              <p className="text-muted-foreground">
                Proporcionar a resenha e um jogo bonito nas arenas competitivas do Rocket League.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            Faça Parte da História
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Nos encontre em partidas rankeadas nos modos de jogo 3v3 e 4v4.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
            <Link to="/elenco">Conheça o Elenco</Link>
          </Button>
        </div>
      </section>
  </motion.div>
  );
};

export default Index;
