import { BACKEND_URL, BACKEND_MOCKED } from './../models/service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/purchases/purchase.model';

@Injectable()
export class PurchasesService {

  constructor(private http: HttpClient) { }

  private purchaseUrl = BACKEND_URL + 'purchases';

  public getPurchases() {
    if (BACKEND_MOCKED) {
      return this.http.get<Purchase[]>('assets/mocks/purchases.json');
    } else {
      return this.http.get<Purchase[]>(this.purchaseUrl);
    }
  }
}
