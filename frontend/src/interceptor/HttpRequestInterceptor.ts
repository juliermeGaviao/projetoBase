import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let apiKey: string;
      let token: string = localStorage.getItem('token_SCA2') || 'TOKEN_NOT_PROVIDED';
      apiKey = ( 'Bearer ' + token );

      const newRequest = request.clone({
        setHeaders: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'text/html;charset=UTF-8',
          'Authorization': apiKey
        },
        body: JSON.stringify(request.body)

      });

        return next.handle(newRequest).pipe(
          catchError((error) => {
            if(error instanceof HttpErrorResponse) {
              if(error.status === 403) {
                console.log('erro 403', error);
              }
            }
              return throwError(() => error);
          }));
    }

}

