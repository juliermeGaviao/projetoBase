import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let apiKey: string
    let token: string = localStorage.getItem('token_SCA2') || 'TOKEN_NOT_PROVIDED'
    apiKey = ('Bearer ' + token)

    let newRequest: HttpRequest<any>

    if (request.headers.has('x-file-upload')) {
      newRequest = this.createFileRequest(request, apiKey)
    } else {
      newRequest = this.createDefaultRequest(request, apiKey)
    }
    return next.handle(newRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            console.log('erro 403', error)
          }
        }
        return throwError(() => error)
      }))
  }

  createDefaultRequest(request: HttpRequest<any>, apiKey: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify(request.body)
    })
  }

  createFileRequest(request: HttpRequest<any>, apiKey: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        "Accept": "*/*",
        "charset": "utf-8",
        'Authorization': apiKey
      }
    })
  }

}

