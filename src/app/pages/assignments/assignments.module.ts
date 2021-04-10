import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentsData } from './assignments.data';
import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';

export const routes = [
  { path: '', redirectTo: 'drag-drop', pathMatch: 'full'},
  { path: 'drag-drop', component: AssignmentsComponent, data: { breadcrumb: 'Drag and Drop' } },
  { path: 'add-assignments', component: AddAssignmentsComponent},
  { path: '', component: AssignmentsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AssignmentsData, { delay: 0 }),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    DragulaModule.forRoot(),
    PipesModule
  ],
  declarations: [
    AssignmentsComponent,
    AddAssignmentsComponent
  ]
})
export class AssignmentsModule { }
