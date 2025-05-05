export interface PlayerScoreResponse {
  playerId: string;
  playerName: string;
  score: number;
}

export interface SessionScoreResponse {
  sessionId: string;
  playerScores: PlayerScoreResponse[];
}

export const oldPlayerScores: PlayerScoreResponse[] = [
  { playerId: "anton", playerName: "Anton", score: 1001 },
  { playerId: "bobby", playerName: "Bobby", score: 1002 },
  { playerId: "kate", playerName: "Kate", score: 1003 },
  { playerId: "sarah", playerName: "Sarah", score: 1004 },
  { playerId: "john", playerName: "John", score: 1005 },
  { playerId: "mia", playerName: "Mia", score: 450 },
  { playerId: "leo", playerName: "Leo", score: 720 },
  { playerId: "nina", playerName: "Nina", score: 690 },
  { playerId: "owen", playerName: "Owen", score: 540 },
  { playerId: "emma", playerName: "Emma", score: 665 },
  { playerId: "liam", playerName: "Liam", score: 730 },
  { playerId: "chloe", playerName: "Chloe", score: 610 },
  { playerId: "max", playerName: "Max", score: 595 },
  { playerId: "ava", playerName: "Ava", score: 560 },
  { playerId: "noah", playerName: "Noah", score: 640 },
  { playerId: "ella", playerName: "Ella", score: 580 },
  { playerId: "zoe", playerName: "Zoe", score: 505 },
  { playerId: "jack", playerName: "Jack", score: 675 },
  { playerId: "luna", playerName: "Luna", score: 630 },
  { playerId: "finn", playerName: "Finn", score: 600 },
];

export const newPlayerScores: PlayerScoreResponse[] = [
  { playerId: "anton", playerName: "Anton", score: 2000 },
  { playerId: "bobby", playerName: "Bobby", score: 2000 },
  { playerId: "kate", playerName: "Kate", score: 2000 },
  { playerId: "sarah", playerName: "Sarah", score: 3010 },
  { playerId: "john", playerName: "John", score: 1005 },
  { playerId: "mia", playerName: "Mia", score: 700 },
  { playerId: "leo", playerName: "Leo", score: 2000 },
  { playerId: "nina", playerName: "Nina", score: 910 },
  { playerId: "owen", playerName: "Owen", score: 690 },
  { playerId: "emma", playerName: "Emma", score: 865 },
  { playerId: "liam", playerName: "Liam", score: 888 },
  { playerId: "chloe", playerName: "Chloe", score: 795 },
  { playerId: "max", playerName: "Max", score: 830 },
  { playerId: "ava", playerName: "Ava", score: 710 },
  { playerId: "noah", playerName: "Noah", score: 860 },
  { playerId: "ella", playerName: "Ella", score: 800 },
  { playerId: "zoe", playerName: "Zoe", score: 678 },
  { playerId: "jack", playerName: "Jack", score: 874 },
  { playerId: "luna", playerName: "Luna", score: 845 },
  { playerId: "finn", playerName: "Finn", score: 3000 },
];
