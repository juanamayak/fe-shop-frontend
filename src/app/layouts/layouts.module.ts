import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseComponent} from './base/base.component';
import {ComponentsModule} from "../components/components.module";
import {MaterialModule} from "../material/material.module";


@NgModule({
    declarations: [
        BaseComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        ComponentsModule
    ]
})
export class LayoutsModule {
}
