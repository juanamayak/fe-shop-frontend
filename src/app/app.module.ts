import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutsModule} from "./layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {GalleryComponent} from "@daelmaak/ngx-gallery";
import {NgxStripeModule} from "ngx-stripe";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        PagesModule,
        LayoutsModule,
        CurrencyMaskModule,
        NgxSpinnerModule,
        GalleryComponent,
        NgxStripeModule.forRoot('pk_test_51JowwPDj0dfRCIRQIdedIyyT72jZ3oiuoyGxc57PB6TjiZlaUlHARkr5xvtEA4mnGANUS6vvrqJxZSn41Rb1T3BX00eyNUxdwe')
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
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
