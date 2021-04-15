import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { DragulaModule } from 'ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';

import { HeaderComponent } from '../theme/components/header/header.component';
import { FooterComponent } from '../theme/components/footer/footer.component';
import { SidebarComponent } from '../theme/components/sidebar/sidebar.component';
import { HorizontalMenuComponent } from '../theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BackTopComponent } from '../theme/components/back-top/back-top.component';
import { UserMenuComponent } from '../theme/components/user-menu/user-menu.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    NgbModule.forRoot(),
    routing
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HorizontalMenuComponent,
    BackTopComponent,
    UserMenuComponent,
    SearchComponent
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
