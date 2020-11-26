# Fishbangla

# How to use existing service #
/* For Dialog Service */
import { DialogService } from './../services/dialog.service';
//initiate the service 
constructor(private dialogService: DialogService) 
//Define the options
const options = {
          textTitle: 'লক্ষ্য করুন',
          textBody: 'ব্যবহারকারী বা পাসওয়ার্ড সঠিক নয়',
          textCancel: 'না', //send null in case you don't need two buttons
          textConfirm: 'ঠিক আছে'
};
//Call
this.dialogService.open(options);
// Event callback
this.dialogService.confirmed().subscribe(confirmed => {
	if (confirmed) {
		this.somefunction();
	}
});
somefunction(){
	alert('somefunction executed');
}
/* For Loader Service */
No need to code anything. It will be automatically executed when any http occurs. 
