import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {PaymentsService} from "../../../services/payments.service";
import {StripeElementsOptions} from "@stripe/stripe-js";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {OrdersService} from "../../../services/orders.service";
import moment from "moment/moment";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-stripe-button',
  templateUrl: './stripe-button.component.html',
  styleUrl: './stripe-button.component.css'
})
export class StripeButtonComponent implements OnInit {

    @Input() orderInput: any;
    @Output() paymentEmitter: EventEmitter<any> = new EventEmitter();
    @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

    public sendDataForm: any;

    public stripeForm: any;

    public elementsOptions: StripeElementsOptions = { locale: 'en' };

    constructor(
        private paymentsService: PaymentsService,
        private stripeService: StripeService,
        private ordersService: OrdersService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router,
    ) {
    }

    ngOnInit(){
        this.initStripeForm();
    }

    initStripeForm() {
        this.stripeForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', Validators.required]
        });
    }

    createPaymentIntent() {
        const data = {
            amount: Math.round(this.orderInput.total * 100),
            currency: this.orderInput.currency,
            payment_method: 'card'
        }

        this.paymentsService.createPaymentIntent(data).subscribe({
            next: res => {
                this.elementsOptions.clientSecret = res.clientSecret;
            },
            error: err => {
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    confirmStripePayment() {
        this.spinner.show();
        this.stripeService.confirmPayment({
            elements: this.paymentElement.elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: this.stripeForm.value
                }
            },
            redirect: 'if_required'
        }).subscribe({
            next: res => {
                if (res.error) {
                    this.spinner.hide();
                    this.alertsService.errorAlert(res.error.message);
                } else if (res.paymentIntent.status === 'succeeded') {
                    this.createPayment(res);
                }
            }
        });
    }

    createPayment(paymentIntentResult: any) {
        const data = {
            order_id: this.orderInput.id,
            transaction: paymentIntentResult.paymentIntent.id,
            payment_date: moment().format(),
            payment_method: 'STRIPE',
            payment_status: paymentIntentResult.paymentIntent.status.toUpperCase(),
            currency: this.orderInput.currency,
            payer_name: this.stripeForm.value.name,
            payer_email: this.stripeForm.value.email
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

    updateOrder(paymentIntentResult: any) {
        const data = this.sendDataForm.value;
        this.ordersService.updateOrder(this.orderInput.uuid, data).subscribe({
            next: res => {
                this.createPayment(paymentIntentResult);
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

}
