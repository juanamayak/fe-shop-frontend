import {Component, Input, ViewChild} from '@angular/core';
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {PaymentsService} from "../../../services/payments.service";
import {StripeElementsOptions} from "@stripe/stripe-js";
import {AlertsService} from "../../../services/alerts.service";

@Component({
  selector: 'app-oxxopay-button',
  templateUrl: './oxxopay-button.component.html',
  styleUrl: './oxxopay-button.component.css'
})
export class OxxopayButtonComponent {

    @Input() orderInput: any;
    @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

    public elementsOptions: StripeElementsOptions = { locale: 'en' };

    constructor(
        private paymentsService: PaymentsService,
        private stripeService: StripeService,
        private alertsService: AlertsService
    ) {
    }

    ngOnInit(){

    }

    createPaymentIntent() {
        const data = {
            amount: Math.round(this.orderInput.total * 100),
            currency: this.orderInput.currency,
            payment_method: 'oxxo'
        }

        this.paymentsService.createPaymentIntent(data).subscribe({
            next: res => {
                this.elementsOptions.clientSecret = res.clientSecret;
                this.confirmOxxoPayment(res.clientSecret);
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    confirmOxxoPayment(clientSecret: any){
        this.stripeService.confirmOxxoPayment(clientSecret, {
            payment_method: {
                billing_details: {
                    name: 'Cliente Ejemplo',
                    email: 'cliente@example.com',
                }
            }
        }).subscribe((result) => {
            if (result.error) {
                // Muestra el error
                console.error(result.error.message);
            } else {
                // El pago ha sido exitoso
                console.log('Pago exitoso');
            }
        });
    }

}
