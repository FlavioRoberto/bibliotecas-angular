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

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDataEntidadePaginada } from './contrato/IDataEntidadePaginada';
import { IDataBarBindService } from './contrato/IDataBarService';
import { EStatus } from './enum/estatus';
import { EEventoClick } from './enum/eeventoclick';
import { IDatabarBindOnClickService } from './contrato/IDataBarBindOnClickService';
import { IDatabarBindStatusService } from '../public-api';
import { DialogService } from '../components/dialogs/confirma-dialog/service/dialog.service';
import { ErrorDialogService } from '../components/dialogs/error-dialog/service/error-dialog.service';
import { ACAO_PAGINACAO } from './constants/ic-databar.constants';
import { DatabarService } from './services/ic-databar.service';
import { MatDrawer } from '@angular/material/sidenav';

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

  public status: EStatus;
  public EStatus = EStatus;
  public emProgresso = false;
  private $setStatus: Subscription;

  private _statusAnterior: EStatus;
  private _dadosAnterioresFormulario: T;

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  constructor(
    private _dialog: DialogService,
    private _dialogErro: ErrorDialogService,
    private _elementRef: ElementRef,
    private _databarService: DatabarService
  ) { }

  ngOnInit(): void {
    this.validarPropertsObrigatorias();
    this.setProgresso(false);
    this.status = EStatus.novaPesquisa;
    this.form.disable();
    this._submeterFormularioOnEnter();
    this.observarSetStatus();
  }

  ngOnDestroy(): void {
    if (this.servicoBind.onClickEnter)
      this.servicoBind.onClickEnter.unsubscribe();

    if (this.$setStatus)
      this.$setStatus.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  fecharSidenav(event): void {
    if (this._elementRef.nativeElement.contains(event.target)) {
      return;
    }
    this.drawer.close();
  }

  onClickReverter(): void {
    this._emitirEventoClick(EEventoClick.onClickReverter);
    this.reverter();
    this._emitirEventoClick(EEventoClick.afterClickReverter);
  }

  onClickNovaPesquisa(): void {
    this._emitirEventoClick(EEventoClick.onClickNovaPesquisa);
    this.novaPesquisa();
    this._emitirEventoClick(EEventoClick.afterClickNovaPesquisa);
  }

  reverter(): void {
    this._emitirEventoClick(EEventoClick.onClickReverter);
    // console.log('antes de setar valores', this._dadosAnterioresFormulario);
    this.form.patchValue(this._dadosAnterioresFormulario);

    console.log('formulario apos colocar valores', this.form);

    if (this._statusAnterior == EStatus.dadosCarregados)
      this._databarService.desabilitarForm(this.form);
    else
      this._databarService.habilitarForm(this.form);

    this.setStatus(this._statusAnterior);
    this._emitirEventoClick(EEventoClick.afterClickReverter);
  }

  novaPesquisa(): void {
    this._databarService.habilitarForm(this.form);
    this.form.reset({ emitEvent: false, onlySelf: true });
    this.entidadePaginada.entidade = this.form.value;
    this.entidadePaginada.posicao = 0;
    this.entidadePaginada.total = 0;
    this.setStatus(EStatus.novaPesquisa);
  }

  pesquisar(): void {
    this._setDadosAnteriores(this.status);
    this.setStatus(EStatus.pesquisando);
    this.entidadePaginada.entidade = [].concat(this._getEntidade());
    this._paginar();
    this.drawer.close();
  }

  inserir(): void {
    this._emitirEventoClick(EEventoClick.onClickInserir);
    this._clickInserir();
    this._emitirEventoClick(EEventoClick.afterClickInserir);
  }

  editar(): void {
    this._emitirEventoClick(EEventoClick.onClickEditar);
    this._clickEditar();
    this._emitirEventoClick(EEventoClick.afterClickEditar);
  }

  remover(): void {
    this._emitirEventoClick(EEventoClick.onClickRemover);
    this._clickRemover();
    this._emitirEventoClick(EEventoClick.afterClickRemover);
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

  salvar(): void {
    this._emitirEventoClick(EEventoClick.onClickSalvar);

    switch (this.status) {
      case EStatus.inserindo:
        this.setStatus(EStatus.salvando);
        this.setProgresso(true);
        this.servicoBind.criar()
          .pipe(finalize(() => {
            this._emitirEventoClick(EEventoClick.afterClickSalvar);
          }))
          .subscribe(
            success => {
              this.setProgresso(false);

              this._databarService.openSnackBar(
                'Registro salvo com sucesso!',
                'sucesso'
              );
              this.form.patchValue(success);

              this.setProgresso(false)

              this.setStatus(EStatus.dadosCarregados);

              this.drawer.close();

              this._databarService.desabilitarForm(this.form);
            },
            () => {
              this.setProgresso(false);
              this.setStatus(EStatus.inserindo);
            });

        break;

      case EStatus.editando:
        this.setStatus(EStatus.salvando);
        this.setProgresso(true);
        this.servicoBind.editar()
          .pipe(finalize(() => {
            this._emitirEventoClick(EEventoClick.afterClickSalvar);
          }))
          .subscribe(
            success => {
              this._databarService.openSnackBar(
                'Registro editado com sucesso!',
                'sucesso'
              );

              this.form.patchValue(success);

              this.setProgresso(false)

              this.setStatus(EStatus.dadosCarregados);

              this._databarService.desabilitarForm(this.form);

              this.drawer.close();
            },
            () => {
              this.setProgresso(false);
              this.setStatus(EStatus.editando);
            });
        break;
    }
  }

  private observarSetStatus(): void {
    if ((this.servicoBind as IDatabarBindStatusService<T>).setStatus) {
      this.$setStatus = (this.servicoBind as IDatabarBindStatusService<T>).setStatus
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

  private _resetarContadorPaginacao(): void {
    this.entidadePaginada.posicao = 0;
    this.entidadePaginada.total = 0;
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

  private _clickInserir(): void {
    this._setDadosAnteriores(this.status);
    this._resetarContadorPaginacao();
    this._databarService.habilitarForm(this.form);

    this.form.reset({ emitEvent: false, onlySelf: true });
    this.drawer.close();
    this.setStatus(EStatus.inserindo);
  }

  private _setDadosAnteriores(status: EStatus) {
    this._dadosAnterioresFormulario = this.form.getRawValue();
    this._statusAnterior = status;
  }

  private _clickEditar(): void {
    this._setDadosAnteriores(this.status);
    this._databarService.habilitarForm(this.form);

    this.form.markAllAsTouched();
    this.drawer.close();
    this.setStatus(EStatus.editando);
  }

  private _clickRemover(): void {
    this.setStatus(EStatus.removendo);
    this._exibirDialogConfirmacao();
    this.drawer.close();
  }

  private _emitirEventoClick(evento: EEventoClick): void {
    if ((this.servicoBind as IDatabarBindOnClickService<T>).eventDatabar) {
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
          this._databarService.openSnackBar('Removido com sucesso', 'sucesso');
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

  private _paginar(acao?: ACAO_PAGINACAO): void {
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
          this.setStatus(EStatus.novaPesquisa);
          return;
        }

        if (success.entidade == null) {
          this._databarService.resetForm(this.form, this.entidadePaginada);
          this.setStatus(EStatus.novaPesquisa);
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

        this._databarService.desabilitarForm(this.form);
      },
      error => {
        console.error('erro paginação', error);
        this.setStatus(EStatus.dadosCarregados);
        this.entidadePaginada.posicao = posicaoAnterior;
        this.setProgresso(false);
        this._databarService.desabilitarForm(this.form);
      });
  }

  private setProgresso(progresso: boolean): boolean {
    if (!this.form) {
      return;
    }

    this.emProgresso = progresso;

    if (progresso) {
      this._databarService.desabilitarForm(this.form);
    }

    if (!progresso) {
      this._databarService.habilitarForm(this.form);
    }
  }

  get inserindoOuEditando(): boolean {
    return (this.status === EStatus.inserindo ||
      this.status === EStatus.editando)
  }

  get desabilitarBotoesPaginacaoProximo(): boolean {
    return this.inserindoOuEditando ||
      this.entidadePaginada.posicao >= this.entidadePaginada.total ||
      this.emProgresso;
  }

  get desabilitarBotoesPaginacaoAnterior(): boolean {

    return this.inserindoOuEditando ||
      this.entidadePaginada.posicao <= 1 ||
      this.emProgresso;
  }

}
