import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './../layout/shared/dialog/dialog.component';
import { DialogService } from './../services/dialog.service';
@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        DialogComponent
    ],
    exports: [DialogComponent],
    entryComponents: [DialogComponent],
    providers: [DialogService]
})

export class DialogModule {}