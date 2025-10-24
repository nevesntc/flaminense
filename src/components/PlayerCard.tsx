import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/data/players";
import playerPlaceholder from "@/assets/player-placeholder.jpg";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <Link to={`/jogador/${player.id}`}>
      <Card className="overflow-hidden hover:shadow-glow transition-smooth cursor-pointer group h-full">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={player.image || playerPlaceholder}
            alt={player.nickname}
            className="object-cover w-full h-full group-hover:scale-110 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-1">{player.nickname}</h3>
          <p className="text-muted-foreground mb-2">{player.name}</p>
          <div className="inline-block px-3 py-1 bg-secondary rounded-full text-sm font-semibold">
            {player.position}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlayerCard;
