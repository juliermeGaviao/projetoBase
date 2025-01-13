import { ListProductComponent } from "./list-product.component"
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProductService } from '../../../../services/product.service'
import { RouterTestingModule } from '@angular/router/testing'
import { of, throwError } from 'rxjs'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { SectorService } from "../../../../services/sector.service"
import { Router } from "@angular/router"

describe('ListProductComponent', () => {
  let component: ListProductComponent
  let fixture: ComponentFixture<ListProductComponent>
  let router: Router
  let productService: ProductService
  let sectorService: SectorService

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ListProductComponent],
      providers: [ProductService, SectorService]
    }).compileComponents()

    fixture = TestBed.createComponent(ListProductComponent)

    productService = TestBed.inject(ProductService)
    sectorService = TestBed.inject(SectorService)
    router = TestBed.inject(Router)

    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should get list of products', () => {
    const response: any = {
      "products": [ { "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }, { "id": 2, "nome": "Heineken", "setor": { "id": 28, "nome": "Bebidas" } } ],
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 0
    }

    jest.spyOn(productService, 'getByParams').mockReturnValue(of(response))

    component.search()

    expect(component.dataTable.records.length).toEqual(2)
  })

  it('should get list of products filtered by name, sector and order by name ascendent', () => {
    const response: any = {
      "products": [ { "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } } ],
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 0
    }

    jest.spyOn(productService, 'getByParams').mockReturnValue(of(response))

    component.form = new FormGroup( { nome: new FormControl('Cosméticos'), idSetor: new FormControl() } )

    component.form.setValue({
      nome: 'Cosméticos',
      idSetor: { value: 1, label: 'Batom', selected: true }
    })

    component.dataTable.orderBy = 'nome'
    component.dataTable.orderDirect = 'asc'
    component.search()

    expect(component.dataTable.records.length).toEqual(1)
  })

  it('should get list of products fails', () => {
    jest.spyOn(productService, 'getByParams').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

    component.search()

    expect(component).toBeTruthy()
  })

  it('should get list of products fails without error message', () => {
    jest.spyOn(productService, 'getByParams').mockReturnValue(throwError(() => null))

    component.search()

    expect(component).toBeTruthy()
  })

  it('should go to new product page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.newItem()
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/home/product/new'])
  })

  it('should go to view product page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.view(1)
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/home/product/view', { "id": 1, "view": true }])
  })

  it('should go to edit product page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate')

    fixture.ngZone?.run(() => {
      component.edit(1)
    })

    expect(navigateSpy).toHaveBeenCalledWith(['/home/product/edit', { "id": 1 }])
  })

  it('should remove product', () => {
    jest.spyOn(productService, 'deleteById').mockReturnValue(of({id: 1, nome: "Cosméticos"}))

    component.remove()

    expect(component).toBeTruthy()
  })

  it('should get error on removing product with message error', () => {
    jest.spyOn(productService, 'deleteById').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

    component.remove()

    expect(component).toBeTruthy()
  })

  it('should get error on removing product with no message error', () => {
    jest.spyOn(productService, 'deleteById').mockReturnValue(throwError(() => null))

    component.remove()

    expect(component).toBeTruthy()
  })

  it('should get list of sectors', () => {
    const response: any = {
      "sectors": [ { "id": 1, "nome": "Cosméticos" } ],
      "totalItems": 1,
      "totalPages": 1,
      "currentPage": 0
    }

    jest.spyOn(sectorService, 'getByParams').mockReturnValue(of(response))

    component.loadSectors()

    expect(component.sectors.length).toEqual(1)
  })

  it('should get list of sectors fails', () => {
    jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

    component.loadSectors()

    expect(component).toBeTruthy()
  })

  it('should get list of sectors fails without error message', () => {
    jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => null))

    component.loadSectors()

    expect(component).toBeTruthy()
  })

})