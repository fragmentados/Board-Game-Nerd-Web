import { Master } from './../masters/master.model';
import { ScoreInfo } from './scoreInfo.model';

export class GameDetail {
  name: string;
  imageUrls: string[];
  description: string;
  minPlayers: number;
  maxPlayers: number;
  location: Master;
  complexity: string;
  victory: string;
  theme: string;
  medium: string;
  style: string;
  duration: number;
  lastPlayedDate: string;
  scoreInfo: ScoreInfo;
}
