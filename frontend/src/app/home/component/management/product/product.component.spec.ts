import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute, Router } from "@angular/router"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { of, throwError } from "rxjs"

import { ProductComponent } from "./product.component"
import { ProductService } from "../../../../services/product.service"
import { SectorService } from "../../../../services/sector.service"
import { MessageService } from "../../../../services/message.service"

describe('ProductComponent', () => {
  let component: ProductComponent
  let fixture: ComponentFixture<ProductComponent>
  let productService: ProductService
  let sectorService: SectorService
  let router: Router

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ProductComponent],
      providers: [ProductService, SectorService, MessageService, { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }]
    }).compileComponents()
  })

  describe('when page is a view page', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { params: { view: true, id: 1 } } } })

      fixture = TestBed.createComponent(ProductComponent)

      productService = TestBed.inject(ProductService)
      sectorService = TestBed.inject(SectorService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance
  
      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should load entity', () => {
      const response: any = {
        "sectors": [ { "id": 1, "nome": "Cosméticos" }, { "id": 26, "nome": "Alimentos" } ],
        "totalItems": 1,
        "totalPages": 1,
        "currentPage": 0
      }
  
      jest.spyOn(productService, 'getById').mockReturnValue(of({ "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }))
      jest.spyOn(sectorService, 'getByParams').mockReturnValue(of(response))

      component.ngOnInit()

      expect(component.sectors.length).toEqual(2)
    })

    it('should fails on entity loading with message error', () => {
      jest.spyOn(productService, 'getById').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.ngOnInit()

      expect(component.view).toBeTruthy()
    })

    it('should fails on entity loading with no message error', () => {
      jest.spyOn(productService, 'getById').mockReturnValue(throwError(() => null))

      component.ngOnInit()

      expect(component.view).toBeTruthy()
    })

    it('should load entity and fails on sector retrieval with message error', () => {
      jest.spyOn(productService, 'getById').mockReturnValue(of({ "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }))
      jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.ngOnInit()

      expect(component.sectors.length).toEqual(0)
    })

    it('should load entity and fails on sector retrieval with message error', () => {
      jest.spyOn(productService, 'getById').mockReturnValue(of({ "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }))
      jest.spyOn(sectorService, 'getByParams').mockReturnValue(throwError(() => null))

      component.ngOnInit()

      expect(component.sectors.length).toEqual(0)
    })

    it('should go to list product page', () => {
      const navigateSpy = jest.spyOn(router, 'navigate')
  
      fixture.ngZone?.run(() => {
        component.cancel()
      })
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home/product'])
    })
  
  })

  describe('when page is a new page', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductComponent)

      productService = TestBed.inject(ProductService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance

      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should save the new product and go to list product page', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'save').mockReturnValue(of({ "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }))
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.send()
      })

      expect(navigateSpy).toHaveBeenCalledWith(["/home/product"], {"queryParams": {"success": "Produto inserido com sucesso"}})
    })

    it('should refuse new page form', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(false)

      component.send()

      expect(component.form.valid).toBeFalsy()
    })

    it('should fails on saving new product with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'save').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.send()

      expect(component.messageService.message.text).toEqual('Mensagem de erro')
    })

    it('should fails on saving new product with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'save').mockReturnValue(throwError(() => null))

      component.send()

      expect(component.messageService.message.text).toEqual('Ocorreu um erro ao salvar o produto')
    })

  })

  describe('when page is a edit page', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { params: { id: 1 } } } })

      fixture = TestBed.createComponent(ProductComponent)

      productService = TestBed.inject(ProductService)
      sectorService = TestBed.inject(SectorService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance

      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should save the product and go to list product page', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'edit').mockReturnValue(of({ "id": 1, "nome": "Batom", "setor": { "id": 1, "nome": "Cosméticos" } }))
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.send()
      })

      expect(navigateSpy).toHaveBeenCalledWith(["/home/product"], {"queryParams": {"success": "Produto alterado com sucesso"}})
    })

    it('should fails on saving new product with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'edit').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.send()

      expect(component.messageService.message.text).toEqual('Mensagem de erro')
    })

    it('should fails on saving new product with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      component.form.controls['nome'].setValue('Batom')
      component.form.controls['idSetor'].setValue({ value: 1 })
      jest.spyOn(productService, 'edit').mockReturnValue(throwError(() => null))

      component.send()

      expect(component.messageService.message.text).toEqual('Ocorreu um erro ao salvar o produto')
    })

  })

})
