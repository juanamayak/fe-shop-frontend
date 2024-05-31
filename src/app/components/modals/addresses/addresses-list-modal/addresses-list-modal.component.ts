import {Component, OnInit} from '@angular/core';
import {AddressesService} from "../../../../services/addresses.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../../services/alerts.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-addresses-list-modal',
    templateUrl: './addresses-list-modal.component.html',
    styleUrl: './addresses-list-modal.component.css'
})
export class AddressesListModalComponent implements OnInit {
    public addresses: any;

    constructor(
        private addressesServices: AddressesService,
        private alertsService: AlertsService,
        private dialogRef: MatDialogRef<any>,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit() {
        this.getAddresses();
    }

    getAddresses() {
        this.spinner.show();
        this.addressesServices.getAddresses().subscribe({
            next: res => {
                this.spinner.hide();
                this.addresses = res.addresses;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    selectAddress(address: any){
        this.dialogRef.close(address);
    }
}
