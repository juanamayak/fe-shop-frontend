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

    public jwtToken = 'TK1983!';
    public profileToken = 'PF849!';

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    public login(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/users/login`, data);
    }

    getToken() {
        const token = sessionStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }

}
