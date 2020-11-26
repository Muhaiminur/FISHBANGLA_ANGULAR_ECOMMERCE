import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { AppConfigService } from './../../../services/app-config.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  product_detail: Product_details;
  public cartItems: Cart_Fish[] = [];
  product_id: string;
  unit_name: string;
  public suggestion_list: FishProduct[];
  product_unit = "0";
  product_price = "0";
  serverUrl: string;
  constructor(private http: HttpClient, public loaderService: LoaderService, private route: ActivatedRoute, private dialogService: DialogService, public authService: AuthService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      this.product_id = id;
      this.get_productdatails(this.product_id);
    });
  }



  //product add
  unit_add() {
    let temp = Number(this.product_unit).valueOf();
    if (temp < Number(this.product_detail?.maxUnitQty).valueOf()) {
      this.product_unit = ((+temp) + 1).toString();
      this.product_price = ((+this.product_detail.price) * ((+temp) + 1)).toString();
    }
  }
  //product_minus
  unit_minus() {
    let temp = Number(this.product_unit).valueOf();
    if (temp > Number(this.product_detail?.minUnitQty).valueOf()) {
      this.product_unit = ((+temp) - 1).toString();
      this.product_price = ((+this.product_detail.price) * ((+temp) - 1)).toString();
    }
  }
  //unit check for convert to bangla
  unit_check() {
    if (this.product_detail?.unitType == "KG") {
      this.unit_name = "কেজি";
    } else if (this.product_detail?.unitType == "GRAM") {
      this.unit_name = "গ্রাম";
    } else if (this.product_detail?.unitType == "PIECE") {
      this.unit_name = "পিস";
    }
  }
  //get product details
  private get_productdatails(productid: string) {
    const url = this.serverUrl + "fbmobile/product";
    this.http.post(url,
      JSON.stringify({
        productId: productid
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.product_detail = resJSON.data;
          this.unit_check();
          this.get_product_suggestion(this.product_detail?.productId);
          this.product_unit = this.product_detail?.minUnitQty;
          this.product_price = ((+this.product_detail?.price) * (+this.product_detail?.minUnitQty)).toString();
          console.log(this.product_detail);
        } else {
          return false;
        }
      })
  }
  // add or delete to fvrt
  check_fvrt() {
    let fvrt = "yes";
    if (this.product_detail?.isFavourite === 'no') {
      fvrt = "yes";
    } else if (this.product_detail?.isFavourite === 'yes') {
      fvrt = "no";
    }
    const url = this.serverUrl + "fbmobile/favourite/add";
    this.http.post(url,
      JSON.stringify({
        productId: this.product_detail?.productId,
        isFavourite: fvrt
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200 || resJSON.code === 201) {
          this.get_productdatails(this.product_id);
        } else {
          return false;
        }
      })
  }

  add_to_cart() {

    let cartItem: Cart_Fish = {
      productId: this.product_detail.productId,
      upazillaName: this.product_detail.upazillaName,
      districtName: this.product_detail.districtName,
      userFullName: this.product_detail.userFullName,
      unitSize: this.product_detail.unitSize,
      divisionName: this.product_detail.divisionName,
      appMenuTitle: this.product_detail.appMenuTitle,
      maxUnitQty: this.product_detail.maxUnitQty,
      userId: this.product_detail.userId,
      productName: this.product_detail.productName,
      avgWeightUnit: this.product_detail.avgWeightUnit,
      unitType: this.product_detail.unitType,
      productPostType: this.product_detail.productPostType,
      price: this.product_detail.price,
      productPicture: this.product_detail.productPicture[0]?.image,
      productVideo: this.product_detail.productVideo,
      avgWeight: this.product_detail.avgWeight,
      minUnitQty: this.product_detail.minUnitQty,
      productRating: this.product_detail.productRating,
      isFavourite: this.product_detail.isFavourite,
      orderQuantity: this.product_unit,
      totalPrice: this.product_price
    }
    this.cartItems = []
    console.log(this.cartItems?.length);
    let items = JSON.parse(localStorage.getItem('cart_key'));

    if (items == null) {
      console.log("found null")
      this.cartItems?.push(cartItem);
      console.log(this.cartItems?.length);
      localStorage.setItem('cart_key', JSON.stringify(this.cartItems));

    }
    else {
      items.forEach(item => {
        let product = item as Product_details
        if (cartItem.productId == product.productId) {
          console.log("already exist")
          return
        }
        this.cartItems?.push(item)
      });

      this.cartItems?.push(cartItem);
      console.log(this.cartItems?.length);
      items.forEach(item => {
        console.log(item)
      });
      localStorage.setItem('cart_key', JSON.stringify(this.cartItems));
    }
    window.location.reload();
  }

  //get fish product suggestion
  private get_product_suggestion(productid: string) {
    const url = this.serverUrl + "fbmobile/product/suggestion";
    this.http.post(url,
      JSON.stringify({
        productId: productid,
        productPostType: "all"
      })
    )
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.suggestion_list = resJSON.data;
        } else {
          return false;
        }
      })
  }

}
export interface Product_details {
  productId: string;
  upazillaName: string;
  districtName: string;
  userFullName: string;
  unitSize: string;
  divisionName: string;
  appMenuTitle: string;
  maxUnitQty: string;
  userId: string;
  productName: string;
  avgWeightUnit: string;
  unitType: string;
  productPostType: string;
  price: string;
  productPicture?: (ProductPictureEntity)[] | null;
  productVideo: string;
  avgWeight: string;
  minUnitQty: string;
  productRating: string;
  isFavourite: string;
}
export interface ProductPictureEntity {
  image: string;
}

export interface Cart_Fish {
  productId: string;
  upazillaName: string;
  districtName: string;
  userFullName: string;
  unitSize: string;
  divisionName: string;
  appMenuTitle: string;
  maxUnitQty: string;
  userId: string;
  productName: string;
  avgWeightUnit: string;
  unitType: string;
  productPostType: string;
  price: string;
  productPicture: string;
  productVideo: string;
  avgWeight: string;
  minUnitQty: string;
  productRating: string;
  isFavourite: string;
  orderQuantity: String
  totalPrice: String
}

