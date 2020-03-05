import { NgModule } from '@angular/core';

import { ConfirmaDialogModule } from '../components/dialogs/confirma-dialog/confirma-dialog.module';
import { DataBarComponent } from './ic-data-bar.component';
import { CommonModule } from '@angular/common';
import { ErrorDialogModule } from '../components/dialogs/error-dialog/error-dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatabarService } from './services/ic-databar.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DataBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    FlexLayoutModule,
    ConfirmaDialogModule,
    ErrorDialogModule
  ],
  exports: [DataBarComponent],
  providers: [DatabarService]
})
export class DataBarModule { }
