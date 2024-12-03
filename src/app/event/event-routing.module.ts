import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path:'', component:EventComponent, children:[
    {path:'',redirectTo:'dashobard',pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'events', component:EventsComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
