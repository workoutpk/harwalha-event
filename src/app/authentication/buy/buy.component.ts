import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SUBSCRIPTION_BUY } from 'src/api.constants';
@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
    buySubcrption: FormGroup
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private apiServices: ApiService
    ) {
        this.buySubcrption = this.fb.group({
            cardHolderName: ['', Validators.required,],
            cardNumber: ['', Validators.required,],
            cvv: ['', Validators.required,],
        })
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    onSubmit() {
        const body = {

            "token": "1487d109e99206ab0c855a4720c92c06",
            "organizer_id": "2",
            "package_id": "12",
            "payment": "150",
            "start_date": "24-11-2024",
            "end_date": "23-11-2025",
            "payment_status": "success", // "success", "pending", "failed"
            "transaction_id": "TXND12345654",
            "is_auto_renew": "yes" // "yes", "no"

        }
        console.log(this.buySubcrption.value);

        try {
            this.apiServices.create(SUBSCRIPTION_BUY, body).subscribe({
                next: (response) => {
                    this.router.navigate(['/auth/register-successfull'])
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
