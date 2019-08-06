import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BoxModule, TabsModule, DropdownModule } from 'angular-admin-lte';

import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { FooterBottomComponent } from './footer-bottom/footer-bottom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    TabsModule,
    BoxModule,
    HttpClientModule
  ],
  declarations: [
    SidebarLeftComponent, HeaderTopComponent, SidebarRightComponent, FooterBottomComponent
  ],
  exports: [
    BoxModule, TabsModule, SidebarLeftComponent, HeaderTopComponent, SidebarRightComponent, FooterBottomComponent
  ]
})
export class DashboardModule { }
