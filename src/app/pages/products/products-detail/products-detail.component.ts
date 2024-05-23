import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {CarouselLibConfig, Image} from "@ks89/angular-modal-gallery";

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent implements OnInit {

    public product: any;

    public files: Image[] = [];

    constructor(
        private productsService: ProductsService,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router
    ){ }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const productUuid = params['productUuid'];
                this.productsService.getProduct(productUuid).subscribe({
                    next: res => {
                        this.product = res.product;
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }



    public addToShoppingCart(){
        this.router.navigate(['carrito'])
    }

}
