declare type Posicao = 'below' | 'above' | 'left' | 'right';

export class AcoesExpansivelTable {
  icone?: string = undefined;
  executaMetodo?: (data?: any, posicao?: number) => void = undefined;
  descricao?: string = undefined;
  toolTip?: string = undefined;
  toolTipPosicao?: Posicao = 'above';
  expandir = true;

  constructor(init?: Partial<AcoesExpansivelTable>) {
    Object.assign(this, init);
  }
}
