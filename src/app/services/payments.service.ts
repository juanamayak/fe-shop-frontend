import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    createPaymentIntent(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/payment/intent`, data);
    }

    createPayment(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/payment/create`, data);
    }
}
