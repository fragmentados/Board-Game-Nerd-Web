import { GameDetail } from './../../models/games/gameDetail.model';
import { BACKEND_URL, BACKEND_MOCKED } from './../../models/service';
import { Game } from './../../models/games/game.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendResponse } from 'src/app/models/backendResponse.model';
import { CreateGame } from 'src/app/models/games/createGame.model';
import { UpdateGameLocation } from 'src/app/models/games/updateGameLocation.model';

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  private gameUrl = BACKEND_URL + 'games';

  public getGames() {
    if (BACKEND_MOCKED) {
      return this.http.get<Game[]>('assets/mocks/games.json');
    } else {
      return this.http.get<Game[]>(this.gameUrl);
    }
  }

  public getGame(gameId: number) {
    if (BACKEND_MOCKED) {
      return this.http.get<GameDetail>('assets/mocks/game' + gameId + '.json');
    } else {
      return this.http.get<GameDetail>(this.gameUrl + '/' + gameId);
    }
  }

  public createGame(game: CreateGame) {
    return this.http.post<BackendResponse>(this.gameUrl, game);
  }

  public updateGameLocation(gameId: number, game: UpdateGameLocation) {
    return this.http.put<BackendResponse>(this.gameUrl + '/' + gameId + '/location', game);
  }

  public registerGamePlay(gameId: number) {
    return this.http.put<BackendResponse>(this.gameUrl + '/' + gameId + '/play', {});
  }

  public updateScoreValue(gameId, scoreId: number, value: number) {
    return this.http.put<number>(this.gameUrl + '/' + gameId + '/score/' + scoreId + '/' + value, {});
  }
}
