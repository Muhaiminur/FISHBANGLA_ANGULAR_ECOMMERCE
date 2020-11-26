/* Service - fetching  /assets/config/config.json */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: any;
  constructor(private http: HttpClient) {}
  loadAppConfig() {
    return this.http
      .get('/assets/config/config.json')
      .toPromise()
      .then((result: any) => {
        this.appConfig = result;
      })
      .catch((error: HttpErrorResponse ) => {
        this.appConfig = '';
        console.error(error);
    })
  }

  getServerUrl(): string {
    return this.appConfig.api_uri;
  }

  getServerUsername(): string{
    return this.appConfig.api_username;
  }

  getServerPassword(): string{
    return this.appConfig.api_password;
  }
}
