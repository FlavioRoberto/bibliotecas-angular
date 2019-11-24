import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { EStatus } from '../enum/estatus';
import { IDataEntidadePaginada } from '../../public-api';

export interface IDataBarBindService<T> {
    formgroup: FormGroup;
    onClickEnter: EventEmitter<T>;
    status: EStatus;

    getEntidade(): T;
    criar(): Observable<T>;
    editar(): Observable<T>;
    remover(): Observable<T>;
    listarPaginacao(
        entidadePaginada: IDataEntidadePaginada<T>
    ): Observable<IDataEntidadePaginada<T>>;
}
