import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './../interfaces/loaderstate';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  
  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderState>{ 
      show: true 
    });
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{ 
      show: false 
    });
  }

  /* Under process */
  /*
  uploadProgress(progress: number){
    this.loaderSubject.next(<LoaderState>{
      percentage: progress
    })
  }
  */

}