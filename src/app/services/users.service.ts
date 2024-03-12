import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public urlApi: string = environment.url;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    public login(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/users/login`, data);
    }

}
