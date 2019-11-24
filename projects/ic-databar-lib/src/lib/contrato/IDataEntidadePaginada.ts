export interface IDataEntidadePaginada<T> {
    total: number;
    posicao: number;
    entidade: T[];
    quantidade: number;
}
