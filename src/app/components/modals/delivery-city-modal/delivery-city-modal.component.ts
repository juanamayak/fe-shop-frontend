import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LocationsService} from "../../../services/locations.service";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ProductsService} from "../../../services/products.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-delivery-city-modal',
    templateUrl: './delivery-city-modal.component.html',
    styleUrl: './delivery-city-modal.component.css'
})
export class DeliveryCityModalComponent implements OnInit {

    public searchForm: any;

    public countries: any;
    public states: any;
    public cities: any;

    constructor(
        private locationsService: LocationsService,
        private productsService: ProductsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit() {
        this.getCountries();
        this.initForm()
    }

    initForm() {
        this.searchForm = this.formBuilder.group({
            city_id: ['']
        });
    }

    searchProducts() {
        const cityId = this.searchForm.value.city_id;
        this.router.navigate(['productos', cityId]);
        this.dialogRef.close(true);
        /*this.productsService.getProducts(cityId).subscribe({
            next: res => {
                this.spinner.hide();
                this.productsService.sendData(res.providers);
                this.dialogRef.close(true);
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });*/
    }

    getCountries() {
        this.locationsService.getCountries().subscribe({
            next: res => {
                // TODO: Ordenar Mexico, Estados Unidos y Canada de primero
                this.countries = res.countries;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getStates(event: any) {
        const countryId = event.value;
        this.locationsService.getStates(countryId).subscribe({
            next: res => {
                this.states = res.states;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getCities(event: any) {
        const stateId = event.value;
        this.locationsService.getCities(stateId).subscribe({
            next: res => {
                this.spinner.hide();
                this.cities = res.cities;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

}
