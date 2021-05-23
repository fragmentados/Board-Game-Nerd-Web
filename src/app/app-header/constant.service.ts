import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL, BACKEND_MOCKED } from '../models/service';
import { Constants } from '../models/constants.model';
import { BackendResponse } from '../models/backendResponse.model';

@Injectable()
export class ConstantService {

  constructor(private http: HttpClient) { }

  private constantsUrl = BACKEND_URL + 'constants';

  public getLastBuyDate() {
    if (BACKEND_MOCKED) {
      return this.http.get<Constants>('assets/mocks/constants.json');
    } else {
      return this.http.get<Constants>(this.constantsUrl);
    }
  }

  public registerPurchase() {
    return this.http.post<BackendResponse>(this.constantsUrl, {});
  }

}
