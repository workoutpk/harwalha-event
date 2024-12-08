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
        private toastService: ToasterService,

    ) {
        this.bankDetails = this.fb.group({
            accountHolderName: ['', [Validators.required, Validators.minLength(10)]],
            bankName: ['', Validators.required, ],
            accountNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            ibanNumber: ['', [Validators.required, ]],
            swiftCode: ['', Validators.required, ],

        })
    }
    ngOnInit(): void {
        this.patchFormValue();
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
            const registerData = JSON.parse(localStorage.getItem('registerData') || '{}');
            const body = {
                email: registerData?.email
            }
            this.apiServices.send(EMAIL_OTP_SEND, body).subscribe({
                next: (response) => {
                    this.toastService.success("OTP send successfully");
                    const registerData = JSON.parse(localStorage.getItem('registerData') || '{}');
                    if (registerData) {

                        const data = {
                            full_name: registerData?.fullName,
                            email: registerData?.email,
                            mobile: registerData?.phone,
                            country_id: registerData?.country,
                            password: registerData?.password,
                            device_type: 3,
                            device_token: this.generateRandomToken(),
                            account_holder_name: this.bankDetails.value.accountHolderName,
                            account_number: this.bankDetails.value.accountNumber,
                            bank_name: this.bankDetails.value.bankName,
                            iban_number: this.bankDetails.value.ibanNumber,
                            swift_code: this.bankDetails.value.swiftCode,
                        }
                
                        localStorage.setItem('organizerData', JSON.stringify(data));
                        console.log(data);
                        this.verifyDialog('500ms', '500ms');
                    }
                    
                   
                    
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

   patchFormValue() {
        const organizerData = JSON.parse(localStorage.getItem('organizerData') || '{}');
        this.bankDetails.patchValue({
            accountHolderName: organizerData?.account_holder_name,
            bankName: organizerData?.bank_name,
            accountNumber: organizerData?.account_number,
            ibanNumber: organizerData?.iban_number,
            swiftCode: organizerData?.swift_code,
        })
    }

    generateRandomToken(length: number = 32): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
        }

        return token;
    }


}
