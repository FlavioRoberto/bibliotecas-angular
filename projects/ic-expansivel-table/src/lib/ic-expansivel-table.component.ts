import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { AcoesExpansivelTable } from './contratos/ic-acoes-datatable.model';
import { IExpansivelTableServico } from './contratos/ic-expansivel-table-servico';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ic-expansivel-table',
  templateUrl: './view/ic-expansivel-table.component.html',
  styleUrls: ['./view/ic-expansivel-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IcExpansivelTableComponent implements OnInit, OnDestroy {

  @Input() displayedColumns: ColumnDef[];
  @Input() acoesTabela: AcoesExpansivelTable[];
  @Input() templateRef: any;
  @Input() desabilitarBotoes = false;
  @Input() habilitarProgressBar = false;
  @Input() servico: IExpansivelTableServico<any>;
  @Input() habilitarPesquisa = true;

  public acaoSelecionada = '';

  timeoutPesquisa$: Subject<string> = new Subject<string>();

  @ViewChild('inputPesquisa', { static: false }) inputPesquisa: ElementRef;

  public defColumns: string[];
  public pesquisando = false;
  public desabilitarBotoesPaginacao = false;
  public expandedElement: any;
  public isExpansionDetailRow = (i: number, row: object) => row.hasOwnProperty('detailRow');

  ngOnInit(): void {
    this.defColumns = this.displayedColumns.map(i => i.def);

    if (this.acoesTabela.length > 0) {
      this.defColumns.push('acao');
    }

    this.timeoutPesquisa$.pipe(
      debounceTime(1000),
      tap(() => this.exibirProgressBar(true))
    ).subscribe(res => {
      this.servico.paginacaoExpansivelTable.filtro = res;
      this.servico.metodoPesquisa(this.servico.paginacaoExpansivelTable, () => {
        this.exibirProgressBar(false);
        this.setFocusInputPesquisa();
      });
    });
  }


  ngOnDestroy(): void {
    this.timeoutPesquisa$.unsubscribe();
  }

  onClick(event, element, acao: AcoesExpansivelTable, index): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.acaoSelecionada === acao.descricao && acao.expandir) {
      this.fecharAba();
      return;
    }

    if (this.desabilitarBotoes) {
      return;
    }

    const i = index / 2;

    this.acaoSelecionada = acao.descricao;

    if (acao.expandir) {
      this.expandedElement = element;
    }

    acao.executaMetodo(element, i);
  }

  get desabilitarInputs(): boolean {
    return this.desabilitarBotoesPaginacao || this.desabilitarBotoes;
  }

  get habilitarProgressPesquisa(): boolean {
    return this.pesquisando || this.habilitarProgressBar;
  }

  public setFocusInputPesquisa(): void {
    setTimeout(() => {
      this.inputPesquisa.nativeElement.focus();
    }, 150);
  }

  public pesquisarPorFiltro(filtro: string): void {
    this.servico.paginacaoExpansivelTable.posicao = 0;
    this.timeoutPesquisa$.next(filtro);
  }

  public expandirTabela(row): void {
    if (this.expandedElement === row) {
      this.fecharAba();
    }
  }

  public paginar(index: MatPaginator): void {
    this.exibirProgressBar(true);
    this.servico.paginacaoExpansivelTable.posicao = index.pageIndex + 1;
    this.servico.paginacaoExpansivelTable.quantidade = index.pageSize;
    this.servico.metodoPesquisa(this.servico.paginacaoExpansivelTable, () => this.exibirProgressBar(false));
  }

  private fecharAba(): void {
    this.expandedElement = '';
    this.acaoSelecionada = '';
  }


  private exibirProgressBar(habilitar: boolean): void {
    this.desabilitarBotoes = habilitar;
    this.pesquisando = habilitar;
  }
}

export class ColumnDef {
  constructor(
    public titulo: string,
    public def: string,
    public value: string = '',
    // public pipe?: TiposPipes
  ) { }
}
