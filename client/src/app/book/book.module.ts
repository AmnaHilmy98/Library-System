import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookRoutingModule} from './book-routing.module';
import {LoadingModule} from 'ngx-loading';
import {ArchwizardModule} from 'angular-archwizard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewSearchBookComponent} from './view-search-book/view-search-book.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {PageAddBookComponent} from './page-add-book/page-add-book.component';
import {PageBookHomeComponent} from './page-book-home/page-book-home.component';
import {ViewBookListComponent} from './view-book-list/view-book-list.component';
import { PageLendingHistoryComponent } from './page-lending-history/page-lending-history.component';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    ArchwizardModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    PageAddBookComponent,
    PageBookHomeComponent,
    ViewSearchBookComponent,
    ViewBookListComponent,
    PageLendingHistoryComponent
  ]
})
export class BookModule {
}
