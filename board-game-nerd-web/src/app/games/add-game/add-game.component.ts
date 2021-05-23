import { DEFAULT_LANG, BACKEND_URL } from './../../models/service';
import { MasterService } from './../games/master.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../games/games.service';
import { TranslateService } from '@ngx-translate/core';
import { OK_CODE } from 'src/app/models/service';
import { Masters } from 'src/app/models/masters/masters.model';
import { CreateGame } from 'src/app/models/games/createGame.model';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  game: CreateGame = new CreateGame();
  masters: Masters;

  constructor(private translate: TranslateService, private service: GameService,
              private masterService: MasterService, public imageService: ImageService) {
    this.translate.setDefaultLang(DEFAULT_LANG);
   }

  ngOnInit() {
    this.masterService.getMasters().subscribe(data => {
      this.masters = data;
    });
  }

  clearForm() {
    this.game.name = '';
    this.game.description = '';
    this.game.locationId = undefined;
    this.game.complexityId = undefined;
    this.game.maxPlayers = undefined;
    this.game.minPlayers = undefined;
    this.game.styleId = undefined;
    this.game.themeId = undefined;
    this.game.victoryId = undefined;
    this.game.mediumId = undefined;
    this.game.duration = undefined;
  }

  createGame(): void {
    this.service.createGame(this.game)
        .subscribe( data => {
          if (data.errorCode === OK_CODE) {
              this.clearForm();
              // this.translate.get('COMMON.GAME_CREATED').subscribe(trans => alert(trans));
          } else {
            alert(data.message);
          }
        });
  }

}
