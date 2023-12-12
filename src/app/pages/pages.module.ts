import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from './account/account.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AccountModule} from "./account/account.module";

const routes: Routes = [
    {path: '', component: HomeComponent}

]

@NgModule({
    declarations: [
        HomeComponent,
        AccountComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule
    ]
})
export class PagesModule {
}
