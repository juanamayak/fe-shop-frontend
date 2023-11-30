import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule {
}
