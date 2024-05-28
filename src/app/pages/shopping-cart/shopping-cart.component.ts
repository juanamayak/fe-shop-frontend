import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartsService} from "../../services/carts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

    public quantityForm: any;
    public cartProducts: any;

    constructor(
        private cartService: CartsService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router
    ){ }

    ngOnInit(){
        this.getCart();
    }

    initQuantityForm(){
        this.quantityForm = this.formBuilder.array(
            this.cartProducts.map((product: any) => this.formBuilder.group({
                quantity: [product.quantity, [Validators.required, Validators.min(1)]]
            }))
        );
    }

    getCart(){
        this.spinner.show();
        this.cartService.getCart().subscribe({
            next: res => {
                this.cartProducts = res.cart;
                this.initQuantityForm();
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    increment(index: any): void {
        const control = this.quantityForm.at(index).get('quantity');
        console.log(control)
        control.setValue(control.value + 1);
    }

    decrement(index: any): void {
        const control = this.quantityForm.at(index).get('quantity');
        console.log(control)
        if (control.value > 1) {
            control.setValue(control.value - 1);
        }
    }

}
