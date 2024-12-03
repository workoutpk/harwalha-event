import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    registerForm: FormGroup
    constructor(private fb: FormBuilder) {
        this.registerForm = fb.group({
            username: [''],
            email: [''],
            password: [''],
            fullName: [''],
            phone: [''],
            country: [''],
        })
    }

    registerUser() {
        console.log(this.registerForm.value)
    }
    hide = true
}
