import { Injectable, OnInit } from '@angular/core'
import { DataTable } from '../../../shared/component/dynamic-table/dynamic-table.interface'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { toggleScrim } from './util'
import { MessageService } from '../../../services/message.service'

@Injectable()
export abstract class ListComponent implements OnInit {

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
    protected readonly route: ActivatedRoute,
    public readonly messageService: MessageService
  )
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
          this.messageService.showMessage(params['success'], 'success', 10000)
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
    this.dataTable.page.currentPage--

    this.search()
  }

  nextPage() {
    this.dataTable.page.currentPage++

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
    toggleScrim('scrimModal')
  }

  remove(crudService: any, successMessage: string, errorMessage: string) {
    toggleScrim('scrimModal')
    toggleScrim('scrimLoading')

    crudService.deleteById(this.idDelete).subscribe({
      next: () => {
        this.search()
        toggleScrim('scrimLoading')
        this.messageService.showMessage(successMessage, 'success', 10000)
      },
      error: (err: any) => {
        toggleScrim('scrimLoading')
        this.messageService.showMessage(err?.message ?? errorMessage, 'danger')
      }
    })
  }

}