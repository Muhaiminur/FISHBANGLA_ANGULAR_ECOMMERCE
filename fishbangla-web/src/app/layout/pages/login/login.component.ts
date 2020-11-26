import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { HttpClient } from "@angular/common/http";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DialogService } from './../../../services/dialog.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  regForm: FormGroup;
  returnUrl: string;
  matTabIndex: number = 0;
  serverUrl: string;
  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService, private appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    /* loginForm */
    this.loginForm = new FormGroup({
      mobileFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('01[3456789][0-9]{8}')
      ]),
      pinFormControl: new FormControl('', [
        Validators.required
      ])
    });

    /* regForm */
    this.regForm = new FormGroup({
      regmobFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern('01[3456789][0-9]{8}')
      ])
    });

    /* Redirect previous page, if user logged in */
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate([this.returnUrl]);
    }
  }

  get mobileFormControl() {
    return this.loginForm.get('mobileFormControl') as FormControl;
  }

  get pinFormControl() {
    return this.loginForm.get('pinFormControl') as FormControl;
  }

  get regmobFormControl() {
    return this.regForm.get('regmobFormControl') as FormControl;
  }

  loginFormSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.mobileFormControl.value, this.pinFormControl.value);
    }
  }

  regFormSubmit(): void {
    if (this.regForm.valid) {
      this.createPin();
    }
  }

  newMatIndex = (tabChangeEvent: MatTabChangeEvent): void => {
    //console.log('tabChangeEvent => ', tabChangeEvent); 
    //console.log('index => ', tabChangeEvent.index); 
    //this.matTabIndex = 0;
    this.matTabIndex = tabChangeEvent.index;
  }

  createPin() {
    const url = this.serverUrl + "fbmobile/pin/create";
    this.http.post(url,
      JSON.stringify({
        phone: this.regmobFormControl.value
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.data === 'OLDUSER') {
        this.updatePin();
      } else {
        const options = {
          textTitle: 'লক্ষ্য করুন',
          textBody: 'নতুন পিনটি আপনার কাছে এসএমএস আকারে আপনার দেওয়া মোবাইল নম্বরে প্রদান করা হয়েছে। অনুগ্রহ করে মোবাইল নম্বর ও পিনটি ব্যবহার করে লগইন করুন',
          textCancel: null,
          textConfirm: 'ঠিক আছে'
        };
        this.dialogService.open(options);
        this.dialogService.confirmed().subscribe(confirmed => {
          if (confirmed) {
            this.matTabIndex = 0;
          }
        });
      }
    })
  } //create

  updatePin() {
    const url = this.serverUrl + "fbmobile/pin/forgot";
    this.http.post(url,
      JSON.stringify({
        phone: this.regmobFormControl.value
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        const options = {
          textTitle: 'লক্ষ্য করুন',
          textBody: 'আপনার পুরাতন পিনটি সিস্টেম থেকে পরিবর্তিত হয়েছে। নতুন পিনটি ব্যবহার করে লগইন করুন',
          textCancel: null,
          textConfirm: 'ঠিক আছে'
        };
        this.dialogService.open(options);
        this.dialogService.confirmed().subscribe(confirmed => {
          //console.info(this.matTabIndex);
          if (confirmed) {
            this.matTabIndex = 0;
          }
        });
      } else {
        const options = {
          textTitle: 'লক্ষ্য করুন',
          textBody: 'নেটওয়ার্কজনিত কিছু সমস্যা হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন',
          textCancel: null,
          textConfirm: 'ঠিক আছে'
        };
        this.dialogService.open(options);
        this.dialogService.confirmed().subscribe(confirmed => {
          if (confirmed) {
            this.router.navigate(['/']);
          }
        });
      }
    })
  } //update

}
