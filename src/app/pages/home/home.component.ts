import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    public products: any;

    constructor(
        private productsService: ProductsService,
        public router: Router,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit() {
        this.getTopSellingProducts();
    }

    getTopSellingProducts(){
        this.spinner.show();
        this.productsService.getTopSellingProducts().subscribe({
            next: res => {
                this.spinner.hide();
                this.products = res.products;
            },
            error: err => {
                this.spinner.hide();
                console.error(err.error.errors);
            }
        });
    }

    goToProducts(uuid: any){
        this.router.navigate(['productos', uuid]);
    }

}
