import { CargoDisciplina } from './cargo-disciplina';
import { IExpansivelTableServico, IcExpansivelTableDataSource, PaginacaoExpansivelTable } from '@breaking_dev/ic-expansivel-table';
import { Injectable } from '@angular/core';

@Injectable()
export class TesteExpansivelTableService implements IExpansivelTableServico<CargoDisciplina>{

  metodoPesquisa = this._pesquisar;
  paginacaoExpansivelTable: PaginacaoExpansivelTable<CargoDisciplina>;
  dataSource: IcExpansivelTableDataSource<any>;

  constructor() {
    this.dataSource = new IcExpansivelTableDataSource([{
      codigoCargo: 1,
      codigoCurriculoDisciplina: 1,
      cursoDescricao: 'Engenharia da computação',
      disciplinaDescricao: 'Inteligência Artifical',
      turno: '1'
    }] as CargoDisciplina[]);
    this.paginacaoExpansivelTable = new PaginacaoExpansivelTable();
  }

  private _pesquisar(filtro: PaginacaoExpansivelTable<any>, acaoFinalizar: () => void): void {

  }
}
