import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutsModule} from "./layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {LightboxModule} from "ngx-lightbox";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PagesModule,
        LayoutsModule,
        CurrencyMaskModule,
        LightboxModule
    ],
    exports: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
