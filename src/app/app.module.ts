import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { adminLteConf } from './admin-lte.conf';   //Import the layout configuration.

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from 'angular-admin-lte';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';   //Import the layout module.

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LayoutModule.forRoot(adminLteConf),   //Provide the configuration to the layout module.
    LoadingPageModule, MaterialBarModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
