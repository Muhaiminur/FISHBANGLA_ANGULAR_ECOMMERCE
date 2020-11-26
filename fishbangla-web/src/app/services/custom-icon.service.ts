import { Injectable, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Injectable({
  providedIn: 'root'
})
export class CustomIconService {
  path = './../assets/icons/';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }
  
  load() {
    this.matIconRegistry.addSvgIcon("posts", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'posts.svg'));
    this.matIconRegistry.addSvgIcon("buy-history", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'buy-history.svg'));
    this.matIconRegistry.addSvgIcon("sell", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'sell.svg'));
    this.matIconRegistry.addSvgIcon("seller", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'seller.svg'));
    this.matIconRegistry.addSvgIcon("request", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'request.svg'));
    this.matIconRegistry.addSvgIcon("contact", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'contact.svg'));
    this.matIconRegistry.addSvgIcon("login", this.domSanitizer.bypassSecurityTrustResourceUrl(this.path + 'login.svg'));
  } 
  
}
