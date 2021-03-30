import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

import { adminLteConf } from './admin-lte.conf';   //Import the layout configuration.

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from 'angular-admin-lte';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './login/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './login/_helpers/error.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    ModalModule.forRoot(),
    LayoutModule.forRoot(adminLteConf),   //Provide the configuration to the layout module.
    LoadingPageModule, MaterialBarModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
