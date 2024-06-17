import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersLayoutComponent} from "./layouts/users-layout/users-layout.component";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

const routes: Routes = [
    {
        path: 'usuarios',
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
        component: MainLayoutComponent,
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
