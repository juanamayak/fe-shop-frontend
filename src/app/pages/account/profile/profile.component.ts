import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from "../../../services/locations.service";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

    public userForm: any;
    public addressForm: any;

    public userUuid: any;

    public countries: any;
    public states: any;
    public cities: any;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private locationsService: LocationsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit() {
        this.getCountries();
        this.getUser();
    }

    getUser(){
        this.userUuid = sessionStorage.getItem(this.usersService.uuidToken);
        this.usersService.getUser(atob(this.userUuid)).subscribe({
            next: res => {
                this.initForms(res.user);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    initForms(user: any){
        this.userForm = this.formBuilder.group({
            name: [user.name, Validators.required],
            lastname: [user.lastname, Validators.required],
            email: [user.email, Validators.required],
            birthday_day: ['', Validators.required],
            birthday_month: ['', Validators.required],
            birthday_year: ['', Validators.required],
            cellphone: [user.cellphone, Validators.required],
        });

        this.addressForm = this.formBuilder.group({
            country_id: ['', Validators.required],
            state_id: ['', Validators.required],
            city_id: ['', Validators.required],
            address: ['', Validators.required],
            zip: ['', Validators.required],
        })
    }

    updateUser(){
        this.spinner.show();
        const data = this.userForm.value;
        this.usersService.updateUsers(this.userUuid, data).subscribe({
            next: res => {},
            error: err => {}
        })
    }

    getCountries(){
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

    getStates(event: any){
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

    getCities(event: any){
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
