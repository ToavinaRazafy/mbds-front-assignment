import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'assignments', pathMatch:'full' },
            { path: 'assignments', loadChildren: 'app/pages/assignments/assignments.module#AssignmentsModule', data: { breadcrumb: 'Membership' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
