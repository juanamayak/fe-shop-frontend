import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent {

    constructor(
        private router: Router
    ){

    }

    public addToShoppingCart(){
        this.router.navigate(['carrito'])
    }

}
