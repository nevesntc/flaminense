import TacticalField from "@/components/TacticalField";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import PlayerCard from "@/components/PlayerCard";
import { players } from "@/data/players";
import { useState } from "react";
import { RocketLeagueArenaBg } from "@/components/RocketLeagueArenaBg";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Elenco = () => {
  const [formation, setFormation] = useState<"3x3" | "4x4">("3x3");

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="text-primary">Elenco</span> Principal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça os atletas de elite que defendem as cores do Flaminense nas arenas do Rocket League.
            </p>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>

          {/* Formation Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-black mb-8 text-center">Formação Tática</h2>
            
            {/* Formation Selector */}
            <div className="flex justify-center mb-8">
              <ToggleGroup type="single" value={formation} onValueChange={(value) => value && setFormation(value as "3x3" | "4x4")}>
                <ToggleGroupItem value="3x3" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                  3x3
                </ToggleGroupItem>
                <ToggleGroupItem value="4x4" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
                  4x4
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="rounded-lg p-8 mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center w-full px-4">
                    <p className="text-muted-foreground mb-8">
                      {formation === "3x3" ? "Formação 2-1 com rotação dinâmica" : "Formação losango com controle total"}
                    </p>
                    {/* 3x3 Formation */}
                    {formation === "3x3" && (
                      <div className="space-y-4 sm:space-y-16 py-2 sm:py-8">
                        {/* Frente */}
                        <div className="flex justify-center">
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            1
                          </div>
                        </div>
                        {/* Atrás */}
                        <div className="flex justify-center gap-4 sm:gap-32">
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            2
                          </div>
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            3
                          </div>
                        </div>
                      </div>
                    )}
                    {/* 4x4 Formation - Diamond */}
                    {formation === "4x4" && (
                      <div className="space-y-3 sm:space-y-12 py-1 sm:py-8">
                        {/* Ponta */}
                        <div className="flex justify-center">
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            1
                          </div>
                        </div>
                        {/* Laterais */}
                        <div className="flex justify-center gap-3 sm:gap-48">
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            2
                          </div>
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            3
                          </div>
                        </div>
                        {/* Base */}
                        <div className="flex justify-center">
                          <div className="w-7 h-7 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold shadow-glow text-base sm:text-2xl">
                            4
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

              {/* Campo interativo de formação tática */}
              <TacticalField />
            {/* Tactical Philosophy */}
            <div className="bg-card rounded-lg p-8 shadow-card mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Filosofia de Jogo</h3>
              <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                O Flaminense adota o estilo <span className="text-primary font-semibold">tiki taka</span>, priorizando 
                a <span className="text-primary font-semibold">posse de bola</span> e o <span className="text-primary font-semibold">jogo associativo</span>. 
                Nossa estratégia se baseia em passes rápidos, movimentação constante e rotações inteligentes, 
                criando superioridade numérica e desestabilizando as defesas adversárias. O foco está na 
                precisão técnica, leitura coletiva e finalização em momentos estratégicos.
              </p>
            </div>

            {/* Video Embed */}
            <div className="bg-card rounded-lg p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-6 text-center">Jogadas do Time</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Er3EV6u1nYo"
                  title="Jogadas do Flaminense"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
  </motion.div>
  );
};

export default Elenco;
