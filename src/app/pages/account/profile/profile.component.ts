import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationsService} from "../../../services/locations.service";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";
import moment from "moment";
import {Months} from "../../../constants/months";

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

    public months = Months;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private locationsService: LocationsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit() {
        const userUuid: string = this.usersService.getUuid()!;
        this.userUuid = atob(userUuid);
        this.getCountries();
        this.getUser();
    }

    getUser() {
        this.usersService.getUser(this.userUuid).subscribe({
            next: res => {
                this.initForms(res.client);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    initForms(user: any) {
        this.getStates({value: user.country_id});
        this.getCities({value: user.state_id});

        const birthday = moment(user.birthday, 'YYYY-MM-DD');
        const birthday_day = birthday.date();
        const birthday_month = birthday.month() + 1;
        const birthday_year = birthday.year();

        this.userForm = this.formBuilder.group({
            name: [user && user.name ? user.name : '', Validators.required],
            lastname: [user && user.lastname ? user.lastname : '', Validators.required],
            email: [user && user.email ? user.email : '', Validators.required],
            birthday_day: [user && user.birthday ? birthday_day : '', Validators.required],
            birthday_month: [user && user.birthday ? birthday_month : '', Validators.required],
            birthday_year: [user && user.birthday ? birthday_year : '', Validators.required],
            cellphone: [user && user.cellphone ? user.cellphone : '', Validators.required],
        });

        this.addressForm = this.formBuilder.group({
            country_id: [user && user.country_id ? user.country_id : '', Validators.required],
            state_id: [user && user.state_id ? user.state_id : '', Validators.required],
            city_id: [user && user.city_id ? user.city_id : '', Validators.required],
            address: [user && user.address ? user.address : '', Validators.required],
            zip: [user && user.zip ? user.zip : '', Validators.required],
        });

        this.userForm.disable();
        this.addressForm.disable();
    }

    updateUser() {
        this.spinner.show();
        const user = this.userForm.value;
        const birthday = `${user.birthday_year}-${user.birthday_month}-${user.birthday_day}`

        const data = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            birthday: moment(birthday).format('YYYY-MM-DD'),
            cellphone: user.cellphone.toString()
        };

        this.usersService.updateUsers(this.userUuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    updateAddress() {
        this.spinner.show();
        const user = this.addressForm.value;
        const data = {
            country_id: user.country_id,
            state_id: user.state_id,
            city_id: user.city_id,
            address: user.address,
            zip: user.zip
        };
        this.usersService.updateAddress(this.userUuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
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
                this.spinner.hide();
                this.cities = res.cities;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    enableUserForm(event: any){
        if (event.checked){
            this.userForm.enable();
        } else {
            this.userForm.disable()
        }
    }

    enableAddressForm(event: any){
        if (event.checked){
            this.addressForm.enable();
        } else {
            this.addressForm.disable()
        }
    }

}
