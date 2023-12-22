import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatTableModule
    ],
    exports: [
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatTableModule
    ]
})
export class MaterialModule {
}
