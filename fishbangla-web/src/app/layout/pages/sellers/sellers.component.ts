import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductName } from 'src/app/interfaces/productname';
import { SellerModel } from 'src/app/interfaces/sellermodel';
import { Router, ActivatedRoute } from "@angular/router";
import { LoaderService } from 'src/app/services/loader.service';
import { FishnamelistService } from 'src/app/services/fishnamelist.service';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  response: any;
  product_name: ProductName[];
  selected_product: string;
  seller_lists: SellerModel[];
  backup_seller_lists: SellerModel[];
  stars: number[] = [1, 2, 3, 4, 5];
  nodata: boolean = false;
  serverUrl: string;
  constructor(private http: HttpClient, public loaderService: LoaderService, private router: Router, private route: ActivatedRoute, private fishnamelist: FishnamelistService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_sellerlist();
    this.get_productname();
  }
  //get product name for dropdown
  private get_productname() {
    this.product_name = this.fishnamelist.get_productname();
  }
  //get seller list
  private get_sellerlist() {
    const url = this.serverUrl + "fbmobile/seller/all/";
    this.http.post(url, null)
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.seller_lists = resJSON.data;
          this.backup_seller_lists = resJSON.data;
          if (this.seller_lists.length == 0) {
            this.nodata = false;
          }
          return true;
        } else {
          return false;
        }
      })
  }
  //get from fish name selection
  seller_filter_drop() {
    this.get_filtersellerlist(this.selected_product);
  }

  //get filter seller list
  private get_filtersellerlist(userid: string) {
    const url = this.serverUrl + "fbmobile/seller/filter";
    this.http.post(url,
      JSON.stringify({
        productMenuId: userid
      })
    )
      .subscribe(res => {
        (this.response = res)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.seller_lists = resJSON.data;
          this.backup_seller_lists = resJSON.data;
          //console.log(this.seller_lists[0].userFullName);
          if (this.seller_lists.length == 0) {
            this.nodata = true;
          }
          return true;
        } else {
          return false;
        }
      })
  }

  // search seller name
  public updatesellername(value) {
    this.seller_lists = this.backup_seller_lists;
    console.log(this.seller_lists.filter(seller => seller.userFullName.includes(value)));
    //console.log(this.seller_lists..userFullName.includes(value));
    this.seller_lists = this.seller_lists.filter(seller => seller.userFullName.toString().toLowerCase().indexOf(value) > -1);
    if (this.seller_lists.length == 0) {
      this.nodata = true;
    } else {
      this.nodata = false;
    }
  }

  //go to seller details page
  public seller_details_page(seller) {
    //this.router.navigate(['/seller-details', seller.userId]);
    this.router.navigate(['/seller-details', seller.userId], { relativeTo: this.route });
  }
}
