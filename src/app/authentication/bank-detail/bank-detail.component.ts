import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyDialogComponent } from './verify-dialog/verify-dialog.component';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent {
  constructor( public dialog : MatDialog ){

  }

  verifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(VerifyDialogComponent,{
      width: "450px",
      height: "auto",
      maxHeight: "100vh",
      maxWidth: "90vw",
      panelClass: "layout-dialog",
      enterAnimationDuration,
      exitAnimationDuration
    })
  }
  

}
