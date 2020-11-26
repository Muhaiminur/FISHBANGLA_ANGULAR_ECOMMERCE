import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoaderService } from '../../../services/loader.service';
import { IssueName } from '../../../interfaces/issuename';
import { FormControl, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog.service'
import { AuthService } from 'src/app/services/auth.service';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  response: any;
  code: any;
  issue_list: IssueName[];
  selected_issue: string;
  selected_issue_warning = new FormControl('', [Validators.required]);
  issue_message = new FormControl('', [Validators.required]);
  login_id: any;
  serverUrl: string;
  options = {
    textTitle: 'আপনার অনুরোধটি সফলভাবে পাঠানো হয়েছে',
    textBody: 'প্রয়োজন হলে আপনার সাথে যোগাযোগ করা হবে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };
  loginoption = {
    textTitle: 'আপনার একাউন্ট এ লগইন করুন',
    textBody: 'আপনার একাউন্ট এ লগইন করুন',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  constructor(private http: HttpClient, public loaderService: LoaderService, private dialogService: DialogService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit() {
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_issuelist();
    this.login_id = this.authService.currentUserValue?.userId;
  }
  //get issuelist for dropdown
  private get_issuelist() {
    const url = this.serverUrl +"fbmobile/userIssue/all";
    this.http.post(url, null).subscribe(r => {
      this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      this.code = resJSON.code;
      if (this.code === 200) {
        this.issue_list = resJSON.data;
      }
    });
  }
  //button work from html
  public send_issue(value) {
    if (this.issue_message.valid && this.selected_issue_warning.valid && this.login_id != null) {
      this.send_issue_url(this.login_id, this.selected_issue, value)
    } else if (this.login_id == null) {
      this.dialogService.open(this.loginoption);
    } else {
      this.loginoption.textBody = "সব তথ্য পূরণ করুন";
      this.loginoption.textTitle = "সব তথ্য পূরণ করুন";
      this.dialogService.open(this.loginoption);
    }
  }


  // sending issue api
  public send_issue_url(userid: string, issueid: string, issue_mes: string): any {
    const url = this.serverUrl +"fbmobile/userRequest/create";
    this.http.post(url,
      JSON.stringify({
        userId: userid,
        userIssueId: issueid,
        userMessage: issue_mes
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        //console.log(resJSON.data);
        this.dialogService.open(this.options);
        this.clear();
        return true;
      } else {
        return false;
      }
    })
  }

  //clear field after sending issue
  clear() {
    this.selected_issue = null;
    this.issue_message.reset();
  }


  // public getlogin() {
  //   if (window.localStorage) {
  //     // localStorage supported
  //     if (localStorage.length > 0) {
  //       // We have items
  //       let loginjson = JSON.parse(localStorage.getItem('currentUser'));
  //       console.log(loginjson);
  //       this.login_id = this.authService.currentUserValue.userId;
  //       console.log(this.login_id);
  //     } else {
  //       // No items
  //     }
  //   }
  // }
}
