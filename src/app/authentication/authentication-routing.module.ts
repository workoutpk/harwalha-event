import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { PackageComponent } from './package/package.component';
import { BuyComponent } from './buy/buy.component';
import { RegisterSuccessfullComponent } from './register-successfull/register-successfull.component';

const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'forgot-password', component:ForgotPasswordComponent},
    {path:'otp', component:OtpComponent},
    {path:'reset-password', component:ResetPasswordComponent},
    {path:'bank-detail', component:BankDetailComponent},
    {path:'package', component:PackageComponent},
    {path:'buy', component:BuyComponent},
    {path:'register-successfull', component:RegisterSuccessfullComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
