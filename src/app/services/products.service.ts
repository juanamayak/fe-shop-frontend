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

    getProducts(categoryUuid: any): Observable<any>{
        return this.httpClient.get(`${this.url}/products/category/${categoryUuid}`);
    }
}
