import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-product-auction',
  templateUrl: './product-auction.component.html',
  styleUrls: ['./product-auction.component.css']
})
export class ProductAuctionComponent implements OnInit {

  serverUrl: string;
  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
  }

}
