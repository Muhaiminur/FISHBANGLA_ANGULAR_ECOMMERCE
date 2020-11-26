import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  response: any;
  public product_list: FishProduct[] = [];
  page = "0";
  nodata: boolean = false;
  nodata_all: boolean = false;
  serverUrl: string;
  constructor(private http: HttpClient, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_all_product();
  }

  //get all product
  private get_all_product() {
    const url = this.serverUrl + "fbmobile/product/all?page=" + this.page;
    this.http.post(url, null)
      .subscribe(res => {
        console.log(url)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          if (resJSON.data.length > 0) {
            for (var i = 0; i < resJSON.data.length; i++) {
              this.product_list.push(resJSON.data[i]);
            }
          } else {
            this.nodata_all = true;
          }
          //this.product_list = resJSON.data;
          //console.log(this.product_list)
          /* if (this.tag_list.tagData.length == 0) {
          } */
          return true;
        } else {
          return false;
        }
      })
  }

  load_more() {
    this.page = ((+this.page) + 1).toString();
    const url = this.serverUrl + "fbmobile/product/all?page=" + this.page;
    this.http.post(url, null)
      .subscribe(res => {
        console.log(url)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          if (resJSON.data.length > 0) {
            for (var i = 0; i < resJSON.data.length; i++) {
              this.product_list.push(resJSON.data[i]);
            }
          } else {
            this.nodata = true;
          }
          //this.product_list = resJSON.data;
          //console.log(this.product_list)
          /* if (this.tag_list.tagData.length == 0) {
          } */
          return true;
        } else {
          return false;
        }
      })
  }

}
