import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrl: './users-layout.component.css'
})
export class UsersLayoutComponent implements OnInit {

    public session: boolean = false;

    constructor(
        private usersService: UsersService,
        public router: Router
    ) {

    }

    ngOnInit() {
        if (this.usersService.getToken()) {
            this.session = true;
        }
    }
}
