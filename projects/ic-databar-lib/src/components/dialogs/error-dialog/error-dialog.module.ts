import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';


@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [
        MatDialogModule
    ],
    exports: [ErrorDialogComponent],
    entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
