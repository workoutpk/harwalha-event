import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    hide = true;
    registerForm: FormGroup;
    countryList: any
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private api: ApiService
    ) {
        this.registerForm = fb.group({
            email: ['', Validators.required, Validators.email],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            country: ['', [Validators.required,]],
            password: ['', Validators.required],
            fullName: ['', [Validators.required]],

        })
    }
    ngOnInit() {
       this.getCountry();
       this.patchFormValue();
    }
    getCountry() {
        let data = {}
        this.api.send('event/countries', data).subscribe(
            {
                next: (response) => {
                    this.countryList = response.data;
                },
                error: (error) => console.error(error),
                complete: () => console.log('Completed')
            }
        )
    }

    registerUser() {
        console.log(this.registerForm.value)
        localStorage.setItem('registerData', JSON.stringify(this.registerForm.value));
        this.router.navigate(['auth/bank-detail'])
    }
    patchFormValue() {
        const registerData = JSON.parse(localStorage.getItem('registerData') || '{}');
        console.log("registerData", registerData);
        
        this.registerForm.patchValue({
            email: registerData?.email,
            phone: registerData?.phone,
            country: 1,
            password: registerData?.password,
            fullName: registerData?.fullName,
        })
    }

    

}
