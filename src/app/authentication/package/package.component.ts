import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { PACKAGE_LIST } from 'src/api.constants';
import { Package } from 'src/app/interfaces/package';
@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
    packageData: Package[];
    month: number;
    organizerId :any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private apiServices: ApiService,
        private fb: FormBuilder,
        private toastService: ToasterService,
    ) {
        this.packageData = [];
        this.month = 0;
    }
    ngOnInit() {
        this.getPackage();
        this.organizerId = localStorage.getItem('organizerId');
    }
    getPackage() {
        try {
            this.apiServices.send(PACKAGE_LIST, {}).subscribe({
                next: (response) => {
                    console.log('response', response.data);

                    this.packageData = response.data;
                },
                error: (error) => {

                },
                complete: () => {
                    console.log("completed");
                }
            })
        } catch (error) {
            console.log(error);
            localStorage.clear();
        }
    }
    buyPackage(package_id: number) {
        let packageDetail = this.packageData.find(x => x.package_id === package_id);
        if (!packageDetail) {
            this.toastService.error("Package not found");
            return;
        } else {
            if (packageDetail.package_type === 0 || packageDetail.package_type === null) {
                this.toastService.error("Please select a package");
                return
            } else if (packageDetail.package_type == 1) {
                this.month = 1;
            } else if (packageDetail.package_type == 2) {
                this.month = 6;
            } else if (packageDetail.package_type == 3) {
                this.month = 12;
            }

        }
        const newDate = new Date();
        let data = {
            "token": "1487d109e99206ab0c855a4720c92c06",
            "organizer_id": "2",
            "package_id": packageDetail?.package_id,
            "payment": packageDetail?.price,
            "start_date": new Date().getTime(),
            "end_date": this.addMonths(new Date(),this.month).getTime(),
            "payment_status": "success", // "success", "pending", "failed"
            "transaction_id": this.generateRandomTransactionId(),
            "is_auto_renew": "yes" // "yes", "no" }
        }
        localStorage.setItem('packageData', JSON.stringify(data));
        this.router.navigate(['/auth/buy']);
        // try {
        //     this.apiServices.create('subscription/buy', data).subscribe({
        //         next: (response) => {
        //             if (response.error) {
        //                 this.toastService.error(JSON.stringify(response.message));
        //             } else {
        //                 this.toastService.success(JSON.stringify(response.message));
        //                 this.router.navigate(['/auth/register-successfull'])
        //             }

        //         },
        //         error(err) {
        //             console.log(err)
        //         },
        //         complete() {
        //             console.log("completed");
        //         }
        //     })
        // } catch (error) {
        //     console.log(error);
        //     localStorage.clear();
        // }

    }

    generateRandomTransactionId(prefix: string = 'TXND', length: number = 10): string {
        // Generate a random number with the specified length
        const randomNumber = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
        return `${prefix}${randomNumber}`;
    }

    addMonths(date: Date, months: number): Date {
        const newDate = new Date(date); // Create a copy of the original date
        newDate.setMonth(newDate.getMonth() + months); // Add months
        return newDate;
    }
}
