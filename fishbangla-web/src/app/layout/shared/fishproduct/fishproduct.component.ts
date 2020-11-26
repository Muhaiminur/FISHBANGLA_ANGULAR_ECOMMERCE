import { Component, OnInit, Input } from '@angular/core';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { Router, ActivatedRoute } from '@angular/router';
import { Cart_Fish } from '../../pages/productdetails/productdetails.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fishproduct',
  templateUrl: './fishproduct.component.html',
  styleUrls: ['./fishproduct.component.css']
})
export class FishproductComponent implements OnInit {

  @Input('productdata')
  product: FishProduct;
  stars: number[] = [1, 2, 3, 4, 5];
  unit_name: string;

  public cartItems: Cart_Fish[] = [];
  cartadded: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //console.log(this.product?.productName);
    this.unit_check();
    this.loadCartItems()
  }
  unit_check() {
    if (this.product!.unitType == "KG") {
      this.unit_name = "কেজি";
    } else if (this.product!.unitType == "GRAM") {
      this.unit_name = "গ্রাম";
    } else if (this.product!.unitType == "PIECE") {
      this.unit_name = "পিস";
    }
  }
  wholesale_check(type: string) {
    if (type == "Wholesale") {
      return true;
    } else {
      return false;
    }
  }
  product_details(product_id: string) {
    this.router.navigate(['/product-details', product_id], { relativeTo: this.route });
  }
  product_add(product_id: string) {
    this.add_to_cart();
    this.openSnackBar("Your Product added", "Ok");
  }

  loadCartItems() {
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      this.cartItems?.push(item);
    });

    console.log(this.cartItems.length)
    if (this.cartItems.find(x => x.productId === this.product?.productId) != null) {
      this.cartadded = true;
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  add_to_cart() {

    let cartItem: Cart_Fish = {
      productId: this.product?.productId,
      upazillaName: this.product.upazillaName,
      districtName: this.product.districtName,
      userFullName: this.product.userFullName,
      unitSize: this.product.unitSize,
      divisionName: this.product.divisionName,
      appMenuTitle: this.product.appMenuTitle,
      maxUnitQty: this.product.maxUnitQty,
      userId: this.product.userId,
      productName: this.product.productName,
      avgWeightUnit: this.product.avgWeightUnit,
      unitType: this.product.unitType,
      productPostType: this.product.productPostType,
      price: this.product.price,
      productPicture: this.product.productPicture,
      productVideo: this.product.productVideo,
      avgWeight: this.product.avgWeight,
      minUnitQty: this.product.minUnitQty,
      productRating: this.product.productRating,
      isFavourite: this.product.isFavourite,
      orderQuantity: this.product?.minUnitQty,
      totalPrice: this.product?.price
    }
    this.cartItems = []
    console.log(this.cartItems?.length);
    let items = JSON.parse(localStorage.getItem('cart_key'));

    if (items == null) {
      console.log("found null")
      this.cartItems?.push(cartItem);
      console.log(this.cartItems?.length);
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
      console.log(this.cartItems?.length);
      items.forEach(item => {
        console.log(item)
      });
      localStorage.setItem('cart_key', JSON.stringify(this.cartItems));
    }
    window.location.reload();
  }

}
