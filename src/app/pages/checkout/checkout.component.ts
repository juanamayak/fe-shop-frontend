import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {OrdersService} from "../../services/orders.service";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    AddressesListModalComponent
} from "../../components/modals/addresses/addresses-list-modal/addresses-list-modal.component";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

    public order: any;

    constructor(
        private ordersService: OrdersService,
        private activatedRoute: ActivatedRoute,
        private alertsService: AlertsService,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit(): void {
        this.getOrder();
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

    openAddressesDialog(){
        const dialog = this.dialog.open(AddressesListModalComponent);
    }

}
