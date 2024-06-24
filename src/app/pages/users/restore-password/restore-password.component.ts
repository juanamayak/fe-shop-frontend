import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.css'
})
export class RestorePasswordComponent implements OnInit {

    public newPasswordForm: any;
    private requestParams: any;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(){
        this.getRequestParams();
        this.initNewPasswordForm();
    }

    getRequestParams() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                const decodedToken = atob(params['token']);
                this.requestParams = JSON.parse(decodedToken);
            }
        });
    }

    initNewPasswordForm(){
        this.newPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirm_password: ['', Validators.required]
        })
    }

    restorePassword() {
        this.spinner.show();
        const data = {
            uuid: this.requestParams.uuid,
            code: this.requestParams.code,
            password: this.newPasswordForm.value.password,
            confirm_password: this.newPasswordForm.value.confirm_password
        }
        this.usersService.restorePassword(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                this.router.navigate(['usuarios/login']);
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

}
