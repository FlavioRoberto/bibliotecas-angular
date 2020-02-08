import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmaDialogModule } from './components/dialogs/confirma-dialog/confirma-dialog.module';
import { DataBarComponent } from './ic-data-bar.component';
import { ErrorDialogModule } from './components/dialogs/error-dialog/error-dialog.module';
import { ConfirmaDialogComponent } from './components/dialogs/confirma-dialog/confirma-dialog.component';
import { DialogService } from './components/dialogs/confirma-dialog/service/dialog.service';

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
    FlexLayoutModule,
    ConfirmaDialogModule,
    ErrorDialogModule
  ],
  exports: [DataBarComponent],
  entryComponents: [ConfirmaDialogComponent],
  providers: [DialogService]
})
export class DataBarModule { }
