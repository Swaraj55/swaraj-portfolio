import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public apiURL = '/send';
  constructor(private httpClient: HttpClient) { }

  submitInfo(payload: any) {
    return this.httpClient.post<any>(this.apiURL, payload)
  }
}
