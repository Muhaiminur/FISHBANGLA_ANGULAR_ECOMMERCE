import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {

  serverUrl: string;
  constructor(private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
  }

}
