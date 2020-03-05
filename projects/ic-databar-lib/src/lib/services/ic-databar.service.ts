import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDataEntidadePaginada } from '../contrato/IDataEntidadePaginada';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DatabarService {

  constructor(private snackBar: MatSnackBar) { }

  public desabilitarForm(form: FormGroup): void {
    form.disable({ emitEvent: false, onlySelf: true });
  }

  public habilitarForm(form: FormGroup): void {
    form.enable({ emitEvent: false, onlySelf: true });
  }

  public resetForm(form: FormGroup, entidadePaginada: IDataEntidadePaginada<any>): void {
    form.reset({ emitEvent: false, onlySelf: true });
    entidadePaginada.entidade = null;
    entidadePaginada.posicao = 0;
    entidadePaginada.total = 0;
  }

  public openSnackBar(message: string, classe: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: classe
    });
  }

}
