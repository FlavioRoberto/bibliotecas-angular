import { Injectable, EventEmitter } from '@angular/core';
import { Teste } from '../model/teste';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { TestePaginado } from '../model/teste.paginado';
import { IDatabarBindOnClickService } from 'projects/ic-databar-lib/src/lib/contrato/IDataBarBindOnClickService';
import { DatabarEventClickService } from 'projects/ic-databar-lib/src/lib/services/ic-databar-event-click.service';
import { EStatus } from 'projects/ic-databar-lib/src/lib/enum/estatus';

@Injectable()
export class TesteDatabarService implements IDatabarBindOnClickService<Teste> {

  eventDatabar: DatabarEventClickService;
  onClickEnter: EventEmitter<Teste>;
  public status: EStatus;

  constructor(public formgroup: FormGroup) {
    this.eventDatabar = new DatabarEventClickService(event => {
      console.log(event);
    });

    this.onClickEnter = new EventEmitter(false);
  }

  getEntidade(): Teste {
    return this.formgroup.getRawValue() as Teste;
  }

  criar(): Observable<Teste> {
    return of(this.getEntidade());
  }

  editar(): Observable<Teste> {
    return of(this.getEntidade());
  }

  remover(): Observable<Teste> {
    return of(this.getEntidade());
  }

  listarPaginacao(entidadePaginada: TestePaginado): Observable<TestePaginado> {
    return of(entidadePaginada);
  }


}
