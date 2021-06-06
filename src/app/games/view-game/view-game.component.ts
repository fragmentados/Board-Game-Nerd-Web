import { BACKEND_MOCKED } from './../../models/service';
import { UpdateGameLocation } from './../../models/games/updateGameLocation.model';
import { MasterService } from './../games/master.service';
import { GameDetail } from './../../models/games/gameDetail.model';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../games/games.service';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG } from 'src/app/models/service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Masters } from 'src/app/models/masters/masters.model';
import { Game } from 'src/app/models/games/game.model';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent implements OnInit {

  game: GameDetail = new GameDetail();
  games: Game[];
  masters: Masters;
  gameId: number;
  isBackendMocked = BACKEND_MOCKED;

  constructor(private route: ActivatedRoute, private translate: TranslateService, private service: GameService,
              private masterService: MasterService, public dialog: MatDialog, private router: Router,
              public imageService: ImageService) {
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.route.params.subscribe(params => this.gameId = params['id']);
   }

  ngOnInit() {
    this.findGame();
    this.findGames();
    this.masterService.getMasters().subscribe(data => this.masters = data);
  }

  findGame() {
    this.service.getGame(this.gameId).subscribe(data => {
      this.game = data;
    });
  }

  findGames() {
    this.service.getGames().subscribe(data => {
      this.games = data;
    });
  }

  moveGame() {
    const updateGameLocation = new UpdateGameLocation();
    updateGameLocation.locationId = this.game.location.id;
    this.service.updateGameLocation(this.gameId, updateGameLocation).subscribe(data => {
      if (data.errorCode === 0) {
        this.findGame();
      } else {
        alert(data.message);
      }
    });
  }

  canBePrevious(): boolean {
    const gameIndex = this.games.indexOf(this.games.filter(g => g.id == this.gameId)[0]);
    return gameIndex > 0;
  }

  canBeNext(): boolean {
    const gameIndex = this.games.indexOf(this.games.filter(g => g.id == this.gameId)[0]);
    return gameIndex < (this.games.length - 1);
  }

  previousGame() {
    const gameIndex = this.games.indexOf(this.games.filter(g => g.id == this.gameId)[0]);
    this.gameId = this.games[gameIndex - 1].id;
    this.findGame();
  }

  nextGame() {
    const gameIndex = this.games.indexOf(this.games.filter(g => g.id == this.gameId)[0]);
    this.gameId = this.games[gameIndex + 1].id;
    this.findGame();
  }

  registerPlay() {
    this.service.registerGamePlay(this.gameId).subscribe(data => {
      if (data.errorCode === 0) {
        this.findGame();
      }
    });
  }

  getGameImages() {
    const gameImages = this.game.imageUrls.map(i => {
      return {
      image: i,
      thumbImage: i
    };
  });
    return gameImages;
  }

}

