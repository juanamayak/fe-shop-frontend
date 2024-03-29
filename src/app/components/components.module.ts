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

@NgModule({
    declarations: [
        UsersToolbarComponent,
        UsersNavbarComponent,
        MainHeaderComponent,
        MainFooterComponent,
        MainNavbarComponent,
        ProductSliderComponent
    ],
    exports: [
        MainHeaderComponent,
        MainNavbarComponent,
        MainFooterComponent,
        UsersNavbarComponent,
        UsersToolbarComponent,
        ProductSliderComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        MaterialModule,
        GalleryModule
    ]
})
export class ComponentsModule {
}
