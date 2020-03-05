import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { IDatabarBindOnClickService } from 'projects/ic-databar-lib/src/lib/contrato/IDataBarBindOnClickService';
import { DatabarEventClickService } from 'projects/ic-databar-lib/src/lib/services/ic-databar-event-click.service';
import { EStatus } from 'projects/ic-databar-lib/src/lib/enum/estatus';
import { Teste } from './model/teste';
import { TestePaginado } from './model/teste.paginado';
import { delay } from 'rxjs/operators';

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
    return of(this.getEntidade()).pipe(delay(1000));
  }

  editar(): Observable<Teste> {
    return of(this.getEntidade()).pipe(delay(1000));;
  }

  remover(): Observable<Teste> {
    return of(null);
  }

  listarPaginacao(entidadePaginada: TestePaginado): Observable<TestePaginado> {
    entidadePaginada.entidade = [{ nome: 'Teste' }];
    entidadePaginada.total = 10;
    entidadePaginada.posicao = 1;
    return of(entidadePaginada).pipe(delay(1000));
  }

  listarTecnologiaFavorita(): string[] {
    return [
      'Angular',
      'Android',
      '.NET'
    ]
  }
}
