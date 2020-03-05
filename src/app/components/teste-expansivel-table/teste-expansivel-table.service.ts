import { IExpansivelTableServico } from "../../../../projects/ic-expansivel-table/src/lib/contratos/ic-expansivel-table-servico";
import { PaginacaoExpansivelTable, IcExpansivelTableDataSource } from "projects/ic-expansivel-table/src/public-api";
import { Injectable } from '@angular/core';

@Injectable()
export class TesteExpansivelTableService implements IExpansivelTableServico<any> {

    public dataSource: IcExpansivelTableDataSource<any>;
    public paginacaoExpansivelTable: PaginacaoExpansivelTable<any>;

    constructor() {
        this.dataSource = new IcExpansivelTableDataSource([]);
        this.paginacaoExpansivelTable = new PaginacaoExpansivelTable<any>();
    }

    public metodoPesquisa(filtro: PaginacaoExpansivelTable<any>, acaoFinalizar: () => void): void {
        console.log('filtro de pesquisa: ', filtro);
        const entidade = [{
            teste1: 'Aqui vem a desricao de teste 1',
            teste2: 'Aqui vem a descricao de teste 2',
            teste3: 'Aqui vem a descricao de teste 3'
        }];

        this.dataSource.addRange(entidade);
        this.paginacaoExpansivelTable.entidade = entidade;
        this.paginacaoExpansivelTable.total = 1;
        acaoFinalizar();
    }

}
