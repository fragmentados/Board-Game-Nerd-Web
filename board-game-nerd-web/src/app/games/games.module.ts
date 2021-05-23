import { MasterService } from './games/master.service';
import { GameRoutingModule } from './games-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { GameService } from './games/games.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AddGameComponent } from './add-game/add-game.component';
import { FormsModule } from '@angular/forms';
import { ViewGameComponent } from './view-game/view-game.component';
import { DataTablesModule } from 'angular-datatables';
import { RandomGameDialogComponent } from './random-game-dialog/random-game-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RatingModule } from 'ng-starrating';
import { ScoresComponent } from './scores/scores.component';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [GamesComponent, AddGameComponent, ViewGameComponent, RandomGameDialogComponent, ScoresComponent],
  imports: [
    CommonModule,
    FormsModule,
    GameRoutingModule,
    MatDialogModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    DataTablesModule,
    RatingModule,
    NgImageSliderModule
  ],
  exports: [RandomGameDialogComponent],
  providers: [GameService, MasterService],
  entryComponents: [
    RandomGameDialogComponent
  ]
})
export class GamesModule { }
