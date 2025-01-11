import { Injectable, OnInit } from "@angular/core"
import { ActivatedRoute, Params, Router } from "@angular/router"
import { MessageService } from "../../../services/message.service"
import { FormGroup } from "@angular/forms"
import { toggleScrim } from './util'
import { Entity } from "../../../interfaces/entity.interface"
import { CrudService } from "../../../interfaces/crud-service.interface"

@Injectable()
export abstract class FormCRUD implements OnInit {

  title: string
  id: number
  view: boolean
  form: FormGroup

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    public readonly messageService: MessageService,
    protected readonly service: CrudService<Entity>)
  { }

  ngOnInit(): void {
    const params: Params = this.route.snapshot.params

    this.id = params?.id ? parseInt(params.id) : null
    this.view = params?.view

    if (this.view) {
      this.title = 'Visualizar '
    } else if (this.id) {
      this.title = 'Editar '
    } else {
      this.title = 'Novo '
    }

    this.buildForm()

    this.init()
  }

  protected abstract init(): void
  protected abstract buildForm(): void
  protected abstract setFormValues(entity: Entity): void
  protected abstract postEntityLoadingAction(): void

  loadEntity(defaultErrorMessage: string) {
    if (!this.id) {
      return
    }

    toggleScrim('scrimLoading')

    this.service.getById(this.id).subscribe({
      next: (data: any) => {
        this.setFormValues(data)
        this.postEntityLoadingAction()

        toggleScrim('scrimLoading')
      },
      error: err => {
        this.messageService.showMessage(err?.message ?? defaultErrorMessage, 'danger')
        toggleScrim('scrimLoading')
      }
    })
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

  protected abstract getDto(): Entity

  send(path: string, successMessage: string, defaultErrorMessage: string) {
    if (this.form.valid) {
      const dto: Entity = this.getDto()

      toggleScrim('scrimLoading')

      if (this.id) {
        dto.id = this.id

        this.service.edit(dto).subscribe({
          next: () => {
            toggleScrim('scrimLoading')
            this.router.navigate([path], { queryParams: { success: successMessage } } )
          },
          error: err => {
            toggleScrim('scrimLoading')
            this.messageService.showMessage(err?.message ?? defaultErrorMessage, 'danger')
          }
        })
      } else {
        this.service.save(dto).subscribe({
          next: () => {
            this.router.navigate([path], { queryParams: { success: successMessage } } )
            toggleScrim('scrimLoading')
          },
          error: err => {
            this.messageService.showMessage(err?.message ?? defaultErrorMessage, 'danger')
            toggleScrim('scrimLoading')
          }
        })
      }
    }

    this.form.markAllAsTouched()
  }

}