import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EMAIL_OTP_VERIFY } from 'src/api.constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verify-dialog',
    templateUrl: './verify-dialog.component.html',
    styleUrls: ['./verify-dialog.component.css']
})
export class VerifyDialogComponent {
    resendOtp() {
        this.verifyOtp
    }

    verifyEmail: FormGroup
    constructor(
        private fb: FormBuilder,
        private apiServices: ApiService,
        private router: Router

    ) {
        this.verifyEmail = this.fb.group({
            otp: ['', Validators.required, Validators.minLength(4), Validators.maxLength(4)]
        })
    }
    verifyOtp() {
        const body = {
            email: "pk1@gmail.com",
            otp: this.verifyEmail.value.otp
        }

        try {
            this.apiServices.send(EMAIL_OTP_VERIFY, body).subscribe({
                next: (response) => {
                    this.router.navigate(['/auth/package"'])
                },
                error: (err) => {

                },
                complete() {
                    console.log("completed");

                },
            })
        } catch (error) {
            console.log("Otp verification error :: ", error)
        }
    }

}
