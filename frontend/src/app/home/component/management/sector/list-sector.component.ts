import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { SectorService } from './sector.service'

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html'
})
export class ListSectorComponent implements OnInit {

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  dataTable: any = {
    records: [],
    page: {
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
      totalPages: 0
    }
  }

  public form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sectorService: SectorService)
  { }

  ngOnInit() {
    this.buildForm()
    this.loadSectors()
    this.resolve()
  }

  loadSectors(params: any = { page: 0, size: 5 }) {
    this.sectorService.getByParams(params).subscribe({
      next: (data: any) => {
        this.dataTable.records = data.sectors

        this.dataTable.page.totalPages = data.totalPages
        this.dataTable.page.currentPage = data.currentPage + 1
        this.dataTable.page.totalItems = data.totalItems
        this.dataTable.page.itemsPerPage = params.size
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onClearFilters() {
    this.form.reset()
  }

  onSearch() {
    let params: any = { "page": 0, "size": 5 }

    if (this.form.get('nome').value) {
      params.nome = this.form.get('nome').value
    }

    this.loadSectors(params)
  }

  resolve() {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['success']) {
          this.message = { state: 'success', text: 'Operação realizada com sucesso', show: true }

          setTimeout(() => {
            this.message = { state: '', text: '', show: false }
          }, 10000)
        }
      })
    }
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [null]
    })
  }

  changePageSize(event: any): void {
    const target = event.target as HTMLSelectElement

    this.loadSectors({ page: 0, size: +target.value })
  }

  onPageChange(page: any): void {
    console.log('Página atual:', page);
  }

  previousPage(): void {
    if (this.dataTable.page.currentPage > 0) {
      this.loadSectors({ page: this.dataTable.page.currentPage - 1, size: this.dataTable.page.itemsPerPage })
    }
  }

  nextPage(): void {
    if (this.dataTable.page.currentPage < this.dataTable.page.totalPages - 1) {
      this.loadSectors({ page: this.dataTable.page.currentPage + 1, size: this.dataTable.page.itemsPerPage })
    }
  }

  newItem() {
    this.router.navigate(['/home/sector/new'])
  }

  view(idSector: number) {
    console.log('Ver: ' + idSector)
  }

  edit(idSector: number) {
    console.log('Editar: ' + idSector)
  }

  remove(idSector: number) {
    console.log('Remover: ' + idSector)
  }

}
  