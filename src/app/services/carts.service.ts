import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getCart(): Observable<any>{
        return this.httpClient.get(`${this.url}/cart`);
    }

    addToCart(data: any): Observable<any>{
        return this.httpClient.post(`${this.url}/cart/create`, data);
    }

    updateCart(cartId: any, data: any): Observable<any>{
        return this.httpClient.put(`${this.url}/cart/update/${cartId}`, data);
    }

    deleteCartItem(productId: any): Observable<any>{
        return this.httpClient.delete(`${this.url}/cart/delete/item/${productId}`);
    }

    updateQuantity(productId: any, data: any): Observable<any>{
        return this.httpClient.put(`${this.url}/cart/quantity/${productId}`, data);
    }
}
