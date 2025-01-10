import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ListComponent } from '../../common/list.component'
import { SectorService } from '../../../../services/sector.service'

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html'
})
export class ListSectorComponent extends ListComponent {

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly sectorService: SectorService)
  {
    super(router, route)
  }

  init(): void { return }

  setTableHeader(): void {
    this.dataTable.headers = [
      { name: 'Id', column: 'id', sortable: true },
      { name: 'Nome', column: 'nome', sortable: true },
      { name: 'Ações', column: null, sortable: false }
    ]
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null]
    })
  }

  search() {
    let params: any = { "page": this.dataTable.page.currentPage, "size": this.dataTable.page.itemsPerPage }

    if (this.form.value.nome) {
      params.nome = this.form.value.nome
    }

    if (this.dataTable.orderBy) {
      params['orderBy'] = this.dataTable.orderBy
      params['orderDirect'] = this.dataTable.orderDirect
    }

    this.toggleScrim('scrimLoading')

    this.sectorService.getByParams(params).subscribe({
      next: (data: any) => {
        this.dataTable.records = data.sectors
        super.setPageInfo(data, params.size)
      
        this.toggleScrim('scrimLoading')
      },
      error: err => {
        this.showMessage(err?.message ?? 'Ocorreu um erro ao carregar os setores', 'danger')
        this.toggleScrim('scrimLoading')
      }
    })
  }

  newItem() {
    super.navigate('/home/sector/new')
  }

  view(id: number) {
    super.navigate('/home/sector/view', { "id": id, "view": true })
  }

  edit(id: number) {
    super.navigate('/home/sector/edit', { "id": id })
  }

  remove() {
    super.remove(this.sectorService, 'Setor removido com sucesso', 'Ocorreu um erro ao remover o setor')
  }

}
  