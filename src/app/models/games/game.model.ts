import { Master } from './../masters/master.model';
export class Game {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  complexity: Master;
  minPlayers: number;
  maxPlayers: number;
  victory: string;
  theme: string;
  medium: string;
  duration: number;
  lastPlayedDate: string;
  avgScore: number;
}
