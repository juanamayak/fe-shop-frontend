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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {ComponentsModule} from "../components/components.module";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {GalleryComponent} from "@daelmaak/ngx-gallery";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'productos/:categoryUuid', component: ProductsComponent},
    {path: 'productos/detalle/:productUuid', component: ProductsDetailComponent},
    {path: 'carrito', component: ShoppingCartComponent},
    {path: 'checkout', component: CheckoutComponent}

]

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent,
        UsersComponent,
        ProductsComponent,
        ProductsDetailComponent,
        ShoppingCartComponent,
        CheckoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        AccountModule,
        MaterialModule,
        FormsModule,
        CurrencyMaskModule,
        ComponentsModule,
        ReactiveFormsModule,
        GalleryComponent
    ]
})
export class PagesModule {
}
