import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit{

    public session: any;
    constructor(
        private usersService: UsersService,
        public router: Router
    ) {
    }

    ngOnInit(){
        this.session = this.usersService.getToken();
    }

    logout(){
        sessionStorage.clear();
        this.router.navigate(['users/login']);
    }

}
