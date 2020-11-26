import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductName } from '../interfaces/productname';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class FishnamelistService {

  product_name: ProductName[];
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  //get product name for dropdown
  public get_productname() {
    const url = this.appConfig.getServerUrl() + "fbmobile/productMenu/all";
    this.http.post(url, null).subscribe(r => {
      //this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.product_name = resJSON.data;
      }
    });
    return this.product_name;
  }
}
