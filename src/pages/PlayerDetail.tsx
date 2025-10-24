import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { players } from "@/data/players";
// ...existing code...

const PlayerDetail = () => {
  const { id } = useParams();
  const player = players.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Jogador não encontrado</h1>
          <Button asChild>
            <Link to="/elenco">Voltar ao Elenco</Link>
          </Button>
        </div>
      </div>
    );
  }

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
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/elenco">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Elenco
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Player Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-card">
                <img
                  src={player.image || "/assets/player-placeholder.jpg"}
                  alt={player.nickname}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Player Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-black mb-2">{player.nickname}</h1>
                <p className="text-2xl text-muted-foreground mb-4">{player.name}</p>
                <div className="inline-block px-4 py-2 bg-secondary rounded-full text-lg font-semibold">
                  {player.position}
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {player.description}
              </p>

              {player.rlTrackerUrl && (
                <Button asChild variant="outline">
                  <a href={player.rlTrackerUrl} target="_blank" rel="noopener noreferrer">
                    Ver Perfil no RL Tracker
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Stats Section - RL Tracker Dashboard */}
          {/* Stats Section - Dados da pesquisa manual */}
          <div className="mt-16">
            <h2 className="text-4xl font-black mb-8">Estatísticas</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Vitórias</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.wins} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Gols</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.goals} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Assistências</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.assists} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Defesas</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.saves} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Chutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.shots} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">MVPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.mvps} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground font-semibold">Goal Shot Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatedNumber value={player.stats.goalShotRatio} className="text-4xl font-black text-primary" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
  </motion.div>
  );
}

export default PlayerDetail;
