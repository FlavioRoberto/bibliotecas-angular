
export class PaginacaoExpansivelTable<T> {
    total = 0;
    posicao = 0;
    quantidade = 10;
    entidade: T[] = [];
    filtro = '';

    constructor(init?: Partial<PaginacaoExpansivelTable<T>>) {
        Object.assign(this, init);
    }
}
