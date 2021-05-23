import { PurchasesService } from './purchases.service';
import { PurchasesRoutingModule } from './purchases-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesComponent } from './purchases/purchases.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [PurchasesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    PurchasesRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    DataTablesModule
  ],
  providers: [PurchasesService]
})
export class PurchasesModule { }
