import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

/* Components - Pages */
import { HomeComponent } from './../layout/pages/home/home.component';
import { PostsComponent } from './../layout/pages/posts/posts.component';
import { BuyHistoryComponent } from './../layout/pages/buy-history/buy-history.component';
import { SellComponent } from './../layout/pages/sell/sell.component';
import { SellersComponent } from './../layout/pages/sellers/sellers.component';
import { RequestComponent } from './../layout/pages/request/request.component';
import { ContactComponent } from './../layout/pages/contact/contact.component';
import { SearchComponent } from './../layout/pages/search/search.component';
import { CartComponent } from './../layout/pages/cart/cart.component';
import { ProfileComponent } from './../layout/pages/profile/profile.component';
import { PageNotFoundComponent } from './../layout/pages/page-not-found/page-not-found.component';
import { LoginComponent } from './../layout/pages/login/login.component';
import { ForgotPinComponent } from './../layout/pages/forgot-pin/forgot-pin.component';
import { AddressComponent } from './../layout/pages/address/address.component';
import { SellHistoryComponent } from './../layout/pages/sell-history/sell-history.component';
import { ReferralComponent } from './../layout/pages/referral/referral.component';
import { FavouriteComponent } from './../layout/pages/favourite/favourite.component';
import { SellableProductsComponent } from './../layout/pages/sellable-products/sellable-products.component';
import { NotificationComponent } from './../layout/pages/notification/notification.component';

/* Components - Shared */
import { BannerComponent } from './../layout/shared/banner/banner.component';
import { LoaderComponent } from './../layout/shared/loader/loader.component';

/* Authguard */
import { AuthGuard } from './../guards/auth.guard';
import { SellerDetailsComponent } from '../layout/pages/seller-details/seller-details.component';
import { ProductdetailsComponent } from '../layout/pages/productdetails/productdetails.component';
import { AddAddressComponent } from '../layout/pages/add-address/add-address.component';
import { FishMenuComponent } from '../layout/pages/fish-menu/fish-menu.component';
import { ProductAuctionComponent } from '../layout/pages/product-auction/product-auction.component';
import { PaymentSuccessComponent } from '../layout/pages/payment-success/payment-success.component';

const routes: Routes = [
  //Menu Section
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'buy-history', component: BuyHistoryComponent, canActivate: [AuthGuard] },
  { path: 'sell', component: SellComponent, canActivate: [AuthGuard] },
  { path: 'sellers', component: SellersComponent },
  { path: 'seller-details/:id', component: SellerDetailsComponent },
  { path: 'product-details/:id', component: ProductdetailsComponent },
  { path: 'fish-menu/:id', component: FishMenuComponent },
  { path: 'request', component: RequestComponent },
  { path: 'auction', component: ProductAuctionComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  {path:'cart/:status', component: PaymentSuccessComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  //Profile Section
  { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
  { path: 'add-address', component: AddAddressComponent, canActivate: [AuthGuard] },
  { path: 'sell-history', component: SellHistoryComponent, canActivate: [AuthGuard] },
  { path: 'referral', component: ReferralComponent, canActivate: [AuthGuard] },
  { path: 'forgot-pin', component: ForgotPinComponent, canActivate: [AuthGuard] },
  { path: 'favourite', component: FavouriteComponent, canActivate: [AuthGuard] },
  { path: 'sellable-products', component: SellableProductsComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const RouitngPathComponents = [
  HomeComponent,
  PostsComponent,
  BuyHistoryComponent,
  SellComponent,
  SellersComponent,
  SellerDetailsComponent,
  ProductdetailsComponent,
  FishMenuComponent,
  RequestComponent,
  ProductAuctionComponent,
  ContactComponent,
  SearchComponent,
  CartComponent,
  ProfileComponent,
  PageNotFoundComponent,
  BannerComponent,
  LoginComponent,
  LoaderComponent,
  ForgotPinComponent,
  AddressComponent,
  SellHistoryComponent,
  ReferralComponent,
  FavouriteComponent,
  SellableProductsComponent,
  NotificationComponent,
  AddAddressComponent
]