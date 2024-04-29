import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from "../../../../services/locations.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../../services/alerts.service";
import {AddressesService} from "../../../../services/addresses.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialogRef} from "@angular/material/dialog";
import * as mapboxgl from 'mapbox-gl';
import {MapService} from "../../../../services/map.service";

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent implements OnInit{

    public addressForm: any;

    public countries: any;
    public states: any;
    public cities: any;

    public map: any;

    constructor(
        private formBuilder: FormBuilder,
        private locationsService: LocationsService,
        private mapService: MapService,
        private addressesService: AddressesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit(){
        this.getCountries();
        this.initAddressForm();
        this.initMap();
    }

    initMap() {
        this.mapService.buildMap();
    }

    initAddressForm(){
        this.addressForm = this.formBuilder.group({
            country_id:['', Validators.required],
            state_id: ['', Validators.required],
            city_id: ['', Validators.required],
            name_receiver: ['', Validators.required],
            phone_receiver: ['', Validators.required],
            address: ['', Validators.required],
            colony: ['', Validators.required],
            zip: ['', Validators.required],
            references: ['', Validators.required],
            longitude: [''],
            latitude: [''],
        })
    }

    createAddress(){
        this.spinner.show();
        const data = this.addressForm.value;
        this.addressesService.createAddresses(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.dialogRef.close(true);
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getCountries() {
        this.locationsService.getCountries().subscribe({
            next: res => {
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

    getCityInfo(event: any){
        this.locationsService.getCity(event.value).subscribe({
            next: res => {
                console.log(res);
                this.mapService.buildMarker(res.city.latitude, res.city.longitude);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })

    }
}
