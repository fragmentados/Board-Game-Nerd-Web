import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'games', loadChildren: './games/games.module#GamesModule' },
  { path: 'purchases', loadChildren: './purchases/purchases.module#PurchasesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
