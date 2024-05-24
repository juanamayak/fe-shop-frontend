import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartsService} from "../../services/carts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

    public cart: any;

    constructor(
        private cartService: CartsService,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
        private router: Router
    ){ }

    ngOnInit(){
        this.getCart();
    }

    getCart(){
        this.spinner.show();
        this.cartService.getCart().subscribe({
            next: res => {
                this.cart = res.cart;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    createShoppingCart(){
        this.router.navigate(['checkout'])
    }
}
