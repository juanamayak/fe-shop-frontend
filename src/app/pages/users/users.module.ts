import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
    {path: 'login', component: LoginComponent}
]


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class UsersModule { }
