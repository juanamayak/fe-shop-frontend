import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./shared/base/footer/footer.component";
import {HeaderComponent} from "./shared/base/header/header.component";
import {NavbarComponent} from "./shared/base/navbar/navbar.component";
import {AuthNavbarComponent} from './shared/auth/auth-navbar/auth-navbar.component';
import {RouterLink} from "@angular/router";

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        NavbarComponent,
        AuthNavbarComponent
    ],
    exports: [
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        AuthNavbarComponent
    ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class ComponentsModule {
}
