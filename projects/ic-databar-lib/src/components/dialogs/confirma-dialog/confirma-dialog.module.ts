import { ConfirmaDialogComponent } from './confirma-dialog.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [ConfirmaDialogComponent],
  imports: [
    MatDialogModule,
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule],
  exports: [ConfirmaDialogComponent],
  entryComponents: [ConfirmaDialogComponent]
})
export class ConfirmaDialogModule { }
