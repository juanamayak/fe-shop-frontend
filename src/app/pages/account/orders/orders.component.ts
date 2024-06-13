import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/orders.service";
import {AlertsService} from "../../../services/alerts.service";
import {OrderStatuses} from "../../../constants/order-statuses";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

    public orders: any;
    public statuses = OrderStatuses;

    constructor(
        private ordersService: OrdersService,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService
    ) {
    }

    ngOnInit() {
        this.getOrders();
    }

    getOrders(){
        this.spinner.show();
        this.ordersService.getOrders().subscribe({
            next: res => {
                this.spinner.hide()
                this.orders = res.orders;
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }


}
