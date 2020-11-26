import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationModel } from 'src/app/interfaces/notificationModel';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  response: any;
  code: any;
  notification_list: NotificationModel[];
  login_id: any;
  serverUrl: string;
  loginoption = {
    textTitle: 'আপনার একাউন্ট এ লগইন করুন',
    textBody: 'আপনার একাউন্ট এ লগইন করুন',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  options = {
    textTitle: 'ডিলিট',
    textBody: 'নোটিফিকেশন টি ডিলিট করা হয়েছে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  constructor(private http: HttpClient, public loaderService: LoaderService, private dialogService: DialogService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.login_id = this.authService.currentUserValue?.userId;
    this.get_notificationList();
  }


  //get NotificationList for dropdown
  private get_notificationList() {
    const url = this.serverUrl + "fbmobile/profile/notification/all?page=0&size=100";
    this.http.post(url, null).subscribe(r => {
      this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      this.code = resJSON.code;
      if (this.code === 200) {
        this.notification_list = resJSON.data;
      }
    });
  }

  //delete notification
  delete_notification(key) {
    console.log(this.notification_list[key]);
    this.send_updateStatus(this.notification_list[key].notificationId, "REMOVE")
  }

  update_notification(key) {
    console.log(this.notification_list[key]);
    this.send_updateStatus(this.notification_list[key].notificationId, "READ")
  }

  update_all_notification() {
    this.send_updateStatus("all", "READ")
  }

  // sending issue api
  public send_updateStatus(notificationId: string, updateStatus: string): any {
    const url = this.serverUrl + "fbmobile/profile/notification/update";
    this.http.post(url,
      JSON.stringify({
        notificationId: notificationId,
        updateStatus: updateStatus
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        //console.log(resJSON.data);
        //this.dialogService.open(this.options);
        window.location.reload();
        return true;
      } else {
        return false;
      }
    })
  }

}
