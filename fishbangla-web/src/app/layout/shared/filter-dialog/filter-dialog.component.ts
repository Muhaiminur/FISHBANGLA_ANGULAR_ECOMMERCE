import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenceDialogComponent } from '../reference-dialog/reference-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ProductName } from 'src/app/interfaces/productname';
import { FishnamelistService } from 'src/app/services/fishnamelist.service';
import { FormControl, Validators } from '@angular/forms';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  product_name: ProductName[];
  add_data: any;
  all_address_list: GET_ADDRESSLIST[];
  div_list: DivisionEntity[];
  productId: string;
  divId: string;
  avg_weight: string;
  price: string;
  productMenuId_warning = new FormControl('', [Validators.required]);
  constructor(private http: HttpClient, private fishnamelist: FishnamelistService, public dialogRef: MatDialogRef<ReferenceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.product_name = this.fishnamelist.get_productname();
    this.get_address_list();
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onyesClick() {
    this.dialogRef.close(this.productId);
  }

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.dialogRef.close(value);
    //alert(''+value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
  //get address list
  private get_address_list() {
    const url = this.appConfig.getServerUrl()+ "fbmobile/divlist";
    this.http.post(url, null)
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.all_address_list = resJSON.data;
          this.add_data = resJSON;
          this.div_list = resJSON.data?.division;
          //this.zilla_list = resJSON.data?.district;
          //this.upazilla_list = resJSON.data?.upazilla;
        } else {
          return false;
        }
      })
  }

}
export interface GET_ADDRESSLIST {
  division?: DivisionEntity[];
  district?: DistrictEntity[];
  upazilla?: UpazillaEntity[];
}
export interface DivisionEntity {
  divisionName: string;
  divisionId: number;
}
export interface DistrictEntity {
  districtId: number;
  districtName: string;
  divisionId: number;
}
export interface UpazillaEntity {
  districtId: number;
  upazillaName: string;
  upazillaId: number;
}