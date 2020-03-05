import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [
        MatDialogModule
    ],
    exports: [ErrorDialogComponent],
    entryComponents: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
