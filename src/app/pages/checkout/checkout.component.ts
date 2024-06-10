import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {OrdersService} from "../../services/orders.service";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    AddressesListModalComponent
} from "../../components/modals/addresses/addresses-list-modal/addresses-list-modal.component";
import {MessagesService} from "../../services/messages.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StripeService, StripePaymentElementComponent} from 'ngx-stripe';
import {
    IPayPalConfig,
    ICreateOrderRequest
} from 'ngx-paypal';
import {
    StripeElementsOptions,
    PaymentIntent
} from '@stripe/stripe-js';
import {PaymentsService} from "../../services/payments.service";
import moment from "moment";
import {environment} from "../../../environments/environment.development";


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
    @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

    public sendDataForm: any;

    public stripeForm: any;
    public order: any;
    public selectedAddress: any;
    public paymentMethodSelected: any;

    public messages: any;

    elementsOptions: StripeElementsOptions = {
        locale: 'en'
    };

    public payPalConfig ?: IPayPalConfig;

    constructor(
        private ordersService: OrdersService,
        private messagesService: MessagesService,
        private paymentsService: PaymentsService,
        private activatedRoute: ActivatedRoute,
        private stripeService: StripeService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private router: Router,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.getOrder();
        this.initSendDataForm();
        this.initStripeForm();
        this.initPaypalConfig();
    }

    initSendDataForm() {
        this.sendDataForm = this.formBuilder.group({
            address_id: ['', Validators.required],
            message: ['', Validators.required],
            sign: ['', Validators.required],
        })
    }

    initStripeForm() {
        this.stripeForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', Validators.required]
        });
    }

    createPaymentIntent(paymentMethod: any) {
        const data = {
            amount: Math.round(this.order.total * 100),
            currency: this.order.currency,
            payment_method: paymentMethod
        }

        this.paymentsService.createPaymentIntent(data).subscribe({
            next: res => {
                if (this.paymentMethodSelected === 'stripe'){
                    this.elementsOptions.clientSecret = res.clientSecret;
                } else {
                    this.confirmOxxoPayment(res.clientSecret);
                }

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
                    this.updateOrder(res);
                }
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

    initPaypalConfig(): void {
        this.payPalConfig = {
            currency: this.order.currency,
            clientId: environment.paypalClientId,
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: this.order.currency,
                        value: this.order.total,
                        breakdown: {
                            item_total: {
                                currency_code: this.order.currency,
                                value: this.order.total
                            }
                        }
                    },
                    items: [{
                        name: 'Pedido en FloreriaEnvios',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: this.order.currency,
                            value: this.order.total,
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
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any) => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.updateOrder(data);
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

    updateOrder(paymentIntentResult: any) {
        const data = this.sendDataForm.value;
        this.ordersService.updateOrder(this.order.uuid, data).subscribe({
            next: res => {
                if (this.paymentMethodSelected === 'stripe') {
                    this.createPayment(paymentIntentResult);
                } else if (this.paymentMethodSelected === 'paypal') {
                    this.createPaymentPaypal(paymentIntentResult);
                }
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    createPayment(paymentIntentResult: any) {
        const data = {
            order_id: this.order.id,
            transaction: paymentIntentResult.paymentIntent.id,
            payment_date: moment().format(),
            payment_method: 'STRIPE',
            payment_status: paymentIntentResult.paymentIntent.paid ? 'PAGADO' : 'INCOMPLETO',
            currency: this.order.currency,
            payer_name: this.stripeForm.value.name,
            payer_email: this.stripeForm.value.email
        }
        this.paymentsService.createPayment(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.router.navigate(['confirmacion', this.order.uuid]);
                }, 2500)
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    createPaymentPaypal(paymentIntentResult: any) {
        const data = {
            order_id: this.order.id,
            transaction: paymentIntentResult.id,
            payment_date: moment(paymentIntentResult.create_time).format(),
            payment_method: 'PAYPAL',
            payment_status: paymentIntentResult.status,
            currency: this.order.currency,
            payer_name: paymentIntentResult.payer.name.given_name + paymentIntentResult.payer.name.surname,
            payer_email: paymentIntentResult.payer.email_address
        }
        this.paymentsService.createPayment(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.router.navigate(['confirmacion'], this.order.uuid);
                }, 2500)
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getOrder() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const orderUuid = params['orderUuid'];
                this.ordersService.getOrder(orderUuid).subscribe({
                    next: res => {
                        this.order = res.order;
                        this.getMessages();
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }

    getMessages() {
        this.messagesService.getMessages().subscribe({
            next: res => {
                this.messages = res.messages;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    selectedMessage(event: any) {
        this.message.setValue(event.value);
    }

    openAddressesDialog() {
        const dialogRef = this.dialog.open(AddressesListModalComponent);

        dialogRef.afterClosed().subscribe(address => {
            this.selectedAddress = address;
            this.addressId.setValue(address.id);
        });
    }

    showPaymentMethod(paymentMethod: any) {
        this.paymentMethodSelected = paymentMethod;

        switch (paymentMethod) {
            case 'stripe':
                this.createPaymentIntent('card');
                break;
            case 'paypal':
                this.initPaypalConfig();
                break;
            case 'oxxopay':
                this.createPaymentIntent('oxxo')
                break;
        }
    }

    get message() {
        return this.sendDataForm.get('message');
    }

    get addressId() {
        return this.sendDataForm.get('address_id');
    }

}
