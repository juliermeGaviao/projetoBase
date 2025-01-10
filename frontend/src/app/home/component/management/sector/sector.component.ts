import { Component } from '@angular/core'
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Sector } from '../../../../model/sector'
import { SectorService } from '../../../../services/sector.service'
import { FormCRUD } from '../../common/view-new-edit.component'
import { MessageService } from '../../../../services/message.service'
import { Entity } from '../../../../interfaces/entity.interface'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html'
})
export class SectorComponent extends FormCRUD {

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    public readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly sectorService: SectorService)
  {
    super(router, route, messageService, sectorService)
  }

  init() {
    this.title += 'Setor'
  }

  buildForm() {
    this.form = this.fb.group({
      nome: new FormControl({value: null, disabled: this.view}, Validators.required)
    })
  }

  setFormValues(data: any) {
    this.form.setValue({
      nome: data.nome
    })
  }

  cancel() {
    this.navigate('/home/sector')
  }

  protected getDto(): Entity {
    const result: Sector = new Sector()

    result.nome = this.form.value.nome

    return result
  }

  send() {
    super.send('/home/sector', this.id ? 'Setor alterado com sucesso': 'Setor inserido com sucesso', 'Ocorreu um erro ao salvar o setor')
  }

}
  