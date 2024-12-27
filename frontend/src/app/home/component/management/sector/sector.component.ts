import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'

import { SectorService } from './sector.service'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html'
})
export class SectorComponent implements OnInit {

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  title: string
  private id: number
  private view: boolean

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
    this.view = params?.view === 'true'

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
      nome: [null]
    })
  }

  loadSector(id: number) {
    this.sectorService.getById(id).subscribe({
      next: (data: any) => {
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
  