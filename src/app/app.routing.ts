import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {NotFoundComponent} from './pages/errors/not-found/not-found.component';
import {AuthGuard} from './user/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule'},
    {path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule'},
    {path: '**', component: NotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
});
