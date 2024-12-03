import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { VerifyDialogComponent } from './bank-detail/verify-dialog/verify-dialog.component';
import { PackageComponent } from './package/package.component';
import { BuyComponent } from './buy/buy.component';
import { RegisterSuccessfullComponent } from './register-successfull/register-successfull.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ResetPasswordComponent,
    BankDetailComponent,
    VerifyDialogComponent,
    PackageComponent,
    BuyComponent,
    RegisterSuccessfullComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
