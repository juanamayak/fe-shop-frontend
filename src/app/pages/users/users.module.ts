import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'verification/:uuid/:code', component: AccountVerificationComponent},
    {path: 'olvide-mi-contraseña', component: ForgotPasswordComponent},
    {path: 'restaurar-contrasena/:token', component: RestorePasswordComponent}
]


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AccountVerificationComponent,
        ForgotPasswordComponent,
        RestorePasswordComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ]
})
export class UsersModule {
}
