import { HttpHandler, HttpRequest, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { HttpRequestInterceptor } from './HttpRequestInterceptor'

class MockHttpHandler implements HttpHandler {
  handle(req: HttpRequest<any>) {
    return of({} as HttpEvent<any>)
  }
}

describe('HttpRequestInterceptor', () => {
  let interceptor: HttpRequestInterceptor
  let handler: MockHttpHandler

  beforeEach(() => {
    interceptor = new HttpRequestInterceptor()
    handler = new MockHttpHandler()
  })

  it('should create the interceptor', () => {
    expect(interceptor).toBeTruthy()
  })

  it('should add authorization and content headers to the request', (done) => {
    const mockRequest = new HttpRequest('GET', '/test', {})

    jest.spyOn(handler, 'handle').mockImplementation((req: HttpRequest<any>) => {
      expect(req.headers.get('Authorization')).toBe('Bearer TOKEN_NOT_PROVIDED')
      expect(req.headers.get('Content-Type')).toBe('application/json')
      return of({} as HttpEvent<any>)
    })

    interceptor.intercept(mockRequest, handler).subscribe(() => {
      done()
    })
  })

  it('should add authorization and content headers to the request for file upload', (done) => {
    const mockRequest = new HttpRequest('GET', '/test', { headers: new HttpHeaders( { 'x-file-upload': 'x-file-upload' } ) })

    jest.spyOn(handler, 'handle').mockImplementation((req: HttpRequest<any>) => {
      expect(req.headers.get('Accept')).toBe('*/*')
      expect(req.headers.get('charset')).toBe('utf-8')
      return of({} as HttpEvent<any>)
    })

    interceptor.intercept(mockRequest, handler).subscribe(() => {
      done()
    })
  })

  it('should catch an HTTP error response', (done) => {
    const mockRequest = new HttpRequest('GET', '/test', {})
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden',
    })

    jest.spyOn(handler, 'handle').mockImplementation(() => {
      return throwError(() => errorResponse)
    })

    interceptor.intercept(mockRequest, handler).subscribe({
      error: (error) => {
        expect(error.status).toBe(403)
        done()
      },
    })
  })

})
