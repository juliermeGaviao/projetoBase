import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProcesso } from 'src/app/interfaces/IProcesso';
import { ProcessoService } from '../../../../services/processo.service';
import { ProcessoStateService } from '../../../../services/processo-state.service';

@Component({
  selector: 'app-infos-gerais',
  templateUrl: './infos-gerais.component.html',
})
export class InfosGeraisComponent implements OnInit {
  public userForm: FormGroup;
  public processo?: IProcesso;

  constructor(
    private readonly fb: FormBuilder,
    private readonly processoService: ProcessoService,
    private readonly processoStateService: ProcessoStateService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [{ value: null, disabled: true }],
      cpf: [{ value: null, disabled: true }],
      rg: [{ value: null, disabled: true }],
      pai: [{ value: null, disabled: true }],
      mae: [{ value: null, disabled: true }],
      estadoCivil: [{ value: null, disabled: true }],
      address: [{ value: null, disabled: true }],
      cep: [{ value: null, disabled: true }],
      uf: [{ value: null, disabled: true }],
      bairro: [{ value: null, disabled: true }],
      cidade: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      mobile: [{ value: null, disabled: true }],
    });
  
    const processoId = this.processoStateService.getProcessoId();
    if (processoId) {
      this.processoService.obterProcessoPorId(processoId).subscribe((processo) => {
        if (processo) {
          this.processo = processo;
          this.preencherFormulario(processo);
        }
      });
    }
  }
  

  preencherFormulario(processo: IProcesso): void {
    const processado = processo.processado;

    this.userForm.patchValue({
      name: processado?.nome || '',
      cpf: processado?.cpf || processado?.cnpj || '',
      rg: processado?.rg || '',
      pai: processado?.nomePai || '',
      mae: processado?.nomeMae || '',
      estadoCivil: processado?.estadoCivil || '',
      address: processado?.logradouro || '',
      cep: processado?.cep || '',
      uf: processado?.uf || '',
      bairro: processado?.bairro || '',
      cidade: processado?.cidade || '',
      email: processado?.email || '',
      mobile: processado?.telefone || '',
    });
  }
}
