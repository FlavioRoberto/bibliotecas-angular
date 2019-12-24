import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    HostListener,
    ElementRef,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatSnackBar, MatDrawer } from '@angular/material';

import { IDataEntidadePaginada } from './contrato/IDataEntidadePaginada';
import { IDataBarBindService } from './contrato/IDataBarService';
import { EStatus } from './enum/estatus';
import { EEventoClick } from './enum/eeventoclick';
import { IDatabarBindOnClickService } from './contrato/IDataBarBindOnClickService';
import { IDatabarBindStatusService } from '../public-api';
import { DialogService } from './components/dialogs/confirma-dialog/service/dialog.service';
import { ErrorDialogService } from './components/dialogs/error-dialog/service/error-dialog.service';

@Component({
    selector: 'ic-data-bar',
    templateUrl: './view/ic-data-bar.component.html',
    styleUrls: ['./view/ic-data-bar.component.scss']
})
export class DataBarComponent<T> implements OnInit, OnDestroy {
    @Input() servicoBind: IDataBarBindService<T> | IDatabarBindStatusService<T> | IDatabarBindOnClickService<T>;
    @Input() form: FormGroup;
    @Input() entidadePaginada: IDataEntidadePaginada<T>;
    @Input() disabled = false;
    @Input() desabilitarBotaoRemover: boolean;
    @Output() statusChanged = new EventEmitter<EStatus>();

    @ViewChild('drawer', null) drawer: MatDrawer;

    status: EStatus;
    EStatus = EStatus;
    emProgresso = false;

    constructor(
        private _dialog: DialogService,
        private _dialogErro: ErrorDialogService,
        private snackBar: MatSnackBar,
        private _elementRef: ElementRef,
    ) { }

