import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {
    CreateAddressModalComponent
} from "../../../components/modals/addresses/create-address-modal/create-address-modal.component";
import {AddressesService} from "../../../services/addresses.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {
    EditAddressModalComponent
} from "../../../components/modals/addresses/edit-address-modal/edit-address-modal.component";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrl: './addresses.component.css'
})
export class AddressesComponent implements OnInit {

    public addresses: any;

    constructor(
        private addressesService: AddressesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.getAddresses()
    }

    getAddresses() {
        this.spinner.show();
        this.addressesService.getAddresses().subscribe({
            next: res => {
                this.spinner.hide();
                this.addresses = res.addresses;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    openCreateAddressesModal() {
        const dialogRef = this.dialog.open(CreateAddressModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAddresses();
            }
        });
    }

    openUpdateAddresseModal(address: any) {
        const config = {
            data: {
                address
            }
        }

        const dialogRef = this.dialog.open(EditAddressModalComponent, config);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getAddresses();
            }
        });
    }

    deleteAddress(addressUuid: string){
        this.alertsService.confirmDelete(`¿Estás seguro de eliminar esta dirección?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    const data = { status: -1}
                    this.addressesService.deleteAddresses(addressUuid, data).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.alertsService.successAlert((res as any).message);
                            setTimeout(() => {
                                this.getAddresses()
                            }, 2500);
                        },
                        error: err => {
                            this.spinner.hide();
                            this.alertsService.errorAlert(err.error.errors);
                        }
                    })
                }
            });
    }

}
