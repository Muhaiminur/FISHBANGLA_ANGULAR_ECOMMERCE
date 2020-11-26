import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  serverUrl: string;
  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
  }

}
