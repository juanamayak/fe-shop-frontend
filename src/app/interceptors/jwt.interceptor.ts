import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private usersService: UsersService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.usersService.getToken();

        if (!token) {
            return next.handle(req);
        }

        const headers = req.clone({
            headers: req.headers.set('Authorization', `${token}`)
        });

        return next.handle(headers);
    }
}
