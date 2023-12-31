import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutsModule} from "./layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PagesModule,
        LayoutsModule
    ],
    exports: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
