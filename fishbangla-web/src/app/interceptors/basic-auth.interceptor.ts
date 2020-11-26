import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './../services/app-config.service';
import { AuthService } from './../services/auth.service';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  userId: string;

  constructor(
    private appConfig: AppConfigService,
    private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler): Observable<HttpEvent<unknown>> {
      const currentUser = this.authService.currentUserValue;
      if (currentUser){
        this.userId = this.authService.currentUserValue.userId;
      } else {
        this.userId = "8800000000000";
      }
      
      const modified = request.clone({ 
        setHeaders: { 
          "Access-Control-Allow-Origin" : "*",
          "Authorization": "Basic " + btoa("Gtech:Gtechfbv2"),
          "Content-Type" : "application/json;charset=UTF-8",
          "usersId"      : this.userId,
          "token"        : "fake-fcm-token-from-sujan-angular"
        } 
      });
      return next.handle(modified);
  }
}
