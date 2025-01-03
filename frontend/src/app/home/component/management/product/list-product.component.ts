import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { ProductService } from 'src/app/services/product.service'
import { SectorService } from 'src/app/services/sector.service'
import { Sector } from 'src/app/model/sector'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})
export class ListProductComponent implements OnInit {

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  sectors: any[] = []

  private idDelete: number
  public showDeleteModal: boolean = false
  public loading: boolean = false

  dataTable: any = {
    records: [],
    page: {
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 0,
      totalPages: 0
    }
  }

  public form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sectorService: SectorService,
    private readonly productService: ProductService)
  { }

  ngOnInit() {
    this.loadSectors()
    this.buildForm()
    this.search()
    this.resolve()
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null],
      idSetor: [null]
    })
  }

  search() {
    let params: any = { "page": this.dataTable.page.currentPage, "size": this.dataTable.page.itemsPerPage }

    if (this.form.get('nome').value) {
      params.nome = this.form.get('nome').value
    }

    if (this.form.get('idSetor')?.value?.value) {
      params.idSetor = this.form.get('idSetor').value.value
    }

    this.loading = true
    this.productService.getByParams(params).subscribe({
      next: (data: any) => {
        this.dataTable.records = data.products

        this.dataTable.page.totalPages = data.totalPages
        this.dataTable.page.currentPage = data.currentPage
        this.dataTable.page.totalItems = data.totalItems
        this.dataTable.page.itemsPerPage = params.size

        this.loading = false
      },
      error: err => {
        this.loading = false
        console.log(err)
      }
    })
  }

  loadSectors() {
    this.loading = true
    this.sectorService.getByParams({ "page": 0, "size": 100, "orderBy": 'nome' }).subscribe({
      next: (data: any) => {
        this.loading = false
        this.sectors = data.sectors.map( (sector: Sector) => { return { value: sector.id, label: sector.nome } })
      },
      error: err => {
        this.loading = false
        console.log(err)
      }
    })
  }

  cleanFilters() {
    this.form.reset()
    this.loadSectors()
  }

  resolve() {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['success']) {
          this.message = { state: 'success', text: params['success'], show: true }
          setTimeout(() => { this.message = { state: '', text: '', show: false } }, 10000)
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
    this.router.navigate(['/home/product/new'])
  }

  view(id: number) {
    this.router.navigate(['/home/product/view', { "id": id, "view": true } ])
  }

  edit(id: number) {
    this.router.navigate(['/home/product/edit', { "id": id } ])
  }

  confirm(id: number) {
    this.idDelete = id
    this.showDeleteModal = true
  }

  remove() {
    this.loading = true
    this.productService.deleteById(this.idDelete).subscribe({
      next: () => {
        this.showDeleteModal = false
        this.search()
        this.message = { state: 'success', text: 'Setor removido com sucesso', show: true }
        setTimeout(() => { this.message = { state: '', text: '', show: false } }, 10000)
    },
      error: err => {
        this.showDeleteModal = false
        console.log(err)
      }
    })
  }

}
  