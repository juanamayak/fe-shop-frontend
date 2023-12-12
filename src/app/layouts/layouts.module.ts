import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseComponent} from './base/base.component';
import {ComponentsModule} from "../components/components.module";
import {MaterialModule} from "../material/material.module";
import {AccountModule} from "../pages/account/account.module";
import { UsersLayoutComponent } from './users-layout/users-layout.component';


@NgModule({
    declarations: [
        BaseComponent, UsersLayoutComponent+
        UsersLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule,
        AccountModule
    ]
})
export class LayoutsModule {
}
