import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentsData } from './assignments.data';
import { AddAssignmentsComponent } from './add-assignments/add-assignments.component';

export const routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full'},
  { path: 'liste', component: AssignmentsComponent},
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
    DragulaModule.forRoot()
  ],
  declarations: [
    AssignmentsComponent,
    AddAssignmentsComponent
  ]
})
export class AssignmentsModule { }
