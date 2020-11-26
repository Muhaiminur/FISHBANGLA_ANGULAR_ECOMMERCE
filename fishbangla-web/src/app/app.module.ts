/* App Config Start */ 
import { APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules */
import { AppRoutingModule, RouitngPathComponents  } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';
import { DialogModule } from './modules/app-dialog.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

/* Interceptors */
import { HttpInterceptorProviders } from './interceptors';

/* Main Component */ 
import { AppComponent } from './app.component';
import { FishproductComponent } from './layout/shared/fishproduct/fishproduct.component';
import { FishnamelistService } from './services/fishnamelist.service';
import { ProductdetailsComponent } from './layout/pages/productdetails/productdetails.component';
import { AddAddressComponent } from './layout/pages/add-address/add-address.component';
import { ReferenceDialogComponent } from './layout/shared/reference-dialog/reference-dialog.component';
import { AddressDataService } from './services/address-data.service';
import { DivDistUpaListService } from './services/div-dist-upa-list.service';
import { DialogYesNoComponent } from './layout/shared/dialog-yes-no/dialog-yes-no.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { FishMenuComponent } from './layout/pages/fish-menu/fish-menu.component';
import { ProductAuctionComponent } from './layout/pages/product-auction/product-auction.component';
import { FilterDialogComponent } from './layout/shared/filter-dialog/filter-dialog.component';
import { PaymentSuccessComponent } from './layout/pages/payment-success/payment-success.component';
import { PaymentCancelComponent } from './layout/pages/payment-cancel/payment-cancel.component';


import { MatCarouselModule } from '@ngmodule/material-carousel';

/* 
* Initialize Reading the assets/config/config.json & passing param to providers at bootstrap
*/
const initializerConfigFn = (appConfig: AppConfigService) => {
  return () => appConfig.loadAppConfig();
};

@NgModule({
  declarations: [
    AppComponent,
    RouitngPathComponents,
    FishproductComponent,
    ProductdetailsComponent,
    AddAddressComponent,
    ReferenceDialogComponent,
    DialogYesNoComponent,
    FishMenuComponent,
    ProductAuctionComponent,
    FilterDialogComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, 
    AppMaterialModule,
    DialogModule,
    CarouselModule,
    DragScrollModule,
    MatCarouselModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializerConfigFn,
      multi: true,
      deps: [AppConfigService]
    },
    HttpInterceptorProviders,
    FishnamelistService,
    AddressDataService,
    DivDistUpaListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
