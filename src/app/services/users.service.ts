import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    public urlApi: string = environment.urlApi;

    public jwtToken = 'TK1983!';
    public profileToken = 'PF849!';
    public uuidToken = 'UID27#';


    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
    }

    public login(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/clients/login`, data);
    }

    public register(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/clients/register`, data);
    }

    public getUser(userUuid: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/clients/${userUuid}`);
    }

    public updateUsers(userUuid: any, data: any): Observable<any>{
        return this.httpClient.post(`${this.urlApi}/clients/update/${userUuid}`, data);
    }

    public updateAddress(userUuid: any, data: any): Observable<any>{
        return this.httpClient.post(`${this.urlApi}/clients/update/address/${userUuid}`, data);
    }

    public verifyAccount(userUuid: any, verificationCode: any): Observable<any> {
        return this.httpClient.get(`${this.urlApi}/clients/verify/${userUuid}/${verificationCode}`);
    }

    public recoveryPasword(data: any): Observable<any>{
        return this.httpClient.post(`${this.urlApi}/clients/recovery/password`, data);
    }

    public restorePassword(data: any): Observable<any> {
        return this.httpClient.post(`${this.urlApi}/clients/restore/password`, data);
    }

    getToken() {
        const token = localStorage.getItem(this.jwtToken);

        if (token) {
            return token;
        }

        return null;
    }

    getUuid(){
        const uuid = localStorage.getItem(this.uuidToken);

        if (uuid) {
            return uuid;
        }

        return null;
    }

}
