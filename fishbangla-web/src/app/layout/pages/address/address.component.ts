import { Component, OnInit } from '@angular/core';
import { AddressModel } from 'src/app/interfaces/addressModel';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddressDataService } from 'src/app/services/address-data.service';
import { AppConfigService } from 'src/app/services/app-config.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  response: any;
  code: any;
  address_list: AddressModel[];
  login_id: any;
  data:any = {text: "example"};
  serverUrl: string;

  loginoption = {
    textTitle: 'আপনার একাউন্ট এ লগইন করুন',
    textBody: 'আপনার একাউন্ট এ লগইন করুন',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  options = {
    textTitle: 'ডিলিট',
    textBody: 'ডিলিট করা হয়েছে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };


  constructor(private http: HttpClient, public loaderService: LoaderService, private dialogService: DialogService, public authService: AuthService, private editAddressService: AddressDataService, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.login_id = this.authService.currentUserValue?.userId;
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_address_list();
  }

  public get_address_list() {
    const url = this.serverUrl + "fbmobile/address/all/filter/user";
    this.http.post(url, 
      JSON.stringify({
        userId: this.login_id,

      })).subscribe(r => {
      this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      this.code = resJSON.code;
      if (this.code === 200) {
        this.address_list = resJSON.data;
      }
    });
  }

  public deleteAddress( id: string) {
    const url = this.serverUrl + "fbmobile/address/delete";
    this.http.post(url, 
      JSON.stringify({
        addressId: id,

      })).subscribe(r => {
      this.response = r;
      let resSTR = JSON.stringify(r);
      let resJSON = JSON.parse(resSTR);
      this.code = resJSON.code;
      if (this.code === 200) {
        this.dialogService.open(this.options)
        this.get_address_list()
      }
    });
  }

  public edit_button_clicked(address: AddressModel){
    this.data = address
    this.editAddressService.setData(this.data)
  }



}
