import { Component, OnInit } from '@angular/core';
import { ProductName } from 'src/app/interfaces/productname';
import { HttpClient } from '@angular/common/http';
import { FishnamelistService } from 'src/app/services/fishnamelist.service';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  nodata: boolean = false;
  product_name: ProductName[];
  selected_product: string;
  public product_list: FishProduct[] = [];
  serverUrl: string;
  constructor(private http: HttpClient, private fishnamelist: FishnamelistService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.product_name = this.fishnamelist.get_productname();
  }
  //get from fish name selection
  seller_filter_drop() {
    this.get_searchlist(this.selected_product);
  }
  //get search product list
  private get_searchlist(productid: string) {
    const url = this.serverUrl +"fbmobile/product/all/filter/productMenu";
    this.http.post(url,
      JSON.stringify({
        productMenuId: productid
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          if (resJSON.data.length > 0) {
            this.product_list = [];
            this.nodata = false;
            for (var i = 0; i < resJSON.data.length; i++) {
              this.product_list.push(resJSON.data[i]);
            }
          } else {
            this.nodata = true;
          }
          return true;
        } else {
          return false;
        }
      })
  }

}
