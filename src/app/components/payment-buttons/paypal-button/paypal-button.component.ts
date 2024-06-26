import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import moment from "moment/moment";
import {AlertsService} from "../../../services/alerts.service";
import {PaymentsService} from "../../../services/payments.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit{

    @Input() orderInput: any;
    @Output() paymentEmitter: EventEmitter<any> = new EventEmitter();

    public payPalConfig: IPayPalConfig;

    constructor(
        private alertsService: AlertsService,
        private paymentsService: PaymentsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(){

    }

    initPaypalConfig(): void {
        this.payPalConfig = {
            currency: this.orderInput.currency,
            clientId: environment.paypalClientId,
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: this.orderInput.currency,
                        value: this.orderInput.total,
                        breakdown: {
                            item_total: {
                                currency_code: this.orderInput.currency,
                                value: this.orderInput.total
                            }
                        }
                    },
                    items: [{
                        name: 'Pedido en FloreriaEnvios',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: this.orderInput.currency,
                            value: this.orderInput.total,
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized');
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization');
                this.createPayment(data)
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                this.alertsService.errorAlert(err.error.errors);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }

    createPayment(paymentIntentResult: any) {
        this.spinner.show();
        const data = {
            order_id: this.orderInput.id,
            transaction: paymentIntentResult.id,
            payment_date: moment(paymentIntentResult.create_time).format(),
            payment_method: 'PAYPAL',
            payment_status: paymentIntentResult.status,
            currency: this.orderInput.currency,
            payer_name: paymentIntentResult.payer.name.given_name + paymentIntentResult.payer.name.surname,
            payer_email: paymentIntentResult.payer.email_address
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
