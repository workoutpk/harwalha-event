import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EMAIL_OTP_VERIFY } from 'src/api.constants';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';
import { EVENT_ORGANIZER_REGISTER, EMAIL_OTP_SEND } from 'src/api.constants';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-verify-dialog',
    templateUrl: './verify-dialog.component.html',
    styleUrls: ['./verify-dialog.component.css']
})
export class VerifyDialogComponent {
    organizerData: any
    resendOtp() {
        this.emailOtpSend()
    }

    verifyEmail: FormGroup
    constructor(
        private fb: FormBuilder,
        private apiServices: ApiService,
        private router: Router,
        private toastService: ToasterService,

    ) {
        this.verifyEmail = this.fb.group({
            otp: ['', Validators.required]
        })
    }

    ngOnInit() { 
        this.organizerData = JSON.parse(localStorage.getItem('organizerData') || '{}');
    }
    verifyOtp() {
        
        const body = {
            email: this.organizerData.email,
            otp: this.verifyEmail.value.otp
        }
        if(this.verifyEmail.invalid){
            console.log("invalid form", this.verifyEmail.errors);
            this.toastService.error("Invalid form")
            
            return
        }

        try {
            this.apiServices.send(EMAIL_OTP_VERIFY, body).subscribe({
                next: (response) => {
                    this.createOrganiser()
                  
                },
                error: (err) => {

                },
                complete() {
                    console.log("completed");

                },
            })
        } catch (error) {
            this.toastService.error(JSON.stringify(error));
            console.log("Otp verification error :: ", error)
        }
    }

    emailOtpSend() {
        try {
            const registerData = JSON.parse(localStorage.getItem('registerData') || '{}');
            const body = {
                email: registerData?.email
            }
            this.apiServices.send(EMAIL_OTP_SEND, body).subscribe({
                next: (response) => {
                    if(response.error){
                        this.toastService.error(JSON.stringify(response.message));
                    }else{
                        this.toastService.success("OTP resend successfully");
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

    createOrganiser() {

        try {
            this.apiServices.create(EVENT_ORGANIZER_REGISTER, this.organizerData ).subscribe({
                next: (response) => {
                    if(response.error){
                        this.toastService.error(JSON.stringify(response.message));
                    }else{
                        this.router.navigate(['/auth/package']) 
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

}
