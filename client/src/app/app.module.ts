import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {NavTopComponent} from './nav/nav-top/nav-top.component';
import {NavLeftComponent} from './nav/nav-left/nav-left.component';
import {NavRightComponent} from './nav/nav-right/nav-right.component';
import {PageMainComponent} from './page-main/page-main.component';
import {PageDashboardComponent} from './page-dashboard/page-dashboard.component';
import {ObjectStorage} from './utilities/object-storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {AppService} from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    NavLeftComponent,
    NavRightComponent,
    PageMainComponent,
    PageDashboardComponent
  ],
  imports: [
    HttpClientModule,
    // ApiModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.pulse,
    }),
    LoadingBarRouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
  ],
  providers: [
    ObjectStorage,
    AppService
  ],

  bootstrap: [AppComponent]
})

export class AppModule {

}
