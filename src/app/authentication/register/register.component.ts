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
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', Validators.required, Validators.email],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            country: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            password: ['', Validators.required, Validators.minLength(8)],
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],

        })
    }
    ngOnInit() {
        let data = {}
        this.api.send('event/countries', data).subscribe(
            {
                next: (response) => {
                    // this.countryList= response.data;
                },
                error: (error) => console.error(error),
                complete: () => console.log('Completed')
            }
        )
    }
    getCountry() {

    }

    registerUser() {

        // console.log(this.registerForm.value)
        this.router.navigate(['auth/bank-detail'])
    }

}
