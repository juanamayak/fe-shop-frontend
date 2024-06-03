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

    getOrder(orderUuid: any): Observable<any> {
        return this.httpClient.get(`${this.url}/orders/${orderUuid}`);
    }

    createOrder(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/orders/create`, data);
    }

    paymentOrder(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/orders/payment`, data);
    }

    createPaymentIntent(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/orders/payment`, data);
    }
}
