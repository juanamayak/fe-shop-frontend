import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./layouts/base/base.component";
import {UsersLayoutComponent} from "./layouts/users-layout/users-layout.component";

const routes: Routes = [
    {
        path: '',
        component: UsersLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
            },
        ]
    },
    {
        path: 'cuenta',
        component: UsersLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
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
