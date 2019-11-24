import { NgModule } from '@angular/core';
import { ConfirmaDialogComponent } from './confirma-dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


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
