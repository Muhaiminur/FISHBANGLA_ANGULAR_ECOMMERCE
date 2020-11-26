import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material Imports 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
 import { MatTableModule } from '@angular/material/table';
 import {MatRadioModule} from '@angular/material/radio';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle';
 import {MatSliderModule} from '@angular/material/slider';
 import {MatSnackBarModule} from '@angular/material/snack-bar';

const MaterialComponents = [
  BrowserAnimationsModule,
  MatDialogModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
  MatGridListModule,
  MatExpansionModule,
  MatTableModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [MaterialComponents]
})
export class AppMaterialModule { }
