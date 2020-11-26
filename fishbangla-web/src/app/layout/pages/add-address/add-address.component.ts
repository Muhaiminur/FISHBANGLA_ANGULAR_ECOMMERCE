import { Component, OnInit } from '@angular/core'
import { DivDistUpaList, District, Upazilla } from 'src/app/interfaces/upazillaListModel';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { AddressDataService } from 'src/app/services/address-data.service';
import { AddressModel } from 'src/app/interfaces/addressModel';
//import { AnyARecord } from 'dns';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  currentUser: User;
  divList: DivDistUpaList;
  selectedDistList: District[];
  selectedUpaList: Upazilla[];
  selectedDivId: String;
  selectedDistId : String;
  selectedUpaId : String;
  userAddress : String;
  roadNo : String;
  buildingNo : String;
  flatNo: String;
  userVillage : String = "";
  receiverNo : String;
  receiverName : String;
  isPrimary : String = "YES";
  data : any;

  options = {
    textTitle: 'আপনার অনুরোধটি সফলভাবে পাঠানো হয়েছে',
    textBody: 'প্রয়োজন হলে আপনার সাথে যোগাযোগ করা হবে',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };

  validation = {
    textTitle: 'সব তথ্য পূরণ করুন',
    textBody: '',
    textCancel: '',
    textConfirm: 'ঠিক আছে'
  };





  constructor(private authService: AuthService, private http: HttpClient,private dialogService: DialogService, public dialog: MatDialog, public editAddressService : AddressDataService) { 
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.data = this.editAddressService.getData() 
    let edit_address = this.data as AddressModel
    this.get_divList()
    this.loadAddress(edit_address)
  }


  loadAddress(address: AddressModel) {
  this.userAddress = address.userAddress;
  this.roadNo = address.roadNo;
  this.buildingNo = address.buildingNo;
  this.flatNo = address.flatNo;
  this.userVillage = address.userVillage;
  this.receiverNo = address.receiverPhone;
  this.receiverName = address.receiverName;
  }



    //get div list for dropdown
    public get_divList() {
      const url = "http://116.212.109.34:80/fbmobile/divlist";
      this.http.post(url, null).subscribe(r => {
        //this.response = r;
        let resSTR = JSON.stringify(r); 
        let resJSON = JSON.parse(resSTR);
        if (resJSON.code === 200) {
          this.divList = resJSON.data;
          console.log(this.divList)
        }
      });
    }

  public divison_select(event: any) {
    this.selectedDistList = this.divList?.district.filter(t => t.divisionId === event.source.value);
    console.log(this.selectedDistList)
  }
  public district_select(event: any) {
    this.selectedUpaList = this.divList.upazilla?.filter(t => t.districtId === event.source.value);
    console.log(this.selectedUpaList)
  }

  public addAddressButtonClicked(){
    if(this.currentUser != null && 
       this.selectedUpaId != null &&
       this.receiverName != null && 
       this.receiverNo != null &&
       this.userAddress != null && 
       this.roadNo != null &&
       this.buildingNo != null && 
       this.flatNo != null &&
       this.userVillage != null && 
       this.isPrimary != null) {
        this.addNewAddress();
       }
       else {
        this.dialogService.open(this.validation);
       }
    
  }


  //Create address
  private addNewAddress() {
    const url = "http://116.212.109.34:80/fbmobile/address/create";
    this.http.post(url,
      JSON.stringify({
        userId: this.currentUser.userId.toString(),
        upazillaId: this.selectedUpaId.toString(),
        receiverName: this.receiverName.toString(),
        receiverPhone: this.receiverNo.toString(),
        userAddress: this.userAddress.toString(),
        roadNo: this.roadNo.toString(),
        buildingNo: this.buildingNo.toString(),
        flatNo: this.flatNo.toString(),
        userVillage: this.userVillage.toString(),
        isPrimary: this.isPrimary.toString(),
        
      })
    ).subscribe(res => {
      let resSTR = JSON.stringify(res);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON);
      if (resJSON.code === 200) {
        this.dialogService.open(this.options)
      }  else {
        this.validation.textTitle = "পরে আবার চেষ্টা করুন";
        this.validation.textBody = "";
        this.dialogService.open(this.validation);
        return false;
      }
    })
  }

  




}
