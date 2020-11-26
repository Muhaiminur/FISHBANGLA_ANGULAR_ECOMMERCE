import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogYesNoComponent } from '../../shared/dialog-yes-no/dialog-yes-no.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-sellable-products',
  templateUrl: './sellable-products.component.html',
  styleUrls: ['./sellable-products.component.css']
})
export class SellableProductsComponent implements OnInit {

  currentUser: User;
  own_list: Own_product[];
  nodata: boolean = true;
  stars: number[] = [1, 2, 3, 4, 5];
  unit_name: string;
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
  validation = {
    textTitle: 'সব তথ্য পূরণ করুন',
    textBody: '',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  constructor(private authService: AuthService, private http: HttpClient, private dialogService: DialogService, private matDialog: MatDialog, private router: Router, private route: ActivatedRoute, private appConfig: AppConfigService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_Own_product();
  }
  //get own product list
  private get_Own_product() {
    const url = this.serverUrl +"fbmobile/product/activeInactive/all/seller";
    this.http.post(url,
      JSON.stringify({
        userId: this.currentUser.userId.toString(),
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata = false;
          this.own_list = resJSON.data;
        } else {
          this.nodata = true;
        }
        console.log(this.own_list.length)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  unit_check(unitType: string) {
    if (unitType == "KG") {
      this.unit_name = "কেজি";
    } else if (unitType == "GRAM") {
      this.unit_name = "গ্রাম";
    } else if (unitType == "PIECE") {
      this.unit_name = "পিস";
    }
    return this.unit_name;
  }

  //product status to bangla
  public product_status(s: string) {
    let order_status = "প্রক্রিয়াধীন";
    switch (s) {
      case "approved":
        order_status = "অনুমোদিত";
        break;
      case "cancelled":
        order_status = "অনুমোদিত নয়";
        break;
      case "pending":
        order_status = "প্রক্রিয়াধীন";
        break;
      default:
        order_status = "প্রক্রিয়াধীন";
        break;
    }
    return order_status;
  }

  //product token to bangla
  public product_active_check(s: string) {
    let product_active = false;
    switch (s) {
      case "ACTIVE":
        product_active = true;
        break;
      case "INACTIVE":
        product_active = false;
        break;
      default:
        product_active = false;
        break;
    }
    return product_active;
  }

  //product token change
  product_active_change(value, pro_id): void {
    this.validation.textTitle = "আপনি কি পরিবর্তন করতে চান?";
    this.validation.textBody = "";
    this.validation.textCancel = "না";
    this.validation.textConfirm = "ঠিক আছে";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.validation;
    //dialogConfig.direction = "rtl";
    const dialogRef = this.matDialog.open(DialogYesNoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      let ok = result;
      if (ok.length != null && ok.length > 0) {
        if (value.checked === true) {
          this.product_token_change(pro_id, "ACTIVE");
        } else {
          this.product_token_change(pro_id, "INACTIVE");
        }
      }
    });

  }
  //product token change
  private product_token_change(pro_id: string, token: string) {
    const url = this.serverUrl +"fbmobile/product/tokenUpdate";
    this.http.post(url,
      JSON.stringify({
        userId: this.currentUser.userId.toString(),
        productToken: token,
        productId: pro_id,
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        window.location.reload()
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //go to new product
  new_product() {
    this.router.navigate(['/sell']);
  }

}
export interface Own_product {
  productId: string;
  upazillaName: string;
  districtName: string;
  userFullName: string;
  unitSize: string;
  divisionName: string;
  appMenuTitle: string;
  productStatus: string;
  maxUnitQty: string;
  userId: number;
  productName: string;
  avgWeightUnit: string;
  unitType: string;
  productToken: string;
  productPostType: string;
  price: string;
  productPicture: string;
  productVideo: string;
  avgWeight: string;
  productRating: string;
  minUnitQty: string;
}
