import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import { UsersToolbarComponent } from './shared/users-toolbar/users-toolbar.component';
import { UsersNavbarComponent } from './shared/users-navbar/users-navbar.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { MainNavbarComponent } from './shared/main-navbar/main-navbar.component';
import {MaterialModule} from "../material/material.module";
import { ProductSliderComponent } from './product-slider/product-slider.component';
import {GalleryModule} from "@ks89/angular-modal-gallery";
import { CreateAddressModalComponent } from './modals/addresses/create-address-modal/create-address-modal.component';
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import { EditAddressModalComponent } from './modals/addresses/edit-address-modal/edit-address-modal.component';
import { MapComponent } from './map/map.component';
import { DeliveryCityModalComponent } from './modals/delivery-city-modal/delivery-city-modal.component';
import { AddressesListModalComponent } from './modals/addresses/addresses-list-modal/addresses-list-modal.component';
import { StripeButtonComponent } from './payment-buttons/stripe-button/stripe-button.component';
import {StripePaymentElementComponent} from "ngx-stripe";
import { PaypalButtonComponent } from './payment-buttons/paypal-button/paypal-button.component';
import {NgxPayPalModule} from "ngx-paypal";
import { OxxopayButtonComponent } from './payment-buttons/oxxopay-button/oxxopay-button.component';

@NgModule({
    declarations: [
        UsersToolbarComponent,
        UsersNavbarComponent,
        MainHeaderComponent,
        MainFooterComponent,
        MainNavbarComponent,
        ProductSliderComponent,
        CreateAddressModalComponent,
        EditAddressModalComponent,
        MapComponent,
        DeliveryCityModalComponent,
        AddressesListModalComponent,
        StripeButtonComponent,
        PaypalButtonComponent,
        OxxopayButtonComponent
    ],
    exports: [
        MainHeaderComponent,
        MainNavbarComponent,
        MainFooterComponent,
        UsersNavbarComponent,
        UsersToolbarComponent,
        ProductSliderComponent,
        StripeButtonComponent,
        PaypalButtonComponent,
        OxxopayButtonComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        MaterialModule,
        GalleryModule,
        MatDialogContent,
        MatDialogTitle,
        ReactiveFormsModule,
        StripePaymentElementComponent,
        NgxPayPalModule
    ]
})
export class ComponentsModule {
}
