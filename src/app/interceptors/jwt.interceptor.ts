import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private usersService: UsersService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.usersService.getToken();

        if (!token){
            return next.handle(req);
        }

        const headers = req.clone({
            headers: req.headers.set('Authorization', `${token}`)
        });

        return next.handle(headers);
    }
}
