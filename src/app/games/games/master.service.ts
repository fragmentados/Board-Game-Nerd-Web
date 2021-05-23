import { BACKEND_URL, BACKEND_MOCKED } from './../../models/service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Masters } from 'src/app/models/masters/masters.model';

@Injectable()
export class MasterService {

  constructor(private http: HttpClient) { }

  private masterUrl = BACKEND_URL + 'masters';

  public getMasters() {
    if (BACKEND_MOCKED) {
      return this.http.get<Masters>('assets/mocks/masters.json');
    } else {
      return this.http.get<Masters>(this.masterUrl);
    }
  }
}
