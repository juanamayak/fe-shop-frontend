import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from "../../../../services/locations.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../../services/alerts.service";
import {AddressesService} from "../../../../services/addresses.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MapService} from "../../../../services/map.service";
import {MapComponent} from "../../../map/map.component";
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-create-address-modal',
  templateUrl: './create-address-modal.component.html',
  styleUrl: './create-address-modal.component.css'
})
export class CreateAddressModalComponent implements OnInit{
    @ViewChild(MapComponent) mapComponent: MapComponent;

    public addressForm: any;

    public countries: any;
    public states: any;
    public cities: any;

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 9;

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

        this.initMap(-99.133683, 19.438900);
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
        });
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
                const longitude = res.city.longitude;
                const latitude = res.city.latitude;
                this.mapComponent.initMap(longitude, latitude);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    initMap(lng: any, lat: any) {
        if (this.map){
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
