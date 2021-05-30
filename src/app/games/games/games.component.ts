import { ImageService } from './../../image.service';
import { RandomGameDialogComponent } from './../random-game-dialog/random-game-dialog.component';
import { MasterService } from './master.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Game } from 'src/app/models/games/game.model';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from './games.service';
import { DEFAULT_LANG } from 'src/app/models/service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Masters } from 'src/app/models/masters/masters.model';
import { ApplicationStateService } from 'src/app/application-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnDestroy, OnInit  {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  games: Game[];
  masters: Masters;
  dtOptions: DataTables.Settings = {
    paging: false,
    responsive: true
  };
  dtTrigger: Subject<Game> = new Subject();
  players: number;
  complexity: string;
  victory: string;
  theme: string;
  medium: string;
  duration: number;
  isMobile = false;
  showForgottenGames: boolean;
  showBestScoredGames: boolean;

  constructor(private translate: TranslateService, private service: GameService, private masterService: MasterService,
              private appStateService: ApplicationStateService, private router: Router, public dialog: MatDialog,
              public imageService: ImageService) {
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.isMobile = this.appStateService.getIsMobileResolution();
  }

  ngOnInit() {
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      return this.isValidGameOnFilter(data);
    });
    this.service.getGames()
      .subscribe( data => {
        this.games = data;
        this.dtTrigger.next();
      });
    this.masterService.getMasters().subscribe(data => this.masters = data);
    this.dtOptions = {
      paging: false,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.viewGame(data);
        });
        return row;
      }
    };
  }

  viewGame(data) {
    this.router.navigate(['/games/viewGame/' + data[0]]);
  }

  ngOnDestroy(): void {
    $.fn['dataTable'].ext.search.pop();
  }

  filter() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  randomGame() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      const tableData = dtInstance.data().filter(data => this.isValidGameOnFilter(data));
      const randomGame = tableData[Math.floor(Math.random() * tableData.length)];
      const dialogRef = this.dialog.open(RandomGameDialogComponent, {
        width: '800px',
        height: '800px',
        data: randomGame[0]
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.randomGame();
        }
      });
    });
  }

  isValidGameOnFilter(data): boolean {
    const minPlayers = parseFloat(data[3]) || 0;
    const maxPlayers = parseFloat(data[4]) || 0;
    const victoryRow = data[5];
    const complexityRow = data[6];
    const themeRow = data[8];
    const durationRow = parseFloat(data[9].substring(0, data[9].indexOf(' '))) || 0;
    const lastPlayedRow = data[10];
    const lastPlayedMoment = moment(lastPlayedRow, 'DD/MM/YYYY');
    const twoMonthsAgoMoment = moment(new Date(), 'DD/MM/YYYY').subtract(2, 'month');
    const avgScoreRow = data[11];
    const mediumRow = data[13];
    if (!this.showForgottenGames || (!lastPlayedRow) || (lastPlayedMoment <= twoMonthsAgoMoment)) {
      if (!this.showBestScoredGames || (!avgScoreRow) || (avgScoreRow >= 4)) {
        if ((!this.players || isNaN(this.players)) || (minPlayers <= this.players && maxPlayers >= this.players)) {
          if ((!this.complexity) || (complexityRow === this.complexity)) {
            if ((!this.victory) || (victoryRow === this.victory)) {
              if ((!this.theme) || (themeRow === this.theme)) {
                if ((!this.duration) || (durationRow <= this.duration)) {
                  if ((!this.medium) || (mediumRow === this.medium)) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }

  clearFilter() {
    this.players = undefined;
    this.victory = undefined;
    this.complexity = undefined;
    this.theme = undefined;
    this.duration = undefined;
    const elm = document.getElementById('DataTables_Table_0_filter');
    if (elm) {
      elm.remove();
    }
    this.showForgottenGames = false;
    this.filter();
  }

}
