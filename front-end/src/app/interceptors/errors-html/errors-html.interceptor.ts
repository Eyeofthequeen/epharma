import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHTMLInterceptor implements HttpInterceptor {

  constructor(private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 403 ) {
          //this.route.navigateByUrl('/login')
          return next.handle(request)
        }

        return throwError(() => error)
      })
    )
  }
}

export const ErrorsHTMLProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorsHTMLInterceptor,
  multi: true
}
