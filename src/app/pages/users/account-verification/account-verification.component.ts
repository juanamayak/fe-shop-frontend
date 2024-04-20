import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.css'
})
export class AccountVerificationComponent implements OnInit  {

    constructor(
        private usersService: UsersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.verifyAccount();
    }

    verifyAccount() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const userUuid = params['uuid'];
                const activationCode = params['code'];
                this.usersService.verifyAccount(userUuid, activationCode).subscribe({
                    next: res => {
                        this.spinner.hide();
                        this.alertsService.successAlert(res.message);
                        this.router.navigate(['users/login']);
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }
}
