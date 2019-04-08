import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageMainComponent} from './page-main/page-main.component';
import {PageDashboardComponent} from './page-dashboard/page-dashboard.component';

const routes: Routes = [
  {
    path: 'main',
    component: PageMainComponent,
    children: [
      {
        path: 'dashboard',
        component: PageDashboardComponent
      },
      {
        path: 'book',
        loadChildren: './book/book.module#BookModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/main/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: []
})
export class AppRoutingModule {
}
