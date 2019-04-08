import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageAddBookComponent} from './page-add-book/page-add-book.component';
import {PageBookHomeComponent} from './page-book-home/page-book-home.component';
import {PageLendingHistoryComponent} from './page-lending-history/page-lending-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PageBookHomeComponent
      },
      {
        path: 'add',
        component: PageAddBookComponent
      },
      {
        path: 'history',
        component: PageLendingHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookRoutingModule {
}
