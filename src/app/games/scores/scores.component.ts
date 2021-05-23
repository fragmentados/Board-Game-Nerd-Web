import { BACKEND_MOCKED } from './../../models/service';
import { Component, OnInit, Input } from '@angular/core';
import { Score } from 'src/app/models/games/score.model';
import { GameService } from '../games/games.service';
import { ScoreInfo } from 'src/app/models/games/scoreInfo.model';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  @Input()
  gameId: number;
  @Input()
  scoreInfo: ScoreInfo;

  constructor(private service: GameService, public imageService: ImageService) { }

  ngOnInit() {
  }

  updateScoreValue(score: Score, event) {
    if (!BACKEND_MOCKED) {
      score.value = event.newValue;
      this.service.updateScoreValue(this.gameId, score.id, score.value).subscribe(data => {
        this.scoreInfo.avgValue = data;
      });
    }
  }
}
