import { EEventoClick } from '../enum/eeventoclick';

export class DatabarEventClickService {

    constructor(private onEvent: (event: EEventoClick) => void) {}
  
    emitir(evento: EEventoClick): void {
      this.onEvent(evento);
    }

}
