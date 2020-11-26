import { Component, ViewChild, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from './services/app-config.service';
import { CustomIconService } from './services/custom-icon.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { Cart_Fish } from './layout/pages/productdetails/productdetails.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  pageTitle = 'Welcome to FishBangla';
  infoConfig: string;
  isLogged: boolean;
  public cartItems: Cart_Fish[] = [];
  badge: number = 0

  @ViewChild('drawer') drawer: any;
  public selectedItem: string = '';
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver,
    private titleService: Title,
    private customIconService: CustomIconService,
    private appConfig: AppConfigService,
    public authService: AuthService) { }

  ngOnInit() {
    this.titleService.setTitle(this.pageTitle);
    this.infoConfig = this.appConfig.getServerUrl();
    this.customIconService.load();
    this.isLogged = this.authService.currentUserValue ? true : false;
    this.getBadgeNumber()

  }

  getBadgeNumber() {
    let items = JSON.parse(localStorage.getItem('cart_key'));
    items.forEach(item => {
      this.cartItems?.push(item)
      console.log(item)
    });
    this.badge = items.length
  }

  closeSideNav() {
    if (this.drawer._mode == 'over') {
      this.drawer.close();
    }
  }
}
