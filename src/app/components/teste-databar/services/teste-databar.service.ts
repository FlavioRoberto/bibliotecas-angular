import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { TestePaginado } from '../model/teste.paginado';
import { Teste } from '../model/teste';
import { DatabarEventClickService, EStatus, IDatabarBindOnClickService } from '@breaking_dev/ic-databar-lib';

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
    console.log(this.formgroup.getRawValue());
    entidadePaginada.entidade = this.getDadosMock();
    return of(entidadePaginada);
  }

  private getDadosMock(): Teste[] {
    return [
      {
        codigo: 1,
        nome: 'Teste',
        sobrenome: 'Teste 2'
      }
    ] as Teste[];
  }

}
