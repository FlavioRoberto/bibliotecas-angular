import { IcExpansivelTableDataSource } from './ic-expancivel-table.datasource';
import { PaginacaoExpansivelTable } from './ic-paginacao-expansivel-table';

export interface IExpansivelTableServico<T> {
    metodoPesquisa: (filtro: PaginacaoExpansivelTable<T>, acaoFinalizar: () => void) => void;
    paginacaoExpansivelTable: PaginacaoExpansivelTable<T>;
    dataSource: IcExpansivelTableDataSource<T>;
}
