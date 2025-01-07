/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { take } from 'rxjs'

describe('AuthService', () => {
  let service: AuthService
  let controller: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    })

    service = TestBed.inject(AuthService)
    controller = TestBed.inject(HttpTestingController)
  })

  beforeEach(() => {
    controller.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get token', () => {
    service.token('ticket').pipe(take(1)).subscribe( res => {
      expect(res).toEqual('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODgzNTUzNDAyMCIsImlhdCI6MTczNjIxMzIyN30.HgW5AJayDgGan9odf36gRIKvMSGILOWcZT2fcDVncE2VkxjJlSolPYarXMLGzO7vWKQng7oZ5KXW1wkpk1Zgmw')
    })

    const request: TestRequest = controller.expectOne({
      method: 'POST',
      url: service.apiurl + 'sso/token'
    })

    request.flush('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODgzNTUzNDAyMCIsImlhdCI6MTczNjIxMzIyN30.HgW5AJayDgGan9odf36gRIKvMSGILOWcZT2fcDVncE2VkxjJlSolPYarXMLGzO7vWKQng7oZ5KXW1wkpk1Zgmw')
  })

  it('should get login url', () => {
    service.login().pipe(take(1)).subscribe( res => {
      expect(res).toEqual('https://homsca2.ibama.serpro.gov.br/sca2sessao/api/v2/sessao/login?service=%s&ticket=https://127.0.0.1/ticket')
    })

    const request: TestRequest = controller.expectOne({
      method: 'GET',
      url: service.apiurl + 'sso/login'
    })

    request.flush('https://homsca2.ibama.serpro.gov.br/sca2sessao/api/v2/sessao/login?service=%s&ticket=https://127.0.0.1/ticket')
  })

  it('should get login url', () => {
    service.logout().pipe(take(1)).subscribe( res => {
      expect(res).toEqual('https://homlogin.sso2.ibama.serpro.gov.br/cas/logout?service=https://127.0.0.1/ticket')
    })

    const request: TestRequest = controller.expectOne({
      method: 'GET',
      url: service.apiurl + 'sso/logout'
    })

    request.flush('https://homlogin.sso2.ibama.serpro.gov.br/cas/logout?service=https://127.0.0.1/ticket')
  })

})
