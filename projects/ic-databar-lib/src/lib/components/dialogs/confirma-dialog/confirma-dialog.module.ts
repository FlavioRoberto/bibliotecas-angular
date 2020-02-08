import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmaDialogComponent } from './confirma-dialog.component';

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
