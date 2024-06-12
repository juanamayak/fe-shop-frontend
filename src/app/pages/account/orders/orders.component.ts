import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/orders.service";
import {AlertsService} from "../../../services/alerts.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

    public orders: any;

    constructor(
        private ordersService: OrdersService,
        private alertsService: AlertsService
    ) {
    }

    ngOnInit() {
        this.getOrders();
    }

    getOrders(){
        this.ordersService.getOrders().subscribe({
            next: res => {
                this.orders = res.orders;
            },
            error: err => {
                console.log(err);
            }
        });
    }


}
