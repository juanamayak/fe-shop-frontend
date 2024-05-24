import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {GalleryItem} from "@daelmaak/ngx-gallery";
import {CartsService} from "../../../services/carts.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.css'
})
export class ProductsDetailComponent implements OnInit {

    public cartForm: any;
    public product: any;

    public images: GalleryItem[] = []

    constructor(
        private productsService: ProductsService,
        private cartService: CartsService,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private router: Router
    ){ }

    ngOnInit() {
        this.getProduct();
        this.initCarForm();
    }

    initCarForm(){
        this.cartForm = this.formBuilder.group({
            quantity: [1, Validators.required],
        })
    }

    getProduct() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const productUuid = params['productUuid'];
                this.productsService.getProduct(productUuid).subscribe({
                    next: res => {
                        this.product = res.product;
                        this.getImages();
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }

    getImages() {
        this.productsService.getProductImages(this.product.uuid).subscribe({
            next: res => {
                this.images = res.images.map((image: any) => {
                    return {
                        src: `data:${image.file.type};base64,${image.url}`,
                        thumbSrc: `data:${image.file.type};base64,${image.url}`
                    }
                });

                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    addToCart(){
        this.spinner.show();
        const data = {
            product_id: this.product.id,
            quantity: this.cartForm.value.quantity
        }

        this.cartService.addToCart(data).subscribe({
            next: res => {
                this.alertsService.successAlert(res.message);
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    viewCart(){
        this.router.navigate(['carrito']);
    }

}
