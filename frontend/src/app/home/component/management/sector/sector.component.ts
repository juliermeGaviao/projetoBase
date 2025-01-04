import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Scrim } from '@govbr-ds/core'

import { Sector } from 'src/app/model/sector'
import { SectorService } from 'src/app/services/sector.service'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html'
})
export class SectorComponent implements OnInit {

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  title: string
  private id: number
  view: boolean

  public form: FormGroup

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly sectorService: SectorService)
  { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params

    this.id = params?.id ? parseInt(params.id) : null
    this.view = params?.view

    if (this.view) {
      this.title = 'Visualizar Setor'
      this.loadSector(this.id)
    } else if (this.id) {
      this.title = 'Editar Setor'
      this.loadSector(this.id)
    } else {
      this.title = 'Novo Setor'
    }

    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      nome: new FormControl({value: null, disabled: this.view}, Validators.required)
    })
  }

  loadSector(id: number) {
    this.toggleScrim('scrimLoading')

    this.sectorService.getById(id).subscribe({
      next: (data: any) => {
        this.form.setValue({
          nome: data.nome
        })

        this.toggleScrim('scrimLoading')
      },
      error: err => {
        this.showMessage(err.error.detail ?? 'Ocorreu um erro ao carregar o setor', 'danger')
        this.toggleScrim('scrimLoading')
      }
    })
  }

  cancel() {
    this.router.navigate(['/home/sector'])
  }

  send() {
    if (this.form.valid) {
      let sector: Sector = new Sector()

      sector.nome = this.form.value.nome

      this.toggleScrim('scrimLoading')

      if (this.id) {
        sector.id = this.id

        this.sectorService.edit(sector).subscribe({
          next: () => {
            this.toggleScrim('scrimLoading')
            this.router.navigate(['/home/sector'], { queryParams: { success: 'Setor alterado com sucesso' } } )
          },
          error: err => {
            this.toggleScrim('scrimLoading')
            this.showMessage(err.error.detail ?? 'Ocorreu um erro ao salvar o setor', 'danger')
          }
        })
      } else {
        this.sectorService.save(sector).subscribe({
          next: () => {
            this.router.navigate(['/home/sector'], { queryParams: { success: 'Setor inserido com sucesso' } } )
            this.toggleScrim('scrimLoading')
          },
          error: err => {
            this.showMessage(err.error.detail ?? 'Ocorreu um erro ao salvar o setor', 'danger')
            this.toggleScrim('scrimLoading')
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
  