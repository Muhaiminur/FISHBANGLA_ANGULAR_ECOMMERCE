import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './../layout/shared/dialog/dialog.component';
import { map, take } from 'rxjs/operators';

@Injectable()

export class DialogService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<DialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(DialogComponent, {    
      data: {
        textTitle: options.textTitle,
        textBody: options.textBody,
        textCancel: options.textCancel,
        textConfirm: options.textConfirm
      }
    }); 
  } 

  public confirmed(): Observable<any> {
    return this.dialogRef
      .afterClosed()
      .pipe(take(1), map(res => {
        return res;
    }));
  }

}
