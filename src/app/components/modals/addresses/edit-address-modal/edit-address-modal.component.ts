import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LocationsService} from "../../../../services/locations.service";
import {AddressesService} from "../../../../services/addresses.service";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../../../environments/environment.development";

@Component({
    selector: 'app-edit-address-modal',
    templateUrl: './edit-address-modal.component.html',
    styleUrl: './edit-address-modal.component.css'
})
export class EditAddressModalComponent implements OnInit {

    public addressForm: any;

    public countries: any;
    public states: any;
    public cities: any;

    public address: any;

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 15;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private locationsService: LocationsService,
        private addressesService: AddressesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private dialogRef: MatDialogRef<any>
    ) {
    }

    ngOnInit() {
        this.address = this.data.address;

        this.getCountries();
        this.getStates({value: this.address.country_id});
        this.getCities({value: this.address.state_id});
    }

    initAddressForm() {
        this.addressForm = this.formBuilder.group({
            country_id: [this.address && this.address.country_id ? this.address.country_id : '', Validators.required],
            state_id: [this.address && this.address.state_id ? this.address.state_id : '', Validators.required],
            city_id: [this.address && this.address.city_id ? this.address.city_id : '', Validators.required],
            name_receiver: [this.address && this.address.name_receiver ? this.address.name_receiver : '', Validators.required],
            phone_receiver: [this.address && this.address.phone_receiver ? this.address.phone_receiver : '', Validators.required],
            address: [this.address && this.address.address ? this.address.address : '', Validators.required],
            colony: [this.address && this.address.colony ? this.address.colony : '', Validators.required],
            zip: [this.address && this.address.zip ? this.address.zip.toString() : '', Validators.required],
            references: [this.address && this.address.references ? this.address.references : '', Validators.required],
            longitude: [this.address && this.address.longitude ? this.address.longitude: ''],
            latitude: [this.address && this.address.latitude ? this.address.latitude: ''],
        });

        setTimeout(() => {
            this.initMap(Number(this.address.longitude), Number(this.address.latitude));
        }, 1000);

    }

    updateAddress() {
        this.spinner.show();
        const data = this.addressForm.value;
        this.addressesService.updateAddresses(this.address.uuid, data).subscribe({
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
        });
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
                this.cities = res.cities;
                this.initAddressForm();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    initMap(lng: any, lat: any) {
        if (this.map) {
            this.map.remove();
        }

        this.map = new mapboxgl.Map({
            accessToken: environment.mapboxToken,
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [lng, lat]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        this.buildMarker(lng, lat)
    }

    buildMarker(lng: any, lat: any) {
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat]).addTo(this.map);

        marker.on('dragend', () => {
            this.longitude.setValue(marker.getLngLat().lng);
            this.latitude.setValue(marker.getLngLat().lat);
        });
    }

    get longitude() {
        return this.addressForm.get("longitude");
    }

    get latitude() {
        return this.addressForm.get("latitude");
    }
}
