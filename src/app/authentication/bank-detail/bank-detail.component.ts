import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyDialogComponent } from './verify-dialog/verify-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EVENT_ORGANIZER_REGISTER, EMAIL_OTP_SEND } from '../../../api.constants'
@Component({
    selector: 'app-bank-detail',
    templateUrl: './bank-detail.component.html',
    styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

    bankDetails: FormGroup;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private apiServices: ApiService,
        private fb: FormBuilder,
        private toasterService: MatSnackBar,

    ) {
        this.bankDetails = this.fb.group({
            accountHolderName: ['', [Validators.required, Validators.minLength(10)]],
            bankName: ['', Validators.required, Validators.minLength(8)],
            accountNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            ibanNumber: ['', [Validators.required, Validators.minLength(8)]],
            swiftCode: ['', Validators.required, Validators.minLength(8)],
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        })
    }
    ngOnInit(): void {

    }

    verifyDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(VerifyDialogComponent, {
            width: "450px",
            height: "auto",
            maxHeight: "100vh",
            maxWidth: "90vw",
            panelClass: "layout-dialog",
            enterAnimationDuration,
            exitAnimationDuration
        })
    }

    emailOtpSend() {
        try {
            const body = {
                email:"pk1@gmail.com"
            }
            this.apiServices.send(EMAIL_OTP_SEND, body).subscribe({
                next: (response) => {

                },
                error: (error) => {

                },
                complete: () => {
                    console.log("completer");
                }
            })
        } catch (error) {
            console.log(error);

        }
    }
   
    onSubmit(): void {
  
        this.emailOtpSend();
      
    }

    createOrganiser(){
        const data = {
            full_name: "Pk Prajapati1",
            email: "sumit.chauhan1841@gmail.com",
            mobile: "7992215707",
            country_id: "1",
            password: "12345678",
            device_type: 3,
            device_token: "chjckcgkcgcgkhcgcgkcghkgchkghck",
            account_holder_name: this.bankDetails.value.accountHolderName,
            account_number: this.bankDetails.value.accountNumber,
            bank_name: this.bankDetails.value.bankName,
            iban_number: this.bankDetails.value.ibanNumber,
            swift_code: this.bankDetails.value.swiftCode,
        }

        console.log("data :: ", data);
          try {
            this.apiServices.create(EVENT_ORGANIZER_REGISTER, data).subscribe({
                next:(response)=>{
                    this.verifyDialog('500ms', '500ms');
                },
                error:(error)=>{

                },
                complete:()=>{
                    console.log("completer");
                }
            })
        } catch (error) {
            console.log(error);

        }
    }


}
