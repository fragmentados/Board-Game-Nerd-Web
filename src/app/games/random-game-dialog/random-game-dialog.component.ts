import { GameDetail } from './../../models/games/gameDetail.model';
import { GameService } from './../games/games.service';
import { Game } from 'src/app/models/games/game.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-random-game-dialog',
  templateUrl: './random-game-dialog.component.html',
  styleUrls: ['./random-game-dialog.component.css']
})
export class RandomGameDialogComponent implements OnInit {

  game: GameDetail;

  constructor(public dialogRef: MatDialogRef<RandomGameDialogComponent>, @Inject(MAT_DIALOG_DATA) public gameId: number,
              public imageService: ImageService, private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGame(this.gameId).subscribe(data => this.game = data);
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
