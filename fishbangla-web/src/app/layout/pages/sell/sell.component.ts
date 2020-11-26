import { Component, OnInit, Inject } from '@angular/core';
import { User } from './../../../interfaces/user';
import { AuthService } from './../../../services/auth.service';
import { FishProduct } from 'src/app/interfaces/fishproduct';
import { FishnamelistService } from 'src/app/services/fishnamelist.service';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { ProductName } from 'src/app/interfaces/productname';
import { Validators, FormControl } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReferenceDialogComponent } from '../../shared/reference-dialog/reference-dialog.component';
import { AppConfigService } from './../../../services/app-config.service';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  currentUser: User;
  productMenuId: string;
  posttypeId: String = "1";
  avgWeight: String;
  avgWeightUnit: String = "GRAM";
  unitType: String = "GRAM";
  unitSize: String;
  price: String;
  minUnitQty: String = "1";
  total_unit: string = "1";
  total_unit_txt: string = "";
  maxUnitQty: String;
  upazillaId: String;
  reference_number: string = "01675494612";
  product_category: GET_CATEGORY[];
  product_name: ProductName[];
  add_data: any;
  all_address_list: GET_ADDRESSLIST[];
  div_list: DivisionEntity[];
  zilla_list: DistrictEntity[];
  upazilla_list: UpazillaEntity[];
  image_array: File[] = [];
  image_file_list: File[] = [];
  private videoFile: File;
  video_url: any;
  video_isUrl: boolean = false;
  productMenuId_warning = new FormControl('', [Validators.required]);
  unit_warning = new FormControl('GRAM', [Validators.required]);
  postype_warning = new FormControl('1', [Validators.required]);
  selected_issue_warning = new FormControl('', [Validators.required]);
  issue_message = new FormControl('', [Validators.required]);
  serverUrl: string;
  new_product_id: string;
  options = {
    textTitle: 'আপনার অনুরোধটি সফলভাবে পাঠানো হয়েছে',
    textBody: 'প্রয়োজন হলে আপনার সাথে যোগাযোগ করা হবে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };
  loginoption = {
    textTitle: 'আপনার একাউন্ট এ লগইন করুন',
    textBody: 'আপনার একাউন্ট এ লগইন করুন',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };
  validation = {
    textTitle: 'সব তথ্য পূরণ করুন',
    textBody: '',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  private httpClient: HttpClient;
  constructor(private authService: AuthService, private http: HttpClient, private dialogService: DialogService, private matDialog: MatDialog, handler: HttpBackend, private appConfig: AppConfigService) {
    this.currentUser = this.authService.currentUserValue;
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    this.serverUrl = this.appConfig.getServerUrl();
    this.get_product_category();
    this.get_address_list();
    //this.product_name = this.fishnamelist.get_productname();
  }

  public create_product() {
    if (this.currentUser != null && this.productMenuId != null && this.posttypeId != null && this.avgWeight != null && this.avgWeightUnit != null && this.unitType != null && this.unitSize != null && this.price != null && this.minUnitQty != null && this.maxUnitQty != null && this.upazillaId != null && this.image_array.length > 0) {
      console.log(this.currentUser);
      console.log(this.avgWeight);
      console.log(this.avgWeightUnit);
      this.send_create_product();
    } else if (this.currentUser == null) {
      this.dialogService.open(this.loginoption);
    } else if (this.image_array.length < 1) {
      this.validation.textTitle = "সব তথ্য পূরণ করুন";
      this.validation.textBody = "ছবি যোগ করুন";
      this.dialogService.open(this.validation);
    } else {
      this.validation.textBody = "";
      this.validation.textTitle = "সব তথ্য পূরণ করুন";
      this.dialogService.open(this.validation);
    }
    //this.send_product_image();
    //this.send_product_video();
    //this.reference_check();
  }
  public category_select(event: any) {
    this.get_product_name(event.source.value);
  }
  //product add
  unit_add() {
    let temp = Number(this.minUnitQty).valueOf();
    if (temp > 0 && Number(this.unitSize).valueOf() > 0) {
      this.minUnitQty = ((+temp) + 1).toString();
      this.total_unit = (Number(this.minUnitQty).valueOf() * Number(this.unitSize).valueOf()).toString();
    }
    if (this.unitType == "GRAM") {
      this.total_unit_txt = "গ্রাম";
    } else if (this.unitType == "KG") {
      this.total_unit_txt = "কেজি";
    } else if (this.unitType == "PIECE") {
      this.total_unit_txt = "";
    } else {
      this.total_unit_txt = "পিস";
    }
  }
  //product_minus
  unit_minus() {
    let temp = Number(this.minUnitQty).valueOf();
    if (temp > 1 && Number(this.unitSize).valueOf() > 0) {
      this.minUnitQty = ((+temp) - 1).toString();
      this.total_unit = (Number(this.minUnitQty).valueOf() * Number(this.unitSize).valueOf()).toString();
    }
    if (this.unitType == "GRAM") {
      this.total_unit_txt = "গ্রাম";
    } else if (this.unitType == "KG") {
      this.total_unit_txt = "কেজি";
    } else if (this.unitType == "PIECE") {
      this.total_unit_txt = "";
    } else {
      this.total_unit_txt = "পিস";
    }
  }
  public divison_select(event: any) {
    this.zilla_list = this.add_data.data?.district?.filter(t => t.divisionId === event.source.value);
  }
  public zilla_select(event: any) {
    this.upazilla_list = this.add_data.data?.upazilla?.filter(t => t.districtId === event.source.value);
  }
  public upazilla_select(event: any) {
    //this.get_product_name(event.source.value);
  }
  public onimageChanged(event: any) {
    if (event.target.files && event.target.files[0] && event.target.files.length < 6) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          //console.log(event.target.result);
          this.image_array.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
        this.image_file_list.push(event.target.files[i]);
      }
    } else {
      window.alert("আপনি ৬ টির বেশি ছবি দিতে পারবেন না");
    }
  }
  public onvideoChanged(event: any) {
    this.videoFile = event.target.files[0];
    //  console.log('Image ' + this.selectedFile.name);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => { // called once readAsDataURL is completed
        this.video_isUrl = true;
        this.video_url = reader.result as string;
      }
    }
  }

  public reference_check(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.reference_number;
    //dialogConfig.direction = "rtl";
    const dialogRef = this.matDialog.open(ReferenceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.reference_number = result;
      console.log(this.reference_number);
      if (this.reference_number.length != null && this.reference_number.length > 0) {
        this.send_reference();
      }
    });
  }

  //Create Product
  private send_create_product() {
    const url = this.serverUrl + "fbmobile/product/create";
    this.http.post(url,
      JSON.stringify({
        userId: this.currentUser.userId.toString(),
        productMenuId: this.productMenuId.toString(),
        postTypeId: this.posttypeId.toString(),
        avgWeight: this.avgWeight.toString(),
        avgWeightUnit: this.avgWeightUnit.toString(),
        unitType: this.unitType.toString(),
        unitSize: this.unitSize.toString(),
        price: this.price.toString(),
        minUnitQty: this.minUnitQty.toString(),
        maxUnitQty: this.maxUnitQty.toString(),
        upazillaId: this.upazillaId.toString(),
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        this.new_product_id = resJSON.data;
        console.log("new product id" + this.new_product_id)
        this.send_product_image();
      } else if (resJSON.code === 399) {
        this.reference_check();
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }
  //Create Product image
  private send_product_image() {

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        "Authorization": "Basic " + btoa("Gtech:Gtechfbv2"),
        "usersId": this.currentUser.userId.toString(),
        "token": "fake-fcm-token-from-sujan-angular"
      })
    };
    console.log(httpOptions.headers);
    const formData = new FormData();
    for (var i = 0; i < this.image_file_list.length; i++) {
      formData.append("image" + i, this.image_file_list[i], this.image_file_list[i].name);
      console.log(this.image_file_list[i].name)
    }
    console.log(formData.getAll)
    const url = this.serverUrl + "fbmobile/product/imageUpload/" + this.new_product_id;
    this.httpClient.post(url, formData, httpOptions).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        if (this.videoFile != null) {
          this.send_product_video();
        } else {
          this.validation.textTitle = "আপনার পণ্যটি যোগ করা হয়েছে";
          this.validation.textBody = "";
          this.dialogService.open(this.validation);
          window.location.reload()
        }
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }
  //Create Product Video
  private send_product_video() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        "Authorization": "Basic " + btoa("Gtech:Gtechfbv2"),
        "usersId": this.currentUser.userId.toString(),
        "token": "fake-fcm-token-from-sujan-angular"
      })
    };
    console.log(httpOptions.headers);
    const formData = new FormData();
    formData.append("video", this.videoFile, this.videoFile.name);
    const url = this.serverUrl + "fbmobile/product/videoUpload/" + this.new_product_id;
    this.httpClient.post(url, formData, httpOptions).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        //this.product_name = resJSON.data;
        this.validation.textTitle = "আপনার পণ্যটি যোগ করা হয়েছে";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        window.location.reload()
      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  //Send reference
  private send_reference() {
    const url = this.serverUrl + "fbmobile/agent/refer";
    this.http.post(url,
      JSON.stringify({
        userId: this.currentUser.userId.toString(),
        phone: this.reference_number.toString(),
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {

      } else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }
  //get product category
  private get_product_category() {
    const url = this.serverUrl + "fbmobile/appMenu/isCatg";
    this.http.post(url, null)
      .subscribe(res => {
        let resSTR = JSON.stringify(res);
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.product_category = resJSON.data;
        } else {
          return false;
        }
      })
  }

  //get product name
  private get_product_name(categoryid: string) {
    const url = this.serverUrl + "fbmobile/productMenu/appMenuWise/all";
    this.http.post(url,
      JSON.stringify({
        appMenuId: categoryid,
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        this.product_name = resJSON.data;
      } else {
        return false;
      }
    })
  }

  //get address list
  private get_address_list() {
    const url = this.serverUrl + "fbmobile/divlist";
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

export interface GET_CATEGORY {
  appMenuId: string;
  appMenuIsCatg: string;
  appMenuTitle: string;
  appMenuMetadata: string;
  appMenuPicture: string;
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


/* @Component({
  selector: 'dialog-reference-dialog',
  templateUrl: './reference-dialog.component.html',
})
export class DialogReferenceDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogReferenceDialog>,
    @Inject(MAT_DIALOG_DATA) public ref_num: String) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

} */