import { ListSectorComponent } from "./list-sector.component"
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SectorService } from '../../../../services/sector.service'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormControl, FormGroup } from '@angular/forms'

describe('ListSectorComponent', () => {
  let component: ListSectorComponent
  let fixture: ComponentFixture<ListSectorComponent>
  let sectorService: SectorService
  let router: Router
  let activatedRoute: ActivatedRoute

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ListSectorComponent],
      providers: [SectorService, { provide: ActivatedRoute, useValue: { queryParams: of({success: 'success' }) } }]
    }).compileComponents()

    fixture = TestBed.createComponent(ListSectorComponent)

    sectorService = TestBed.inject(SectorService)
    router = TestBed.inject(Router)
    activatedRoute = TestBed.inject(ActivatedRoute)

    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should get list of sectors', () => {
    const response: any = {
      "sectors": [ { "id": 1, "nome": "Cosméticos" }, { "id": 26, "nome": "Alimentos" } ],
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 0
    }

    jest.spyOn(sectorService, 'getByParams').mockReturnValue(of(response))

    component.search()

    expect(component.dataTable.records.length).toEqual(2)
  })

  it('should get list of sectors filtered by name and order by name ascendent', () => {
    const response: any = {
      "sectors": [ { "id": 1, "nome": "Cosméticos" } ],
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 0
    }

    jest.spyOn(sectorService, 'getByParams').mockReturnValue(of(response))

    component.form = new FormGroup({ nome: new FormControl('Cosméticos') })
    component.dataTable.orderBy = 'nome'
    component.dataTable.orderDirect = 'asc'
    component.search()

    expect(component.dataTable.records.length).toEqual(1)
  })

  it('should get list of sectors fails', () => {
    jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

    component.search()

    expect(component).toBeTruthy()
  })

  it('should get list of sectors fails without error message', () => {
    jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => null))

    component.search()

    expect(component).toBeTruthy()
  })

  it('should clear filter fields', () => {
    component.form = new FormGroup({ nome: new FormControl('Cosméticos') })

    component.cleanFilters()

    expect(component).toBeTruthy()
  })

  it('should set page message', () => {
    component.resolve()

    expect(component).toBeTruthy()
  })

  it('should not set page message', () => {
    activatedRoute.queryParams = of({type: 'success' })

    component.resolve()

    expect(component).toBeTruthy()
  })

  it('should not set page message becaure theres no parameter', () => {
    delete activatedRoute.queryParams

    component.resolve()

    expect(component).toBeTruthy()
  })

  it('should change page size', () => {
    jest.spyOn(component, 'search').mockImplementation(() => 2 + 2)

    component.changePageSize(3)

    expect(component.dataTable.page.itemsPerPage).toEqual(3)
  })

})