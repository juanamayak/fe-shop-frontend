import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrl: './payment-confirmation.component.css'
})
export class PaymentConfirmationComponent implements OnInit{

    public order: any;

    constructor(
        private ordersService: OrdersService,
        private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
    ) {
    }

    ngOnInit(){
        this.getOrder()
    }

    getOrder() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const orderUuid = params['orderUuid'];
                this.ordersService.getOrder(orderUuid).subscribe({
                    next: res => {
                        this.spinner.hide();
                        this.order = res.order;
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }
}
