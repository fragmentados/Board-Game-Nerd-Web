import { Purchase } from './../../models/purchases/purchase.model';
import { PurchasesService } from './../purchases.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANG } from 'src/app/models/service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchases: Purchase[];
  dtOptions: DataTables.Settings = {
    paging: false,
    searching: false,
    ordering: false
  };
  dtTrigger: Subject<Purchase> = new Subject();

  constructor(private service: PurchasesService, private translate: TranslateService) {
    this.translate.setDefaultLang(DEFAULT_LANG);
  }

  ngOnInit() {
    this.service.getPurchases().subscribe(data => {
      this.purchases = data;
      this.dtTrigger.next();
    });
  }

  summedAmount(): number {
    return this.purchases.map(p => p.amount).reduce((a, b) => a + b);
  }

}
