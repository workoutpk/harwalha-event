import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(  private breakpointObserver: BreakpointObserver, private router : Router, ) {}


  ngOnInit(): void {
  }
// logout(){
//  this.session.removeCurrantUser()
//   this.router.navigate(['/login'])
// }

// logoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
//   this.dialog.open(LogoutDialogComponent,{
//     width: "400px",
//     height: "auto",
//     maxHeight: "100vh",
//     maxWidth: "90vw",
//     panelClass: "layout-dialog",
//     enterAnimationDuration,
//     exitAnimationDuration
//   })
// }


}
