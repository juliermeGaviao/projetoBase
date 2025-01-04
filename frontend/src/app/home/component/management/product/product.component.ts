import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Scrim } from '@govbr-ds/core'

import { ProductService } from '../../../../services/product.service'
import { SectorService } from '../../../../services/sector.service'
import { Sector } from '../../../../model/sector'
import { Product } from '../../../../model/product'

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
    this.toggleScrim('scrimLoading')

    this.productService.getById(id).subscribe({
      next: (data: any) => {
        this.form.setValue({
          nome: data.nome,
          idSetor: data.setor.id
        })

        this.toggleScrim('scrimLoading')

        this.loadSectors()
      },
      error: err => {
        this.toggleScrim('scrimLoading')
        this.showMessage(err.error.detail ?? 'Ocorreu um erro ao carregar o produto', 'danger')
      }
    })
  }

  loadSectors() {
    this.toggleScrim('scrimLoading')

    this.sectorService.getByParams({ "page": 0, "size": 100, "orderBy": 'nome' }).subscribe({
      next: (data: any) => {
        this.sectors = data.sectors.map( (sector: Sector) => { return { value: sector.id, label: sector.nome, selected: sector.id === this.form.value.idSetor } })
        this.toggleScrim('scrimLoading')
      },
      error: err => {
        this.toggleScrim('scrimLoading')
        this.showMessage(err.error.detail ?? 'Ocorreu um erro ao carregar setores', 'danger')
      }
    })
  }

  cancel(): void {
    this.router.navigate(['/home/product'])
  }

  send(): void {
    if (this.form.valid) {

      this.toggleScrim('scrimLoading')

      if (this.id) {
        const product: Product = { id: this.id, nome: this.form.value.nome, setor: { id: this.form.value.idSetor.value, nome: '' } }

        this.productService.edit(product).subscribe({
          next: () => {
            this.router.navigate(['/home/product'], { queryParams: { success: 'Produto alterado com sucesso' } } )
          },
          error: err => {
            this.toggleScrim('scrimLoading')
            this.showMessage(err.error.detail ?? 'Ocorreu um erro ao salvar o produto', 'danger')
          }
        })
      } else {
        this.productService.save({ nome: this.form.value.nome, idSetor: this.form.value.idSetor.value }).subscribe({
          next: () => {
            this.router.navigate(['/home/product'], { queryParams: { success: 'Produto inserido com sucesso' } } )
          },
          error: err => {
            this.toggleScrim('scrimLoading')
            this.showMessage(err.error.detail ?? 'Ocorreu um erro ao salvar o produto', 'danger')
          }
        })
      }
    }

    this.form.markAllAsTouched()
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
  