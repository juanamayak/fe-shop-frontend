import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "./shared/footer/footer.component";
import {HeaderComponent} from "./shared/header/header.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        NavbarComponent
    ],
    exports: [
        NavbarComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule {
}
