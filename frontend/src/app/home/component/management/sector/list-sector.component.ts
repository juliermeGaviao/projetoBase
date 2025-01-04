import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Scrim } from '@govbr-ds/core'

import { DataTable } from 'src/app/shared/component/dynamic-table/dynamic-table.interface'

import { SectorService } from 'src/app/services/sector.service'

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html'
})
export class ListSectorComponent implements OnInit {

  @ViewChild('listagem') listagem: ElementRef

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }
  form: FormGroup

  dataTable: DataTable = {
    headers: [
      { name: 'Id', column: 'id', sortable: true },
      { name: 'Nome', column: 'nome', sortable: true },
      { name: 'Ações', column: null, sortable: false }
    ],
    records: [],
    page: {
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 0,
      totalPages: 0
    },
    orderBy: null,
    orderDirect: null
  }

  private idDelete: number

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sectorService: SectorService)
  { }

  ngOnInit() {
    this.buildForm()
    this.search()
    this.resolve()
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null]
    })
  }

  search() {
    let params: any = { "page": this.dataTable.page.currentPage, "size": this.dataTable.page.itemsPerPage }

    if (this.form.get('nome').value) {
      params.nome = this.form.get('nome').value
    }

    if (this.dataTable.orderBy) {
      params['orderBy'] = this.dataTable.orderBy
      params['orderDirect'] = this.dataTable.orderDirect
    }

    this.toggleScrim('scrimLoading')

    this.sectorService.getByParams(params).subscribe({
      next: (data: any) => {
        this.dataTable.records = data.sectors

        this.dataTable.page.totalPages = data.totalPages
        this.dataTable.page.currentPage = data.currentPage
        this.dataTable.page.totalItems = data.totalItems
        this.dataTable.page.itemsPerPage = params.size

        this.toggleScrim('scrimLoading')
      },
      error: err => {
        this.showMessage(err.error.detail ?? 'Ocorreu um erro ao carregar os setores', 'danger')
        this.toggleScrim('scrimLoading')
      }
    })
  }

  cleanFilters() {
    this.form.reset()
  }

  resolve() {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['success']) {
          this.showMessage(params['success'], 'success', 10000)
        }
      })
    }
  }

  changePageSize(pageSize: number) {
    this.dataTable.page.currentPage = 0
    this.dataTable.page.itemsPerPage = pageSize

    this.search()
  }

  pageChange(page: number) {
    this.dataTable.page.currentPage = page

    this.search()
  }

  previousPage() {
    this.dataTable.page.currentPage = this.dataTable.page.currentPage - 1

    this.search()
  }

  nextPage() {
    this.dataTable.page.currentPage = this.dataTable.page.currentPage + 1

    this.search()
  }

  newItem() {
    this.router.navigate(['/home/sector/new'])
  }

  view(id: number) {
    this.router.navigate(['/home/sector/view', { "id": id, "view": true } ])
  }

  edit(id: number) {
    this.router.navigate(['/home/sector/edit', { "id": id } ])
  }

  confirm(id: number) {
    this.idDelete = id
    this.toggleScrim('scrimModal')
  }

  remove() {
    this.toggleScrim('scrimModal')
    this.toggleScrim('scrimLoading')

    this.sectorService.deleteById(this.idDelete).subscribe({
      next: () => {
        this.search()
        this.toggleScrim('scrimLoading')
        this.showMessage('Setor removido com sucesso', 'success', 10000)
      },
      error: err => {
        this.toggleScrim('scrimLoading')
        this.showMessage(err.error.detail ?? 'Ocorreu um erro ao remover o setor', 'danger')
      }
    })
  }

  toggleScrim(component: string) {
    const scrimfoco = new Scrim({
      trigger: window.document.querySelector('#' + component),
      escEnable: false
    })

    if (scrimfoco.trigger.classList.value.indexOf('active') >= 0) {
      scrimfoco.hideScrim()
    } else {
      scrimfoco.showScrim()
    }
  }

  showMessage(content: string, status: string, timer: number = null) {
    this.message = { state: status, text: content, show: true }

    if (timer) {
      setTimeout(() => { this.message = { state: '', text: '', show: false } }, timer)
    }
  }

}
  