import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from './account/account.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AccountModule} from "./account/account.module";
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {path: '', component: HomeComponent}

]

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        AccountModule
    ]
})
export class PagesModule {
}
