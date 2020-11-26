import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './../../../services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { FishProduct } from 'src/app/interfaces/fishproduct';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  serverUrl: string;
  login_id: any;
  response: any;
  code: any;
  public fvrt_list: FishProduct[];
  nodata: boolean = true;
  constructor(private http: HttpClient, public loaderService: LoaderService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.login_id = this.authService.currentUserValue?.userId;
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_fvrt_list();
  }
  get_fvrt_list() {
    const url = this.serverUrl + "fbmobile/favourite/all";
    this.http.post(url,
      JSON.stringify({
        userId: this.login_id
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          if (resJSON.data.length > 0) {
            this.nodata = false;
            this.fvrt_list = resJSON.data;
          } else {
            this.nodata = true;
          }
          console.log(this.fvrt_list.length)
        } else {
          return false;
        }
      })
  }

}
