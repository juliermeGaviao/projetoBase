import { Component } from '@angular/core'
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { toggleScrim } from '../../common/util'

import { ProductService } from '../../../../services/product.service'
import { SectorService } from '../../../../services/sector.service'
import { Sector } from '../../../../model/sector'
import { MessageService } from '../../../../services/message.service'
import { FormCRUD } from '../../common/view-new-edit.component'
import { Entity } from '../../../../interfaces/entity.interface'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent extends FormCRUD {

  sectors: any[] = []

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    public readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly sectorService: SectorService,
    private readonly productService: ProductService)
  {
    super(router, route, messageService, productService)
  }

  init() {
    this.title += 'Produto'
    this.loadEntity('Erro ao carregar dados do setor')

    if (!this.id) {
      this.loadSectors()
    }
  }

  protected postEntityLoadingAction(): void {
    this.loadSectors()
  }

  buildForm() {
    this.form = this.fb.group({
      nome: new FormControl({value: null, disabled: this.view}, Validators.required),
      idSetor: new FormControl({value: null, disabled: this.view}, Validators.required)
    })
  }

  setFormValues(data: any) {
    this.form.setValue({
      nome: data.nome,
      idSetor: data.setor.id
    })
  }

  loadSectors() {
    toggleScrim('scrimLoading')

    this.sectorService.getByParams({ "page": 0, "size": 100, "orderBy": 'nome' }).subscribe({
      next: (data: any) => {
        this.sectors = data.sectors.map( (sector: Sector) => { return {value: sector.id, label: sector.nome, selected: sector.id === this.form.value.idSetor } })
        toggleScrim('scrimLoading')
      },
      error: err => {
        toggleScrim('scrimLoading')
        this.messageService.showMessage(err?.message ?? 'Ocorreu um erro ao carregar setores', 'danger')
      }
    })
  }

  cancel(): void {
    this.navigate('/home/product')
  }

  protected getDto(): Entity {
    let result: any

    if (this.id) {
      result = { id: this.id, nome: this.form.value.nome, setor: { id: this.form.value.idSetor.value, nome: '' } }
    } else {
      result = { idSetor: this.form.value.idSetor.value, nome: this.form.value.nome }
    }

    return result
  }

  send(): void {
    super.send('/home/product', this.id ? 'Produto alterado com sucesso': 'Produto inserido com sucesso', 'Ocorreu um erro ao salvar o produto')
  }

}
  