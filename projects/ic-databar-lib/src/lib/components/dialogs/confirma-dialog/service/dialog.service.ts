import { MatDialogConfig, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { ConfirmaDialogComponent } from '../confirma-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    acaoOk: any;
    emProgresso: boolean;
    acaoMensagem: string;
    dialogRef: any;
    acaoCancelar: any;

    constructor(private dialog: MatDialog) { }

    openDialog(titulo: string, mensagem: string): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.maxWidth = '400px';

        dialogConfig.data = {
            titulo: titulo,
            mensagem: mensagem,
            acaoOk: this.acaoOk,
            emProgresso: this.emProgresso,
            acaoMensagem: this.acaoMensagem,
            acaoCancelar: this.acaoCancelar
        };

        this.dialogRef = this.dialog.open(ConfirmaDialogComponent, dialogConfig);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
