import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from '../../environments/environment'

import { SectorService } from "./sector.service"
import { Sector } from '../model/sector'

describe('SectorService', () => {
  let service: SectorService
  let httpClient: HttpTestingController
  const apiUrl: string = environment.apiUrl + 'sector'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SectorService]
    })

    service = TestBed.inject(SectorService)
    httpClient = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpClient.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should search sector with params', () => {
    service.getByParams({ page: 0, size: 10 }).subscribe( (res: any) => {
      expect(res.size).toEqual(10)
    })

    const req = httpClient.expectOne({ method: 'GET', url: `${apiUrl}/page?page=0&size=10` })

    req.flush({ "page": 0, "size": 10 })
  })

  it('should delete sector by id', () => {
    service.deleteById(10).subscribe( (res: any) => {
      expect(res).toEqual(10)
    })

    const req = httpClient.expectOne({ method: 'DELETE', url: `${apiUrl}/10` })

    req.flush(10)
  })

  it('should save sector', () => {
    const param: Sector = { id: null, nome: 'Alimentos' }

    service.save(param).subscribe( (res: any) => {
      expect(res.nome).toEqual('Alimentos')
    })

    const req = httpClient.expectOne({ method: 'POST', url: apiUrl })

    req.flush(param)
  })

  it('should edit sector', () => {
    const param: Sector = { id: 1, nome: 'Alimentos' }

    service.edit(param).subscribe( (res: any) => {
      expect(res.id).toEqual(1)
    })

    const req = httpClient.expectOne({ method: 'PUT', url: apiUrl })

    req.flush(param)
  })

  it('should get sector by id', () => {
    const param: number = 1

    service.getById(param).subscribe( (res: any) => {
      expect(res).toEqual(param)
    })

    const req = httpClient.expectOne({ method: 'GET', url: `${apiUrl}/${param}` })

    req.flush(param)
  })

})