import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./layouts/base/base.component";
import {AuthBaseComponent} from "./layouts/auth-base/auth-base.component";

const routes: Routes = [
    {
        path: 'auth',
        component: AuthBaseComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
        ]
    },
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
