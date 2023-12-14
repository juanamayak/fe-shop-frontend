import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
    selector: 'app-users-navbar',
    templateUrl: './users-navbar.component.html',
    styleUrl: './users-navbar.component.css'
})
export class UsersNavbarComponent implements OnInit {

    public session: boolean = false;

    constructor(
        public router: Router
    ) {

    }

    ngOnInit() {

    }
}
