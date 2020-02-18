declare type Cor = 'primary' | 'accent' | 'warn';
declare type Posicao = 'below' | 'above' | 'left' | 'right';

export class AcoesExpansivelTable {
    icone?: string = undefined;
    executaMetodo?: (data?: any, posicao?: number) => void = undefined;
    descricao?: string = undefined;
    cor?: Cor = 'accent';
    toolTip?: string = undefined;
    toolTipPosicao?: Posicao = 'above';

    constructor(init?: Partial<AcoesExpansivelTable>) {
        Object.assign(this, init);
    }
}
