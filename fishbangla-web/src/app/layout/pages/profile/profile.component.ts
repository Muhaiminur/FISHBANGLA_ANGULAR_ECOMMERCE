import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';

import { AppConfigService } from './../../../services/app-config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  response: any;
  code: any;
  login_id: any;
  profile_details: Profile;
  serverUrl: string;
  constructor(private http: HttpClient, public loaderService: LoaderService, private dialogService: DialogService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.login_id = this.authService.currentUserValue?.userId;
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_profiledetails();
  }
  //get issuelist for dropdown
  private get_profiledetails() {
    const url = this.serverUrl + "fbmobile/userProfile";
    this.http.post(url,
      JSON.stringify({
        userId: this.login_id
      })).subscribe(r => {
        this.response = r;
        let resSTR = JSON.stringify(r);
        let resJSON = JSON.parse(resSTR);
        this.code = resJSON.code;
        if (this.code === 200) {
          this.profile_details = resJSON.data;
          console.log(this.profile_details.userFullName)
        }
      });
  }

}
export interface Profile {
  userImage: string;
  beingFollowed: string;
  userPhoneNo: string;
  userFullName: string;
  userEmail: string;
  avgRating: string;
  userId: string;
}

