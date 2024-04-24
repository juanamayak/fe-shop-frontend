import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from "@angular/router";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {OrdersComponent} from './orders/orders.component';
import {ConfigurationsComponent} from './configurations/configurations.component';
import {AddressesComponent} from "./addresses/addresses.component";


const routes: Routes = [
    {path: 'perfil', component: ProfileComponent},
    {path: 'pedidos', component: OrdersComponent},
    {path: 'direcciones', component: AddressesComponent},
    {path: 'configuracion', component: ConfigurationsComponent}
]

@NgModule({
    declarations: [
        ProfileComponent,
        OrdersComponent,
        AddressesComponent,
        ConfigurationsComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class AccountModule {
}
