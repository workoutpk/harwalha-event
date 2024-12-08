import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SUBSCRIPTION_BUY } from 'src/api.constants';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
    buySubcrption: FormGroup
    packageInfo: any;
    paymentMethod: string = 'creditCard';
    payableAmount: number = 0;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private apiServices: ApiService,
        private toastService: ToasterService
    ) {
        this.buySubcrption = this.fb.group({
            cardHolderName: ['', Validators.required,],
            cardNumber: ['', Validators.required,],
            cvv: ['', Validators.required,],
        })
    }
    ngOnInit(): void {
        this.packageInfo = JSON.parse(localStorage.getItem('packageData') || '{}');
        console.log("packageInfo", this.packageInfo);
        
        this.payableAmount = this.packageInfo?.payment;
    }
    onSubmit() {
        const data = {
            "package_id": this.packageInfo?.id,
            "card_holder_name": this.buySubcrption.get('cardHolderName')?.value,
            "card_number": this.buySubcrption.get('cardNumber')?.value,
            "cvv": this.buySubcrption.get('cvv')?.value,
        }
        if(this.buySubcrption.invalid){
            this.toastService.error("Please fill all the required fields");
            this.buySubcrption.markAllAsTouched()
            return
        }
        try {
            this.apiServices.create(SUBSCRIPTION_BUY, this.packageInfo ).subscribe({
                next: (response) => {
                    if(response.error){
                        this.toastService.error(JSON.stringify(response.message));
                    }else{
                        this.toastService.success("Buy subscription successfully");
                        this.router.navigate(['/auth/register-successfull'])
                       
                    }
                  
                },
                error(err) {
                    console.log(err)
                },
                complete() {
                    console.log("completed");

                },
            })
        } catch (error) {
            console.log("buy subscription error :: ", error)
        }

    }

}
