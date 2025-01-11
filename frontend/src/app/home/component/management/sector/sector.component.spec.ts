import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ActivatedRoute, Router } from "@angular/router"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { of, throwError } from "rxjs"

import { SectorComponent } from "./sector.component"
import { SectorService } from "../../../../services/sector.service"
import { MessageService } from "../../../../services/message.service"

describe('SectorComponent', () => {
  let component: SectorComponent
  let fixture: ComponentFixture<SectorComponent>
  let sectorService: SectorService
  let router: Router

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SectorComponent],
      providers: [SectorService, MessageService, { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }]
    }).compileComponents()
  })

  describe('when page is a view page', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { params: { view: true, id: 1 } } } })

      fixture = TestBed.createComponent(SectorComponent)

      sectorService = TestBed.inject(SectorService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance
  
      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should load entity', () => {
      jest.spyOn(sectorService, 'getById').mockReturnValue(of({ id: 1, nome: "Cométivos"}))

      component.ngOnInit()

      expect(component.view).toBeTruthy()
    })

    it('should fails on entity loading with message error', () => {
      jest.spyOn(sectorService, 'getById').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.ngOnInit()

      expect(component.view).toBeTruthy()
    })

    it('should fails on entity loading with no message error', () => {
      jest.spyOn(sectorService, 'getById').mockReturnValue(throwError(() => null))

      component.ngOnInit()

      expect(component.view).toBeTruthy()
    })

    it('should go to list sector page', () => {
      const navigateSpy = jest.spyOn(router, 'navigate')
  
      fixture.ngZone?.run(() => {
        component.cancel()
      })
  
      expect(navigateSpy).toHaveBeenCalledWith(['/home/sector'])
    })
  
  })

  describe('when page is a new page', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SectorComponent)

      sectorService = TestBed.inject(SectorService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance

      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should save the new sector and go to list sector page', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'save').mockReturnValue(of({ id: 1, nome: "Cométivos"}))
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.send()
      })

      expect(navigateSpy).toHaveBeenCalledWith(["/home/sector"], {"queryParams": {"success": "Setor inserido com sucesso"}})
    })

    it('should refuse new page form', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(false)

      component.send()

      expect(component.form.valid).toBeFalsy()
    })

    it('should fails on saving new sector with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'save').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.send()

      expect(component.messageService.message.text).toEqual('Mensagem de erro')
    })

    it('should fails on saving new sector with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'save').mockReturnValue(throwError(() => null))

      component.send()

      expect(component.messageService.message.text).toEqual('Ocorreu um erro ao salvar o setor')
    })

  })

  describe('when page is a edit page', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, { useValue: { snapshot: { params: { id: 1 } } } })

      fixture = TestBed.createComponent(SectorComponent)

      sectorService = TestBed.inject(SectorService)
      router = TestBed.inject(Router)

      component = fixture.componentInstance

      fixture.detectChanges()
    })

    it('should create the component', () => {
      expect(component).toBeTruthy()
    })

    it('should save the sector and go to list sector page', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'edit').mockReturnValue(of({ id: 1, nome: "Cométivos"}))
      const navigateSpy = jest.spyOn(router, 'navigate')

      fixture.ngZone?.run(() => {
        component.send()
      })

      expect(navigateSpy).toHaveBeenCalledWith(["/home/sector"], {"queryParams": {"success": "Setor alterado com sucesso"}})
    })

    it('should fails on saving new sector with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'edit').mockReturnValue(throwError(() => new Error('Mensagem de erro')))

      component.send()

      expect(component.messageService.message.text).toEqual('Mensagem de erro')
    })

    it('should fails on saving new sector with message error', () => {
      jest.spyOn(component.form, 'valid', 'get').mockReturnValue(true)
      jest.spyOn(sectorService, 'edit').mockReturnValue(throwError(() => null))

      component.send()

      expect(component.messageService.message.text).toEqual('Ocorreu um erro ao salvar o setor')
    })

  })

})
