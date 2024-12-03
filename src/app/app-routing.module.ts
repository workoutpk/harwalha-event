import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=> import ('./layout/layout.module').then(l=>l.LayoutModule) },
  {path:'auth', loadChildren:()=> import('./authentication/authentication.module').then (a=>a.AuthenticationModule) },
  {path:'event', loadChildren:()=> import('./event/event.module').then (e=>e.EventModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
