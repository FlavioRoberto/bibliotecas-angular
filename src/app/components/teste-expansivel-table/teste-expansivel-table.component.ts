import { Component, OnInit } from '@angular/core';
import { TesteExpansivelTableService } from './teste-expansivel-table.service';
import { ColumnDef, AcoesExpansivelTable } from '@breaking_dev/ic-expansivel-table';

@Component({
  selector: 'teste-expansivel-table',
  templateUrl: './teste-expansivel-table.component.html'
})
export class TesteExpansivelTableComponent implements OnInit {

  colunasExpansivelTable: ColumnDef[];
  acoesExpansivelTable: AcoesExpansivelTable[];

  constructor(public expansivelTableServico: TesteExpansivelTableService) {
  }

  ngOnInit(): void {
    this.colunasExpansivelTable = [
      { def: 'cursoDescricao', titulo: 'Curso', value: null },
      { def: 'disciplinaDescricao', titulo: 'Disciplina', value: null }
    ];

    this.acoesExpansivelTable = [
      {
        descricao: 'Remover',
        executaMetodo: () => { alert('teste'); },
        icone: 'delete',
        toolTip: 'Remover disciplina',
        expandir: false
      },
      {
        descricao: 'Editar',
        executaMetodo: () => { alert('teste'); },
        icone: 'edit',
        toolTip: 'Editar disciplina',
        expandir: false
      }
    ];
  }

}
