import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";
import {Categories} from "../../../constants/categories";
import {EditAddressModalComponent} from "../../modals/addresses/edit-address-modal/edit-address-modal.component";
import {DeliveryCityModalComponent} from "../../modals/delivery-city-modal/delivery-city-modal.component";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent implements OnInit{

    public session: any;
    public categories = Categories;
    constructor(
        private usersService: UsersService,
        private dialog: MatDialog,
        public router: Router
    ) {
    }

    ngOnInit(){
        this.session = this.usersService.getToken();
    }

    logout(){
        localStorage.clear();
        this.router.navigate(['usuarios/login']);
    }

    goToProducts(category: any){
        this.router.navigate(['productos', category.uuid]);
    }

}
