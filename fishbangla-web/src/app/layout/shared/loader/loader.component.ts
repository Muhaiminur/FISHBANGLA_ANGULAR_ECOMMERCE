import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './../../../services/loader.service';
import { LoaderState } from './../../../interfaces/loaderstate';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  show = false;
  //percentage = 0;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        //this.percentage = state.percentage;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
