import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class AddressesService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getAddresses(): Observable<any>{
        return this.httpClient.get(`${this.url}/addresses`);
    }

    createAddresses(data: any): Observable<any>{
        return this.httpClient.post(`${this.url}/addresses/create`, data);
    }

    updateAddresses(addressesUuid: any, data: any): Observable<any>{
        return this.httpClient.put(`${this.url}/addresses/update/${addressesUuid}`, data);
    }

    deleteAddresses(addressesUuid: any, data: any): Observable<any>{
        return this.httpClient.put(`${this.url}/addresses/delete/${addressesUuid}`, data);
    }
}
