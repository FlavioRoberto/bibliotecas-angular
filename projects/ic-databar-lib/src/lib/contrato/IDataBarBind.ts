import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IDataEntidadePaginada } from './IDataEntidadePaginada';
import { IDataBarBindService } from './IDataBarService';
import { EStatus } from '../enum/estatus';

export interface IDataBarBindComponent<T> extends OnInit {
    form: FormGroup;
    entidadePaginada: IDataEntidadePaginada<T>;
    statusDataBar: EStatus;
    servicoDataBarBind: IDataBarBindService<T>;
    
    statusChanged(status: EStatus): void;
}
