import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { User } from 'src/app/interfaces/user';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {
  response: any;
  public seller_id;
  public seller_details: { userImage: string, beingFollowed: string, userPhoneNo: string, userFullName: string, userEmail: string, avgRating: string, userId: string };
  public suggestion_list: FishProduct[];
  stars: number[] = [1, 2, 3, 4, 5];
  same_user: boolean = false;
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
  constructor(private http: HttpClient, public loaderService: LoaderService, private route: ActivatedRoute, private dialogService: DialogService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.seller_id = id;
    });
    this.get_sellerdatails(this.seller_id);
    this.get_sellerproduct_suggestion(this.seller_id);
    this.login_id = this.authService.currentUserValue?.userId;
    if (this.login_id == this.seller_id) {
      this.same_user = true;
    }
  }


  //get filter seller list
  private get_sellerdatails(userid: string) {
    const url = this.serverUrl +"fbmobile/userProfile";
    this.http.post(url,
      JSON.stringify({
        userId: userid
      })
    )
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.seller_details = resJSON.data;
          //this.seller_name=resJSON.data.userFullName;
        } else {
          return false;
        }
      })
  }

  //get seller fish product
  private get_sellerproduct_suggestion(userid: string) {
    const url = this.serverUrl +"fbmobile/product/all/seller";
    this.http.post(url,
      JSON.stringify({
        userId: userid
      })
    )
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.suggestion_list = resJSON.data;
        } else {
          return false;
        }
      })
  }
  //button work for follow
  user_follow() {
    if (this.login_id != null && this.login_id.length > 0) {
      this.send_user_follow();
    } else if (this.login_id == null) {
      this.dialogService.open(this.loginoption);
    }
  }

  //send follow request
  private send_user_follow() {
    const url = this.serverUrl +"fbmobile/follow";
    this.http.post(url,
      JSON.stringify({
        userId: this.seller_id,
        followerId: this.login_id,
      })
    )
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.get_sellerdatails(this.seller_id);
        } else {
          return false;
        }
      })
  }
  //button work for follow
  user_unfollow() {
    if (this.login_id != null && this.login_id.length > 0) {
      this.send_user_unfollow();
    } else if (this.login_id == null) {
      this.dialogService.open(this.loginoption);
    }
  }

  //send unfollow request
  private send_user_unfollow() {
    const url = this.serverUrl +"fbmobile/unfollow";
    this.http.post(url,
      JSON.stringify({
        userId: this.seller_id,
        followerId: this.login_id,
      })
    )
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.get_sellerdatails(this.seller_id);
        } else {
          return false;
        }
      })
  }

}
