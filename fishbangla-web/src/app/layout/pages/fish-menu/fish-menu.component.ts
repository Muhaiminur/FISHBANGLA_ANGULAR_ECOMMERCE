import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../shared/filter-dialog/filter-dialog.component';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-fish-menu',
  templateUrl: './fish-menu.component.html',
  styleUrls: ['./fish-menu.component.css']
})
export class FishMenuComponent implements OnInit {
  menu_id: string;
  menu_fish_list_retails: FishProduct[];
  menu_fish_list_wholesale: FishProduct[];
  nodata_retail: boolean = true;
  nodata_wholesale: boolean = true;
  serverUrl: string;
  validation = {
    textTitle: 'সব তথ্য পূরণ করুন',
    textBody: '',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private dialogService: DialogService, private matDialog: MatDialog, public authService: AuthService,private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.menu_id = id;
      this.get_menu_list_retails(this.menu_id);
      this.get_menu_list_wholesale(this.menu_id)
    });
  }
  //fish filter
  fish_filter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      productId: "",
      divId: "",
      avg_weight: "",
      price: ""
    };
    const dialogRef = this.matDialog.open(FilterDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      let ok = result;
      //console.log(ok);
      //console.log(result.productId, result.divId, result.avg_weight, result.price);
      let price = "";
      let divId = "";
      let avg_weight = "";
      let productId = "";
      if (result.price == "") {
        console.log("price nai");
      } else {
        price = result.price.toString();
      }
      if (result.divId == "") {
        console.log("div nai");
      } else {
        divId = result.divId.toString();
      }
      if (result.avg_weight == "") {
        console.log("weight nai");
      } else {
        avg_weight = result.avg_weight.toString();
      }
      if (result.productId == "") {
        console.log("pro nai");
      } else {
        productId = result.productId.toString();
      }
      console.log(productId, divId, avg_weight, price);
      this.filter_list_retails(price, avg_weight, productId, divId);
      this.filter_list_wholesale(price, avg_weight, productId, divId);
    });
  }

  //get menu product list retails
  private get_menu_list_retails(menuid: string) {
    const url = this.serverUrl+"fbmobile/product/list/appMenuPostType";
    this.http.post(url,
      JSON.stringify({
        appMenuId: menuid,
        postTypeId: "1"
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata_retail = false;
          this.menu_fish_list_retails = resJSON.data;
        } else {
          this.nodata_retail = true;
        }
        console.log(this.menu_fish_list_retails)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //get menu product list wholesake
  private get_menu_list_wholesale(menuid: string) {
    const url = this.serverUrl+"fbmobile/product/list/appMenuPostType";
    this.http.post(url,
      JSON.stringify({
        appMenuId: menuid,
        postTypeId: "2"
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata_wholesale = false;
          this.menu_fish_list_wholesale = resJSON.data;
        } else {
          this.nodata_wholesale = true;
        }
        console.log(this.menu_fish_list_retails)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //filter list retails
  private filter_list_retails(price: string, weight: string, product: string, div: string) {
    console.log("sending"+price+" "+weight+" "+product+" "+div);
    const url = this.serverUrl+"fbmobile/product/filter/throughAll";
    this.http.post(url,
      JSON.stringify({
        minPriceRange: "0",
        maxPriceRange: price.toString(),
        minAvgWeight: "0",
        maxAvgWeight: weight.toString(),
        productMenuId: product.toString(),
        appMenuId: this.menu_id,
        divisionId: div.toString(),
        postTypeId: "1"
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata_retail = false;
          this.menu_fish_list_retails = resJSON.data;
        } else {
          this.nodata_retail = true;
        }
        console.log(this.menu_fish_list_retails)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //filter list wholesale
  private filter_list_wholesale(price: string, weight: string, product: string, div: string) {
    const url = this.serverUrl+"fbmobile/product/filter/throughAll";
    this.http.post(url,
      JSON.stringify({
        minPriceRange: "0",
        maxPriceRange: price,
        minAvgWeight: "0",
        maxAvgWeight: weight,
        productMenuId: product,
        appMenuId: this.menu_id,
        divisionId: div,
        postTypeId: "2"
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata_wholesale = false;
          this.menu_fish_list_wholesale = resJSON.data;
        } else {
          this.nodata_wholesale = true;
        }
        console.log(this.menu_fish_list_retails)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }
}
