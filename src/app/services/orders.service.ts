import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getOrders(): Observable<any> {
        return this.httpClient.get(`${this.url}/orders/clients`);
    }

    getOrder(orderUuid: any): Observable<any> {
        return this.httpClient.get(`${this.url}/orders/clients/${orderUuid}`);
    }

    createOrder(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/orders/create`, data);
    }

    updateOrder(orderUuid: any, data: any): Observable<any> {
        return this.httpClient.put(`${this.url}/orders/update/${orderUuid}`, data);
    }

}
