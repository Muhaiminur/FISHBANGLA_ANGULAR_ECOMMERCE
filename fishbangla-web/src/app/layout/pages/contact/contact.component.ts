import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: string;
  serverUrl: string;
  constructor(private http: HttpClient, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    const url = this.serverUrl + "fbmobile/getConfigs";
    this.http.post(url, null)
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        this.contact = resJSON.data.FISH_ADDRESS;
      })
  }

}
