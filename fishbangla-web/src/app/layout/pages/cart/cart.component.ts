import { Component, OnInit } from '@angular/core';
import { AddressModel, SingleAddressModel } from 'src/app/interfaces/addressModel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Product_details, Cart_Fish } from '../productdetails/productdetails.component';
import { StickyDirection } from '@angular/cdk/table';
import { DialogService } from 'src/app/services/dialog.service';
import { DivDistUpaList, District, Upazilla } from 'src/app/interfaces/upazillaListModel';
import { ActivatedRoute, Params } from '@angular/router';
import { AppConfigService } from './../../../services/app-config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: Cart_Fish[] = [];
  // unit_name: string;


  divList: DivDistUpaList;
  selectedDistList: District[];
  selectedUpaList: Upazilla[];
  selectedDivId: String;
  selectedDistId: String;
  selectedUpaId: String;
  userAddress: String;
  roadNo: String;
  buildingNo: String;
  flatNo: String;
  userVillage: String = "";
  receiverNo: String;
  receiverName: String;
  isPrimary: String = "YES";

  response: any;
  code: any;
  login_id: any;
  public subtotal: number = 0.0;
  public icePrice: number = 0.0;
  public borofPathaPrice: number = 0.0;
  public serviceCharge: number = 0.0;
  public deliveryCharge: number = 0.0;
  public varPercent: number = 0.0
  public totalVat: number = 0.0;
  public discountString: string = ""
  public discount: number = 0.0;
  public discount_id: string = "0"
  public amountToPay: number = 0.0;
  public paymentTypeId: string = "1";
  public iceQty: number = 0;

  serverUrl: string;
  success = {
    textTitle: 'আপনার অর্ডার গ্রহণ করা হয়েছে',
    textBody: 'প্রয়োজন হলে আপনার সাথে যোগাযোগ করা হবে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  cancel = {
    textTitle: ' দুঃখিত, আপনার অর্ডার গ্রহণ করা হয়নি, পরে আবার চেষ্টা করুন ',
    textBody: 'পরে আবার চেষ্টা করুন ',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  constructor(private http: HttpClient, public authService: AuthService, private route: ActivatedRoute, private dialogService: DialogService, private appConfig: AppConfigService) {

  }



  address_list: AddressModel[];

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.login_id = this.authService.currentUserValue?.userId;
    this.get_divList()
    this.get_address_list()
    this.loadCartItems()
    this.getConfigData()

  }

  public divison_select(event: any) {
    this.selectedDistList = this.divList?.district.filter(t => t.divisionId === event.source.value);
    console.log(this.selectedDistList)
  }
  public district_select(event: any) {
    this.selectedUpaList = this.divList.upazilla?.filter(t => t.districtId === event.source.value);
    console.log(this.selectedUpaList)
  }

  //get div list for dropdown
  public get_divList() {
    const url = this.serverUrl + "fbmobile/divlist";
    this.http.post(url, null).subscribe(r => {
      //this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.divList = resJSON.data;
        console.log(this.divList)
      }
    });
  }

  //fbmobile/discount
  public get_discount(discountString: string) {
    const url = this.serverUrl + "fbmobile/discount";
    this.http.post(url,
      JSON.stringify({
        discountKeyword: discountString,
        userId: this.login_id
      })).subscribe(r => {

        let resSTR = JSON.stringify(r);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          let totalFishPrice = this.subtotal
          let discountPercentage = (resJSON.data.discountPercentage) as number
          let minAmountPrice = (resJSON.data.discountMinAmount) as number
          let maxAmountDiscount = (resJSON.data.discountMaxAmount) as number
          this.discount_id = resJSON.data.discountId as string
          console.log(this.discount_id)
          this.discount = this.applyDiscount(totalFishPrice, discountPercentage, minAmountPrice, maxAmountDiscount)
          this.loadCartDetails();
        }
      });
  }


  applyDiscount(totalFishPrice: number, discountPercentage: number, minAmountPrice: number, maxAmountDiscount: number): number {
    var total = totalFishPrice
    var discountAmount = 0.0
    if (minAmountPrice > totalFishPrice) {

    }
    else {
      if (discountPercentage == 0) {
        total = totalFishPrice - maxAmountDiscount
        discountAmount = maxAmountDiscount
      }
      else {
        discountAmount = (total * discountPercentage) / 100
        if (discountAmount > maxAmountDiscount) {
          discountAmount = maxAmountDiscount
          total = totalFishPrice - discountAmount
        }
        else {
          total = totalFishPrice - discountAmount
        }
      }
    }
    return discountAmount
  }



  loadCartDetails() {
    this.subtotal = 0
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      let cartItem = item as Cart_Fish
      this.subtotal = +this.subtotal + +Number(cartItem.totalPrice).valueOf();
    });
    this.totalVat = (this.subtotal * this.varPercent) / 100.0
    this.amountToPay = +this.subtotal + +this.icePrice + +this.serviceCharge + +this.deliveryCharge + +this.totalVat - +this.discount
    console.log(this.amountToPay)
  }

  loadCartItems() {
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      this.cartItems?.push(item)
      console.log(item)
    });
    console.log("cart_loaded")

  }

  //unit check for convert to bangla
  unit_check(unit: String): String {
    if (unit == "KG") {
      return "কেজি";
    } else if (unit == "GRAM") {
      return "গ্রাম";
    } else if (unit == "PIECE") {
      return "পিস";
    }
  }

  unit_add(item: Cart_Fish) {
    let temp = Number(item.orderQuantity).valueOf();
    if (temp < Number(item.maxUnitQty).valueOf()) {
      item.orderQuantity = ((+temp) + 1).toString();
      item.totalPrice = ((+item.price) * ((+temp) + 1)).toString();
      this.removePreviousAndSaveNewItem(item)
    }
  }

  unit_minus(item: Cart_Fish) {
    let temp = Number(item.orderQuantity).valueOf();
    if (temp > Number(item.minUnitQty).valueOf()) {
      item.orderQuantity = ((+temp) - 1).toString();
      item.totalPrice = ((+item.price) * ((+temp) - 1)).toString();
      this.removePreviousAndSaveNewItem(item)
    }
  }

  removePreviousAndSaveNewItem(newItem: Cart_Fish) {
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      let previousItem = item as Cart_Fish
      if (previousItem.productId == newItem.productId) {
        previousItem.orderQuantity = newItem.orderQuantity
        previousItem.totalPrice = newItem.totalPrice

      }
    });
    localStorage.setItem('cart_key', JSON.stringify(items));
    this.loadCartDetails()

  }

  public iceAdd() {
    let temp = Number(this.iceQty).valueOf();
    this.iceQty = ((+temp) + 1);
    this.icePrice = ((+this.borofPathaPrice) * ((+temp) + 1));
    this.loadCartDetails()
  }

  public iceRemove() {
    let temp = Number(this.iceQty)
    if (temp > 0) {
      this.iceQty = ((+temp) - 1);
      this.icePrice = ((+this.borofPathaPrice) * ((+temp) - 1));
      this.loadCartDetails()
    }
  }

  public delete(item: Cart_Fish) {
    // this.cartItems = this.cartItems.filter(function( obj ) {
    //   return obj.productId !== item.productId;
    // });
    let index = this.cartItems.findIndex(data => data.productId === item.productId);
    this.cartItems.splice(index, 1);
    console.log(this.cartItems)
    localStorage.setItem('cart_key', JSON.stringify(this.cartItems));
    // this.loadCartItems()
    // this.ngOnInit()
    window.location.reload();

  }



  public get_address_list() {
    const url = this.serverUrl + "fbmobile/address/all/filter/user";
    this.http.post(url,
      JSON.stringify({
        userId: this.login_id,

      })).subscribe(r => {
        this.response = r;
        let resSTR = JSON.stringify(r);
        let resJSON = JSON.parse(resSTR);
        this.code = resJSON.code;
        if (this.code === 200) {
          this.address_list = resJSON.data;
        }
      });
  }

  public getConfigData() {
    const url = this.serverUrl + "fbmobile/getConfigs";
    this.http.post(url, null)
      .subscribe(res => {
        console.log(url)
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        this.serviceCharge = resJSON.data.SERVICE_CHARGE as number;
        this.deliveryCharge = resJSON.data.DELIVERY_CHARGE as number;
        this.borofPathaPrice = resJSON.data.FROZEN as number;
        this.varPercent = resJSON.data.VAT as number;
        this.loadCartDetails()
        console.log(resJSON.data)
        console.log(this.serviceCharge)
        console.log(this.deliveryCharge)
      })
  }


  // cDiscount(discountString: string) {

  // }

  public placeOrder() {

    var products: CartProduct[] = []
    var address: SingleAddressModel

    this.cartItems.forEach(item => {
      let product: CartProduct = {
        productId: item.productId,
        orderQuantity: item.orderQuantity
      }
      products.push(product)
    });

    if (this.login_id == null) {
      address = {
        receiverName: this.receiverName.toString(),
        receiverPhone: this.receiverNo.toString(),
        roadNo: this.roadNo.toString(),
        userVillage: "",
        userAddress: this.userAddress.toString(),
        flatNo: this.flatNo.toString(),
        buildingNo: this.buildingNo.toString(),
        upazillaId: this.selectedUpaId.toString()
      }
    }
    else {
      address = null;
    }



    let totalAmount = this.subtotal + +this.icePrice + +this.totalVat + +this.serviceCharge + +this.deliveryCharge
    let totalAfterDiscount = totalAmount - +this.discount
    console.log(totalAmount)
    console.log(this.discount)
    console.log(this.discount_id)
    console.log(this.paymentTypeId)

    const url = this.serverUrl + "fbmobile/order/create";
    this.http.post(url,
      JSON.stringify({
        totalAmount: totalAmount.toString(),
        serviceCharge: this.serviceCharge.toString(),
        productVat: this.totalVat.toString(),
        deliveryCharge: this.deliveryCharge.toString(),
        discountAmount: this.discount.toString(),
        totalAfterDiscount: totalAfterDiscount.toString(),
        subtotal: this.subtotal.toString(),
        discountId: this.discount_id.toString(),
        paymentTypeId: this.paymentTypeId.toString(),
        iceQty: this.iceQty.toString(),
        icePrice: this.icePrice.toString(),
        products: products,
        address: address

      })).subscribe(r => {
        this.response = r;
        let resSTR = JSON.stringify(r);
        let resJSON = JSON.parse(resSTR);
        console.log(resJSON)
        this.code = resJSON.code;
        if (this.code === 200) {
          this.dialogService.open(this.success);
        }
        else if (this.code === 201) {

          this.dialogService.open(this.success);
        }
        else if (this.code === 202) {
          window.location.href = resJSON.data
        }

        else {
          this.cancel.textBody = resJSON.data
          this.dialogService.open(this.cancel);
        }
      });
  }


}


export interface CartProduct {
  productId: String;
  orderQuantity: String;
}
