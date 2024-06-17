import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


    public registerForm: any;
    public createdAccount: boolean = false;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initLoginForm();
    }

    initLoginForm() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            cellphone: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password: ['', Validators.required],
            terms_and_conditions: ['', Validators.required]
        });
    }

    register() {
        this.spinner.show();
        const data = this.registerForm.value;
        this.usersService.register(data).subscribe({
            next: res => {
                /*const token = res.token;
                sessionStorage.setItem(this.usersService.jwtToken, token);*/

                this.alertsService.successAlert(res.message);
                this.createdAccount = true;

                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }
}
