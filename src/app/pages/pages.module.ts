import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from './account/account.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AccountModule} from "./account/account.module";
import {UsersComponent} from './users/users.component';
import { ProductsComponent } from './products/products.component';
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'productos', component: ProductsComponent},
    {path: 'productos/detalle', component: ProductsDetailComponent}

]

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent,
        UsersComponent,
        ProductsComponent,
        ProductsDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        AccountModule,
        MaterialModule,
        FormsModule
    ]
})
export class PagesModule {
}
