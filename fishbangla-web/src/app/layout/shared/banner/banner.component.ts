import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  response: any;
  slidesStore: any;
  constructor(private http: HttpClient, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    const url = this.appConfig.getServerUrl()+ "fbmobile/banner/all";
    this.http.post(url, null)
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          //console.log(resJSON.data[]);
          this.slidesStore = resJSON.data;
        }
      });
  }

  /* Owl carousel */
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    //autoplayTimeout: 2000, //autoplayTimeout must always be bigger than autoplaySpeed
    autoplayHoverPause: true,
    dots: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    //nav: true,
    //navSpeed: 700,
    //navText: ['<<', '>>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 1
      }
    }
  }

}
