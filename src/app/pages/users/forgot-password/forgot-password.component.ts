import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{


    public restorePasswordForm: any;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.restorePasswordForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
    }


}
