import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocationsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getCountries(): Observable<any>{
        return this.httpClient.get(`${this.url}/countries`);
    }

    getStates(countryId: number): Observable<any>{
        return this.httpClient.get(`${this.url}/states/${countryId}`);
    }

    getCities(stateId: number): Observable<any>{
        return this.httpClient.get(`${this.url}/cities/${stateId}`);
    }
}
