import { IDataBarBindComponent } from './IDataBarBind';
import { FormGroup } from '@angular/forms';
import { IDataEntidadePaginada } from './IDataEntidadePaginada';
import { IDataBarBindService } from './IDataBarService';
import { EStatus } from '../enum/estatus';

export abstract class OnInitDataBar<T> implements IDataBarBindComponent<T>{
    form: FormGroup;
    entidadePaginada: IDataEntidadePaginada<T>;
    statusDataBar: EStatus;
    servicoDataBarBind: IDataBarBindService<T>;
    EStatus: typeof EStatus = EStatus;
    
    abstract onStatusChanged(status: EStatus): void;

    abstract onInit(): void;

    ngOnInit(): void {
        this.onInit();
        this.servicoDataBarBind.status = EStatus.novaPesquisa;
    }

    statusChanged(status: EStatus): void {
        this.servicoDataBarBind.status = status;
        this.statusDataBar = status;
        this.onStatusChanged(status);
    }

    public get inserindoOuEditando(): boolean {
        return this.statusDataBar === EStatus.inserindo || 
               this.statusDataBar === EStatus.editando;
    }

}
