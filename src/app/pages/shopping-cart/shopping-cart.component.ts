import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartsService} from "../../services/carts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DeliveryHoursService} from "../../services/delivery-hours.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

    public quantityForm: any;

    public products: any;
    public deliveryHours: any;

    public showSpecialHours: boolean = false;

    public subtotal: any;

    constructor(
        private cartService: CartsService,
        private deliveryHoursService: DeliveryHoursService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router
    ){ }

    ngOnInit(){
        this.getCart();
        this.getDeliveryHours();
    }

    getCart(){
        this.spinner.show();
        this.cartService.getCart().subscribe({
            next: res => {
                this.products = res.cart.products;
                this.initQuantityForm();
                this.calculateSubtotal();
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    calculateSubtotal(){
        const prices = this.products.map((product: any) => {
            const price = product.price;
            return Number(price) * product.quantity;
        });

        this.subtotal = prices.reduce((total: any, price: any) => total + price, 0);
    }

    initQuantityForm(){
        this.quantityForm = this.formBuilder.array(
            this.products.map((product: any) => this.formBuilder.group({
                quantity: [product.quantity, [Validators.required, Validators.min(1)]]
            }))
        );
    }

    getDeliveryHours(){
        this.spinner.show();
        this.deliveryHoursService.getDeliveryHours().subscribe({
            next: res => {
                this.deliveryHours = res.hours
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    selectDeliveryHour(event: any){
        if (event.value !== 1){ // Si se selecciona horario especial, se muestra
            this.showSpecialHours = true;
        } else {
            this.showSpecialHours = false;
        }
    }

    addQuantity(index: any, productId: any): void {
        const control = this.quantityForm.at(index).get('quantity');
        console.log(control)
        control.setValue(control.value + 1);
        const data = {
            quantity: control.value
        }

        this.cartService.updateQuantity(productId, data).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => {
                console.log(err);
            }
        })

    }

    subQuantity(index: any, productId: any): void {
        const control = this.quantityForm.at(index).get('quantity');
        console.log(control)
        if (control.value > 1) {
            control.setValue(control.value - 1);
        }

        const data = {
            quantity: control.value
        }

        this.cartService.updateQuantity(productId, data).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => {
                console.log(err);
            }
        })
    }

}
