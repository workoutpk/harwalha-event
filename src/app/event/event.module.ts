import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    EventComponent,
    DashboardComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class EventModule { }
