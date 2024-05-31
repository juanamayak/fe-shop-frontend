import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {OrdersService} from "../../services/orders.service";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    AddressesListModalComponent
} from "../../components/modals/addresses/addresses-list-modal/addresses-list-modal.component";
import {MessagesService} from "../../services/messages.service";
import {FormBuilder, Validators} from "@angular/forms";
import {StripeService, StripeCardElementOptions, StripeElementsOptions } from "ngx-stripe";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

    public sendDataForm: any;

    public order: any;
    public selectedAddress: any;
    public messages: any;

    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            }
        }
    };

    constructor(
        private ordersService: OrdersService,
        private messagesService: MessagesService,
        private activatedRoute: ActivatedRoute,
        private stripeService: StripeService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.getOrder();
        this.initSendDataForm();
    }

    initSendDataForm(){
        this.sendDataForm = this.formBuilder.group({
            address_id: ['', Validators.required],
            message: ['', Validators.required],
            sign: ['', Validators.required],
        })
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

    getMessages(){
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

    selectedMessage(event: any){
        this.message.setValue(event.value);
    }

    openAddressesDialog() {
        const dialogRef = this.dialog.open(AddressesListModalComponent);

        dialogRef.afterClosed().subscribe(address => {
            this.selectedAddress = address;
            this.addressId.setValue(address.id);
        });
    }

    get message() {
        return this.sendDataForm.get('message');
    }

    get addressId() {
        return this.sendDataForm.get('address_id');
    }

}
