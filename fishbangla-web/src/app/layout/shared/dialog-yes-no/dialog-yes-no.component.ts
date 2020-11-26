import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-yes-no',
  templateUrl: './dialog-yes-no.component.html',
  styleUrls: ['./dialog-yes-no.component.css']
})
export class DialogYesNoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogYesNoComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    textTitle: string,
    textBody: string,
    textCancel: string,
    textConfirm: string
  }) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onyesClick() {
    this.dialogRef.close("yes");
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
}
