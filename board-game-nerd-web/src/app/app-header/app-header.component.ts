import { BACKEND_MOCKED } from './../models/service';
import { ConstantService } from './constant.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../application-state.service';
import { DEFAULT_LANG, BACKEND_URL } from '../models/service';
import { Constants } from '../models/constants.model';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  isMobile = false;
  constants: Constants;
  isBackendMocked = BACKEND_MOCKED;

  constructor(private translate: TranslateService, private router: Router, private appState: ApplicationStateService,
              private constantService: ConstantService, public imageService: ImageService) {
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.isMobile = this.appState.getIsMobileResolution();
  }

  ngOnInit() {
    this.updateLastBuyDate();
  }

  updateLastBuyDate(): void {
    this.constantService.getLastBuyDate().subscribe(data => this.constants = data);
  }

  buy() {
    this.constantService.registerPurchase().subscribe(data => {
      if (data.errorCode === 0) {
        this.updateLastBuyDate();
      }
    });
  }

  displayMobileNavBar() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'efw-topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'efw-topnav';
    }
  }
}
