import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { ProductService } from 'src/app/services/product.service'
import { SectorService } from 'src/app/services/sector.service'
import { Sector } from 'src/app/model/sector'
import { Product } from 'src/app/model/product'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  sectors: any[] = []

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  title: string
  private id: number
  view: boolean

  public form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sectorService: SectorService,
    private readonly productService: ProductService)
  { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params

    this.id = params?.id ? parseInt(params.id) : null
    this.view = params?.view

    this.buildForm()

    if (this.view) {
      this.title = 'Visualizar Produto'
      this.loadProduct(this.id)
    } else if (this.id) {
      this.title = 'Editar Produto'
      this.loadProduct(this.id)
    } else {
      this.title = 'Novo Produto'
      this.loadSectors()
    }
  }

  buildForm() {
    this.form = this.fb.group({
      nome: new FormControl({value: null, disabled: this.view}, Validators.required),
      idSetor: new FormControl({value: null, disabled: this.view}, Validators.required)
    })
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe({
      next: (data: any) => {
        this.form.setValue({
          nome: data.nome,
          idSetor: data.setor.id
        })

        this.loadSectors()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  loadSectors() {
    this.sectorService.getByParams({ "page": 0, "size": 100, "orderBy": 'nome' }).subscribe({
      next: (data: any) => {
        this.sectors = data.sectors.map( (sector: Sector) => { return { value: sector.id, label: sector.nome, selected: sector.id === this.form.value.idSetor } })
      },
      error: err => {
        console.log(err)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/home/product'])
  }

  send(): void {
    if (this.form.valid) {

      if (this.id) {
        const product: Product = { id: this.id, nome: this.form.value.nome, setor: { id: this.form.value.idSetor.value, nome: '' } }

        this.productService.edit(product).subscribe({
          next: () => {
            this.router.navigate(['/home/product'], { queryParams: { success: 'Produto alterado com sucesso' } } )
          },
          error: (err) => { this.message = { state: 'danger', text: err.error.detail ?? 'Ocorreu um erro ao salvar o produto', show: true } }
        })
      } else {
        this.productService.save({ nome: this.form.value.nome, idSetor: this.form.value.idSetor.value }).subscribe({
          next: () => {
            this.router.navigate(['/home/product'], { queryParams: { success: 'Produto inserido com sucesso' } } )
          },
          error: (err) => { this.message = { state: 'danger', text: err.error.detail ?? 'Ocorreu um erro ao salvar o produto', show: true } }
        })
      }
    }

    this.form.markAllAsTouched()
  }

}
  