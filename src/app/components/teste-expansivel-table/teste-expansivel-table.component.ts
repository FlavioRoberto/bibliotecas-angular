import { Component, OnInit } from "@angular/core";
import { ColumnDef } from "projects/ic-expansivel-table/src/lib/ic-expansivel-table.component";
import { AcoesExpansivelTable } from "../../../../projects/ic-expansivel-table/src/lib/contratos/ic-acoes-datatable.model";
import { TesteExpansivelTableService } from './teste-expansivel-table.service';

@Component({
  selector: "ap-teste-expansivel-table",
  templateUrl: "./teste-expansivel-table.component.html"
})
export class TesteExpansivelTableComponent implements OnInit {
  public colunas: ColumnDef[];
  public acoesTabela: AcoesExpansivelTable[];
  public linhaSelecionadaId: number;

  constructor(public servicoExpansivelTable: TesteExpansivelTableService) { }

  ngOnInit() {
    this.colunas = [
      {
        titulo: "Teste de coluna 1",
        def: "teste1"
      },
      {
        titulo: "Teste de coluna 2",
        def: "teste2"
      },
      {
        titulo: "Teste de coluna 3",
        def: "teste3"
      }
    ] as ColumnDef[];

    this.acoesTabela = [
      {
        descricao: "ação 1",
        icone: "timer",
        expandir: true,
        executaMetodo: linhaSelecionada =>
          this.selecionarLinha(linhaSelecionada, 1)
      },
      {
        descricao: "ação 2",
        icone: "print",
        expandir: true,
        executaMetodo: linhaSelecionada =>
          this.selecionarLinha(linhaSelecionada, 2)
      }
    ];

    this.servicoExpansivelTable.metodoPesquisa(this.servicoExpansivelTable.paginacaoExpansivelTable, () => {
      console.log('pesquisa finalizada')
    })
  }

  private selecionarLinha(linhaSelecionada, numeroLinha) {
    console.log(`Selecionou linha ${numeroLinha}`, linhaSelecionada);
    this.linhaSelecionadaId = numeroLinha;
  }
}