    ngOnInit(): void {
        this.validarPropertsObrigatorias();
        this.setProgresso(false);
        this.novaPesquisa();
        this._submeterFormularioOnEnter();

        if ((this.servicoBind as IDatabarBindStatusService<T>).setStatus) {
            (this.servicoBind as IDatabarBindStatusService<T>).setStatus
                .subscribe(status => {
                    switch (status) {
                        case EStatus.editando:
                            this.editar();
                            this.emProgresso = false;
                            break;
                        case EStatus.inserindo:
                            this.inserir();
                            this.emProgresso = false;
                            break;
                        case EStatus.pesquisando:
                            this.pesquisar();
                            break;
                        case EStatus.novaPesquisa:
                            this.novaPesquisa();
                            break;
                        case EStatus.removendo:
                            this.remover();
                            break;
                        case EStatus.dadosCarregados:
                            this.status = EStatus.dadosCarregados;
                            this.emProgresso = false;
                            break;
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.servicoBind.onClickEnter.unsubscribe();
    }

    @HostListener('document:click', ['$event'])
    fecharSidenav(event): void {
        if (this._elementRef.nativeElement.contains(event.target)) {
            return;
        }
        this.drawer.close();
    }

    private validarPropertsObrigatorias(): any {
        if (this.servicoBind == null) {
            throw new Error('É obrigatório ter um serviço de bind vinculado');
        }

        if (this.entidadePaginada == null) {
            throw new Error(
                'É obrigatório ter uma entidade paginada vinculada'
            );
        }
    }

    private setProgresso(progresso: boolean): any {
        if (!this.form) {
            return;
        }

        this.emProgresso = progresso;

        if (progresso) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    private openSnackBar(message: string, classe: string): void {
        this.snackBar.open(message, '', {
            duration: 3000,
            panelClass: classe
        });
    }

    private setStatus(status: EStatus): void {
        if (!status) {
            return;
        }
        this.status = status;
        this.statusChanged.emit(this.status);
    }

    private _getEntidade(): T {
        const result = this.form.getRawValue() as T;
        return result;
    }

    private _submeterFormularioOnEnter(): void {
        this.servicoBind.onClickEnter.subscribe(() => {
            if (this.status === EStatus.novaPesquisa) {
                this.pesquisar();
            }
        });
    }

    novaPesquisa(): void {
        this.form.enable();
        this.form.reset();
        this.entidadePaginada.entidade = this.form.value;
        this.entidadePaginada.posicao = 0;
        this.entidadePaginada.total = 0;
        this.setStatus(EStatus.novaPesquisa);
    }

    onClickNovaPesquisa(): void {
        this._emitirEventoClick(EEventoClick.onClickNovaPesquisa)
        this.novaPesquisa();
        this._emitirEventoClick(EEventoClick.afterClickNovaPesquisa)
    }


    pesquisar(): void {
        this.setStatus(EStatus.pesquisando);
        this.entidadePaginada.entidade = [].concat(this._getEntidade());
        this._paginar();
        this.drawer.close();
    }

    private _clickInserir(): void {
        this.form.enable();
        this.form.reset();
        this.drawer.close();
        this.setStatus(EStatus.inserindo);
    }

    inserir(): void {
        this._emitirEventoClick(EEventoClick.onClickInserir);
        this._clickInserir();
        this._emitirEventoClick(EEventoClick.afterClickInserir);
    }

    private _clickEditar(): void {
        this.form.enable();
        this.form.markAllAsTouched();
        this.drawer.close();
        this.setStatus(EStatus.editando);
    }

    editar(): void {
        this._emitirEventoClick(EEventoClick.onClickEditar);
        this._clickEditar();
        this._emitirEventoClick(EEventoClick.afterClickEditar);
    }

    private _clickRemover(): void {
        this.setStatus(EStatus.removendo);
        this._exibirDialogConfirmacao();
        this.drawer.close();
    }

    remover(): void {
        this._emitirEventoClick(EEventoClick.onClickRemover);
        this._clickRemover();
        this._emitirEventoClick(EEventoClick.afterClickRemover);
    }

    salvar(): void {
        switch (this.status) {
            case EStatus.inserindo:
                this.setStatus(EStatus.salvando);
                this.setProgresso(true);
                this.servicoBind.criar().subscribe(
                    success => {
                        this.setProgresso(false);

                        this.openSnackBar(
                            'Registro salvo com sucesso!',
                            'sucesso'
                        );
                        this.form.patchValue(success);

                        this.setStatus(EStatus.dadosCarregados);

                        this.form.disable();

                        this.drawer.close();
                    },
                    () => {
                        this.setProgresso(false);
                        this.setStatus(EStatus.inserindo);
                    }
                );
                break;

            case EStatus.editando:
                this.setStatus(EStatus.salvando);
                this.setProgresso(true);
                this.servicoBind.editar().subscribe(
                    success => {
                        this.setProgresso(false);

                        this.openSnackBar(
                            'Registro editado com sucesso!',
                            'sucesso'
                        );

                        this.form.patchValue(success);

                        this.setStatus(EStatus.dadosCarregados);

                        this.form.disable();

                        this.drawer.close();
                    },
                    () => {
                        this.setProgresso(false);
                        this.setStatus(EStatus.editando);
                    }
                );
                break;
        }
    }

    private _emitirEventoClick(evento: EEventoClick): void {
        if ((this.servicoBind as IDatabarBindOnClickService<T>).eventDatabar){
            (this.servicoBind as IDatabarBindOnClickService<T>).eventDatabar.emitir(evento);
        }
    }

    private _acaoCloseDialogConfirmacao(): void {
        this._dialog.emProgresso = false;
        this._dialog.closeDialog();
        this.setStatus(EStatus.dadosCarregados);
    }

    private _exibirDialogConfirmacao(): void {
        this._dialog.acaoMensagem = 'Removendo registro...';
        this._dialog.acaoOk = () =>
            this.servicoBind.remover().subscribe(
                () => {
                    this._dialog.closeDialog();
                    this.novaPesquisa();
                    this._dialog.emProgresso = false;
                    this.openSnackBar('Removido com sucesso', 'sucesso');
                },
                () => this._acaoCloseDialogConfirmacao()
            );
        this._dialog.acaoCancelar = () => {
            this._acaoCloseDialogConfirmacao();
        };

        this._dialog.openDialog(
            'Atenção',
            'Você realmente deseja excluir este registro?'
        );
    }

    private _paginar(acao?: string): void {
        this.setStatus(EStatus.pesquisando);

        if (this.entidadePaginada.entidade == null) {
            this.entidadePaginada.entidade = [].concat(this._getEntidade());
        }

        const posicaoAnterior = this.entidadePaginada.posicao;

        switch (acao) {
            case 'primeiro':
                this.entidadePaginada.posicao = 1;
                break;
            case 'ultimo':
                this.entidadePaginada.posicao = this.entidadePaginada.total;
                break;
            case 'proximo':
                this.entidadePaginada.posicao++;
                break;
            case 'anterior':
                this.entidadePaginada.posicao--;
                break;
            default:
                this.entidadePaginada.posicao = 0;
                break;
        }

        this.setProgresso(true);

        this.servicoBind.listarPaginacao(this.entidadePaginada).subscribe(
            success => {
                this.setProgresso(false);

                if (success == null) {
                    this._dialogErro.openDialog(
                        'Atenção',
                        'Nenhum registro foi encontrado!'
                    );
                    this.status = EStatus.novaPesquisa;
                    return;
                }

                if (success.entidade == null) {
                    this._resetForm();
                    this.status = EStatus.novaPesquisa;
                    return;
                }

                this.setStatus(EStatus.dadosCarregados);

                if (!this.entidadePaginada.entidade) {
                    this.entidadePaginada = success;
                } else {
                    this.entidadePaginada.total = success.total;
                    this.entidadePaginada.posicao = success.posicao;
                }

                this.form.patchValue(success.entidade[0]);

                this.setProgresso(false);

                this.form.disable();
            },
            error => {
                console.error('erro paginação', error);
                this.setStatus(EStatus.dadosCarregados);
                this.entidadePaginada.posicao = posicaoAnterior;
                this.setProgresso(false);
                this.form.disable();
            }
        );
    }

    proximo(): void {
        this._paginar('proximo');
    }

    anterior(): void {
        this._paginar('anterior');
    }

    ultimo(): void {
        this._paginar('ultimo');
    }

    primeiro(): void {
        this._paginar('primeiro');
    }

    private _resetForm(): void {
        this.form.reset();
        this.entidadePaginada.entidade = null;
        this.entidadePaginada.posicao = 0;
        this.entidadePaginada.total = 0;
    }
}
