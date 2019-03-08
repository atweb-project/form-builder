import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            }

            let error = 'An unknown error has occurred';
            console.log(err);
            if (typeof err === 'string') {
                error = err;
            } else if (err.error instanceof ErrorEvent) {
                error = `Error! ${err.error.message}`;
            } else if (err.error instanceof Object) {
                error = `Error! ${JSON.stringify(err.error)}`;
            } else if (err.status) {
                error = `Request failed with ${err.status} ${err.statusText}`;
            }
            return throwError(error);
        }));
    }
}
