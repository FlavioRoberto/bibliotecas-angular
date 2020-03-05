import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { OnInitDataBar } from 'projects/ic-databar-lib/src/lib/contrato/OnInitDataBar';
import { EStatus } from 'projects/ic-databar-lib/src/lib/enum/estatus';
import { TesteDatabarService } from './teste-databar.service';
import { TestePaginado } from './model/teste.paginado';

@Component({
  selector: 'ap-teste-databar',
  templateUrl: './teste-databar.component.html',
  styleUrls: ['./teste-databar.component.scss']
})
export class TesteDatabarComponent extends OnInitDataBar<any> implements OnInit {

  public tecnologiaFavorita: string[];

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  onInit(): void {
    this.entidadePaginada = new TestePaginado();
    this.form = this._construirFormulario();
    // this.form.valueChanges.subscribe(value => console.log(value));
    this.servicoDataBarBind = new TesteDatabarService(this.form);
    this.tecnologiaFavorita = (this.servicoDataBarBind as TesteDatabarService).listarTecnologiaFavorita();
  }

  onStatusChanged(status: EStatus): void {
    this.statusDataBar = status;
    this.servicoDataBarBind.status = status;
  }

  private _construirFormulario() {
    return this.formBuilder.group({
      nome: [null, [Validators.required]],
      tecnologiaFavorita: [null],
      formarray: this.formBuilder.array([])
    }, { updateOn: 'blur' });
  }

  adicionar(): void {
    Array.from({ length: 10 }).map((item, index) => {
      (this.form.get('formarray') as FormArray)
        .push(
          new FormGroup({
            id: new FormControl(`${item} - ${index}`)
          })
        )
    })
  }

  get listaFormArray(): AbstractControl[] {
    return (this.form.get('formarray') as FormArray).controls;
  }

}
