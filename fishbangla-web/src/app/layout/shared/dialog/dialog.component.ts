import { HostListener, Component, OnInit, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  buttonCancel: boolean = false; 
  buttonConfirm:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      textTitle: string,
      textBody: string,
      textCancel: string,
      textConfirm: string
    }, private mdDialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
  }

  public cancel() {
    this.close(false);
  }
  
  public close(value) {
    this.mdDialogRef.close(value);
    //alert(''+value);
  }
  
  public confirm() {
    this.close(true);
  }
  
  @HostListener("keydown.esc") 
  public onEsc() {
    this.close(false);
  }
  
}
