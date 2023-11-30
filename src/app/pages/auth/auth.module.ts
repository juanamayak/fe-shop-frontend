import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthComponent} from './auth.component';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
    {path: 'login', component: LoginComponent},

]


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
