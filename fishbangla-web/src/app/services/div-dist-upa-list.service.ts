import { Injectable } from '@angular/core';
import { DivDistUpaList } from '../interfaces/upazillaListModel';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConfigService } from './app-config.service';


@Injectable({
  providedIn: 'root'
})
export class DivDistUpaListService {

  divList: DivDistUpaList;
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  //get div list for dropdown
  public get_divList(): Observable<any> {
    const url = this.appConfig.getServerUrl() + "fbmobile/divlist";
    this.http.post(url, null).subscribe(r => {
      //this.response = r;
      let resSTR = JSON.stringify(r); 
      let resJSON = JSON.parse(resSTR);
      if (resJSON.code === 200) {
        this.divList = resJSON.data;
        console.log(this.divList)
        return of(this.divList);
      }
    });
    return of(this.divList);
  }

}
