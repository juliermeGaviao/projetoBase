import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { toggleScrim } from '../../common/util'
import { MessageService } from '../../../../services/message.service'

import { ListCRUD } from '../../common/list.component'
import { ProductService } from '../../../../services/product.service'
import { SectorService } from '../../../../services/sector.service'
import { Sector } from '../../../../model/sector'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})
export class ListProductComponent extends ListCRUD {

  sectors: any[] = []

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    public readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly sectorService: SectorService,
    private readonly productService: ProductService)
  {
    super(router, route, messageService)
  }

  setTableHeader(): void {
    this.dataTable.headers = [
      { name: 'Id', column: 'id', sortable: true },
      { name: 'Nome', column: 'nome', sortable: true },
      { name: 'Setor', column: 'setor.nome', sortable: true },
      { name: 'Ações', column: null, sortable: false }
    ]
  }

  init(): void {
    this.loadSectors()
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null],
      idSetor: [null]
    })
  }

  search() {
    this.loadSectors()

    let params: any = { "page": this.dataTable.page.currentPage, "size": this.dataTable.page.itemsPerPage }

    if (this.form.value.nome) {
      params.nome = this.form.get('nome').value
    }

    if (this.form.value.idSetor) {
      params.idSetor = this.form.get('idSetor').value.value
    }

    if (this.dataTable.orderBy) {
      params['orderBy'] = this.dataTable.orderBy
      params['orderDirect'] = this.dataTable.orderDirect
    }

    toggleScrim('scrimLoading')
    this.productService.getByParams(params).subscribe({
      next: (data: any) => {
        this.dataTable.records = data.products
        super.setPageInfo(data, params.size)

        toggleScrim('scrimLoading')
      },
      error: err => {
        this.messageService.showMessage(err?.message ?? 'Ocorreu um erro ao carregar os produtos', 'danger')
        toggleScrim('scrimLoading')
      }
    })
  }

  loadSectors() {
    toggleScrim('scrimLoading')
    this.sectorService.getByParams({ "page": 0, "size": 100, "orderBy": 'nome' }).subscribe({
      next: (data: any) => {
        this.sectors = data.sectors.map( (sector: Sector) => { return { value: sector.id, label: sector.nome } })

        toggleScrim('scrimLoading')
      },
      error: err => {
        this.messageService.showMessage(err?.message ?? 'Ocorreu um erro ao carregar setores', 'danger')
        toggleScrim('scrimLoading')
      }
    })
  }

  newItem() {
    super.navigate('/home/product/new')
  }

  view(id: number) {
    super.navigate('/home/product/view', { "id": id, "view": true })
  }

  edit(id: number) {
    super.navigate('/home/product/edit', { "id": id })
  }

  remove() {
    super.remove(this.productService, 'Produto removido com sucesso', 'Ocorreu um erro ao remover o produto')
  }

}
