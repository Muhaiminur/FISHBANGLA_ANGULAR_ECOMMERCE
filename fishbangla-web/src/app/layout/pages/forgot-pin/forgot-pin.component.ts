import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from './../../../services/dialog.service';
import { AuthService } from './../../../services/auth.service';
import { AppConfigService } from './../../../services/app-config.service';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.css']
})
export class ForgotPinComponent implements OnInit {
  hideOld = true;
  hideNew = true;
  returnUrl: string;
  fpForm: FormGroup;
  serverUrl: string;
  optionFailed = {
    textTitle: 'লক্ষ্য করুন',
    textBody: 'আপনার প্রদত্ত বর্তমান পিনটি সঠিক হয়, অনুগ্রহ করে সঠিক পিনটি প্রদান করুন',
    textCancel: null,
    textConfirm: 'ঠিক আছে'
  }

  optionSuccess = {
    textTitle: 'লক্ষ্য করুন',
    textBody: 'পিন পরিবর্তন সফল হয়েছে',
    textCancel: null,
    textConfirm: 'ঠিক আছে'
  }

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private authService: AuthService, private appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    /* Previous page redirection */
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    /* Form Validation */
    this.fpForm = new FormGroup({
      pinOldFormControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('^[0-9]+$')
      ]),
      pinNewFormControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('^[0-9]+$')
      ])
    });

  }

  get pinOldFormControl() {
    return this.fpForm.get('pinOldFormControl') as FormControl;
  }

  get pinNewFormControl() {
    return this.fpForm.get('pinNewFormControl') as FormControl;
  }

  fpFormSubmit(): void {
    if (this.fpForm.valid) {
      this.changePin(this.pinOldFormControl, this.pinNewFormControl);
    }
  }

  private changePin(oldPin: any, newPin: any) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const url = this.serverUrl + "fbmobile/pin/change";
      this.http.post(url,
        JSON.stringify({
          userId: this.authService.currentUserValue.userId,
          oldPin: this.pinOldFormControl.value,
          newPin: this.pinNewFormControl.value
        })
      ).subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 500) {
          this.dialogService.open(this.optionFailed);
        } else {
          this.dialogService.open(this.optionSuccess);
          this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
              this.router.navigate([this.returnUrl]);
            }
          });
        }
      });
    }
  }


}
