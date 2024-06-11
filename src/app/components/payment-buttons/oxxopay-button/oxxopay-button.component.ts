import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {PaymentsService} from "../../../services/payments.service";
import {StripeElementsOptions} from "@stripe/stripe-js";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import moment from "moment";

@Component({
  selector: 'app-oxxopay-button',
  templateUrl: './oxxopay-button.component.html',
  styleUrl: './oxxopay-button.component.css'
})
export class OxxopayButtonComponent {

    @Input() orderInput: any;
    @Output() paymentEmitter: EventEmitter<any> = new EventEmitter();
    @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

    public elementsOptions: StripeElementsOptions = { locale: 'en' };

    constructor(
        private paymentsService: PaymentsService,
        private stripeService: StripeService,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService
    ) {
    }

    ngOnInit(){
    }

    createPaymentIntent() {
        this.spinner.show();
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
                    name: this.orderInput.client.name + ' ' + this.orderInput.client.lastname,
                    email: this.orderInput.client.email,
                }
            }
        }).subscribe((result) => {
            if (result.error) {
                this.spinner.hide();
                this.alertsService.errorAlert(result.error.message);
            } else {
                this.createPayment(result);
            }
        });
    }

    createPayment(paymentIntentResult: any) {
        const data = {
            order_id: this.orderInput.id,
            transaction: paymentIntentResult.paymentIntent.id,
            payment_date: moment().format(),
            payment_method: 'OXXOPAY',
            payment_status: paymentIntentResult.paymentIntent.status.toUpperCase(),
            currency: this.orderInput.currency,
            payer_name: this.orderInput.client.name + '' + this.orderInput.client.lastname,
            payer_email: this.orderInput.client.email
        }
        this.paymentsService.createPayment(data).subscribe({
            next: res => {
                this.paymentEmitter.emit(res);
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

}
