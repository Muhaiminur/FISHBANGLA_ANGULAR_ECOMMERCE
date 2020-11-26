import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './../../../services/app-config.service';

@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.css']
})
export class BuyHistoryComponent implements OnInit {

  login_id: any;
  public buy_list: BuyHistory[];
  nodata: boolean = true;
  panelOpenState = false;
  displayedColumns: string[] = ['name', 'weight', 'price'];
  order_status: string = "প্রক্রিয়াধীন";
  serverUrl: string;
  constructor(public authService: AuthService, private http: HttpClient, public loaderService: LoaderService,private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.login_id = this.authService.currentUserValue?.userId;
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_buy_history(this.login_id);
  }


  //get Buy History
  private get_buy_history(userId: string) {
    const url = this.serverUrl+"fbmobile/order/history/buy";
    this.http.post(url,
      JSON.stringify({
        userId: userId
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          if (resJSON.data.length > 0) {
            this.nodata = false;
            this.buy_list = resJSON.data;
          } else {
            this.nodata = true;
          }
          console.log(this.buy_list.length)
        } else {
          return false;
        }
      })
  }
  //order stattus to bangla
  public convert_order(s: string) {
    switch (s) {
      case "ACCEPTED":
        this.order_status = "গ্রহণ হয়েছে";
        break;
      case "CANCELLED":
        this.order_status = "বাতিল";
        break;
      case "PENDING":
        this.order_status = "পেন্ডিং";
        break;
      case "PROCESSED":
        this.order_status = "প্রক্রিয়াধীন";
        break;
      case "ON_WAY":
        this.order_status = "বিতরণের পথে";
        break;
      case "DELIVERED":
        this.order_status = "ডেলিভারি হয়েছে";
        break;
      default:
        this.order_status = "কোনো তথ্য পাওয়া যাই নি";
        break;
    }
    return this.order_status;
  }

}

export interface BuyHistory {
  oderDate: string;
  iceQty: string;
  icePrice: string;
  upazillaName: string;
  districtName: string;
  productVat: string;
  userFullName: string;
  divisionName: string;
  deliveryCharge: string;
  discountAmount: string;
  orderStatus: string;
  totalAfterDiscount: string;
  userId: string;
  nearbyLandmark: string;
  transactionId: string;
  paymentType: string;
  products: ProductsElement[];
  userAddress: string;
  totalAmount: string;
  serviceCharge: string;
  userVillage: string;
  subtotal: string;
  paymentStatus: string;
}
export interface ProductsElement {
  unitType: string;
  price: string;
  unitSize: string;
  productName: string;
}

