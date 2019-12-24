import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { OnInitDataBar, EStatus } from '@breaking_dev/ic-databar-lib';

import { TesteDatabarService } from './services/teste-databar.service';
import { TestePaginado } from './model/teste.paginado';

@Component({
  selector: 'ic-teste-databar',
  templateUrl: './teste-databar.component.html',
  styleUrls: ['./teste-databar.component.scss']
})
export class TesteDatabarComponent extends OnInitDataBar<any>  {

  constructor(private _formBuilder: FormBuilder) {
    super();

    this.form = this._formBuilder.group({
      codigo: [null],
      nome: [null],
      sobrenome: [null]
    });
  }

  onInit(): void {
    this.servicoDataBarBind = new TesteDatabarService(this.form);
    this.entidadePaginada = new TestePaginado();
  }

  onStatusChanged(status: EStatus): void {
    this.servicoDataBarBind.status = status;
  }

}
