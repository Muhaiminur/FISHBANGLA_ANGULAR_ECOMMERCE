import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { Own_product } from '../sellable-products/sellable-products.component';
import { User } from 'src/app/interfaces/user';

import { AppConfigService } from './../../../services/app-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart_Fish } from '../productdetails/productdetails.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FishProduct } from 'src/app/interfaces/fishproduct';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  tag_list: Tag_products[];
  menu_list: App_menu[];
  nodata: boolean = true;
  stars: number[] = [1, 2, 3, 4, 5];
  serverUrl: string;

  public cartItems: Cart_Fish[] = [];
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
  constructor(private http: HttpClient, private dialogService: DialogService, public authService: AuthService, private router: Router, private route: ActivatedRoute, private appConfig: AppConfigService, private _snackBar: MatSnackBar) {
    this.currentUser = this.authService.currentUserValue;
  }
  ngOnInit(): void {
    this.loadCartItems();
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_tag_list();
    this.get_menu_list();
  }

  //unit name 
  unit_check(unitType: string) {
    let unit_name;
    if (unitType == "KG") {
      unit_name = "কেজি";
    } else if (unitType == "GRAM") {
      unit_name = "গ্রাম";
    } else if (unitType == "PIECE") {
      unit_name = "পিস";
    }
    return unit_name;
  }
  //go to product page
  product_details(product_id: string) {
    this.router.navigate(['/product-details', product_id], { relativeTo: this.route });
  }

  //go to fish menu
  fish_menu(menu: App_menu) {
    if (menu.appMenuIsCatg == "YES") {
      this.router.navigate(['/fish-menu', menu.appMenuId], { relativeTo: this.route });
    }
  }
  //go to fish auction
  fish_auction() {
    this.router.navigate(['/auction']);
  }
  //go to fish request
  fish_request() {
    this.router.navigate(['/request']);
  }
  //load cart product
  loadCartItems() {
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      this.cartItems?.push(item);
    });
  }
  //add cart product
  product_add(product: TagDataEntity, event) {
    event.stopPropagation();
    this.add_to_cart(product);
    this.openSnackBar("Your Product added", "Ok");
  }
  //cart check item
  check_cart(id: string) {
    //console.log("check " + id)
    if (this.cartItems.find(x => x.productId === id) != null) {
      //console.log("check " + id)
      return true;
    } else {
      return false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //get tag list
  private get_tag_list() {
    const url = this.serverUrl + "fbmobile/product/tagWise";
    this.http.post(url, null).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.nodata = false;
          this.tag_list = resJSON.data;
        } else {
          this.nodata = true;
        }
        //console.log(this.tag_list)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //get menu list
  private get_menu_list() {
    const url = this.serverUrl + "fbmobile/appMenu/all";
    this.http.post(url, null).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      //console.log(resJSON);
      if (resJSON.code === 200) {
        if (resJSON.data.length > 0) {
          this.menu_list = resJSON.data;
        }
        //console.log(this.menu_list)
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  add_to_cart(product: TagDataEntity) {

    let cartItem: Cart_Fish = {
      productId: product?.productId,
      upazillaName: product.upazillaName,
      districtName: product.districtName,
      userFullName: product.userFullName,
      unitSize: product.unitSize,
      divisionName: product.divisionName,
      appMenuTitle: product.appMenuTitle,
      maxUnitQty: product.maxUnitQty,
      userId: product.userId.toString(),
      productName: product.productName,
      avgWeightUnit: product.avgWeightUnit,
      unitType: product.unitType,
      productPostType: product.productPostType,
      price: product.price,
      productPicture: product.productPicture,
      productVideo: product.productVideo,
      avgWeight: product.avgWeight,
      minUnitQty: product.minUnitQty,
      productRating: product.productRating,
      isFavourite: product.isFavourite,
      orderQuantity: product?.minUnitQty,
      totalPrice: product?.price
    }
    this.cartItems = []
    //console.log(this.cartItems?.length);
    let items = JSON.parse(localStorage.getItem('cart_key'));

    if (items == null) {
      //console.log("found null")
      this.cartItems?.push(cartItem);
      //console.log(this.cartItems?.length);
      localStorage.setItem('cart_key', JSON.stringify(this.cartItems));

    } else {
      items.forEach(item => {
        let product = item as FishProduct
        if (cartItem.productId == product.productId) {
          console.log("already exist")
          return
        }
        this.cartItems?.push(item)
      });

      this.cartItems?.push(cartItem);
      //console.log(this.cartItems?.length);
      items.forEach(item => {
        //console.log(item)
      });
      localStorage.setItem('cart_key', JSON.stringify(this.cartItems));
    }
    window.location.reload();
  }

}
export interface Tag_products {
  tagData?: (TagDataEntity)[] | null;
  tagId: number;
  tagName: string;
}
export interface TagDataEntity {
  productId: string;
  upazillaName: string;
  districtName: string;
  userFullName: string;
  unitSize: string;
  divisionName: string;
  appMenuTitle: string;
  maxUnitQty: string;
  userId: number;
  productName: string;
  avgWeightUnit: string;
  unitType: string;
  productPostType: string;
  price: string;
  productPicture: string;
  productVideo: string;
  avgWeight: string;
  productRating: string;
  minUnitQty: string;
  isFavourite: string;
}
export interface App_menu {
  appMenuId: string;
  appMenuIsCatg: string;
  appMenuTitle: string;
  appMenuMetadata: string;
  appMenuPicture: string;
}
