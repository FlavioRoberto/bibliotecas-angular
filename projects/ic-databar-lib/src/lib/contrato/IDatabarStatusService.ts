import { EventEmitter } from '@angular/core';

import { IDataBarBindService } from './IDataBarService';
import { EStatus } from '../enum/estatus';

export interface IDatabarBindStatusService<T> extends IDataBarBindService<T> {
    setStatus: EventEmitter<EStatus>;
}
