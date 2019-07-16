import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';

import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    TabsModule,
    BoxModule
  ],
  declarations: [
    SidebarLeftComponent, HeaderTopComponent, SidebarRightComponent
  ],
  exports: [
    BoxModule, TabsModule, SidebarLeftComponent, HeaderTopComponent, SidebarRightComponent
  ]
})
export class DashboardModule { }
