import { Teste } from './teste';
import { IDataEntidadePaginada } from 'projects/ic-databar-lib/src/lib/contrato/IDataEntidadePaginada';

export class TestePaginado implements IDataEntidadePaginada<Teste> {
  total = 0;
  posicao = 0;
  entidade = [];
  quantidade = 0;


  constructor(partial?: Partial<Teste>) {
    Object.assign(this, partial);
  }

}
