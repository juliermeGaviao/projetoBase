import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'
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
    this.sectorService.getById(id).subscribe({
      next: (data: any) => {
        this.form.setValue({
          nome: data.nome
        })
      },
      error: err => {
        console.log(err)
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

      if (this.id) {
        sector.id = this.id
        this.sectorService.edit(sector).subscribe({
          next: () => {
            this.router.navigate(['/home/sector'], { queryParams: { success: 'Setor alterado com sucesso' } } )
          },
          error: (err) => { this.message = { state: 'danger', text: err.error.detail ?? 'Ocorreu um erro ao salvar o setor', show: true } }
        })
      } else {
        this.sectorService.save(sector).subscribe({
          next: () => {
            this.router.navigate(['/home/sector'], { queryParams: { success: 'Setor inserido com sucesso' } } )
          },
          error: (err) => { this.message = { state: 'danger', text: err.error.detail ?? 'Ocorreu um erro ao salvar o setor', show: true } }
        })
      }
    }

    this.form.markAllAsTouched()
  }

}
  