import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reference-dialog',
  templateUrl: './reference-dialog.component.html',
  styleUrls: ['./reference-dialog.component.css']
})
export class ReferenceDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReferenceDialogComponent>, @Inject(MAT_DIALOG_DATA) public ref_num: String) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onyesClick() {
    this.dialogRef.close(this.ref_num);
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
