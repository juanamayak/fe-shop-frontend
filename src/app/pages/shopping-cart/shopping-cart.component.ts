import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartsService} from "../../services/carts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {FormBuilder, Validators} from "@angular/forms";
import {DeliveryHoursService} from "../../services/delivery-hours.service";
import {OrdersService} from "../../services/orders.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

    public orderForm: any;
    public quantityForm: any;

    public products: any;
    public deliveryHours: any;

    public showSpecialHours: boolean = false;

    public deliveryPrince = 100;
    public specialPrice = 280;

    public subtotal: any;

    constructor(
        private cartService: CartsService,
        private ordersService: OrdersService,
        private deliveryHoursService: DeliveryHoursService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getCart();
        this.getDeliveryHours();
    }

    initOrderForm() {
        const total = this.subtotal + this.deliveryPrince + this.specialPrice;
        this.orderForm = this.formBuilder.group({
            delivery_date: ['', Validators.required],
            delivery_hour_id: ['', Validators.required],
            subtotal: [this.subtotal, Validators.required],
            special_price: [this.showSpecialHours ? this.specialPrice: ''],
            delivery_price: [this.deliveryPrince, Validators.required],
            total: [total, Validators.required],
            products: this.formBuilder.array(
                this.products.map((product: any) => this.formBuilder.group({
                    id: [product.id],
                    quantity: [product.quantity, [Validators.required, Validators.min(1)]],
                    price: [product.price],
                }))
            )
        });
    }

    getCart() {
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

    initQuantityForm() {
        this.quantityForm = this.formBuilder.array(
            this.products.map((product: any) => this.formBuilder.group({
                quantity: [product.quantity, [Validators.required, Validators.min(1)]]
            }))
        );
    }

    calculateSubtotal() {
        const prices = this.products.map((product: any) => {
            const price = product.price;
            return Number(price) * product.quantity;
        });

        this.subtotal = prices.reduce((total: any, price: any) => total + price, 0);
        this.initOrderForm();
    }

    createOrder(){
        this.spinner.show();
        const data = this.orderForm.value;
        this.ordersService.createOrder(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.router.navigate(['checkout', res.order]);
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getDeliveryHours() {
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

    selectDeliveryHour(event: any) {
        if (event.value !== 1) { // Si se selecciona horario especial, se muestra
            this.showSpecialHours = true;
        } else {
            this.showSpecialHours = false;
        }
    }

    addQuantity(index: any, productId: any): void {
        this.spinner.show();
        const control = this.quantityForm.at(index).get('quantity');
        control.setValue(control.value + 1);
        const data = {
            quantity: control.value
        }

        this.cartService.updateQuantity(productId, data).subscribe({
            next: res => {
                this.spinner.hide();
                // this.alertsService.successAlert(res.message);
                this.getCart();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })

    }

    subQuantity(index: any, productId: any): void {
        this.spinner.show();
        const control = this.quantityForm.at(index).get('quantity');
        if (control.value > 1) {
            control.setValue(control.value - 1);
        }

        const data = {
            quantity: control.value
        }

        this.cartService.updateQuantity(productId, data).subscribe({
            next: res => {
                this.spinner.hide();
                // this.alertsService.successAlert(res.message);
                this.getCart();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

}
