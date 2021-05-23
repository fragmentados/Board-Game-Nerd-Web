import { ViewGameComponent } from './view-game/view-game.component';
import { AddGameComponent } from './add-game/add-game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent
  },
  {
    path: 'addGame',
    component: AddGameComponent
  },
  {
    path: 'viewGame/:id',
    component: ViewGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
