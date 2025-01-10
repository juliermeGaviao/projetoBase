import { Component, OnInit } from '@angular/core'
import { DataTable } from '../../../shared/component/dynamic-table/dynamic-table.interface'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Scrim } from '@govbr-ds/core'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export abstract class ListComponent implements OnInit {

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
    protected readonly router: Router,
    protected readonly route: ActivatedRoute)
  { }

  ngOnInit() {
    this.init()
    this.setTableHeader()
    this.buildForm()
    this.search()
    this.resolve()
  }

  abstract init(): void
  abstract setTableHeader(): void
  abstract buildForm(): void
  abstract search(): void

  setPageInfo(data: any, itemsPerPage: number) {
    this.dataTable.page.totalPages = data.totalPages
    this.dataTable.page.currentPage = data.currentPage
    this.dataTable.page.totalItems = data.totalItems
    this.dataTable.page.itemsPerPage = itemsPerPage
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

  navigate(path: string, content: any = null) {
    if (content) {
      this.router.navigate([path, content])
    } else {
      this.router.navigate([path])
    }
  }

  confirm(id: number) {
    this.idDelete = id
    this.toggleScrim('scrimModal')
  }

  remove(crudService: any, successMessage: string, errorMessage: string) {
    this.toggleScrim('scrimModal')
    this.toggleScrim('scrimLoading')

    crudService.deleteById(this.idDelete).subscribe({
      next: () => {
        this.search()
        this.toggleScrim('scrimLoading')
        this.showMessage('Setor removido com sucesso', 'success', 10000)
      },
      error: (err: any) => {
        this.toggleScrim('scrimLoading')
        this.showMessage(err?.message ?? 'Ocorreu um erro ao remover o setor', 'danger')
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