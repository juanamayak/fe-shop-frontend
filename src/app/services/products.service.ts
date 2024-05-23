import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private url = environment.urlApi;

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    getProduct(productUuid: string): Observable<any>{
        return this.httpClient.get(`${this.url}/products/${productUuid}`);
    }

    getProductsByCategory(categoryUuid: string): Observable<any>{
        return this.httpClient.get(`${this.url}/products/category/${categoryUuid}`);
    }

    getProductImages(productUuid: string): Observable<any>{
        return this.httpClient.get(`${this.url}/products/images/${productUuid}`);
    }
}
