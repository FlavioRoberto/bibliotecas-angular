import { Component } from '@angular/core';
import { EStatus } from 'projects/ic-databar-lib/src/lib/enum/estatus';
import { TestePaginado } from './model/teste.paginado';
import { TesteDatabarService } from './services/teste-databar.service';
import { OnInitDataBar } from 'projects/ic-databar-lib/src/lib/contrato/OnInitDataBar';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent extends OnInitDataBar<any> {

  onInit(): void {
    this.servicoDataBarBind = new TesteDatabarService(this.form);
    this.entidadePaginada = new TestePaginado();
    this.form = new FormGroup({});
  }

  onStatusChanged(status: EStatus): void {
    this.servicoDataBarBind.status = status;
  }

}
