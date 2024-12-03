import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ListViewComponent } from './list-view/list-view.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ListViewComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class LayoutModule { }
