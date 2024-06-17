import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";


@Component({
    selector: 'app-users-navbar',
    templateUrl: './users-navbar.component.html',
    styleUrl: './users-navbar.component.css'
})
export class UsersNavbarComponent implements OnInit {

    @Input() session: any;

    constructor(
        private usersService: UsersService,
        public router: Router
    ) {

    }

    ngOnInit() {

    }

    logout(){
        localStorage.clear();
        this.router.navigate(['usuarios/login']);
    }
}
