export interface Player {
  id: string;
  name: string;
  nickname: string;
  position: "Atacante" | "Meio-Campo" | "Defensor" | "Goleiro";
  number: number;
  image: string;
  stats: {
    wins?: number;
    goalShotRatio?: number;
    goals: number;
    shots: number;
    assists: number;
    saves: number;
    mvps: number;
    trnScore?: number;
  };
  description: string;
  rlTrackerUrl?: string;
}

export const players: Player[] = [
  {
    id: "1",
    name: "Bruno Neves",
    nickname: "Neves",
    position: "Meio-Campo",
    number: 1,
  image: "/assets/neves.jpg",
    stats: {
        wins: 9070,
        goalShotRatio: 44.4,
        goals: 22380,
        shots: 50357,
        assists: 12284,
        saves: 19731,
        mvps: 4242,
        trnScore: 2126205.6,
    },
    description: "Meio-campista versátil com excelente visão de jogo e controle técnico.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/nevesntc/",
  },
  {
    id: "2",
    name: "Gabriel Brasileiro",
    nickname: "Beerg",
    position: "Atacante",
    number: 2,
  image: "/assets/beerg.png",
    stats: {
        wins: 3808,
        goalShotRatio: 48.5,
        goals: 9027,
        shots: 18596,
        assists: 4018,
        saves: 6285,
        mvps: 1396,
        trnScore: 994165.3,
    },
    description: "Atacante explosivo com mecânicas avançadas e finalizações precisas.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/bixaum",
  },
  {
    id: "3",
    name: "Caio Anzelman",
    nickname: "C4I0B4",
    position: "Meio-Campo",
    number: 3,
  image: "/assets/c4i0b4.jpg",
    stats: {
        wins: 5793,
        goalShotRatio: 49.0,
        goals: 12800,
        shots: 26127,
        assists: 5852,
        saves: 9960,
        mvps: 1891,
        trnScore: 1731878.4,
    },
    description: "Meio-campista tático especializado em transições rápidas e posicionamento estratégico.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/caiobaflu",
  },
  {
    id: "4",
    name: "Gabriel Gomes",
    nickname: "Gomin982",
    position: "Meio-Campo",
    number: 4,
  image: "/assets/gomin982.jpg",
    stats: {
        wins: 8936,
        goalShotRatio: 46.8,
        goals: 24947,
        shots: 53302,
        assists: 9538,
        saves: 20482,
        mvps: 4623,
        trnScore: 803682.4,
    },
    description: "Meio-campista completo com excelente controle de bola e visão de jogo.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/Gomin982",
  },
  {
    id: "5",
    name: "João Souza",
    nickname: "JPS",
    position: "Meio-Campo",
    number: 5,
  image: "/assets/jps.jpg",
    stats: {
      wins: 0,
      goalShotRatio: 0,
      goals: 0,
      shots: 0,
      assists: 0,
      saves: 0,
      mvps: 0,
    },
    description: "Meio-campista versátil com habilidades defensivas e ofensivas equilibradas.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/9877778978978979878979/",
  },
  {
    id: "6",
    name: "Yuri Kaczam",
    nickname: "Kaczam",
    position: "Atacante",
    number: 6,
  image: "/assets/kaczam.jpg",
    stats: {
        wins: 2570,
        goalShotRatio: 53.3,
        goals: 10209,
        shots: 19143,
        assists: 1880,
        saves: 5663,
        mvps: 1407,
        trnScore: 1090145.1,
    },
    description: "Atacante ágil conhecido por sua velocidade e mecânicas aéreas impressionantes.",
    rlTrackerUrl: "https://rocketleague.tracker.network/rocket-league/profile/steam/76561198808664627/overview",
  },
];
