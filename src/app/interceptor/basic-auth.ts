import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from '../services/spinner.service';


@Injectable(
)
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private spinner: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        // this.spinner.openSpinner();
        this.userService.createAcceptHeader();
        const currentUser = sessionStorage.getItem('authToken');
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }
        return next.handle(request);
    }
}
