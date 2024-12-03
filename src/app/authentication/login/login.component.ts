import { Component, OnInit } from '@angular/core';
import { FormControlName, Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loginError: string | null = null;
    isLoading = false;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastService: ToasterService
    ) { }
    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [
                Validators.required,
                Validators.minLength(3)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        });
        
    }
    onSubmit() { 
        try {
            console.log(this.loginForm.value);
            
            if (this.loginForm.valid) {
                this.isLoading = true;
                this.loginError = null;
                let data = {
                    username: this.loginForm.value.username,
                    password: this.loginForm.value.password,
                    device_type:3, // 1 = android, 2 = ios
                    device_token:"xxgfxfxfxgx"
                }
                this.authService.login(data).subscribe({
                  next: (response) => {
                    this.isLoading = false;
                    // Navigate to dashboard or home page after successful login
                    if(response.data){
                        this.router.navigate(['/event/dashboard']);
                    }else{
                        this.toastService.error(response.message);
                        this.loginError= response.message
                    }
           
                  },
                  error: (error) => {
                    this.isLoading = false;
                    // Handle login error
                    this.loginError = error.error?.message || 'Login failed. Please try again.';
                  }
                });
              }
        } catch (error) {
            
        }
    }

    hide = true
  // Getter methods for easy access in template
  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }

}
