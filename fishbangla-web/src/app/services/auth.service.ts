import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from './../services/dialog.service';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  //returnUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService, private appConfig: AppConfigService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userPhone: string, userOtpPin: string): any {
    const url = this.appConfig.getServerUrl() + "fbmobile/login";
    this.http.post(url,
      JSON.stringify({
        phone: userPhone,
        userOtpPin: userOtpPin
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        localStorage.setItem('currentUser', JSON.stringify(resJSON.data));
        //this.router.navigate([this.returnUrl]);
        this.router.navigate(['/']);
        window.location.reload();
      } else {
        //console.error('login failed');
        const options = {
          textTitle: 'লক্ষ্য করুন',
          textBody: 'ব্যবহারকারী বা পাসওয়ার্ড সঠিক নয়',
          textCancel: 'না',
          textConfirm: 'ঠিক আছে'
        };
        this.dialogService.open(options);
        this.dialogService.confirmed().subscribe(confirmed => {
          //if (confirmed) {
          //this.saveData();
          //}
        });
      }
    });
  }

  //saveData(){
  //alert('Confirmation Received');
  //}

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
    window.location.reload();
  }

}
